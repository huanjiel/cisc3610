self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        './index.html',
        './manifest.json',
        './app.js',
        './service-worker.js',
        './icon-192x192.png',
        './icon-512x512.png',
        './style.css',
        './script.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
