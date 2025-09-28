import React, { useState } from 'react';
import { 
    FiFilter, 
    FiSearch, 
    FiCheckSquare, 
    FiTrash2,
    FiStar,
    FiTruck 
} from 'react-icons/fi';

// NOUVELLE URL DE PLACEHOLDER : Utilisation d'un service plus stable (Picsum)
const IMAGE_PLACEHOLDER_URL = 'https://picsum.photos/60/60?random='; 

// --- Données Mockées du Panier ---
const INITIAL_CART_ITEMS = [
    // Répétition de l'élément pour simuler la liste de 5 éléments
    ...Array(5).fill({
        name: 'Masque capillaire',
        description: 'Véritable Baume De Soin, Cette Base Masque Capillaire Neutre, Certifiée BIO, Riche En Huiles Végétales De Jojoba, Illan Et Beurre de Karité,',
        quantity: '1 boîte',
        rating: 4,
        deliveryTime: 'Il y a 2 heures', 
        isSelected: false, 
    })
].map((item, index) => ({ 
    ...item, 
    id: index + 1,
    // Chaque élément a une URL unique pour un rendu distinct
    imageUrl: `${IMAGE_PLACEHOLDER_URL}${index + 1}` 
}));


const cartData = {
    summary: {
        'Sous-total': 8094.00,
        'Économies': 0,
        'Ramassage en magasin': 99,
        'Taxes': 199,
        'Total': 8392.00,
    }
};

const formatCurrency = (amount) => `${amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} Ar`; 

// --- Composant Taux d'Étoiles ---
const StarRating = ({ rating }) => (
  <div className="flex text-sm text-[#a27c56]"> 
    {[...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        className={i < rating ? 'fill-current text-[#a27c56]' : 'text-stone-300'} 
      />
    ))}
  </div>
);

// --- Composant pour l'Item de Liste (Dynamisé) ---
const ThemedCartItem = ({ item, onSelect, onRemove }) => (
  <div className="flex p-3 bg-white border border-stone-200 rounded-lg shadow-md w-full mb-3"> 
    
    <div className="flex flex-grow min-w-0 pr-4">
        <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-16 h-16 mr-3 rounded-lg flex-shrink-0 object-cover border border-stone-200" 
        />
        
        <div className="text-left">
            <p className="font-bold text-sm text-[#6b4226] line-clamp-1">{item.name}</p>
            <p className="text-[10px] text-stone-500 mt-1 line-clamp-3">{item.description}</p>
        </div>
    </div>
    
    <div className="flex items-center space-x-4 pl-4 text-center text-xs flex-shrink-0">
      
      {/* Qté */}
      <div className="w-16">
        <p className="text-stone-500 font-medium uppercase text-[10px]">Qté</p>
        <p className="font-medium text-[#6b4226] mt-0.5 text-sm">{item.quantity}</p>
      </div>

      {/* Appréciations */}
      <div className="w-20">
        <p className="text-stone-500 font-medium uppercase text-[10px]">Appréciations</p>
        <div className="flex flex-col items-center mt-0.5">
            <StarRating rating={item.rating} />
            <p className="text-[9px] text-stone-500 mt-1">{item.deliveryTime}</p>
        </div>
      </div>

      {/* Actions (Dynamisé) */}
      <div className="w-10">
        <p className="text-stone-500 font-medium uppercase text-[10px]">Actions</p>
        <div className="flex space-x-2 justify-center mt-1">
            <FiCheckSquare 
                className={`w-4 h-4 cursor-pointer transition-colors ${item.isSelected ? 'text-green-600' : 'text-[#6b4226]'}`}
                onClick={() => onSelect(item.id)}
            />
            <FiTrash2 
                className="text-[#6b4226] hover:text-red-500 w-4 h-4 cursor-pointer transition-colors"
                onClick={() => onRemove(item.id)}
            />
        </div>
      </div>
    </div>
  </div>
);

