"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getLangFromPath(pathname: string): string {
  const segment = pathname.split("/")[1];
  const match = languages.find((l) => l.code === segment);
  return match ? match.code : "en";
}

function getGoogTransCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("googtrans="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function clearCookies() {
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  const h = window.location.hostname;
  document.cookie = `googtrans=; ${expiry}; path=/`;
  document.cookie = `googtrans=; ${expiry}; path=/; domain=${h}`;
  document.cookie = `googtrans=; ${expiry}; path=/; domain=.${h}`;
}

function setLangCookie(lang: string) {
  clearCookies();
  if (lang === "en") return;
  const h = window.location.hostname;
  document.cookie = `googtrans=/en/${lang}; path=/`;
  document.cookie = `googtrans=/en/${lang}; path=/; domain=${h}`;
  document.cookie = `googtrans=/en/${lang}; path=/; domain=.${h}`;
}

/**
 * Returns true if the googtrans cookie is pointing to a non-English language.
 * "/en/fr", "/en/de", "/en/zh-CN" → true
 * missing, "/en/en", "/en"         → false
 */
function isTranslationActive(): boolean {
  const cookie = getGoogTransCookie();
  if (!cookie) return false;
  const parts = cookie.split("/"); // ["", "en", "fr"]
  const target = parts[2];
  return !!target && target !== "en";
}

/**
 * Drives the hidden Google Translate <select> to `lang`.
 * Returns a cancel function. Calls `onFail` if widget never mounts in 3 s.
 */
// function driveGoogleTranslate(lang: string, onFail?: () => void): () => void {
//   let triggered = false;

//   const interval = setInterval(() => {
//     const select = document.querySelector(
//       ".goog-te-combo",
//     ) as HTMLSelectElement | null;
//     if (select) {
//       select.value = lang;
//       select.dispatchEvent(new Event("change"));
//       triggered = true;
//       clearInterval(interval);
//     }
//   }, 100);

//   const timeout = setTimeout(() => {
//     clearInterval(interval);
//     if (!triggered) onFail?.();
//   }, 3000);

//   return () => {
//     clearInterval(interval);
//     clearTimeout(timeout);
//   };
// }

// ─── Component ────────────────────────────────────────────────────────────────
function driveGoogleTranslate(lang: string, onFail?: () => void): () => void {
  let attempts = 0;
  let triggered = false;

  const interval = setInterval(() => {
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;

    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
      triggered = true;
      clearInterval(interval);
    }

    attempts++;
    if (attempts > 30) {
      clearInterval(interval);
      if (!triggered) onFail?.();
    }
  }, 100);

  return () => clearInterval(interval);
}

export function AutoTranslate() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlLang = getLangFromPath(pathname);
  // const queryLang = searchParams.get("lang");

  const lang = urlLang;

  useEffect(() => {
    if (!lang) return;

    const autoChangeLanguage = () => {
      const select = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement | null;

      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));

        console.log("language changed auto", lang);

        const li = document.querySelector(
          `.translate-menu li[data-lang="${lang}"]`,
        ) as HTMLElement | null;

        if (li) {
          console.log("flag change to", li);
          li.click();
        }
      } else {
        setTimeout(autoChangeLanguage, 500);
      }
    };

    // same as window load + delay
    const timer = setTimeout(() => {
      autoChangeLanguage();
    }, 2000);

    return () => clearTimeout(timer);
  }, [lang]);

  return null;
}
export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // "en" for /about, /contact, /services …
  // "fr" for /fr/about, "de" for /de/contact, etc.
  const urlLang = getLangFromPath(pathname);

  const [displayLang, setDisplayLang] = useState<string>(urlLang);
  const cancelPoll = useRef<(() => void) | null>(null);

  // Keep flag in sync when the user navigates via Next.js router

  useEffect(() => {
    const cookie = getGoogTransCookie();

    if (cookie) {
      const parts = cookie.split("/"); // "", "en", "it"
      const langFromCookie = parts[2];

      if (langFromCookie && langFromCookie !== "en") {
        setDisplayLang(langFromCookie);
        return;
      }
    }

    // fallback to URL
    setDisplayLang(urlLang);
  }, [urlLang]);

  // ── Core sync: align Google Translate with the URL language ───────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ ENGLISH route  →  /about, /contact, /services, etc.
    if (urlLang === "en") {
      if (isTranslationActive()) {
        // A stale translation cookie is still set — clear it and reload ONCE
        clearCookies();

        if (!sessionStorage.getItem("langReloadEn")) {
          sessionStorage.setItem("langReloadEn", "1");
          // window.location.reload();
        }
      } else {
        // Cookie is already clean — remove the one-shot reload guard
        sessionStorage.removeItem("langReloadEn");
      }
      return; // nothing more to do for English pages
    }

    // ✅ TRANSLATED route  →  /fr/about, /de/contact, etc.
    sessionStorage.removeItem("langReloadEn");
    setLangCookie(urlLang);

    const cancel = driveGoogleTranslate(urlLang, () => {
      // Widget never mounted — reload so the cookie is picked up natively
      // window.location.reload();
    });

    return cancel; // cleanup if urlLang changes before poll resolves
  }, [urlLang]);

  // ── Init Google Translate widget (runs once on mount) ─────────────────────
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

  function handleSelectLanguage(lang: string) {
    setOpen(false);

    if (lang === displayLang) return;

    setDisplayLang(lang);

    // cancel previous polling
    cancelPoll.current?.();

    // if (lang === "en") {
    //   clearCookies();
    //   sessionStorage.removeItem("langReloadEn");
    //   // window.location.reload();
    //   return;
    // }

    setLangCookie(lang);

    // 🔥 IMPORTANT FIX
    cancelPoll.current = driveGoogleTranslate(lang, () => {
      // window.location.reload();
    });
  }
  const currentFlag =
    languages.find((l) => l.code === displayLang)?.flag ??
    "/assets/flags/usa.png";

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="overflow-hidden border border-white/20"
          aria-label="Select language"
        >
          <Image
            src={currentFlag}
            alt={displayLang}
            width={30}
            height={40}
            className="object-cover"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 bg-[#00000050] rounded-2xl shadow-xl p-2 space-y-0.5 w-14 z-50">
            {languages
              .filter((lang) => lang.code !== displayLang)
              .map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className="w-10 h-10 overflow-hidden hover:scale-110 transition"
                  aria-label={`Switch to ${lang.code}`}
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

      <div id="google_translate_element" className="hidden" />

      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
