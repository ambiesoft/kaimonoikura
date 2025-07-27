const cacheVer = '2.13.1';
const cacheName = 'kaimonoikuraCache' + 'v' + cacheVer;
console.log('cache name', cacheName);

self.addEventListener('install', (event) => {
  console.log('service worker install', event);
  event.waitUntil(caches.open(cacheName));
  console.log('service worker install cache opened');
});

self.addEventListener('activate', (event) => {
  console.log('service worker activate', event);
  // Specify allowed cache keys
  const cacheAllowList = [cacheName];

  // Get all the currently active `Cache` instances.
  event.waitUntil(
    caches.keys().then((keys) => {
      // Delete all caches that aren't in the allow list:
      return Promise.all(
        keys.map((key) => {
          if (!cacheAllowList.includes(key)) {
            console.log('cache delete', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // console.log('fetch', event);
  // Check if this is a navigation request
  // Open the cache
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      // Go to the network first
      return fetch(event.request.url)
        .then((fetchedResponse) => {
          // console.log('fetch put', event.request.url);
          cache.put(event.request, fetchedResponse.clone());

          return fetchedResponse;
        })
        .catch(() => {
          // console.log('fetch exeption');
          // If the network is unavailable, get
          return cache.match(event.request.url);
        });
    })
  );
});
