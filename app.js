const config = window.MADA_MEDIA;
const container = document.querySelector('#media');
if (config) {
  const media = document.createElement(config.type === 'video' ? 'video' : 'img');
  media.src = config.src;
  if (config.type === 'video') {
    media.controls = true;
    media.playsInline = true;
    media.preload = 'metadata';
    media.setAttribute('aria-label', config.alt || config.title);
    if (config.poster) media.poster = config.poster;
  } else {
    media.alt = config.alt || config.title;
    media.fetchPriority = 'high';
  }
  container.replaceChildren(media);
  document.querySelector('#title').textContent = config.title;
  document.querySelector('#caption').textContent = config.caption || '';
  document.title = `Mada — ${config.title}`;
}
const dialog = document.querySelector('#qr-dialog');
document.querySelector('#share').addEventListener('click', () => dialog.showModal());
document.querySelector('#close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
document.querySelector('#copy').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('https://herve.niderb.fr/mada/');
    status.textContent = 'Lien copié !';
  } catch {
    status.textContent = 'Vous pouvez copier le lien affiché ci-dessus.';
  }
});
dialog.addEventListener('close', () => { document.querySelector('#copy-status').textContent = ''; });
