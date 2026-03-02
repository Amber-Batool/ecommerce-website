
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = async () => {
    const order = { items: cartItems, total, date: new Date() };

    // Save to backend
    await fetch("http://127.0.0.1:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });

    clearCart();
    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold mb-4">No items to checkout</h2>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* ...rest of JSX stays same */}
      <button onClick={placeOrder} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md">Place Order</button>
    </div>
  );
}