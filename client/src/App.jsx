// src/App.jsx

import './App.css';

// 1. Importer les composants du layout
import Headers from './components/Headers';
import Footer from './components/Footer';

// 2. Importer les pages
import Home from './pages/Home';
import About from './pages/About'; 
import Contact from './pages/Contact'; 
import Blog from './pages/Blog'; 
import Produit from './pages/Produit'; 
import LoginPage from './pages/Login'; 
import SignInPage from './pages/Signin'; 

// 3. Importer les outils de routage
import { Routes, Route } from "react-router-dom";
import Error from './components/Error';

function App() {
  return (
    <>
      <Headers />
      <main>
        {/* Le contenu de la page changera ici */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/a-propos' element={<About />} /> 
          <Route path='/contact' element={<Contact />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/produit' element={<Produit />} />
          <Route path='/error' element={<Error />} />
          <Route path='/compte' element={<Error />} />
          <Route path='/creer' element={<SignInPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;