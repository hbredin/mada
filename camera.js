const cameraDialog = document.querySelector('#camera-dialog');
const live = document.querySelector('#camera-live');
const photo = document.querySelector('#camera-photo');
const capture = document.querySelector('#capture');
const retake = document.querySelector('#retake');
const keep = document.querySelector('#keep-photo');
const cameraStatus = document.querySelector('#camera-status');
let cameraStream;
let cameraRequest = 0;
let pendingPhoto;
function stopCamera() {
  cameraRequest++;
  cameraStream?.getTracks().forEach(track => track.stop());
  cameraStream = undefined;
  live.srcObject = null;
  capture.disabled = true;
}
function discardPhoto() {
  if (pendingPhoto) URL.revokeObjectURL(pendingPhoto);
  pendingPhoto = undefined;
  photo.removeAttribute('src');
}
async function startCamera() {
  stopCamera();
  discardPhoto();
  const request = cameraRequest;
  live.hidden = false;
  photo.hidden = true;
  capture.hidden = false;
  retake.hidden = true;
  keep.hidden = true;
  cameraStatus.textContent = 'Autorisez l’accès à la caméra dans votre navigateur.';
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported');
    const stream = await navigator.mediaDevices.getUserMedia({video: {width: {ideal: 1280}, height: {ideal: 720}, facingMode: 'user'}, audio: false});
    if (request !== cameraRequest || !cameraDialog.open) {
      stream.getTracks().forEach(track => track.stop());
      return;
    }
    cameraStream = stream;
    live.srcObject = stream;
    await live.play();
    if (request !== cameraRequest) return;
    capture.disabled = false;
    cameraStatus.textContent = 'La caméra est prête. Vous choisissez le moment.';
  } catch (error) {
    if (request !== cameraRequest) return;
    stopCamera();
    cameraStatus.textContent = error.name === 'NotAllowedError'
      ? 'Accès refusé. Autorisez la caméra dans les réglages du navigateur, puis réessayez.'
      : 'Caméra indisponible. Vérifiez qu’elle est connectée et disponible dans ce navigateur.';
    retake.textContent = 'Réessayer';
    retake.hidden = false;
  }
}
document.querySelector('#open-camera').addEventListener('click', () => {
  cameraDialog.showModal();
  startCamera();
});
document.querySelector('#close-camera').addEventListener('click', () => cameraDialog.close());
cameraDialog.addEventListener('close', () => { stopCamera(); discardPhoto(); });
retake.addEventListener('click', startCamera);
capture.addEventListener('click', () => {
  if (!live.videoWidth || !live.videoHeight || capture.disabled) return;
  capture.disabled = true;
  const canvas = document.createElement('canvas');
  canvas.width = live.videoWidth;
  canvas.height = live.videoHeight;
  canvas.getContext('2d').drawImage(live, 0, 0);
  stopCamera();
  const request = cameraRequest;
  canvas.toBlob(blob => {
    if (request !== cameraRequest || !cameraDialog.open) return;
    if (!blob) {
      cameraStatus.textContent = 'La capture a échoué. Réessayez.';
      retake.hidden = false;
      return;
    }
    pendingPhoto = URL.createObjectURL(blob);
    photo.src = pendingPhoto;
    photo.hidden = false;
    live.hidden = true;
    capture.hidden = true;
    retake.textContent = 'Recommencer';
    retake.hidden = false;
    keep.hidden = false;
    cameraStatus.textContent = 'Cette photo vous convient-elle ? Elle n’a pas été envoyée.';
  }, 'image/jpeg', 0.92);
});
keep.addEventListener('click', () => {
  if (!pendingPhoto) return;
  const url = pendingPhoto;
  pendingPhoto = undefined; // The carousel now owns this object URL until the page closes.
  slides.push({type: 'image', src: url, title: 'Ma photo', caption: 'Aperçu local · non publié', alt: 'Photo prise avec votre webcam'});
  navigation.hidden = false;
  showSlide(slides.length - 1);
  const download = document.createElement('a');
  download.href = url;
  download.download = `mada-photo-${Date.now()}.jpg`;
  document.body.append(download);
  download.click();
  download.remove();
  cameraDialog.close();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && cameraStream) {
    stopCamera();
    cameraStatus.textContent = 'Caméra arrêtée. Cliquez sur Recommencer pour la réactiver.';
    retake.textContent = 'Recommencer';
    retake.hidden = false;
  }
});
window.addEventListener('pagehide', stopCamera);