// --- Composant Résumé de la Commande ---
const OrderSummary = ({ summary }) => {
    return (
        <div className="bg-white p-6 space-y-4 text-sm font-light shadow-xl shadow-stone-200 rounded-lg">
            {Object.entries(summary).map(([key, value]) => {
                const isTotal = key === 'Total';
                const isSavings = key === 'Économies'; 
                
                return (
                    <div 
                        key={key} 
                        className={`flex justify-between ${isTotal ? 'border-t border-stone-300 pt-4 text-xl font-medium' : 'text-stone-500'}`}
                    >
                        <span className={isTotal ? 'text-[#6b4226]' : 'text-stone-600'}>{key}</span>
                        <span className={
                        isTotal 
                            ? 'text-[#6b4226] font-semibold' 
                            : isSavings
                            ? 'text-green-600' 
                            : 'text-[#6b4226]' 
                        }>
                        {formatCurrency(value)}
                        </span>
                    </div>
                );
            })}

            <button className="w-full bg-[#8b5e3c] hover:bg-[#6b4226] text-white font-medium py-3 rounded-md transition duration-200 mt-4 shadow-md shadow-stone-300">
                Passer à la Caisse
            </button>

            <p className="text-xs text-center text-stone-500 pt-2">
                Un ou plusieurs articles de votre panier nécessitent un compte.
                <a href="#" className="text-[#6b4226] hover:text-[#8b5e3c] ml-1">Connectez-vous</a>
                ou 
                <a href="#" className="text-[#6b4226] hover:text-[#8b5e3c] ml-1">créez un compte maintenant.</a>
            </p>

            <div className="pt-4 border-t border-stone-300">
                <p className="text-stone-600 mb-2">Avez-vous un code promo ou une carte cadeau ?</p>
                <div className="flex space-x-2">
                <input 
                    type="text" 
                    placeholder="Entrez le code" 
                    className="flex-grow bg-[#fffaf5] text-[#6b4226] border border-[#d4bfa4] rounded-md py-2 px-3 focus:ring-[#8b5e3c] focus:border-[#8b5e3c]" 
                />
                <button className="bg-[#d4bfa4] hover:bg-[#a27c56] text-stone-800 font-medium px-4 rounded-md transition duration-200 text-sm shadow-sm">
                    Appliquer
                </button>
                </div>
            </div>
        </div>
    );
};


// --- Composant Principal du Panier (Dynamisé et Corrigé) ---
const PanierComponent = () => {
    const [items, setItems] = useState(INITIAL_CART_ITEMS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState(false);

    const handleRemove = (idToRemove) => {
        setItems(items.filter(item => item.id !== idToRemove));
    };

    const handleSelect = (idToSelect) => {
        setItems(
            items.map(item =>
                item.id === idToSelect ? { ...item, isSelected: !item.isSelected } : item
            )
        );
    };

    // Logique de Filtrage
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterActive ? item.rating > 3 : true; 
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[#fdf6ec] text-stone-800 p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-light mb-8 text-[#6b4226]">Votre Panier</h1>
                
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    
                    <div className="flex-grow lg:w-3/5 bg-white p-4 sm:p-6 rounded-lg shadow-lg shadow-stone-200">
                        
                        {/* Barre de recherche et filtres */}
                        <div className="pb-4 border-b border-stone-200 mb-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-[#6b4226]">PANIER ({filteredItems.length})</h2>
                                <div className="flex items-center space-x-3 text-stone-500">
                                    {/* Filtre Dynamique */}
                                    <FiFilter 
                                        className={`w-5 h-5 cursor-pointer transition-colors ${filterActive ? 'text-blue-500' : 'text-[#6b4226]'}`}
                                        onClick={() => setFilterActive(!filterActive)}
                                        title={filterActive ? "Désactiver le filtre" : "Activer le filtre"}
                                    /> 
                                    <div className="relative">
                                        {/* Recherche Dynamique */}
                                        <input 
                                            type="text" 
                                            placeholder="RECHERCHER UNE COMMANDE" 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-3 pr-10 py-1.5 text-xs border border-[#d4bfa4] rounded-lg focus:ring-[#8b5e3c] focus:border-[#8b5e3c] w-full md:w-64 bg-[#fffaf5] text-[#6b4226]"
                                        />
                                        <button className="absolute right-0 top-0 h-full px-3 bg-[#8b5e3c] rounded-r-lg hover:bg-[#6b4226] transition duration-150">
                                            <FiSearch className="text-white w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4"> 
                                <p className="text-sm font-medium text-[#6b4226]">
                                    {filterActive ? `Filtré par Appréciations > 3` : `Plus récents`}
                                </p>
                                <button className="px-4 py-2 text-xs font-semibold text-white bg-[#8b5e3c] rounded-md shadow hover:bg-[#6b4226] transition duration-150">
                                    AJOUTER UN PANIER
                                </button>
                            </div>
                        </div>

                        {/* Liste des Items Filtrés/Dynamiques */}
                        <div>
                            {filteredItems.map((item) => (
                                <ThemedCartItem 
                                    key={item.id} 
                                    item={item} 
                                    onRemove={handleRemove} 
                                    onSelect={handleSelect} 
                                />
                            ))}
                        </div>
                        {filteredItems.length === 0 && (
                            <p className="text-center text-stone-500 mt-8">Aucun article ne correspond à votre recherche ou à vos filtres.</p>
                        )}
                    </div>

                    <div className="lg:w-2/5 mt-8 lg:mt-0 sticky top-4 self-start">
                        <OrderSummary summary={cartData.summary} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanierComponent;