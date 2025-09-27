// src/pages/About.jsx

import React from 'react';

function About() {
  return (
    // Le padding horizontal (px) augmente sur les petits écrans (sm:) et plus
    <div className="bg-white px-4 sm:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-sm font-semibold tracking-widest uppercase border-b pb-2">
            A Propos
          </h2>
        </div>

        {/* La hauteur (h) de cet espace augmente sur les petits écrans et plus */}
        <div className="h-48 sm:h-64 bg-gray-100 rounded-lg mb-12">
            {/* Vous pouvez mettre une image ici */}
        </div>

        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Un petit d'histoire</h3>
          <p className="text-gray-600 leading-relaxed">
            Véritable baume de soin, cette base masque capillaire neutre, certifiée BIO, riche en huiles végétales de Jojoba, Ricin et beurre de Karité, protège, lisse et nourrit vos cheveux. Sa texture souple et légère permet de l'utiliser comme masque cheveux ou comme après-shampooing pour faciliter le démêlage...
          </p>
        </div>

        {/*
          LA PARTIE LA PLUS IMPORTANTE POUR LA RESPONSIVITÉ :
          - Par défaut (mobile), les éléments sont empilés verticalement.
          - Sur les écrans moyens (md:) et plus, on passe à une grille de 2 colonnes (`md:grid-cols-2`).
        */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left">
            <h3 className="text-3xl font-bold mb-4">Nos voisin</h3>
            <p className="text-gray-600 leading-relaxed">
              Véritable baume de soin, cette base masque capillaire neutre, certifiée BIO, riche en huiles végétales de Jojoba, Ricin et beurre de Karité, protège, lisse et nourrit vos cheveux. Sa texture...
            </p>
          </div>
          <div className="flex justify-center">
            {/* La taille du cercle augmente aussi sur les écrans sm: et plus */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-orange-200">
               {/* Vous pouvez remplacer cette div par une balise <img> */}
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Nos mission</h3>
          <p className="text-gray-600 leading-relaxed">
            Véritable baume de soin, cette base masque capillaire neutre, certifiée BIO, riche en huiles végétales de Jojoba, Ricin et beurre de Karité, protège, lisse et nourrit vos cheveux. Sa texture souple et légère permet de l'utiliser comme masque cheveux ou comme après-shampooing pour faciliter le démêlage...
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;