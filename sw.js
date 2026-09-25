const CACHE_NAME = 'tavinn-ti-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/cart.js',
  './assets/js/products-db.js',
  './assets/img/logo.jpng'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Resposta com recursos em cache ou busca na rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});