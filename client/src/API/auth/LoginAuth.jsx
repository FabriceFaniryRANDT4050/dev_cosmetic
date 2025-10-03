import React, { useState, useEffect } from 'react';

// L'environnement Canvas suppose que Tailwind CSS est déjà configuré.

// L'endpoint défini dans le contrôleur Symfony est '/clients'
// Nous utilisons l'URL absolue pour nous connecter au serveur local Symfony.
const API_ENDPOINT = 'https://127.0.0.1:8000/clients';

export default function Auth() {
    // État pour gérer l'affichage du chargement
    const [loading, setLoading] = useState(true);
    // État pour gérer les messages de statut de la récupération
    const [statusMessage, setStatusMessage] = useState("En attente de la récupération...");

    // Effet pour récupérer les données lorsque le composant est monté
    useEffect(() => {
        // Fonction qui gère la logique de récupération avec un mécanisme de réessai (backoff)
        const fetchClients = async (retryCount = 0) => {
            let rawResponse = null; // Pour stocker la réponse brute en cas d'erreur de parsing
            
            try {
                setStatusMessage(`Tentative de connexion à l'API Symfony (tentative ${retryCount + 1})...`);
                setLoading(true);

                const response = await fetch(API_ENDPOINT, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                
                // Cloner la réponse immédiatement pour permettre la lecture du corps deux fois (texte et json)
                rawResponse = response.clone(); 

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}. Vérifiez que le serveur Symfony est en cours d'exécution.`);
                }

                // Tenter de parser le JSON
                const data = await response.json();
                
                // LOGIQUE CLEF: Afficher le JSON brut dans la console
                console.log("-----------------------------------------");
                console.log("✅ JSON Récupéré de GET /clients :");
                console.log(data);
                console.log("-----------------------------------------");
                
                const dataCount = Array.isArray(data) ? data.length : (data ? 1 : 0);
                
                if (dataCount > 0) {
                    setStatusMessage(`✅ Récupération réussie. ${dataCount} élément(s) affichés dans la console.`);
                } else {
                     setStatusMessage("✅ Récupération réussie. Réponse (vide ou objet) affichée dans la console.");
                }
                
            } catch (err) {
                // Gestion spécifique des erreurs de parsing JSON (souvent CORS ou HTML)
                if (err instanceof SyntaxError && rawResponse) {
                    try {
                        const rawText = await rawResponse.text();
                        console.error("Erreur de parsing JSON (Réponse HTML probable ou CORS). Contenu reçu (début):", rawText.substring(0, 500) + (rawText.length > 500 ? '...' : ''));
                        // Mettre à jour le message d'erreur avec une indication pour le développeur
                        err.message = `Réponse non-JSON reçue (voir console pour le contenu brut). Détail: ${err.message}. Solution: Vérifiez la configuration CORS sur Symfony.`;
                    } catch (readError) {
                        console.error("Erreur lors de la lecture du texte brut de la réponse:", readError);
                    }
                }
                
                // Logique de réessai simple (jusqu'à 3 tentatives)
                const delay = Math.pow(2, retryCount) * 1000;
                if (retryCount < 3) {
                    console.warn(`❌ Échec de la récupération (tentative ${retryCount + 1}). Réessai dans ${delay / 1000}s...`, err.message);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    fetchClients(retryCount + 1);
                } else {
                    console.error("Erreur fatale lors de la récupération des clients:", err);
                    setStatusMessage(`❌ Échec de la récupération après 3 tentatives: ${err.message}.`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []); // Dépendance vide : s'exécute une seule fois au montage

    const isSuccess = statusMessage.startsWith('✅');

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans flex flex-col items-center">
            <header className="mb-8 text-center max-w-xl w-full">
                <h1 className="text-3xl font-extrabold text-gray-800">
                    Test d'API Symfony (Console Log)
                </h1>
                <p className="text-gray-600 mt-2">
                    Appel de l'endpoint <code className="text-indigo-600 bg-indigo-100 p-1 rounded font-mono">GET {API_ENDPOINT}</code>
                </p>
            </header>

            <main className="max-w-xl w-full bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Statut de la Récupération</h2>
                
                <div className={`mt-4 p-4 rounded-lg text-sm sm:text-base transition duration-300 
                    ${loading ? 'bg-indigo-100 border-indigo-500 text-indigo-800 border' : 
                      isSuccess ? 'bg-green-100 border-green-500 text-green-800 border-l-4' : 
                      'bg-red-100 border-red-500 text-red-800 border-l-4'}`}>
                    <p className="font-medium">{statusMessage}</p>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-20 mt-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-indigo-500 border-t-4"></div>
                        <p className="ml-4 text-md text-indigo-600">En cours...</p>
                    </div>
                )}
                
                {!loading && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700 font-medium">
                            Pour voir le JSON des clients, vous devez <span className="font-bold text-gray-800">ouvrir la console de votre navigateur (généralement F12)</span>.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
