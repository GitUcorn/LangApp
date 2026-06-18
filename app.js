/**
 * 1. DATA LAYER (Service)
 * אחראי על אספקת הנתונים. בעתיד פה תתבצע קריאת ה-API לשרת.
 */
const DataService = {
    getGreeting() {
        return {
            message: "Hello World! הקוד בנוי בארכיטקטורת שכבות מקצועית.",
            timestamp: new Date().toLocaleTimeString('he-IL')
        };
    }
};

/**
 * 2. VIEW LAYER (UI Manager)
 * אחראי אך ורק על המניפולציה של ה-DOM (מה שהמשתמש רואה).
 */
const ViewManager = {
    // אלמנטים ב-HTML
    elements: {
        greetingText: document.getElementById('greeting-text'),
        refreshButton: document.getElementById('refresh-btn')
    },

    // פונקציה להצגת ההודעה על המסך
    renderGreeting(data) {
        this.elements.greetingText.innerHTML = `
            <strong>${data.message}</strong>
            <br><small>עודכן לאחרונה: ${data.timestamp}</small>
        `;
    },

    // רישום האזנה לאירועים (למשל לחיצה על כפתור)
    bindRefreshAction(handler) {
        this.elements.refreshButton.addEventListener('click', handler);
    }
};

/**
 * 3. CONTROLLER LAYER (Business Logic)
 * המתווך שמחבר את שכבת הנתונים לשכבת התצוגה.
 */
const AppController = {
    // אתחול האפליקציה
    init() {
        this.updateData();
        
        // חיבור הלחיצה על הכפתור לפעולת העדכון
        ViewManager.bindRefreshAction(() => this.updateData());
        
        // רישום ה-Service Worker של ה-PWA
        this.registerServiceWorker();
    },

    // פעולת הלוגיקה העסקית: הבאת נתונים ודחיפתם לתצוגה
    updateData() {
        const data = DataService.getGreeting();
        ViewManager.renderGreeting(data);
    },

    // רישום ה-Service Worker לעבודה באופליין
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(reg => console.log('Service Worker Registered!', reg))
                    .catch(err => console.error('Service Worker Registration Failed:', err));
            });
        }
    }
};

// הפעלת האפליקציה ברגע שהדף מוכן
document.addEventListener('DOMContentLoaded', () => AppController.init());