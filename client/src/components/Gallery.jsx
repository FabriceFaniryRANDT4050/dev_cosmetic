import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Heart, Eye } from "lucide-react"; // icônes
import api from "../API/url";

// Carte produit
function ProductCard({ product }) {
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
          src={product.image || "/image/heros.jpg"}
          alt={product.name}
        />
      </div>

      {/* Infos */}
      <div className="pt-4 flex flex-col flex-1 justify-between">
        <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-[#5C4033]">
          {product.discount}
        </span>

        {/* Nom en chocolat */}
        <h3 className="mt-2 text-lg font-semibold text-[#5C4033] hover:underline line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.round(product.rating))}
          </div>
          <p className="text-sm font-medium text-orange-700">{product.rating}</p>
          <p className="text-sm text-gray-500">({product.reviews} avis)</p>
        </div>

        {/* Prix + bouton */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold text-[#5C4033]">
            {product.price} Ar
          </p>
          <a href={`/produit/${product.id}`} className="rounded-lg bg-[#5C4033] px-5 py-2 text-sm font-medium text-white hover:bg-[#7B4B3A]">
            Voir
          </a>
        </div>
      </div>
    </div>
  );
}

// Carrousel
export default function Gallery() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get('/api/produits');
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : [];
        // Normaliser les champs attendus par la carte
        const normalized = list.map((p) => ({
          id: p.id,
          name: p.nom || p.name || `Produit ${p.id}`,
          image: p.image || p.photo || "/image/heros.jpg",
          discount: p.remise || p.discount || "",
          rating: p.note || p.rating || 5,
          reviews: p.reviews || 0,
          price: p.prix || p.price || 0,
          category: p.categorie?.nom || p.category || "autres",
        }));
        setProducts(normalized);
      } catch (err) {
        setError(err?.response?.data || err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);





  // Filtrage pour produits cheveux
  const filteredProductsCheveux = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (p.category === "cheveux" || p.category === "soin" || filter === "all")
  );
  // Paramètres carrousel pour cheveux
  const settingsCheveux = {
    dots: true,
    infinite: filteredProductsCheveux.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: filteredProductsCheveux.length > 1,
          autoplay: true,
          autoplaySpeed: 3000
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: filteredProductsCheveux.length > 1,
          autoplay: true,
          autoplaySpeed: 3000
        }
      },
    ],
  };
  // Filtrage pour produits visage
  const filteredProductsVisage = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (p.category === "visage" || p.category === "soin" || filter === "all")
  );
  // Paramètres carrousel pour visage
  const settingsVisage = {
    dots: true,
    infinite: filteredProductsVisage.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: filteredProductsVisage.length > 1,
          autoplay: true,
          autoplaySpeed: 3000
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: filteredProductsVisage.length > 1,
          autoplay: true,
          autoplaySpeed: 3000
        }
      },
    ],
  };
  return (
    <section className="bg-gray-50 p-10 py-8 pt-20">
      <div className="mx-auto max-w-screen-xl px-4 ">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {error && (
            <p className="text-red-600 text-sm">Erreur chargement produits: {String(error)}</p>
          )}
          <h2 className="text-2xl font-bold text-[#5C4033]">
            Produits pour cheveux
          </h2>

          <div className="flex gap-3">
            <select
              className="border rounded px-2 py-1 text-[#5C4033]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="soin">Soins</option>
              <option value="cheveux">Cheveux</option>
              <option value="savon">Savons</option>
            </select>

            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="border rounded px-3 py-1 w-64 text-[#5C4033]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="text-left text-stone-800 mb-5 mt-5 pl-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo neque id nobis fugiat. Perspiciatis dignissimos eos officia atque hic, expedita quis? Nihil iusto ad placeat maiores odio architecto optio quidem?
          Cupiditate fugit vitae voluptatem numquam magni, sunt quis t
        </div>


        {/* Carrousel encadré pour produits cheveux */}
        <div className="rounded-lg border bg-white p-4 shadow-md">
          {loading ? (
            <div className="text-center py-10">Chargement des produits...</div>
          ) : filteredProductsCheveux.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Aucun produit pour cheveux trouvé</div>
          ) : filteredProductsCheveux.length === 1 ? (
            <div className="flex justify-center px-2">
              <ProductCard product={filteredProductsCheveux[0]} />
            </div>
          ) : (
            <Slider {...settingsCheveux} className="m-5">
              {filteredProductsCheveux.map((product) => (
                <div key={product.id} className="px-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          )}
        </div>

          <h2 className="text-2xl text-left font-bold text-[#5C4033] mt-20 mb-5">
            Produits pour visage
          </h2>
          <div className="text-left text-stone-800 mb-5 mt-5 pl-5">
          Découvrez notre gamme complète de produits pour prendre soin de votre visage. Des crèmes hydratantes aux masques purifiants, nous avons tout ce qu'il faut pour une peau éclatante.
        </div>
        
        {/* Carrousel encadré pour produits visage */}
        <div className="rounded-lg border bg-white p-4 shadow-md">
          {loading ? (
            <div className="text-center py-10">Chargement des produits...</div>
          ) : filteredProductsVisage.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Aucun produit pour visage trouvé</div>
          ) : filteredProductsVisage.length === 1 ? (
            <div className="flex justify-center px-2">
              <ProductCard product={filteredProductsVisage[0]} />
            </div>
          ) : (
            <Slider {...settingsVisage} className="m-5">
              {filteredProductsVisage.map((product) => (
                <div key={`visage-${product.id}`} className="px-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}
