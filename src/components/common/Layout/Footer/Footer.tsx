// Footer.tsx

import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F1A] text-gray-300 pt-14 pb-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Logo + Social */}
        <div>
          <h2 className="text-xl font-bold text-[#D4AF6A]">TAXI IN PARIS</h2>
          <p className="text-sm mt-2 text-gray-400">Premium Transfer Service</p>

          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Instagram, YouTube].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:border-[#D4AF6A] hover:text-[#D4AF6A] transition"
              >
                <Icon fontSize="small" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#D4AF6A] cursor-pointer">About</li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">Services</li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">
              Taxi in Paris
            </li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">Blog</li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#D4AF6A] cursor-pointer">
              Airport Transfers
            </li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">
              Private Tours
            </li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">Hourly Hire</li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">
              Corporate Travel
            </li>
            <li className="hover:text-[#D4AF6A] cursor-pointer">City Rides</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4">Reach Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>info@taxiinparis.com</li>
            <li>+33 1 45 66 88 12</li>
          </ul>
        </div>

        {/* Payment + Apps */}
        <div>
          <h3 className="text-[#D4AF6A] font-semibold mb-4">Make Payment</h3>

          <div className="flex flex-col gap-0.2">
            <Image
              src="/assets/images/google-play-store.png"
              alt="Google Play"
              width={130}
              height={45}
              className="transition-transform duration-300 hover:scale-105 cursor-pointer"
            />

            <Image
              src="/assets/images/app-store-1.png"
              alt="App Store"
               width={130}
              height={45}
              className="transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          </div>

          <div className="flex gap-3 mt-5 text-xs">
            <div className="bg-white text-black px-3 py-1 rounded">VISA</div>
            <div className="bg-yellow-500 text-black px-3 py-1 rounded">MC</div>
            <div className="bg-gray-200 text-black px-3 py-1 rounded">AMEX</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-white/10 pt-5 text-center text-sm text-gray-500">
        © 2026 Taxi in Paris. All Rights Reserved | Terms of Use | Privacy
        Policy
      </div>
    </footer>
  );
}
