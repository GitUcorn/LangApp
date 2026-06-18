const CACHE_NAME = 'hello-world-pwa-v2'; // עדכנו את הגרסה!
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    // הוספת האייקונים החדשים לרשימת השמירה
    './icons/apple-icon-180.png',
    './icons/icon-192.png',
    './icons/icon-512.png'
];


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