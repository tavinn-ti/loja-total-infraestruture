const CACHE_NAME = 'tavinn-ti-pwa-v2';
const GH_PATH = '/loja-total-infraestruture';

const urlsToCache = [
  `${GH_PATH}/`,
  `${GH_PATH}/index.html`,
  `${GH_PATH}/assets/css/style.css`,
  `${GH_PATH}/assets/js/cart.js`,
  `${GH_PATH}/assets/js/products-db.js`,
  `${GH_PATH}/assets/img/logo.jpng`
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de cache antigo
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceção de requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});