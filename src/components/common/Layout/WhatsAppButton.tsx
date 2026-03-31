"use client";

import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_URL = "https://wa.me/message/JX7CONDYWN6VG1";

function resolveUrl(raw?: string | null): string {
  if (!raw?.trim()) return FALLBACK_URL;
  const trimmed = raw.trim();
  if (trimmed.startsWith("http")) return trimmed;
  return `https://wa.me/${trimmed.replace(/^\+/, "").replace(/\s+/g, "")}`;
}

export default function WhatsAppButton({ phone }: { phone?: string }) {
  const url = resolveUrl(phone);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "25px", // Adjusted for better thumb reach
        left: "30px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 🌊 Advanced Ripple System */}
      <AnimatePresence>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{
              scale: [1, 2.2],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "exhausting" ripple look
            }}
            style={{
              position: "absolute",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "rgba(37, 211, 102, 0.4)", // Glow instead of just a border
              border: "1px solid rgba(37, 211, 102, 0.2)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* 🟢 Main Floating Button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, rotate: -45 }}
        animate={{
          scale: 1,
          rotate: 0,
          y: [0, -12, 0],
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0 15px 30px rgba(37, 211, 102, 0.5)",
          filter: "brightness(1.1)",
        }}
        whileTap={{ scale: 0.92 }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: { type: "spring", stiffness: 400, damping: 15 },
          rotate: { type: "spring", stiffness: 200, damping: 10 },
        }}
        style={{
          position: "relative",
          zIndex: 5,
          // Subtle gradient for depth
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          borderRadius: "50%",
          width: "55px",
          height: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        {/* Animated Icon Container */}
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5, // Ring occasionally like a phone
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="28"
            height="28"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
        </motion.div>
      </motion.a>
    </div>
  );
}
