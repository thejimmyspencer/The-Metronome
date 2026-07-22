const CACHE = 'pulse-v4';
const ASSETS = ['./', './index.html', './styles.css?v=4', './app-v4.js', './app.js?v=4', './manifest.webmanifest?v=4', './icons/icon.svg'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') { event.respondWith(fetch(event.request).catch(() => caches.match('./index.html'))); return; }
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request)));
});
