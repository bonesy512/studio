import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: any;
let auth: any;
let db: any;
let storage: any;

if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.warn('Firebase API key not found. Skipping initialization (likely build time).');
    app = {} as any;
    auth = {} as any;
    db = {} as any;
    storage = {} as any;
} else {
    try {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        storage = getStorage(app);

        // Initialize Firestore with long polling to avoid WebSocket hangs
        db = initializeFirestore(app, {
            experimentalForceLongPolling: true,
        });
    } catch (error) {
        console.error('Firebase initialization failed:', error);
        // Fallback to prevent crash
        app = {} as any;
        auth = {} as any;
        db = {} as any;
        storage = {} as any;
    }
}

export { app, auth, db, storage };
