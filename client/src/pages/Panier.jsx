import React, { useState, useMemo } from 'react';
import { 
    FiFilter, 
    FiSearch, 
    FiCheckSquare, 
    FiTrash2,
    FiStar,
    FiTruck 
} from 'react-icons/fi';

const IMAGE_PLACEHOLDER_URL = 'public/image/beauty.jpg'; 

// --- Codes Promo Mockés ---
const PROMO_CODES = {
    'REDUC10': 0.10, // 10% de réduction
    'FREE99': 99.00, // 99 Ar de réduction fixe (pour annuler les frais de livraison)
};

// --- Données Mockées du Panier ---
const INITIAL_CART_ITEMS = [
    ...Array(5).fill({
        name: 'Masque capillaire hydratant',
        price: 1500.00, 
        description: 'Véritable Baume De Soin, Cette Base Masque Capillaire Neutre, Certifiée BIO, Riche En Huiles Végétales De Jojoba, Illan Et Beurre de Karité,',
        quantity: 1, 
        rating: 4,
        deliveryTime: 'Il y a 2 heures', 
        isSelected: true,
    })
].map((item, index) => ({ 
    ...item, 
    id: index + 1,
    quantity: index % 3 === 0 ? 2 : 1, 
    price: 1500.00 + (index * 500), 
    imageUrl: `${IMAGE_PLACEHOLDER_URL}` 
}));


const formatCurrency = (amount) => `${Math.max(0, amount).toLocaleString('fr-MG', { minimumFractionDigits: 0 })} Ar`; 

// --- Composant Taux d'Étoiles (inchangé) ---
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

// --- Composant pour l'Item de Liste (inchangé) ---
const ThemedCartItem = React.memo(({ item, onSelect, onRemove }) => (
    <div className="flex p-3 bg-white border border-stone-200 rounded-lg shadow-md w-full mb-3"> 
        
        <div className="flex flex-grow min-w-0 pr-4">
            <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-16 h-16 mr-3 rounded-lg flex-shrink-0 object-cover border border-stone-200" 
            />
            
            <div className="text-left">
                <p className="font-bold text-sm text-[#6b4226] line-clamp-1">{item.name}</p>
                <p className="text-xs text-stone-500 mt-1">{formatCurrency(item.price)} x {item.quantity}</p>
                <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">{item.description}</p>
            </div>
        </div>
        
        <div className="flex items-center space-x-4 pl-4 text-center text-xs flex-shrink-0">
            
            {/* Prix Total Item */}
            <div className="w-16">
                <p className="text-stone-500 font-medium uppercase text-[10px]">Total</p>
                <p className="font-medium text-[#6b4226] mt-0.5 text-sm">{formatCurrency(item.price * item.quantity)}</p>
            </div>

            {/* Actions (Sélectionner/Supprimer) */}
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
));

// --- Composant Résumé de la Commande (corrigé) ---
const OrderSummary = ({ summary, onCheckout, selectedItems, totalAmount, onApplyPromo, promoInput, setPromoInput, discount, promoError }) => {
    
    const isCheckoutDisabled = selectedItems.length === 0 || totalAmount <= 0;

    const handleCheckoutClick = () => {
        if (!isCheckoutDisabled) {
            onCheckout(selectedItems, totalAmount);
        }
    };
    
    // Pour l'affichage des économies
    const currentSummary = {
        ...summary,
        'Économies': discount, 
        'Total': summary['Total'],
    };

    return (
        <div className="bg-white p-6 space-y-4 text-sm font-light shadow-xl shadow-stone-200 rounded-lg">
            <h3 className="text-lg font-bold text-[#6b4226] border-b pb-2 mb-4">RÉSUMÉ DE LA COMMANDE</h3>

            {/* Détails du Résumé */}
            {Object.entries(currentSummary).map(([key, value]) => {
                const isTotal = key === 'Total';
                const isSavings = key === 'Économies'; 
                
                if (isSavings && value <= 0) return null;

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
                        {isSavings ? `- ${formatCurrency(value)}` : formatCurrency(value)}
                        </span>
                    </div>
                );
            })}

            {/* Bouton Passer à la Caisse */}
            <button 
                onClick={handleCheckoutClick}
                disabled={isCheckoutDisabled}
                className={`w-full font-medium py-3 rounded-md transition duration-200 mt-4 shadow-md shadow-stone-300 ${
                    isCheckoutDisabled
                    ? 'bg-stone-400 text-stone-100 cursor-not-allowed'
                    : 'bg-[#8b5e3c] hover:bg-[#6b4226] text-white'
                }`}
            >
                PASSER À LA CAISSE ({selectedItems.length} Articles)
            </button>
            {isCheckoutDisabled && (
                 <p className="text-xs text-center text-red-500">Veuillez sélectionner au moins un article pour payer.</p>
            )}

            {/* Code Promo (corrigé) */}
            <div className="pt-4 border-t border-stone-300">
                <p className="text-stone-600 mb-2">Avez-vous un code promo ?</p>
                <div className="flex space-x-2">
                <input 
                    type="text" 
                    placeholder="Entrez le code" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    className="flex-grow bg-[#fffaf5] text-[#6b4226] border border-[#d4bfa4] rounded-md py-2 px-3 focus:ring-[#8b5e3c] focus:border-[#8b5e3c] uppercase" 
                />
                <button 
                    onClick={onApplyPromo}
                    className="bg-[#d4bfa4] hover:bg-[#a27c56] text-stone-800 font-medium px-4 rounded-md transition duration-200 text-sm shadow-sm"
                >
                    {discount > 0 ? 'Changer' : 'Appliquer'}
                </button>
                </div>
                 {discount > 0 && (
                    <p className="text-xs text-green-600 mt-2 font-medium">✅ Code **{promoInput}** appliqué. Économies : {formatCurrency(discount)}.</p>
                )}
                 {promoError && (
                    <p className="text-xs text-red-500 mt-2 font-medium">❌ {promoError}</p>
                )}
            </div>
        </div>
    );
};


