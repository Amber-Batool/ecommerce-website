// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token"); // ✅ get the token

    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const orderData = {
      ...form,
      items: cartItems,
      total: total,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Bearer format
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        navigate(`/order-success/${data.id}`); // ✅ real order ID
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">

      {/* Checkout Form */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
              placeholder="123 Street, City, Country"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="+1 234 567 890"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Credit / Debit Card</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-medium"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md h-fit space-y-5">
        <h2 className="font-semibold text-xl border-b pb-2">Order Summary</h2>
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>${Number(item.price) * item.quantity}</span>
          </div>
        ))}
        <div className="border-t pt-3 font-semibold flex justify-between">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
}