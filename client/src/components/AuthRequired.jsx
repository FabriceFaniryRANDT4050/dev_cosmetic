import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthRequired = ({ children, fallback }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6b4226]"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        if (fallback) {
            return fallback;
        }
        return (
            <div className="text-center p-4">
                <p className="text-gray-600 mb-4">Vous devez être connecté pour accéder à cette fonctionnalité</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#6b4226] text-white px-4 py-2 rounded hover:bg-[#8b5735] transition-colors"
                >
                    Se connecter
                </button>
            </div>
        );
    }

    return children;
};

export default AuthRequired;
