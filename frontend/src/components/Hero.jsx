import { useState, useEffect } from "react";

export default function Hero() {
  const images = [
  "/images/image1.webp",
  "/images/image2.webp",
  "/images/image3.webp"
];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          Where <br />
          <em>Stories</em> <br />
          Brew.
        </h1>

        <p>
          A sanctuary for the curious mind — artisan café meets curated bookshop.
        </p>
      </div>

      <div className="hero-right">
        <img
  src={images[index]}
  className="hero-img"
  alt="Cafe Interior"
  fetchpriority="high"
/>

        <div className="hero-box">
          <div className="year">2024</div>
          <span>EST. PUNE</span>
        </div>
      </div>
    </section>
  );
}
