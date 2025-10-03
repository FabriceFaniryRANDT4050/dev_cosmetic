import { useState } from 'react';

// Icône Google (inchangée)
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.101 29.61 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691c-1.645 3.119-2.606 6.691-2.606 10.539c0 1.282.106 2.533.295 3.764l7.616-5.886C11.313 21.96 11 20.503 11 19c0-1.831.421-3.558 1.158-5.119L6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-7.617 5.887C8.049 39.51 15.424 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C39.71 36.641 44 31.125 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const API_ENDPOINT = 'https://127.0.0.1:8000/api/login';

const LoginPage = () => {
    // États pour les champs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // États pour le feedback utilisateur après l'authentification
    const [statusMessage, setStatusMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage(''); // Réinitialiser le message au début de la soumission

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 
                    // 🚨 ESSENTIEL : Indiquer que le corps est au format JSON
                    'Content-Type': 'application/json' 
                },
                // 🚨 CORRECTION : Convertir l'objet JS en chaîne JSON
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            const data = await response.json();
            
            // Le contrôleur Symfony renvoie un statut 200 en cas de succès et 400/401 en cas d'échec
            if (response.ok) {
                // Succès : Statut HTTP 200
                setStatusMessage(data.message);
                setIsError(false);
                // 💡 Ici vous stockeriez un Token JWT si Symfony en renvoyait un
            } else {
                // Échec : Statut HTTP 400 ou 401
                setStatusMessage(data.message || "Erreur de connexion inconnue.");
                setIsError(true);
            }

        } catch (error) {
            // Erreur de réseau (e.g., serveur inaccessible, problème CORS)
            console.error("Erreur réseau ou traitement de la requête:", error);
            setStatusMessage("Impossible de joindre le serveur. Vérifiez l'URL ou la connexion.");
            setIsError(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                
                {/* --- Titre --- */}
                <h1 className="text-3xl font-extrabold text-center text-[#6b4226] mb-2">
                    Content de vous revoir !
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Connectez-vous à votre compte
                </p>

                {/* --- Message de statut (Feedback utilisateur) --- */}
                {statusMessage && (
                    <div className={`p-3 mb-4 rounded-lg font-medium text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {statusMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    
                    {/* --- Champ Email --- */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm text-left font-semibold mb-2" htmlFor="email">
                            Adresse Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226] transition-shadow"
                            placeholder="votre.email@exemple.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* --- Champ Mot de passe --- */}
                    <div className="mb-6">
                        <label className="block text-left text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226] transition-shadow"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* --- Bouton de connexion --- */}
                    <button
                        type="submit"
                        className="w-full bg-[#6b4226] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-[#975e38] transition-colors duration-300 transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Se connecter
                    </button>
                </form>

                {/* --- Reste du JSX (inchangé) --- */}
                <div className="relative my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-sm text-gray-500">ou se connecter avec</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-sm">
                    <GoogleIcon />
                    <span className="font-semibold text-gray-700">Google</span>
                </button>
                <p className="text-center text-sm text-gray-600 mt-8">
                    Vous n'avez pas de compte ?
                    <a href="/signup" className="ml-1 font-semibold text-[#6b4226] hover:underline">
                        Inscrivez-vous
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
