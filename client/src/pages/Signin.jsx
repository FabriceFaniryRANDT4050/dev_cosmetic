import React, { useState } from 'react';
import axios from "axios";
import api from "../API/url";

// Remplacement des imports externes par des icônes SVG intégrées pour garantir la compilation
// FaGoogle et FaFacebookF sont recréés en tant que composants inline.

const GoogleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-3">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 7.917-11.303 7.917-6.764 0-12.26-5.496-12.26-12.26 0-6.764 5.496-12.26 12.26-12.26 3.181 0 6.008 1.145 8.19 3.036l5.7-5.7c-3.467-3.235-7.98-5.205-12.89-5.205C11.458 5.743 3.656 13.546 3.656 23.284c0 9.737 7.802 17.54 17.54 17.54 9.947 0 14.97-7.07 15.658-12.213V20.083z"></path>
        <path fill="#FF3D00" d="M6.364 24H24v8H6.364z" transform="rotate(-45 15.182 28)"></path>
        <path fill="#4CAF50" d="M12.26 35.824c-3.176-2.073-5.204-5.694-5.204-9.54s2.028-7.467 5.204-9.54l-5.228-3.414C3.218 16.516 1.189 21.056 1.189 26.284c0 5.228 2.029 9.768 5.843 12.637l5.228-3.097z"></path>
        <path fill="#1976D2" d="M43.611 20.083h-2.146l-2.106 2.086c1.192 1.954 1.838 4.195 1.838 6.541 0 4.382-2.193 8.241-5.594 10.686L30 36.427V42.08c7.802-4.834 11.611-14.777 11.611-21.997 0-1.859-.28-3.666-.801-5.367z"></path>
    </svg>
);

const FacebookIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-3">
        <path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h3V2h-3c-3.6 0-5 2.1-5 5v2.5H6v4h3V22h5v-8.5z"/>
    </svg>
);

