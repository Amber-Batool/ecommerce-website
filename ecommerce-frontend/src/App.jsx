
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          {/* <Route path="/order-success" element={<OrderSuccess />} /> */}
              {/* 🔥 Add this route for order success */}
        <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
                   <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
              
    <Route path="/admin" element={<AdminPanel />} />




<Route 
  path="/admin" 
  element={
    <ProtectedRoute role="admin">
      <AdminPanel />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/" 
  element={
    <ProtectedRoute role="user">
      <Home />
    </ProtectedRoute>
  } 
/>

        </Routes>
      </div>
            <ToastContainer 
  position="bottom-right"
  autoClose={2500}         // 2.5 seconds
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"   
      />
      <Footer />
    </div>
  );
}
