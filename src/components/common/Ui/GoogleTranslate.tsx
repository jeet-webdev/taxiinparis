"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay?: boolean },
          elementId: string,
        ) => void;
      };
    };
  }
}

const languages = [
  { code: "en", flag: "/assets/flags/usa.png" },
  { code: "fr", flag: "/assets/flags/france.png" },
  { code: "de", flag: "/assets/flags/Deutsch.png" },
  { code: "es", flag: "/assets/flags/Español.png" },
  { code: "pt", flag: "/assets/flags/Português.png" },
  { code: "it", flag: "/assets/flags/Italiano.png" },
  { code: "pl", flag: "/assets/flags/Polski.png" },
  { code: "zh-CN", flag: "/assets/flags/cn.png" },
  { code: "ja", flag: "/assets/flags/japan.png" },
  { code: "ar", flag: "/assets/flags/saudi-arabia.png" },
];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    window.googleTranslateElementInit = function () {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element",
        );
      }
    };
  }, []);

  const setLanguage = (lang: string, flag: string) => {
    const interval = setInterval(() => {
      const select = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 100);

    setCurrentLang(lang);
    setOpen(false);
  };

  return (
    <>
      <div className="relative">
        {/* Main Flag Button */}
        <button
          onClick={() => setOpen(!open)}
          className=" overflow-hidden border border-white/20"
        >
          <Image
            src={
              languages.find((l) => l.code === currentLang)?.flag ||
              "/assets/flags/usa.png"
            }
            alt="language"
            width={30}
            height={40}
            className="object-cover"
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 bg-[#00000050] rounded-2xl shadow-xl p-2 space-y-0.5 w-14">
            {languages
              .filter((lang) => lang.code !== currentLang)
              .map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code, lang.flag)}
                  className="w-10 h-10 overflow-hidden hover:scale-110 transition"
                >
                  <Image
                    src={lang.flag}
                    alt={lang.code}
                    width={30}
                    height={40}
                    className="object-cover mx-auto"
                  />
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Hidden Google Translate */}
      <div id="google_translate_element" className="hidden" />

      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
