import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Maintenance | Paris Black Car",
  description: "Site under maintenance",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0b0b0b",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, Arial, sans-serif",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "520px",
            width: "100%",
            textAlign: "center",
            padding: "40px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          <p
            style={{
              color: "#f59e0b",
              letterSpacing: "4px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            TEMPORARILY UNAVAILABLE
          </p>

          <h1
            style={{
              fontSize: "34px",
              marginTop: "20px",
            }}
          >
            We will be back soon
          </h1>

          <p
            style={{
              marginTop: "16px",
              color: "#cccccc",
              lineHeight: 1.6,
            }}
          >
            Luxury Limo Paris is currently undergoing maintenance.
            <br />
            We are improving your experience.
          </p>

          <div
            style={{
              marginTop: "30px",
              width: "42px",
              height: "42px",
              border: "4px solid rgba(255,255,255,0.2)",
              borderTop: "4px solid #f59e0b",
              borderRadius: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              animation: "spin 1s linear infinite",
            }}
          />

          <p
            style={{
              marginTop: "20px",
              fontSize: "12px",
              color: "#888",
            }}
          >
            Thank you for your patience
          </p>
        </div>
      </div>
    </>
  );
}
