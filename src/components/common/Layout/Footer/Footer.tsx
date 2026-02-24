// Footer.tsx

import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

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
            <Link
              href="https://play.google.com/store/apps/details?id=com.vtcParis"
              target="_blank"
            >
              <Image
                src="/assets/images/google-play-store.png"
                alt="Google Play"
                width={130}
                height={45}
                className="transition-transform duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
            <Link
              href="https://portail.driverconnect.fr/vtc-fils/template?act=storeIos&site=00001_3987058_-1157023572_1730893992059&app=CL&soc=Chauffeur_priv"
              target="_blank"
            >
              <Image
                src="/assets/images/app-store-1.png"
                alt="App Store"
                width={130}
                height={45}
                className="transition-transform duration-300 hover:scale-105 cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-5">
            {[
              { src: "/assets/images/visa.svg", alt: "VISA" },
              { src: "/assets/images/mastercard.svg", alt: "MasterCard" },
              { src: "/assets/images/amex.svg", alt: "AMEX" },
            ].map((card, index) => (
              <div
                key={index}
                className="flex items-center justify-center 
                 w-14 h-10 
                 bg-white 
                 rounded-md 
                 shadow-sm 
                 border border-gray-200
                 transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={32}
                  height={18}
                  className="object-contain"
                />
              </div>
            ))}
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
