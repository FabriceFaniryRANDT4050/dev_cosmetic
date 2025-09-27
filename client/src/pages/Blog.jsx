import React from "react";
import Pagination from "../components/Pagination";

const BlogPage = () => {
  const produits = [
    {
      id: 1,
      titre: "Masque capillaire",
      note: 2,
      description:
        "Véritable Baume De Soin, Cette Base Masque Capillaire Neutre, Certifiée BIO, Riche En Huiles Végétales De Jojoba, Ricin Et Beurre De Karité,",
      temps: "il y a 2 heures",
      image:
        "https://via.placeholder.com/150x100.png?text=Produit", // Remplace avec ton image
    },
    {
      id: 2,
      titre: "Masque capillaire",
      note: 2,
      description:
        "Véritable Baume De Soin, Cette Base Masque Capillaire Neutre, Certifiée BIO, Riche En Huiles Végétales De Jojoba, Ricin Et Beurre De Karité,",
      temps: "il y a 2 heures",
      image: "https://via.placeholder.com/150x100.png?text=Produit",
    },
    {
      id: 3,
      titre: "Masque capillaire",
      note: 2,
      description:
        "Véritable Baume De Soin, Cette Base Masque Capillaire Neutre, Certifiée BIO, Riche En Huiles Végétales De Jojoba, Ricin Et Beurre De Karité,",
      temps: "il y a 2 heures",
      image: "https://via.placeholder.com/150x100.png?text=Produit",
    },
    {
      id: 4,
      titre: "Masque capillaire",
      note: 2,
      description:
        "Véritable Baume De Soin, Cette Base Masque Capillaire Neutre, Certifiée BIO, Riche En Huiles Végétales De Jojoba, Ricin Et Beurre De Karité,",
      temps: "il y a 2 heures",
      image: "https://via.placeholder.com/150x100.png?text=Produit",
    },
  ];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Barre de recherche */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">BLOG</span>
          <button className="p-2 border-2 cursor-pointer"> 
              <svg
                  className="w-5 h-5 text-light-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6h16M7 12h10M10 18h4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
          </button>
        </div>
        <div className="flex items-center border rounded-full px-4 py-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="RECHERCHE COMMANDE"
            className="flex-grow outline-none text-sm"
          />
        <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
        </button>
        </div>
      </div>

      {/* Liste des produits */}
      <h2 className="font-bold text-left text-lg mb-4">Plus récents</h2>
      <div className="space-y-4">
        {produits.map((produit) => (
          <div
            key={produit.id}
            className="flex flex-col md:flex-row items-start bg-white shadow-md rounded-xl p-4"
          >
            {/* Image */}
            <img
              src='public\image\MonLogo.png'
              alt={produit.titre}
              className="w-full h-full md:w-40 object-cover rounded-lg"
            />

            {/* Contenu texte */}
            <div className="flex-1 md:ml-4 mt-3 md:mt-0 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-amber-700 text-2xl">{produit.titre}</h3>
                  <span className="text-sm text-gray-500">{produit.temps}</span>
                </div>
                {/* Étoiles */}
                <div className="text-yellow-400 text-3xl text-left mb-1">
                  {"★".repeat(produit.note) + "☆".repeat(5 - produit.note)}
                </div>
                <p className="text-sm text-left text-gray-600">{produit.description}</p>
              </div>

              {/* Bouton bien centré */}
              <div className="mt-3 flex">
                <button className="bg-[#d6a86b] cursor-pointer text-white px-4 py-2 rounded-full text-sm font-semibold mx-auto md:mx-0">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      {/* Section Astuces */}
      <div className="mt-10 border-t pt-4">
        <h2 className="font-bold text-lg mb-2">Astuces</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Véritable baume de soin, cette base masque capillaire neutre, certifiée
          BIO, riche en huiles végétales de Jojoba, Ricin et beurre de Karité,
          protège, lisse et nourrit vos cheveux. Sa texture souple et légère
          permet de l’utiliser comme masque cheveux ou comme après-shampoing,
          pour faciliter le démêlage, apporter brillance, souplesse et douceur à
          votre chevelure. Elle sera également idéale comme soin sans rinçage
          pour gainer, nourrir et sublimer vos longueurs et pointes. Utilisée
          pure ou agrémentée de fragrances, actifs et/ou huiles…
        </p>
      </div>
      {/* <div className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn">Page 22</button>
        <button className="join-item btn">»</button>
        </div> */}


        {Pagination}
    </div>
  );
};

export default BlogPage;
