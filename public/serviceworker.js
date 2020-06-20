const CACHE_NAME = 'version-1';
const urlToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install Service Worker.
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache.");
                return cache.addAll(urlToCache);
            })
            .catch((err) => { console.log("Error opening cache ", err)})
    );
});

// Listen to request.
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(() => {
                return (
                    fetch(e.request)
                        .catch(() => caches.match('offline.html'))
                );
            })
    );
});

// Activate Service Worker.
self.addEventListener('activate', (e) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    );
});
