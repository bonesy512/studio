'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db, isFirebaseInitialized } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    role: 'admin' | 'designer' | 'client' | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

return (
    <AuthContext.Provider value={{ user, role, loading }}>
        {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);
