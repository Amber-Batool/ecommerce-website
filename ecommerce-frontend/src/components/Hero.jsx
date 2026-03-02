// src/components/Hero.jsx
import React from "react";
import heroImage from "../assets/hero.png"; // Image path

export default function Hero() {
  return (
   <div className="relative w-full rounded-lg" style={{ height: "500px" }}>


      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg md:text-2xl mb-6">Find the best products here!</p>
        <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}
