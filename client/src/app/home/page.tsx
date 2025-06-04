import React from "react";
import { Layers } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white text-gray-900 font-sans">
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-screen">
          <div className="z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl border border-gray-300 flex items-center justify-center mb-10 hover:scale-105 transition-transform">
              <Layers className="w-10 h-10 text-gray-800" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              JobTracker
            </h1>
            <p className="text-lg max-w-xl mx-auto text-gray-700 mb-10">
              就職活動を一元管理。ステータス管理から締切通知まで、
              <br />
              就活の複雑さをシンプルに、効率的に。
            </p>
            <button
              type="button"
              className="inline-block bg-gray-800 text-white font-semibold text-lg px-8 py-4 rounded-full shadow hover:-translate-y-1 hover:shadow-lg transition"
            >
              今すぐ始める
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
