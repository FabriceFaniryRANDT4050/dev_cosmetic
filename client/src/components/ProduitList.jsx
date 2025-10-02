import axios from "axios";
import api from "../API/url";

export default function ProductList() {
    const products = [
      {
        id: 1,
        name: "Shampoing Naturel",
        category: "Cheveux",
        status: "Disponible",
        image: "public/vite.svg",
      },
      {
        id: 2,
        name: "Shampoing Naturel",
        category: "Cheveux",
        status: "Disponible",
        image: "public/vite.svg",
      },
      {
        id: 3,
        name: "Shampoing Naturel",
        category: "Cheveux",
        status: "Disponible",
        image: "public/vite.svg",
      },
      {
        id: 4,
        name: "Shampoing Naturel",
        category: "Cheveux",
        status: "Disponible",
        image: "public/vite.svg",
      },

    ];

// La fonction doit être ASYNCHRONE et utiliser un bloc try...catch pour gérer les erreurs
async function ApiTest() {
  try {
    // 1. Utiliser directement l'instance configurée `api.get`
    // 2. Utiliser `await` pour attendre la résolution de la promesse
    const response = await api.get('/categorie');
    
    // console.log("Données reçues :", response.data);


  } catch (error) {
    // Cela capturera l'erreur 404 de votre backend
    console.error("Erreur de l'API :", error.message);
    if (error.response) {
      console.error("Statut HTTP d'erreur:", error.response.status);
      console.error("Détails de l'erreur du serveur:", error.response.data);
    }
  }
}

ApiTest()

  
    return (
      <div className="min-h-screen bg-white text-white p-10 px-5 flex flex-col items-center">
        <div className="text-4xl text-stone-700 font-bold mb-8">Nos catégories du moment</div>
        <hr className="bg-stone-800 border-2 border-stone-500 w-80 flex justify-center mb-8"/>
        <p className=" text-stone-900 mb-5 w-100 lg:w-2xl">Lorem ipsum dolor sitssumenda similique nisi aliquid aspernatur cumque quisquam aut expedita inventore laudantium nam exercitationem omnis! Natus ipsum harum commodi nemo officia. Cum, dolores amet?</p>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-stone-900">
          {products.map((product) => (
            <div
              key={product.id}
              className=" rounded-xl shadow-lg p-6 flex flex-col items-start justify-end h-120"
              style={{
                backgroundImage:
                  "url(public/image/pexel.jpeg)",
                backgroundPosition:
                "center",
                backgroundSize:
                "cover"
              }}
            >
              {/* <img
                src='public\image\beauty.jpg'
                alt={product.name}
                className="w-30 h-30 object-cover rounded-full border-2 border-gray-700"
              /> */}
  
              <h3 className="text-4xl font-bold text-left m-0">{product.name}</h3>
              <div className="text-stone-900 m-0 p-0 text-3xl text-left">{product.category}</div>
  
  
              <div className="flex w-full mt-4 gap-1">
                <a href="/produit" className="flex-1 py-2 hover:bg-stone-900 bg-white rounded font-bold cursor-pointer hover:text-white">Détails</a>
                <a href="/panier" className="flex-1 py-2 hover:bg-white hover:text-stone-900 hover:font-bold hover:border-stone-900 hover:border-2 border-2 border-stone-900 cursor-pointer bg-stone-800 text-white rounded">Acheter</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  