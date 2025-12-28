"use client";

import { useState } from "react";
import { RESTAURANT } from "../config/restaurent";

export default function InlineReview() {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    if (rating === null || loading) return;

    try {
      setLoading(true);

      // 🚨 WhatsApp alert ONLY for 1⭐ & 2⭐
      if (rating <= 2) {
        const message = encodeURIComponent(
          `⚠️ Low rating received at ${RESTAURANT.name}\n\n` +
            `Rating: ${rating} star(s)\n` +
            `Feedback: ${feedback || "No comment provided"}`
        );

        window.open(
          `https://wa.me/${RESTAURANT.whatsapp}?text=${message}`,
          "_blank"
        );
      }

      await new Promise((r) => setTimeout(r, 700));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- AFTER SUBMIT ---------- */

  // ⭐⭐⭐⭐⭐ → Google review
  if (submitted && rating === 5) {
    return (
      <section className="mt-16 px-6 text-center text-[#465963]">
        <h3 className="text-[22px] mb-3 font-medium">
          Thank you! 🙏
        </h3>

        <p className="text-sm mb-5">
          We’re glad you enjoyed your visit.
          <br />
          You can also share your experience on Google.
        </p>

        <a
          href={RESTAURANT.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-[#465963] px-6 py-3 text-white font-medium"
        >
          ⭐ Leave a Google Review
        </a>
      </section>
    );
  }

  // ⭐⭐⭐⭐ and below
  if (submitted && rating !== null && rating < 5) {
    return (
      <section className="mt-16 px-6 text-center text-[#465963]">
        <h3 className="text-[22px] mb-3 font-medium">
          Thank you for your feedback 🙏
        </h3>

        <p className="text-sm">
          We truly appreciate you taking the time to help us improve.
        </p>
      </section>
    );
  }

  /* ---------- REVIEW FORM ---------- */

  return (
    <section className="mt-16 px-6 text-center max-w-md mx-auto text-[#465963]">
      <h3 className="text-[22px] mb-2 font-medium">
        How was your experience today?
      </h3>

      <p className="text-sm mb-4">
        Your feedback helps us serve you better.
      </p>

      {/* STAR RATING */}
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            aria-label={`${n} star rating`}
            className={`text-3xl transition ${
              rating !== null && rating >= n
                ? "text-yellow-400"
                : "text-[#465963]/40"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* FEEDBACK */}
      <textarea
        placeholder="Tell us more (optional)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-[#465963]/30
          bg-white
          p-3
          text-sm
          text-[#465963]
          placeholder-[#465963]/50
          focus:outline-none
          focus:ring-1
          focus:ring-[#465963]
        "
        rows={3}
      />

      <button
        onClick={submitReview}
        disabled={loading || rating === null}
        className={`mt-4 w-full rounded-xl py-3 font-medium transition ${
          loading || rating === null
            ? "bg-[#465963]/40 text-white cursor-not-allowed"
            : "bg-[#465963] text-white"
        }`}
      >
        {loading ? "Submitting..." : "Submit feedback"}
      </button>
    </section>
  );
}
