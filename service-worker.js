var cacheName = 'webstore';
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      // Download the file if it is not in the cache,
      return r || fetch(e.request).then(function (response) {
        // add the new file to cache
        return caches.open(cacheName).then(function (cache) {
          cache.put(e.request, response.clone());
          return response;
}); });
}) );
});