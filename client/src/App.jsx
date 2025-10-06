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
import PanierComponent from './pages/Panier'; 
import Catalogue from './pages/Catalogue'; 
import LoginPage from './pages/Login'; 
import SignInPage from './pages/Signin'; 

// 3. Importer les outils de routage
import { Routes, Route } from "react-router-dom";
import Error from './components/Error';
import DetailProduit from './components/DetailProduit';
import Faq from './components/Faq';
import MvolaPaymentForm from './pages/Paiement';
import PaiementList from './components/test';
import Auth from './API/auth/LoginAuth';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';


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
    <AuthProvider>
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
          <PrivateRoute>
            <Layout>
              <PanierComponent />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/details-produit"
        element={
          <Layout>
            <DetailProduit />
          </Layout>
        }
      />
      <Route
        path="/faq"
        element={
          <Layout>
            <Faq />
          </Layout>
        }
      />

      {/* Routes protégées */}
      <Route
        path="/favoris"
        element={
          <PrivateRoute>
            <Layout>
              <PanierComponent />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Routes spéciales sans Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/paiement" element={<MvolaPaymentForm />} />
      <Route path="/signup" element={<SignInPage />} />
      <Route path="/error" element={<Error />} />
      <Route path="/Auth" element={<Auth />} />
      {/* <Route path="test" element={<PaiementList />} /> */}

      {/* Route fallback (URL inexistantes) */}
      <Route path="*" element={<PaiementList />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
