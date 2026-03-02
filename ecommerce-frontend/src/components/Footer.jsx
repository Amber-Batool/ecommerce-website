import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGooglePlay, FaAppStoreIos } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">

        {/* 1️⃣ Brand + Social */}
        <div className="flex-1 w-44">
          <h2 className="text-xl font-bold mb-2">BRAND</h2>
          <p className="text-gray-600 text-sm mb-2">
            Quality products & services for your needs.
          </p>
          <div className="flex space-x-3 text-gray-600">
            <a href="#" className="hover:text-blue-500 transition transform hover:scale-110"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-500 transition transform hover:scale-110"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-500 transition transform hover:scale-110"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-500 transition transform hover:scale-110"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* 2️⃣ Right Side Sections */}
        <div className="flex-1 flex flex-wrap justify-between gap-6 text-sm style={{ minWidth: '600px' }}">

          {/* About */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-base mb-1">About</span>
            <a href="#" className="hover:text-blue-500 transition text-sm">Company</a>
            <a href="#" className="hover:text-blue-500 transition text-sm">Team</a>
            <a href="#" className="hover:text-blue-500 transition text-sm">Careers</a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-base mb-1">Navigation</span>
            <a href="#" className="hover:text-blue-500 transition text-sm">Home</a>
            <a href="#" className="hover:text-blue-500 transition text-sm">Shop</a>
            <a href="#" className="hover:text-blue-500 transition text-sm">Contact</a>
            <a href="#" className="hover:text-blue-500 transition text-sm">FAQ</a>
          </div>

          {/* Partnerships */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-base mb-1">Partnerships</span>
            <a href="#" className="hover:text-blue-500 transition text-sm">Become a Partner</a>
            <a href="#" className="hover:text-blue-500 transition text-sm">Affiliate</a>
            <a href="#" className="hover:text-blue-500 transition text-sm">Suppliers</a>
          </div>

          {/* Get App + For Users (Same Row) */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-6 items-start">
              {/* For Users */}
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-base">For Users</span>
                <a href="#" className="hover:text-blue-500 transition text-sm">My Account</a>
                <a href="#" className="hover:text-blue-500 transition text-sm">Orders</a>
                <a href="#" className="hover:text-blue-500 transition text-sm">Wishlist</a>
              </div>

            </div>
          </div>

        </div>
     
              {/* Get the App */}
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-base">Get the App</span>
                <div className="flex gap-2 mt-1">
                  <a href="#" className="flex items-center px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-sm">
                    <FaGooglePlay className="mr-1" /> Play
                  </a>
                  <a href="#" className="flex items-center px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-sm">
                    <FaAppStoreIos className="mr-1" /> App
                  </a>
                </div>
              </div>
 </div>


      {/* COPYRIGHT */}
      <div className="mt-6 border-t border-gray-200 pt-3 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} YourLogo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
