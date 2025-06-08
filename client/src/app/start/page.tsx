import { Layers } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white text-gray-900 font-sans">
        <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-screen">
          <div className="z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl border border-cyan-500 flex items-center justify-center mb-10 shadow hover:shadow-lg transition-all">
              <Layers className="w-10 h-10 text-cyan-500" />
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              <span className="pr-2">Job</span>Tracker
            </h1>

            <p className="text-lg max-w-xl mx-auto text-gray-700 mb-10 leading-relaxed">
              就職活動を一元管理。ステータス管理から締切通知まで、
              <br />
              就活の複雑さを シンプルに、効率的に。
            </p>

            <a
              href="/signup"
              className="inline-block text-white bg-cyan-500 hover:bg-cyan-600 font-semibold text-lg px-8 py-4 rounded-full shadow-md hover:-translate-y-1 hover:shadow-xl transition"
            >
              今すぐ始める
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
