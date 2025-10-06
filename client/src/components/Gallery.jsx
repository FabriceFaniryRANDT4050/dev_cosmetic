import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Heart, Eye, Search } from "lucide-react";
import api from "../API/url";
import { toast } from "react-toastify";

// Categories disponibles
const categories = [
  { id: "all", name: "Tous les produits" },
  { id: "Visage", name: "Soins du visage" },
  { id: "Cheveux", name: "Soins des cheveux" },
  { id: "Corps", name: "Soins du corps" },
  { id: "Parfum", name: "Parfums" }
];

// Tri disponible
const sortOptions = [
  { id: "price-asc", name: "Prix croissant" },
  { id: "price-desc", name: "Prix décroissant" },
  { id: "name-asc", name: "Nom A-Z" },
  { id: "name-desc", name: "Nom Z-A" }
];

// Carte produit
function ProductCard({ product }) {
  const handleAddToCart = () => {
    // TODO: Implémenter l'ajout au panier
    toast.success("Produit ajouté au panier");
  };

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm h-[420px] flex flex-col justify-between hover:shadow-lg transition">
      {/* Icônes favoris et voir */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button className="p-2 bg-white rounded-full shadow hover:bg-orange-100 transition">
          <Heart size={18} className="text-[#5C4033]" />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-orange-100 transition">
          <Eye size={18} className="text-[#5C4033]" />
        </button>
      </div>

      {/* Image */}
      <div className="h-44 w-full flex items-center justify-center">
        <img
          className="h-full object-contain rounded-2xl"
          src={product.image}
          alt={product.nom}
        />
      </div>

      {/* Infos */}
      <div className="pt-4 flex flex-col flex-1 justify-between">
        <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-[#5C4033]">
          {product.type}
        </span>

        <h3 className="mt-2 text-lg font-semibold text-[#5C4033] hover:underline line-clamp-2">
          {product.nom}
        </h3>

        <div className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.definition}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold text-[#5C4033]">
            {product.prix} Ar
          </p>
          <button 
            onClick={handleAddToCart}
            className="rounded-lg bg-[#5C4033] px-5 py-2 text-sm font-medium text-white hover:bg-[#7B4B3A]"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant principal Gallery
export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  
  // Charger les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/produits");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des produits");
        setLoading(false);
        toast.error("Impossible de charger les produits");
      }
    };

    fetchProducts();
  }, []);

  // Filtrer et trier les produits
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Filtrage par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.type === selectedCategory);
    }

    // Filtrage par recherche
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.nom.toLowerCase().includes(searchLower) ||
        p.definition.toLowerCase().includes(searchLower)
      );
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.prix - b.prix;
        case "price-desc":
          return b.prix - a.prix;
        case "name-asc":
          return a.nom.localeCompare(b.nom);
        case "name-desc":
          return b.nom.localeCompare(a.nom);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Paramètres carrousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5C4033]"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <section className="bg-gray-50 p-10 py-8 pt-20">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Filtres et recherche */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-[#5C4033]">
            Nos Produits
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5C4033]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5C4033]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Affichage des résultats */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun produit ne correspond à votre recherche
          </div>
        ) : (
          <div className="grid gap-6">
            {/* Grouper par catégorie */}
            {categories.slice(1).map(category => {
              const categoryProducts = filteredProducts.filter(p => p.type === category.id);
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category.id} className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#5C4033] mt-8">
                    {category.name}
                  </h3>
                  <div className="rounded-lg border bg-white p-4 shadow-md">
                    <Slider {...settings} className="m-5">
                      {categoryProducts.map((product) => (
                        <div key={product.id} className="px-2">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
