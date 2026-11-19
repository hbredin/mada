const slides = window.MADA_MEDIA_LIST || [window.MADA_MEDIA].filter(Boolean);
let activeSlide = 0;
const container = document.querySelector('#media');
function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  const config = slides[activeSlide];
  container.querySelector('video')?.pause();
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
  document.querySelector('#slide-count').textContent = `${activeSlide + 1} / ${slides.length}`;
}
const navigation = document.querySelector('#carousel-navigation');
navigation.hidden = slides.length < 2;
document.querySelector('#previous').addEventListener('click', () => showSlide(activeSlide - 1));
document.querySelector('#next').addEventListener('click', () => showSlide(activeSlide + 1));
document.querySelector('#carousel').addEventListener('keydown', event => {
  if (event.target.closest('video') || slides.length < 2) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showSlide(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
showSlide(0);
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