const SignUpPage = () => {
    // État pour gérer les données du formulaire
    const [formData, setFormData] = useState({
        nom_client: '',
        prenom_client: '',
        email_client: '',
        phone_client: '',
        adresse_client: '',
        password_client: '',
        confirm_password: '',
    });

    // État pour gérer les messages d'erreur de validation
    const [errors, setErrors] = useState({});

    // Fonction de validation côté client
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.nom_client) newErrors.nom_client = 'Le nom est requis.';
        if (!formData.prenom_client) newErrors.prenom_client = 'Le prénom est requis.';
        
        if (!formData.email_client || !emailRegex.test(formData.email_client)) {
            newErrors.email_client = 'Veuillez entrer une adresse e-mail valide.';
        }

        if (!formData.phone_client || !phoneRegex.test(formData.phone_client)) {
            newErrors.phone_client = 'Veuillez entrer un numéro de téléphone valide (10 chiffres).';
        }

        if (!formData.adresse_client) {
            newErrors.adresse_client = 'L\'adresse est requise.';
        }

        // Validation du mot de passe
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!formData.password_client) {
            newErrors.password_client = 'Le mot de passe est requis.';
        } else if (!passwordRegex.test(formData.password_client)) {
            newErrors.password_client = 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.';
        }

        if (!formData.confirm_password) {
            newErrors.confirm_password = 'Veuillez confirmer votre mot de passe.';
        } else if (formData.password_client !== formData.confirm_password) {
            newErrors.confirm_password = 'Les mots de passe ne correspondent pas.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion de la mise à jour des champs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Effacer l'erreur dès que l'utilisateur commence à taper (meilleure UX)
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: '' });
        }
    };

    // Gestion de la soumission du formulaire
    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post('https://127.0.0.1:8000/api/register', formData);
            console.log('Compte créé avec succès:', response.data);
            // Rediriger vers la page de connexion ou afficher un message de succès
            alert('Votre compte a été créé avec succès!');
            // Redirection vers la page de connexion
            window.location.href = '/login';
        } catch (error) {
            console.error('Erreur lors de la création du compte:', error);
            if (error.response) {
                // Afficher les erreurs du serveur
                setErrors({
                    ...errors,
                    server: error.response.data.error || 'Une erreur est survenue lors de la création du compte.'
                });
            } else {
                setErrors({
                    ...errors,
                    server: 'Erreur de connexion au serveur.'
                });
            }
        }

}




    // Logique pour la connexion sociale - Rendre le design plus efficace
    const handleSocialLogin = (provider) => {
        console.log(`Démarrage de l'inscription via ${provider}...`);
        // Ici, vous lanceriez la fenêtre pop-up ou la redirection OAuth
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4"> {/* Arrière-plan beige clair */}
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 border border-stone-200">
                <h2 className="text-3xl font-extrabold text-stone-800 text-center"> {/* Titre marron foncé */}
                    Créez votre compte
                </h2>

                {/* --- Formulaire d'Inscription --- */}
                <form className="space-y-6" onSubmit={handleSignUp}>
                    
                    {/* Champ Nom */}
                    <div>
                        <label htmlFor="nom_client" className="block text-left text-sm font-medium text-stone-700">
                            Nom
                        </label>
                        <div className="mt-1">
                            <input
                                id="nom_client"
                                name="nom_client"
                                type="text"
                                required
                                value={formData.nom_client}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-4 py-2 border ${errors.nom_client ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-stone-900`}
                                placeholder="Votre nom"
                            />
                        </div>
                        {errors.nom_client && <p className="mt-1 text-xs text-red-500">{errors.nom_client}</p>}
                    </div>

                    {/* Champ Prénom */}
                    <div>
                        <label htmlFor="prenom_client" className="block text-left text-sm font-medium text-stone-700">
                            Prénom
                        </label>
                        <div className="mt-1">
                            <input
                                id="prenom_client"
                                name="prenom_client"
                                type="text"
                                required
                                value={formData.prenom_client}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-4 py-2 border ${errors.prenom_client ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-stone-900`}
                                placeholder="Votre prénom"
                            />
                        </div>
                        {errors.prenom_client && <p className="mt-1 text-xs text-red-500">{errors.prenom_client}</p>}
                    </div>

                    {/* Champ Email */}
                    <div>
                        <label htmlFor="email_client" className="block text-left text-sm font-medium text-stone-700">
                            Adresse E-mail
                        </label>
                        <div className="mt-1">
                            <input
                                id="email_client"
                                name="email_client"
                                type="email"
                                required
                                value={formData.email_client}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-4 py-2 border ${errors.email_client ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-stone-900`}
                                placeholder="votre@email.com"
                            />
                        </div>
                        {errors.email_client && <p className="mt-1 text-xs text-red-500">{errors.email_client}</p>}
                    </div>

                    {/* Champ Téléphone */}
                    <div>
                        <label htmlFor="phone_client" className="block text-left text-sm font-medium text-stone-700">
                            Téléphone
                        </label>
                        <div className="mt-1">
                            <input
                                id="phone_client"
                                name="phone_client"
                                type="tel"
                                required
                                value={formData.phone_client}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-4 py-2 border ${errors.phone_client ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-stone-900`}
                                placeholder="Votre numéro de téléphone"
                            />
                        </div>
                        {errors.phone_client && <p className="mt-1 text-xs text-red-500">{errors.phone_client}</p>}
                    </div>

                    {/* Champ Adresse */}
                    {/* <div>
                        <label htmlFor="adresse_client" className="block text-left text-sm font-medium text-stone-700">
                            Adresse
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="adresse_client"
                                name="adresse_client"
                                required
                                value={formData.adresse_client}
                                onChange={handleChange}
                                rows="3"
                                className={`appearance-none block w-full px-4 py-2 border ${errors.adresse_client ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                                placeholder="Votre adresse complète"
                            />
                        </div>
                        {errors.adresse_client && <p className="mt-1 text-xs text-red-500">{errors.adresse_client}</p>}
                    </div> */}

                    {/* Champ Mot de passe */}
                    <div>
                        <label htmlFor="password_client" className="block text-left text-sm font-medium text-stone-700">
                            Mot de passe
                        </label>
                        <div className="mt-1">
                            <input
                                id="password_client"
                                name="password_client"
                                type="password"
                                required
                                value={formData.password_client}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-4 py-2 border ${errors.password_client ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-stone-900`}
                                placeholder="Au moins 8 caractères, une lettre et un chiffre"
                            />
                        </div>
                        {errors.password_client && <p className="mt-1 text-xs text-red-500">{errors.password_client}</p>}
                    </div>

                    {/* Champ Confirmation du mot de passe */}
                    <div>
                        <label htmlFor="confirm_password" className="block text-left text-sm font-medium text-stone-700">
                            Confirmer le mot de passe
                        </label>
                        <div className="mt-1">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                required
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className={`appearance-none block w-full px-4 py-2 border ${errors.confirm_password ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-stone-900`}
                                placeholder="Retapez votre mot de passe"
                            />
                        </div>
                        {errors.confirm_password && <p className="mt-1 text-xs text-red-500">{errors.confirm_password}</p>}
                    </div>

                    {/* Affichage des erreurs serveur */}
                    {errors.server && (
                        <div className="text-red-500 text-sm text-center">
                            {errors.server}
                        </div>
                    )}
                    
                    {/* Checkbox pour les conditions générales */}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="focus:ring-amber-500 h-4 w-4 text-amber-700 border-stone-300 rounded "
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-stone-700">
                                J'accepte les <a href="#" className="text-amber-700 hover:text-amber-800 transition duration-150 ease-in-out">Conditions Générales</a> et la <a href="#" className="text-amber-700 hover:text-amber-800 transition duration-150 ease-in-out">Politique de Confidentialité</a>.
                            </label>
                        </div>
                    </div>


                    {/* Bouton de Soumission */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent cursor-pointer rounded-lg shadow-sm text-sm font-medium text-white  bg-[#6b4226] hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150 ease-in-out"
                        >
                            Créer mon Compte
                        </button>
                    </div>
                </form>

                {/* --- Lien de Connexion --- */}
                <div className="text-center text-sm text-stone-600">
                    Vous avez déjà un compte ?
                    <a href="/login" className="font-medium text-[#6b4226] hover:text-amber-800 ml-1 transition duration-150 ease-in-out">
                        Connectez-vous ici
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
