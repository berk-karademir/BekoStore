import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 ">
      <div className="max-w-md mx-auto ">
        {/* Üst Kısım */}
        <div className="text-center mb-10 ">
          <h2 className="text-2xl font-bold text-white mb-2">
            Consulting Agency For Your Business
          </h2>
          <p className="text-sm mb-6">falan filan tarzı bişeyler bişeyler </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full">
            Contact Us
          </button>
        </div>

        {/* Link Grupları */}
        <div className="flex flex-col justify-center">
          {/* Company Info */}

          <h3 className="text-white font-semibold mb-3">Company Info</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>

          {/* Legal */}

          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </ul>

          {/* Features */}

          <h3 className="text-white font-semibold mb-3">Features</h3>
          <ul className="space-y-2">
            <li>Business Marketing</li>
            <li>User Analytic</li>
            <li>Live Chat</li>
            <li>Unlimited Support</li>
          </ul>

          {/* Resources */}

          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>IOS & Android</li>
            <li>Watch a Demo</li>
            <li>Customers</li>
            <li>API</li>
          </ul>
        </div>

        {/* Alt Kısım - İletişim Bilgileri */}
        <div className="text-center mt-10 mb-8">
          <h3 className="text-white font-semibold mb-3">Get In Touch</h3>
          <div className="space-y-2">
            <p>📞 0 500 500 48 48</p>
            <p>📍 Milas - Mugla, TR</p>
            <p>✉️ berk.karademir@hotmail.com</p>
          </div>
        </div>

        {/* Alt Kısım - Telif Hakkı ve Sosyal Medya */}
        <div className="text-center border-t border-gray-700 pt-6">
          <p className="text-sm mb-4">Made With Love By Beko</p>
          <p className="text-sm mb-6">All Right Reserved</p>
          {/* Sosyal Medya İkonları */}
          <div className="flex justify-center space-x-4">
            <a href="#">
                <img src="/images/facebook.png" alt="Facebook" />
            </a>
            <a href="#">
                <img src="/images/x.png" alt="Twitter" />
            </a>
            <a href="#">
                <img src="/images/instagram.png" alt="Instagram" />
            </a>
            <a href="#">
                <img src="/images/youtube.png" alt="youtube" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
