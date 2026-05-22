const CACHE_NAME = 'hot-tub-hero-pwa-v3-roster';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './roster-patch.js',
  './icons/hot-tub-icon.svg',
  './game/part-00.html',
  './game/part-01.html',
  './game/part-02.html',
  './game/part-03.html',
  './game/part-04.html',
  './game/part-05.html',
  './game/part-06.html',
  './game/part-07.html',
  './game/part-08.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then(cached => cached || caches.match('./index.html')))
  );
});
