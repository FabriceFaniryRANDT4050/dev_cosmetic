// export default function ProductCard({
//   image = "/docs/images/products/apple-watch.png",
//   title = "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
//   rating = 5.0,
//   price = "$599",
//   onAddToCart = () => alert("Ajouté au panier")
// }) {
//   return (
//     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//       <a href="#" aria-hidden>
//         <img className="p-8 rounded-t-lg" src={image} alt="product image" />
//       </a>

//       <div className="px-5 pb-5">
//         <a href="#">
//           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
//         </a>

//         <div className="flex items-center mt-2.5 mb-5">
//           <div className="flex items-center space-x-1 rtl:space-x-reverse">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                 <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//               </svg>
//             ))}

//             <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//             </svg>

//           </div>

//           <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{rating.toFixed(1)}</span>
//         </div>

//         <div className="flex items-center justify-between">
//           <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}</span>
//           <button
//             onClick={onAddToCart}
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Add to cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';

// Données fictives pour les produits
const products = [
  {
    id: 1,
    name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    image: {
      light: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg',
      dark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg',
    },
    discount: 'Up to 35% off',
    rating: 5.0,
    reviews: 455,
    price: 1699,
    features: ['Fast Delivery', 'Best Price'],
  },
  {
    id: 2,
    name: 'Apple iPhone 15 Pro Max, 256GB, Blue Titanium',
    image: {
      light: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg',
      dark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg',
    },
    discount: 'Up to 15% off',
    rating: 4.9,
    reviews: 1233,
    price: 1199,
    features: ['Best Seller', 'Best Price'],
  },
  {
    id: 3,
    name: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
    image: {
      light: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg',
      dark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg',
    },
    discount: 'Up to 35% off',
    rating: 4.9,
    reviews: 879,
    price: 799,
    features: ['Shipping Today', 'Best Price'],
  },
  {
    id: 4,
    name: 'PlayStation 5 Gaming Console',
    image: {
      light: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg',
      dark: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg',
    },
    discount: 'Up to 10% off',
    rating: 4.8,
    reviews: 987,
    price: 499,
    features: ['Fast Delivery', 'Official Seller'],
  },
];

// Composant pour afficher les étoiles de notation
const StarRating = () => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg key={i} className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
      </svg>
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

// Composant pour une seule carte produit
export default function ProductCard ()  {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <a href="#">
          <img className="mx-auto h-full dark:hidden" src='' alt='' />
          <img className="mx-auto hidden h-full dark:block" src='' />
        </a>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
           discount
          </span>
          <div className="flex items-center justify-end gap-1">
            <button type="button" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Quick look </span>
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <button type="button" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Add to Favorites </span>
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
              </svg>
            </button>
          </div>
        </div>
        <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Name</a>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating='' />
          <p className="text-sm font-medium text-gray-900 dark:text-white">Rating</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">reviews</p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">Price</p>
          <button type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export function App() {
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* En-tête & Filtres */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">Products</a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">Electronics</span>
                  </div>
                </li>
              </ol>
            </nav>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Electronics</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button type="button" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
              <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
              </svg>
              Filters
              <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
              </svg>
            </button>
            <div className="relative">
              <button onClick={() => setSortDropdownOpen(!isSortDropdownOpen)} type="button" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                </svg>
                Sort
                <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute right-0 top-full z-50 mt-2 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 ${isSortDropdownOpen ? '' : 'hidden'}`}>
                <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  {['The most popular', 'Newest', 'Increasing price', 'Decreasing price', 'No. reviews', 'Discount %'].map((item) => (
                    <li key={item}>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"> {item} </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Grille de produits */}
        <div className="grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

