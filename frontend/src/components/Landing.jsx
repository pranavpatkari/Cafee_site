import { useEffect, useState } from "react";

export default function Landing({ onEnter }) {
  const images = [
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing">
      <div className="landing-bg">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={i === index ? "landing-img active" : "landing-img"}
            alt="background"
          />
        ))}
      </div>

      <div className="landing-overlay">
        <div className="landing-card">
          <h1>
            Café <span>&</span> Books
          </h1>

          <p>
            Where stories brew and coffee inspires quiet moments.
          </p>

          <button onClick={onEnter}>Enter Café</button>
        </div>
      </div>
    </div>
  );
}
