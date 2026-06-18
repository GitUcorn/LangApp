const CACHE_NAME = 'hello-world-pwa-v1';
// רשימת הקבצים שנרצה לשמור במכשיר
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json'
];

// שלב ההתקנה - שמירת הקבצים הסטטיים במטמון
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// שלב התפיסה (Fetch) - אם אין אינטרנט, המכשיר יקח את הקבצים מהמטמון המקומי
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});