// --- Composant Principal du Panier (CORRIGÉ) ---
export const PanierComponent = ({ 
    onCheckout = (items, total) => {
        return(
            { items, total }
            
        )
    }
}) => {
    const [items, setItems] = useState(INITIAL_CART_ITEMS);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState(false);
    const [promoInput, setPromoInput] = useState('');
    const [discount, setDiscount] = useState(0); 
    const [promoError, setPromoError] = useState(null); // NOUVEL ÉTAT POUR L'ERREUR

    // Réinitialiser la promo lors des changements importants
    const resetPromo = () => {
        setDiscount(0);
        setPromoInput('');
        setPromoError(null);
    };

    // --- LOGIQUE DU PANIER ---
    const handleRemove = (idToRemove) => {
        setItems(items.filter(item => item.id !== idToRemove));
        resetPromo(); 
    };

    const handleSelect = (idToSelect) => {
        setItems(
            items.map(item =>
                item.id === idToSelect ? { ...item, isSelected: !item.isSelected } : item
            )
        );
        resetPromo(); 
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterActive ? item.rating > 3 : true; 
        return matchesSearch && matchesFilter;
    });

    const selectedItems = items.filter(item => item.isSelected);
    
    // Calcul dynamique du total (useMemo sans effet secondaire)
    const { subTotal, deliveryFee, taxes, totalAmount, cartSummary } = useMemo(() => {
        const currentSubTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const currentDeliveryFee = selectedItems.length > 0 ? 99 : 0; 
        const currentTaxes = currentSubTotal > 0 ? currentSubTotal * 0.02 : 0; 
        
        // Le calcul applique directement l'état `discount` qui est contrôlé par `handleApplyPromo`
        let finalDeliveryFee = currentDeliveryFee;
        let effectiveDiscount = discount;

        // Si le code FREE99 a été appliqué, ajuster la valeur de la livraison dans le résumé
        if (promoInput === 'FREE99' && effectiveDiscount === currentDeliveryFee) {
             finalDeliveryFee = 0;
        }

        let currentTotal = currentSubTotal + finalDeliveryFee + currentTaxes - effectiveDiscount;
        currentTotal = Math.max(0, currentTotal); 

        const summary = {
            'Sous-total': currentSubTotal,
            'Frais de livraison': finalDeliveryFee, // Peut être 0 si la promo est appliquée
            'Taxes': currentTaxes,
            'Total': currentTotal,
        };

        return { 
            subTotal: currentSubTotal, 
            deliveryFee: finalDeliveryFee, 
            taxes: currentTaxes, 
            totalAmount: currentTotal, 
            cartSummary: summary 
        };
    }, [selectedItems, discount, promoInput]); 

    // Logique de validation et d'application du code promo (HORS useMemo)
    const handleApplyPromo = () => {
        setPromoError(null);
        const code = promoInput.toUpperCase();
        const promoValue = PROMO_CODES[code];
        
        let newDiscount = 0;

        if (promoValue) {
            if (code === 'REDUC10') {
                 newDiscount = Math.round(subTotal * promoValue);
            } else if (code === 'FREE99') {
                 newDiscount = deliveryFee; // Réduction égale aux frais de livraison
            } else {
                 newDiscount = 0;
            }
            
            if (newDiscount > 0) {
                 setDiscount(newDiscount);
                 setPromoInput(code); // S'assurer que le code est bien enregistré
                 return;
            }
        }
        
        // Si le code n'est pas reconnu ou que la réduction est de 0
        setDiscount(0);
        setPromoError(`Code promo '${code}' non valide ou aucun article sélectionné.`);
    };
    // --- FIN LOGIQUE DU PANIER ---

    return (
        <div className="min-h-screen bg-[#fdf6ec] text-stone-800 p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    
                    <div className="flex-grow lg:w-3/5 bg-white p-4 sm:p-6 rounded-lg shadow-lg shadow-stone-200">
                        
                        {/* Barre de recherche et filtres */}
                        <div className="pb-4 border-b border-stone-200 mb-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-[#6b4226]">PANIER ({filteredItems.length})</h2>
                                <div className="flex items-center space-x-3 text-stone-500">
                                    <FiFilter 
                                        className={`w-5 h-5 cursor-pointer transition-colors ${filterActive ? 'text-blue-500' : 'text-[#6b4226]'}`}
                                        onClick={() => setFilterActive(!filterActive)}
                                        title={filterActive ? "Désactiver le filtre" : "Activer le filtre"}
                                    /> 
                                    <div className="relative">
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
                                <a href='/produit' className="px-4 py-2 text-xs font-semibold text-white bg-[#8b5e3c] rounded-md shadow hover:bg-[#6b4226] transition duration-150">
                                    AJOUTER UN PANIER
                                </a>
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
                        {/* Composant de Résumé de la commande */}
                        <OrderSummary 
                            summary={cartSummary} 
                            onCheckout={onCheckout}
                            selectedItems={selectedItems}
                            totalAmount={totalAmount}
                            onApplyPromo={handleApplyPromo}
                            promoInput={promoInput}
                            setPromoInput={setPromoInput}
                            discount={discount}
                            promoError={promoError}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanierComponent;