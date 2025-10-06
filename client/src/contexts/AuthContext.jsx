import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('https://127.0.0.1:8000/api/check-auth', {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data.client);
                setIsAuthenticated(true);
            } else if (response.status === 401) {
                // Expected when not authenticated, don't log as error
                setIsAuthenticated(false);
                setUser(null);
            } else {
                // Other errors might be worth logging
                console.error('Erreur de vérification d\'authentification:', response.status);
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            // Only log network/system errors
            if (!error.toString().includes('401')) {
                console.error('Erreur de vérification d\'authentification:', error);
            }
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Check auth status when component mounts
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('https://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.client);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return { 
                    success: false, 
                    message: data.message || 'Erreur de connexion' 
                };
            }
        } catch (error) {
            return { 
                success: false, 
                message: 'Erreur de connexion au serveur' 
            };
        }
    };

    const logout = async () => {
        try {
            await fetch('https://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                user, 
                loading,
                login,
                logout,
                checkAuthStatus 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
