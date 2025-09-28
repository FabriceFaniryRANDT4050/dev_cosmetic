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
import PanierComponent from './pages/Pannier'; 
import Catalogue from './pages/Catalogue'; 
import LoginPage from './pages/Login'; 
import SignInPage from './pages/Signin'; 

// 3. Importer les outils de routage
import { Routes, Route } from "react-router-dom";
import Error from './components/Error';

// Layout pour les pages normales
function Layout({ children }) {
  return (
    <>
      <Headers />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Routes avec Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/a-propos"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/blog"
        element={
          <Layout>
            <Blog />
          </Layout>
        }
      />
      <Route
        path="/produit"
        element={
          <Layout>
            <Produit />
          </Layout>
        }
      />
      <Route
        path="/catalogue"
        element={
          <Layout>
            <Catalogue />
          </Layout>
        }
      />
      <Route
        path="/panier"
        element={
          <Layout>
            <PanierComponent />
          </Layout>
        }
      />

      {/* Routes spéciales sans Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/error" element={<Error />} />

      {/* Route fallback (URL inexistantes) */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
