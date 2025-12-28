"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import InlineReview from "./InlineReview";

const SLIDES = [
  "/slide0.jpg",
  "/slide1.jpg",
  "/slide2.jpg",
  "/slide3.jpg",
];

// TOP PICKS
const TOP_PICKS: { type: "balsam bakes" | "balsam brews"; image: string }[] = [
  { type: "balsam bakes", image: "/menu/bakes.jpg" },
  { type: "balsam brews", image: "/menu/brews.jpg" },
];

// GALLERIES
const BAKE_GALLERY = [
  "/bakes/bake1.jpg",
  "/bakes/bake2.jpg",
  "/bakes/bake3.jpg",
  "/bakes/bake4.jpg",
  "/bakes/bake5.jpg",
  "/bakes/bake6.jpg",
];

const BREW_GALLERY = [
  "/brews/brew1.jpg",
  "/brews/brew2.jpg",
  "/brews/brew3.jpg",
];

export default function HotelSection() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState<
    null | "balsam bakes" | "balsam brews"
  >(null);

  // ✅ NEW (review toggle)
  const [showReview, setShowReview] = useState(false);

  /* FADE IN */
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const activeGallery =
    openModal === "balsam bakes" ? BAKE_GALLERY : BREW_GALLERY;

  return (
    <div
      className={`relative min-h-screen px-6 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "#f1eae0", color: "#465966" }}
    >
      {/* ================= HERO ================= */}
      <div className="pt-12 flex flex-col items-center text-center">
        <Image src="/balsamlogo.png" alt="Balsam Logo" width={110} height={110} />

        <h1 className="mt-5 text-2xl font-inter font-medium">
          Welcome to Balsam
        </h1>

        <p className="mt-2 text-xl font-allura">
          A space to connect, create, and celebrate
        </p>

        {/* SLIDER */}
        <div className="mt-8 w-full overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((src, i) => (
              <div key={i} className="relative min-w-full h-[330px]">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-15 text-[10px] tracking-widest uppercase text-[#465966]/60">
          scroll
        </p>
      </div>

      {/* CTA */}
      <div className="mt-20 flex justify-center">
        <button
         onClick={() => router.push("/menu?from=landing")}
          className="px-8 py-3 rounded-full text-sm tracking-wide"
          style={{ backgroundColor: "#465966", color: "#f1eae0" }}
        >
          See What’s Brewing
        </button>
      </div>

      {/* TOP PICKS */}
      <div className="mt-14 text-center">
        <h2 className="text-sm font-semibold tracking-widest uppercase">
          Top Picks
        </h2>
      </div>

      <div className="mt-10 space-y-8 pb-16">
        {TOP_PICKS.map((item) => (
          <button
            key={item.type}
            onClick={() => setOpenModal(item.type)}
            className="relative rounded-3xl overflow-hidden shadow-md w-full"
          >
            <Image
              src={item.image}
              alt={item.type}
              width={400}
              height={520}
              className="w-full h-80 object-cover"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <span className="text-white text-xs tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full">
                Tap to view
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </button>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <p className="text-sm tracking-widest uppercase">{openModal}</p>
            <button onClick={() => setOpenModal(null)} className="text-xl">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {activeGallery.map((src, i) => (
              <div
                key={i}
                className="relative w-full h-[300px] rounded-xl overflow-hidden"
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VISIT US */}
      <section className="px-5 pb-10">
        <div
          className="rounded-3xl border p-6 shadow-sm"
          style={{ backgroundColor: "#f1eae0" }}
        >
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">
            Visit Us
          </h3>

          <div className="space-y-4 text-sm text-gray-700">
            <p>📍 NIBM, Pune</p>
            <p>⏰ 10:00 AM – 11:00 PM</p>
            <a
              href="https://www.instagram.com/balsam.pune/"
              target="_blank"
              className="underline"
            >
              📸 @balsam.pune
            </a>
          </div>

          <a
            href="https://maps.app.goo.gl/zMCp85xfpgfhaoAZ9"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 text-xs border border-gray-300 px-5 py-2 rounded-full"
          >
            Open in maps
          </a>
        </div>
      </section>

      {/* ================= REVIEW SECTION ================= */}
      <section className="px-5 py-16 bg-[#f1eae0] text-[#455a65]">
        {!showReview ? (
          <button
            onClick={() => setShowReview(true)}
            className="
              w-full
              max-w-md
              mx-auto
              block
              rounded-2xl
              bg-[#465966]
              py-4
              text-sm
              font-medium
              tracking-wide
              text-[#f1eae0]
              shadow-md
              transition
              active:scale-95
            "
          >
            ⭐ Leave a Review
          </button>
        ) : (
          <InlineReview />
        )}
      </section>
    </div>
  );
}
