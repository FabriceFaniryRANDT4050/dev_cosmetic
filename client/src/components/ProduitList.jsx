export default function ProductGrid() {
    const products = [
      {
        id: 1,
        name: "Shampoing Naturel",
        category: "Cheveux",
        price: "12.000 Ar",
        status: "Disponible",
        image: "public\vite.svg",
      },
      {
        id: 2,
        name: "Crème Visage",
        category: "Visage",
        price: "18.500 Ar",
        status: "Promo",
        image: "public\vite.svg",
      },
      {
        id: 3,
        name: "Huile Essentielle",
        category: "Soins",
        price: "25.000 Ar",
        status: "Disponible",
        image: "public\vite.svg",
      },
    ];
  
    return (
      <div className="min-h-screen bg-white text-white p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src='public\image\MonLogo.png'
                alt={product.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-gray-700"
              />
  
              <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
              <p className="text-gray-400">{product.category}</p>
              <p className="mt-2 font-semibold text-[#d6a86b]">{product.price}</p>
  
              <span className="mt-2 px-3 py-1 text-sm bg-green-600 rounded-full">
                {product.status}
              </span>
  
              <div className="flex w-full mt-4 divide-x divide-gray-700 border-t border-gray-700">
                <button className="flex-1 py-2 hover:bg-gray-700">Détails</button>
                <button className="flex-1 py-2 hover:bg-[#d6a86b] hover:text-black">
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  