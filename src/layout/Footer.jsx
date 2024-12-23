import { Button } from "@/components/ui/button";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-[80%] mx-auto ">
        {/* Üst Kısım */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2 ">
            Consulting Agency For Your Business
          </h2>
          <p className="text-sm mb-6">we care about your business </p>
          <Button>Get Started</Button>
        </div>

        {/* Link Grupları */}
        <div className="flex flex-col space-y-8">
          {/* Company Info */}
          <div className="">
            <h3 className="text-white font-semibold mb-3">Company Info</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Features */}
          <div className="flex flex-col ">
            <h3 className="text-white font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              <li>Business Marketing</li>
              <li>User Analytic</li>
              <li>Live Chat</li>
              <li>Unlimited Support</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>IOS & Android</li>
              <li>Watch a Demo</li>
              <li>Customers</li>
              <li>API</li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım - İletişim Bilgileri */}
        <div className="text-center mt-10 mb-8">
          <h3 className="text-white font-semibold mb-3">Get In Touch</h3>
          <div className="space-y-2">
            <p> 0 500 500 48 48</p>
            <p> Milas - Mugla, TR</p>
            <p> berk.karademir@hotmail.com</p>
          </div>
        </div>

        {/* Alt Kısım - Telif Hakkı ve Sosyal Medya */}
        <div className="text-center border-t border-gray-700 pt-6 flex flex-col items-center">
          <p className="text-sm mb-4 max-w-[70%]">Made with love by Beko with the contributions of Workintech</p>
          <p className="text-sm">BekoStore © 2024</p>
          <p className="text-sm mb-6">All Right Reserved </p>
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
