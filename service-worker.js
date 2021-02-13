const CACHE_NAME = 'firsPWA';

let urlToCache = [
    '/',
    '/nav.html',
    '/index.html',
    '/pages/blog.html',
    '/pages/home.html',
    '/pages/now.html',
    '/pages/portfolio.html',
    '/js/materialize.min.js',
    '/js/script.js',
    '/css/materialize.min.css',
    '/manifest.json',
    '/assets/icon-192.png',
    '/assets/icon-512.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlToCache)
        })
    )
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
        .then(function (response) {
            if (response) {
                console.log('Service worker berhasil gunakan aset dari cache')
                return response
            }
            return fetch(event.request)
        })
    )
})

self.addEventListener('active', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheName.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})