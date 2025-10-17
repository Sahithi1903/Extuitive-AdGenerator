"use client";
import React, { useState } from "react";
import "./globals.css";
import { FiRefreshCcw } from "react-icons/fi";

export default function Page() {
  const [product, setProduct] = useState("");
  const [tone, setTone] = useState("playful");
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null); // 👈 new state
  const [error, setError] = useState("");

  async function generateAds() {
    setError("");
    setAds([]);

    if (!product.trim()) {
      setError("⚠️ Please enter a product description.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unexpected error");
      setAds(data.lines || []);
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function regenerateAd(index) {
    setLoadingIndex(index);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unexpected error");

      setAds((prevAds) =>
        prevAds.map((ad, i) => (i === index ? data.lines[0] : ad))
      );
    } catch (e) {
      setError(e.message || "Failed to regenerate ad.");
    } finally {
      setLoadingIndex(null);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Extuitive Ad Generator</h1>
      <p className="subtitle">
        Enter your product idea and get 3 catchy ad headlines powered by AI.
      </p>

      <textarea
        placeholder="e.g. A reusable coffee cup that keeps drinks hot for 8 hours."
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <div className="controls">
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="playful">Playful</option>
          <option value="professional">Professional</option>
          <option value="luxury">Luxury</option>
        </select>
        <button onClick={generateAds} disabled={loading}>
          {loading ? "Generating AI Ads..." : "Generate AI Ads"}
        </button>
      </div>

      {loading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Generating creative headlines...</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <div className="results">
        {ads.map((ad, idx) => (
          <div key={idx} className="adcard fadeIn" style={{ "--delay": idx }}>
            <div class="resultsCard">
              <span>
                <span className="badge">#{idx + 1}</span> {ad}
              </span>
              <button
                onClick={() => regenerateAd(idx)}
                disabled={loadingIndex === idx}
                className="refresh-btn"
                title="Refresh this ad"
              >
                {loadingIndex === idx ? (
                  <span className="spinner-icon"></span>
                ) : (
                  <FiRefreshCcw size={18} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
