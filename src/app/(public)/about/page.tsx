import React from 'react';

export default function about() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section for the Page */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0F1C]/80 z-10" />
        
        {/* Simple Content */}
        <div className="relative z-20 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-widest mb-4">
            ABOUT US
          </h1>
          <div className="h-1 w-20 bg-amber-500 mx-auto" />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-amber-500">Premium Chauffeur Experience</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Detailed content for this page goes here. You can import your 
              shared components like <code className="text-white">DarkLuxuryBlock</code> 
              to maintain the same style as your homepage.
            </p>
          </div>
          <div className="aspect-video bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
            <span className="text-gray-600 italic font-light">Image or Feature Placeholder</span>
          </div>
        </div>
      </section>
    </main>
  );
}