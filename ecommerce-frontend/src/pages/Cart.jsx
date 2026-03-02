import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  // Calculate total
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  const handleIncrease = async (id) => {
    increaseQty(id);
    try {
      await fetch(`http://127.0.0.1:5000/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: cartItems.find(i => i._id === id).quantity + 1 }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async (id) => {
    const item = cartItems.find(i => i._id === id);
    if (!item) return;
    const newQty = item.quantity - 1;

    if (newQty <= 0) {
      removeFromCart(id);
      try {
        await fetch(`http://127.0.0.1:5000/cart/${id}`, { method: "DELETE" });
      } catch (err) { console.error(err); }
    } else {
      decreaseQty(id);
      try {
        await fetch(`http://127.0.0.1:5000/cart/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQty }),
        });
      } catch (err) { console.error(err); }
    }
  };

  const handleRemove = async (id) => {
    removeFromCart(id);
    try {
      await fetch(`http://127.0.0.1:5000/cart/${id}`, { method: "DELETE" });
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">

      {/* Cart Items */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-5">
        {cartItems.length === 0 && (
          <p className="text-gray-500 text-center py-10">Your cart is empty</p>
        )}

        {cartItems.map(item => (
          <div
            key={item._id}
            className="flex justify-between items-center pb-4 gap-4 bg-white rounded-lg shadow-sm p-3"
          >
            <div className="flex gap-4 items-center">
              <img
                src={`http://127.0.0.1:5000/images/${item.image}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  ${Number(item.price).toFixed(2)} × {item.quantity}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleDecrease(item._id)}
                    className="px-2 py-1 rounded hover:bg-gray-100 border"
                  >
                    −
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item._id)}
                    className="px-2 py-1 rounded hover:bg-gray-100 border"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-orange-600 font-bold text-lg">
                ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item._id)}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md h-fit space-y-4">
        <h2 className="font-semibold text-lg text-gray-800 pb-2">Order Summary</h2>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-3">
          <span>Total</span>
          <span className="text-orange-600">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 bg-green-600 hover:bg-green-700 transition text-white w-full py-2.5 rounded-md font-medium"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}