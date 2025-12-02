'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db, isFirebaseInitialized } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    role: 'admin' | 'designer' | 'client' | null;
    loading: boolean;
    loginAsMockAdmin: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
    loginAsMockAdmin: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<'admin' | 'designer' | 'client' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for persisted mock session
        const isMockAuth = localStorage.getItem('mockAuth') === 'true';
        if (isMockAuth) {
            loginAsMockAdmin();
            return;
        }

        if (!isFirebaseInitialized) {
            console.warn("Firebase not initialized. Auth disabled.");
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (localStorage.getItem('mockAuth') === 'true') return; // Ignore real auth if mock is active

            setUser(user);
            if (user) {
                // SUPER ADMIN BYPASS: Grant admin immediately for specific emails
                // This avoids getting locked out if Firestore is slow/blocked
                const adminEmails = ['kozmo51488@gmail.com'];
                if (user.email && adminEmails.includes(user.email)) {
                    setRole('admin');
                    setLoading(false);
                    return;
                }

                // Fetch user role from Firestore
                try {
                    // Timeout after 15 seconds
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Firestore fetch timed out')), 15000)
                    );

                    const docRef = doc(db, 'users', user.uid);
                    const docPromise = getDoc(docRef);

                    const userDoc = await Promise.race([docPromise, timeoutPromise]) as any;

                    if (userDoc.exists()) {
                        setRole(userDoc.data().role as 'admin' | 'designer' | 'client');
                    } else {
                        setRole(null); // Or default role
                    }
                } catch (error) {
                    console.error('AuthProvider: Error fetching user role:', error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginAsMockAdmin = () => {
        console.warn("Forcing Mock Admin Login");
        localStorage.setItem('mockAuth', 'true');
        setUser({
            uid: 'mock-admin',
            email: 'admin@example.com',
            displayName: 'Mock Admin',
            emailVerified: true,
            isAnonymous: false,
            metadata: {},
            providerData: [],
            refreshToken: '',
            tenantId: null,
            delete: async () => { },
            getIdToken: async () => 'mock-token',
            getIdTokenResult: async () => ({
                token: 'mock-token',
                signInProvider: 'custom',
                claims: { role: 'admin' },
                authTime: Date.now().toString(),
                issuedAtTime: Date.now().toString(),
                expirationTime: (Date.now() + 3600000).toString(),
            }),
            reload: async () => { },
            toJSON: () => ({}),
            phoneNumber: null,
            photoURL: null,
        } as unknown as User);
        setRole('admin');
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, loginAsMockAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
