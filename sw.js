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
    // ... (שאר הקוד נשאר ללא שינוי)
});