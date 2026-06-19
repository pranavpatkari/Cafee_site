import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./DiscoverPage.css";

/* ─────────────────────────────────────────────────────────────
   LAZY IMAGE
───────────────────────────────────────────────────────────── */
function LazyImage({ src, alt, className }) {
  const ref   = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "160px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`lazy-wrap ${loaded ? "lazy-loaded" : "lazy-loading"}`}>
      {inView && (
        <img src={src} alt={alt} className={className}
          onLoad={() => setLoaded(true)} loading="lazy" />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SWIGGY-STYLE DETAIL BOTTOM SHEET
───────────────────────────────────────────────────────────── */
function DetailModal({ item, onClose, onAdd, addedCount }) {
  const overlayRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [liked, setLiked]             = useState(false);
  const [qty, setQty]                 = useState(1);

  const photos = item.photos || [item.image];

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="modal-backdrop"
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="modal-sheet">

        {/* ── Photo header ── */}
        <div className="modal-photo-area">
          {/* main image */}
          <div className="modal-main-photo">
            <img
              src={photos[activePhoto]}
              alt={item.name}
              key={activePhoto}
              className="modal-main-img"
            />
            <div className="modal-photo-grad" />

            {/* top row */}
            <div className="modal-photo-toprow">
              <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
              <button
                className={`modal-like ${liked ? "liked" : ""}`}
                onClick={() => setLiked(l => !l)}
                aria-label="Like"
              >
                {liked ? "❤" : "🤍"}
              </button>
            </div>

            {/* badge */}
            {item.badge && <span className="modal-badge">{item.badge}</span>}

            {/* photo count dots */}
            {photos.length > 1 && (
              <div className="photo-dots">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    className={`photo-dot ${i === activePhoto ? "active" : ""}`}
                    onClick={() => setActivePhoto(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* thumbnail strip */}
          {photos.length > 1 && (
            <div className="photo-strip">
              {photos.map((p, i) => (
                <button
                  key={i}
                  className={`photo-thumb ${i === activePhoto ? "active" : ""}`}
                  onClick={() => setActivePhoto(i)}
                >
                  <img src={p} alt={`view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="modal-body">

          {/* name + price row */}
          <div className="modal-top-row">
            <div>
              {item.veg !== undefined && (
                <span className={`veg-icon ${item.veg ? "veg" : "nonveg"}`}>
                  <span className="veg-square" />
                </span>
              )}
              <h2 className="modal-title">{item.name}</h2>
              {item.category && <span className="modal-category">{item.category}</span>}
            </div>
            <div className="modal-price-col">
              <div className="modal-price">₹{item.price}</div>
              {item.originalPrice && (
                <div className="modal-original-price">₹{item.originalPrice}</div>
              )}
            </div>
          </div>

          {/* rating bar */}
          {item.rating && (
            <div className="modal-rating-bar">
              <div className="rating-chip">
                <span className="rating-star">★</span>
                <span className="rating-val">{item.rating}</span>
              </div>
              <span className="rating-sep">·</span>
              <span className="rating-count">{item.reviews || "200+"} ratings</span>
              <span className="rating-sep">·</span>
              <span className="rating-time">🕐 {item.time || "15 min"}</span>
              {item.bestseller && <span className="bestseller-tag"># Bestseller</span>}
            </div>
          )}

          {/* taste tags — Swiggy style */}
          {item.tastes && (
            <div className="taste-section">
              <p className="taste-label">People say it's</p>
              <div className="taste-tags">
                {item.tastes.map((t) => (
                  <span key={t.label} className="taste-tag">
                    <span className="taste-emoji">{t.emoji}</span>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* description */}
          <p className="modal-desc">{item.description}</p>

          {/* highlights pills */}
          {item.tags && (
            <div className="modal-tags">
              {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          )}

          {/* ingredients */}
          {item.extras && (
            <div className="modal-extras">
              <h4>What's inside</h4>
              <div className="extras-grid">
                {item.extras.map((e) => (
                  <div key={e} className="extra-chip">
                    <span className="extra-dot" />
                    {e}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* nutrition strip */}
          <div className="nutrition-strip">
            {item.calories && (
              <div className="nutr-item">
                <span className="nutr-val">{item.calories}</span>
                <span className="nutr-lbl">kcal</span>
              </div>
            )}
            {item.protein && (
              <div className="nutr-item">
                <span className="nutr-val">{item.protein}g</span>
                <span className="nutr-lbl">Protein</span>
              </div>
            )}
            {item.carbs && (
              <div className="nutr-item">
                <span className="nutr-val">{item.carbs}g</span>
                <span className="nutr-lbl">Carbs</span>
              </div>
            )}
            {item.spicy && (
              <div className="nutr-item">
                <span className="nutr-val">{item.spicy}</span>
                <span className="nutr-lbl">Spice</span>
              </div>
            )}
          </div>

          {/* review quotes */}
          {item.reviews_text && (
            <div className="review-quotes">
              <h4 className="review-title">What people love ❤</h4>
              <div className="review-scroll">
                {item.reviews_text.map((r, i) => (
                  <div key={i} className="review-card" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="review-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
                    <p className="review-text">"{r.text}"</p>
                    <span className="review-author">— {r.author}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* similar recommendations */}
          {item.pairsWith && (
            <div className="pairs-section">
              <h4 className="pairs-title">Pairs well with 🍽</h4>
              <div className="pairs-row">
                {item.pairsWith.map((p) => (
                  <div key={p.name} className="pair-chip">
                    <span className="pair-name">{p.name}</span>
                    <span className="pair-price">+₹{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* add section */}
          <div className="modal-add-row">
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-val" key={qty}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className="modal-add-btn"
              onClick={() => {
                for (let i = 0; i < qty; i++) onAdd(item);
                onClose();
              }}
            >
              Add {qty > 1 ? `${qty} items` : "to Cart"} · ₹{item.price * qty}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD
───────────────────────────────────────────────────────────── */
function DishCard({ item, onAdd, onOpen, delay }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={`discover-card ${pressed ? "pressed" : ""}`}
      style={{ animationDelay: `${delay}s` }}
      onClick={() => onOpen(item)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <LazyImage src={item.image} alt={item.name} className="card-img" />

      {/* offer ribbon */}
      {item.offer && <div className="card-ribbon">{item.offer}</div>}
      {item.badge && <span className="card-badge">{item.badge}</span>}

      {/* veg/nonveg indicator top-right */}
      {item.veg !== undefined && (
        <span className={`card-veg-dot ${item.veg ? "veg" : "nonveg"}`} />
      )}

      <div className="card-overlay">
        {item.rating && (
          <div className="card-rating-chip">
            <span>★ {item.rating}</span>
          </div>
        )}
        <h3>{item.name}</h3>
        <p className="card-price">₹{item.price}</p>
        <p className="card-snippet">{item.snippet}</p>

        {/* taste mini tags */}
        {item.tastes && (
          <div className="card-tastes">
            {item.tastes.slice(0, 2).map(t => (
              <span key={t.label} className="card-taste">{t.emoji} {t.label}</span>
            ))}
          </div>
        )}

        <button
          className="card-add-btn"
          onClick={(e) => { e.stopPropagation(); onAdd(item); }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION ROW
───────────────────────────────────────────────────────────── */
function SectionRow({ title, items, onAdd, onOpen }) {
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section className="discover-section">
      <div className="section-header">
        <h2>{title}</h2>
        <div className="scroll-btns">
          <button onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
          <button onClick={() => scroll(1)}  aria-label="Scroll right">›</button>
        </div>
      </div>
      <div className="discover-row" ref={rowRef}>
        {items.map((item, i) => (
          <DishCard key={i} item={item} onAdd={onAdd} onOpen={onOpen} delay={i * 0.07} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const heroSlides = [
  { image: "/menu/iced-coffee.jpg",         title: "Premium Cold Coffee",  subtitle: "Rich espresso blended with ice and cream — your daily ritual, elevated." },
  { image: "/menu/cheese-burst-burger.jpg", title: "Cheese Burst Burger",  subtitle: "Double-patty loaded with oozing cheddar. A guaranteed mess, worth every bite." },
  { image: "/menu/brownie.jpg",             title: "Chocolate Brownie",     subtitle: "Freshly baked, fudgy in the centre, crisp at the edge. Best eaten warm." },
  { image: "/menu/croissant.jpg",           title: "Fresh Croissants",      subtitle: "72-hour laminated dough, baked fresh every morning. Pairs beautifully with black coffee." },
];

const trendingItems = [
  {
    name: "Classic Veg Burger",
    price: 130, originalPrice: 160,
    image: "/menu/burger.jpg",
    photos: ["/menu/burger.jpg", "/menu/cheese-burst-burger.jpg"],
    rating: "4.8", reviews: "1.2k", bestseller: true,
    badge: "🔥 Bestseller", offer: "19% OFF",
    snippet: "Juicy, crispy, loaded with sauce",
    description: "Our signature veg burger stacks a house-made chickpea-and-oat patty with iceberg lettuce, vine tomatoes, pickled jalapeños, and our smoky chipotle mayo — all inside a toasted brioche bun. Filling, flavourful, never dry.",
    tastes: [
      { emoji: "😋", label: "Tasty" },
      { emoji: "🌶", label: "Mildly Spicy" },
      { emoji: "🧀", label: "Cheesy" },
      { emoji: "💪", label: "Filling" },
    ],
    tags: ["Vegetarian", "Brioche Bun", "Spicy Option"],
    extras: ["Chickpea-oat patty", "Brioche bun", "Chipotle mayo", "Pickled jalapeño", "Iceberg lettuce", "Vine tomatoes"],
    calories: 480, protein: 18, carbs: 52, veg: true, spicy: "Mild", time: "10–15 min", category: "Burgers",
    reviews_text: [
      { stars: 5, text: "Honestly the best veg burger I've had — the chipotle mayo is addictive.", author: "Riya S." },
      { stars: 5, text: "Crispy outside, soft inside. Filling enough for a full meal.", author: "Arjun M." },
      { stars: 4, text: "Love the jalapeño kick. Would add more cheese next time!", author: "Neha P." },
    ],
    pairsWith: [
      { name: "Cold Coffee", price: 120 },
      { name: "Fries", price: 80 },
    ],
  },
  {
    name: "Cold Coffee",
    price: 120,
    image: "/menu/iced-coffee.jpg",
    photos: ["/menu/iced-coffee.jpg", "/menu/cappuccino.jpg"],
    rating: "4.7", reviews: "980",
    badge: "⚡ Quick Pick",
    snippet: "Double shot espresso over milk & ice",
    description: "Two pulls of our house-blend espresso shaken with whole milk and a touch of demerara sugar over crushed ice. Strong enough to wake you up, smooth enough to savour slowly.",
    tastes: [
      { emoji: "☕", label: "Bold" },
      { emoji: "🥛", label: "Creamy" },
      { emoji: "❄", label: "Refreshing" },
    ],
    tags: ["Caffeinated", "Iced", "No Sugar Option"],
    extras: ["Double espresso", "Whole milk", "Demerara sugar", "Crushed ice"],
    calories: 160, protein: 6, carbs: 18, veg: true, time: "5 min", category: "Beverages",
    reviews_text: [
      { stars: 5, text: "Wakes me up better than anything. Perfect strength.", author: "Karan T." },
      { stars: 4, text: "Smooth and not too sweet — exactly what I wanted.", author: "Priya D." },
    ],
    pairsWith: [{ name: "Croissant", price: 140 }, { name: "Brownie", price: 120 }],
  },
  {
    name: "Chocolate Brownie",
    price: 120,
    image: "/menu/brownie.jpg",
    photos: ["/menu/brownie.jpg"],
    rating: "4.9", reviews: "2.1k", bestseller: true,
    badge: "⭐ Fan Favourite",
    snippet: "Warm, fudgy, dusted with cocoa",
    description: "Dark-chocolate brownie baked daily with 70% Valrhona cocoa, unsalted butter, and brown sugar. The crust crackles and the centre stays gooey. Ask for a scoop of vanilla bean gelato on the side.",
    tastes: [
      { emoji: "🍫", label: "Rich" },
      { emoji: "🫠", label: "Gooey" },
      { emoji: "😍", label: "Indulgent" },
    ],
    tags: ["Dessert", "Chocolate", "Egg-based"],
    extras: ["Valrhona 70% cocoa", "Unsalted butter", "Brown sugar", "Sea-salt flakes"],
    calories: 390, protein: 5, carbs: 48, veg: true, time: "5 min", category: "Desserts",
    reviews_text: [
      { stars: 5, text: "The gooiest brownie I've ever had. Melts in your mouth!", author: "Sneha R." },
      { stars: 5, text: "Addictive. I order this every single visit.", author: "Dev K." },
      { stars: 5, text: "Warm with gelato = absolute perfection.", author: "Ananya B." },
    ],
    pairsWith: [{ name: "Cold Coffee", price: 120 }, { name: "Cappuccino", price: 110 }],
  },
  {
    name: "Paneer Wrap",
    price: 150,
    image: "/menu/wrap.jpg",
    photos: ["/menu/wrap.jpg"],
    rating: "4.8", reviews: "760",
    snippet: "Tandoori paneer, mint chutney, crisp slaw",
    description: "Marinated paneer tikka grilled in our clay oven, wrapped in a soft wholewheat roti with mint-coriander chutney, shredded purple cabbage, and a squeeze of lime.",
    tastes: [
      { emoji: "🔥", label: "Smoky" },
      { emoji: "🌿", label: "Fresh" },
      { emoji: "💪", label: "High Protein" },
    ],
    tags: ["Vegetarian", "High Protein", "Whole Wheat"],
    extras: ["Paneer tikka", "Wholewheat roti", "Mint chutney", "Purple cabbage slaw", "Lime"],
    calories: 420, protein: 22, carbs: 38, veg: true, spicy: "Medium", time: "12 min", category: "Wraps",
    reviews_text: [
      { stars: 5, text: "The smoky paneer with mint chutney is a killer combo.", author: "Rahul V." },
      { stars: 4, text: "Generous filling, great for a quick lunch.", author: "Ishaan N." },
    ],
    pairsWith: [{ name: "Cold Coffee", price: 120 }, { name: "Salad Bowl", price: 190 }],
  },
];

const coffeeItems = [
  {
    name: "Cold Coffee", price: 120, image: "/menu/iced-coffee.jpg",
    photos: ["/menu/iced-coffee.jpg"],
    snippet: "Double shot over milk & ice",
    description: "Two pulls of house-blend espresso shaken with whole milk and demerara sugar over crushed ice. Refreshing, bold, perfectly balanced.",
    tastes: [{ emoji: "☕", label: "Bold" }, { emoji: "❄", label: "Refreshing" }],
    tags: ["Iced", "Caffeinated"],
    extras: ["Double espresso", "Whole milk", "Crushed ice"],
    calories: 160, protein: 6, carbs: 18, veg: true, time: "5 min", category: "Beverages",
    reviews_text: [{ stars: 5, text: "Perfect pick-me-up every afternoon.", author: "Meera S." }],
  },
  {
    name: "Cappuccino", price: 110, image: "/menu/cappuccino.jpg",
    photos: ["/menu/cappuccino.jpg"],
    snippet: "Micro-foam, rich espresso",
    description: "Equal parts espresso, steamed milk, and thick micro-foam. We use a single-origin Colombian roast for a clean, chocolatey cup without bitterness.",
    tastes: [{ emoji: "☕", label: "Rich" }, { emoji: "🥛", label: "Creamy" }, { emoji: "🍫", label: "Chocolatey" }],
    tags: ["Hot", "Caffeinated", "Italian Style"],
    extras: ["Single-origin espresso", "Steamed whole milk", "Micro-foam"],
    calories: 120, protein: 5, carbs: 12, veg: true, time: "5 min", category: "Beverages",
    reviews_text: [{ stars: 5, text: "Silky micro-foam, genuinely great espresso.", author: "Aditya K." }],
  },
  {
    name: "Espresso", price: 90, image: "/menu/espresso.jpg",
    photos: ["/menu/espresso.jpg"],
    snippet: "Single-origin, 28-second pull",
    description: "A precise 28-second extraction of our Ethiopian Yirgacheffe single-origin beans. Bright and fruity with a hazelnut crema. Served in a pre-warmed ceramic demitasse.",
    tastes: [{ emoji: "⚡", label: "Intense" }, { emoji: "🍑", label: "Fruity" }],
    tags: ["Hot", "Strong", "Single Origin"],
    extras: ["Ethiopian Yirgacheffe", "Pre-warmed cup"],
    calories: 10, veg: true, time: "3 min", category: "Beverages",
    reviews_text: [{ stars: 5, text: "The crema alone tells you the quality. Exceptional.", author: "Vikram R." }],
  },
  {
    name: "Strawberry Shake", price: 140, image: "/menu/strawberry-shake.jpg",
    photos: ["/menu/strawberry-shake.jpg"],
    snippet: "Fresh berries, vanilla gelato",
    description: "Whole fresh strawberries blended with house-made vanilla bean gelato and a splash of whole milk. Topped with a berry skewer — no artificial flavours.",
    tastes: [{ emoji: "🍓", label: "Fruity" }, { emoji: "🍦", label: "Creamy" }, { emoji: "😋", label: "Sweet" }],
    tags: ["No Artificial Flavours", "Cold", "Fruit"],
    extras: ["Fresh strawberries", "Vanilla gelato", "Whole milk"],
    calories: 310, protein: 7, carbs: 42, veg: true, time: "7 min", category: "Shakes",
    reviews_text: [{ stars: 4, text: "Real strawberry taste, not that fake syrup stuff!", author: "Pooja M." }],
  },
];

const dessertItems = [
  {
    name: "Chocolate Brownie", price: 120, image: "/menu/brownie.jpg", badge: "⭐ Top Rated",
    photos: ["/menu/brownie.jpg"],
    snippet: "Valrhona 70% cocoa, gooey centre",
    description: "Dark brownie made daily with 70% Valrhona cocoa and sea-salt flakes. Best eaten warm off the tray.",
    tastes: [{ emoji: "🍫", label: "Rich" }, { emoji: "🫠", label: "Gooey" }],
    tags: ["Chocolate", "Baked Fresh"],
    extras: ["Valrhona cocoa", "Butter", "Sea-salt"],
    calories: 390, protein: 5, carbs: 48, veg: true, time: "5 min", category: "Desserts",
    reviews_text: [{ stars: 5, text: "Best brownie in the city, no contest.", author: "Rhea T." }],
  },
  {
    name: "Cupcake", price: 90, image: "/menu/cupcake.jpg",
    photos: ["/menu/cupcake.jpg"],
    snippet: "Vanilla sponge, buttercream swirl",
    description: "Light vanilla sponge topped with Swiss meringue buttercream. Flavours rotate daily — ask what's in season.",
    tastes: [{ emoji: "🎂", label: "Sweet" }, { emoji: "🌸", label: "Delicate" }],
    tags: ["Baked", "Seasonal"],
    extras: ["Vanilla sponge", "Swiss meringue buttercream"],
    calories: 280, protein: 3, carbs: 36, veg: true, time: "Instant", category: "Desserts",
    reviews_text: [{ stars: 4, text: "Beautiful to look at and even better to eat.", author: "Nisha B." }],
  },
  {
    name: "Pancake", price: 160, image: "/menu/pancake.jpg",
    photos: ["/menu/pancake.jpg"],
    snippet: "Fluffy stack, maple syrup",
    description: "A tall stack of buttermilk pancakes, cooked to order, with Canadian maple syrup and cultured butter. Add berries or banana for ₹30.",
    tastes: [{ emoji: "🥞", label: "Fluffy" }, { emoji: "🍁", label: "Maple-y" }, { emoji: "😊", label: "Comforting" }],
    tags: ["Hot", "Breakfast All Day"],
    extras: ["Buttermilk batter", "Maple syrup", "Cultured butter"],
    calories: 560, protein: 10, carbs: 72, veg: true, time: "12 min", category: "Desserts",
    reviews_text: [{ stars: 5, text: "Fluffiest pancakes ever. The maple syrup drip is everything.", author: "Akash G." }],
  },
  {
    name: "Waffle", price: 180, image: "/menu/waffle.jpg",
    photos: ["/menu/waffle.jpg"],
    snippet: "Belgian batter, crisp on outside",
    description: "Classic Belgian waffle — crispy exterior, pillowy interior. Drizzled with dark chocolate sauce and served with salted caramel gelato.",
    tastes: [{ emoji: "🧇", label: "Crispy" }, { emoji: "🍫", label: "Chocolatey" }, { emoji: "🍦", label: "Creamy" }],
    tags: ["Belgian Style", "Chocolate"],
    extras: ["Belgian batter", "Dark chocolate drizzle", "Salted caramel gelato"],
    calories: 640, protein: 9, carbs: 78, veg: true, time: "10 min", category: "Desserts",
    reviews_text: [{ stars: 5, text: "That crunch with warm chocolate drizzle — unmatched.", author: "Sana K." }],
  },
];

const specialItems = [
  {
    name: "Croissant", price: 140, image: "/menu/croissant.jpg", badge: "🥐 Morning Pick",
    photos: ["/menu/croissant.jpg"],
    snippet: "72-hour laminated dough, pure butter",
    description: "Three days in the making — 72-hour laminated dough using French AOP butter, folded 27 times. Shatteringly crisp on the outside, honeycombed and chewy within.",
    tastes: [{ emoji: "🧈", label: "Buttery" }, { emoji: "✨", label: "Flaky" }, { emoji: "☕", label: "Café Classic" }],
    tags: ["French", "Baked Fresh AM"],
    extras: ["French AOP butter", "27-layer dough", "Sea salt finish"],
    calories: 290, protein: 6, carbs: 32, veg: true, time: "Instant", category: "Bakery",
    reviews_text: [
      { stars: 5, text: "You can actually hear the crunch. That's quality.", author: "Tanya R." },
      { stars: 5, text: "The layers just pull apart. Outstanding.", author: "Suraj L." },
    ],
    pairsWith: [{ name: "Espresso", price: 90 }, { name: "Cappuccino", price: 110 }],
  },
  {
    name: "Avocado Toast", price: 220, image: "/menu/avacado_toast.jpg",
    photos: ["/menu/avacado_toast.jpg"],
    snippet: "Smashed avo, poached egg, dukkah",
    description: "Smashed Hass avocado on toasted sourdough, finished with a soft-poached egg, house dukkah (hazelnut, coriander, cumin), and chilli flakes.",
    tastes: [{ emoji: "🥑", label: "Fresh" }, { emoji: "🌶", label: "Spicy" }, { emoji: "🍳", label: "Eggy" }],
    tags: ["High Protein", "Trending"],
    extras: ["Hass avocado", "Sourdough", "Poached egg", "House dukkah", "Chilli flakes"],
    calories: 370, protein: 16, carbs: 28, veg: false, time: "10 min", category: "Cafe Specials",
    reviews_text: [{ stars: 4, text: "The dukkah gives it such a unique crunch. Love it.", author: "Kavya S." }],
    pairsWith: [{ name: "Espresso", price: 90 }, { name: "Cold Coffee", price: 120 }],
  },
  {
    name: "White Sauce Pasta", price: 240, image: "/menu/white_sauce_pasta.jpg",
    photos: ["/menu/white_sauce_pasta.jpg"],
    snippet: "Béchamel, penne, parmesan",
    description: "Al dente penne in a slow-cooked béchamel enriched with aged Parmesan, garlic, and nutmeg. Finished with toasted breadcrumbs for crunch.",
    tastes: [{ emoji: "🧀", label: "Cheesy" }, { emoji: "😋", label: "Comforting" }, { emoji: "🍝", label: "Creamy" }],
    tags: ["Comfort Food", "Italian"],
    extras: ["Penne", "Béchamel sauce", "Aged Parmesan", "Toasted breadcrumbs"],
    calories: 620, protein: 18, carbs: 68, veg: true, spicy: "None", time: "18 min", category: "Mains",
    reviews_text: [
      { stars: 5, text: "Better than any pasta I've had at a proper Italian restaurant.", author: "Rishi M." },
      { stars: 5, text: "Breadcrumb topping is genius. Adds the perfect texture.", author: "Divya P." },
    ],
    pairsWith: [{ name: "Salad Bowl", price: 190 }, { name: "Cappuccino", price: 110 }],
  },
  {
    name: "Salad Bowl", price: 190, image: "/menu/salad_bowl.jpg",
    photos: ["/menu/salad_bowl.jpg"],
    snippet: "Quinoa, roasted veg, lemon tahini",
    description: "Tri-colour quinoa over baby spinach and arugula, topped with honey-roasted cherry tomatoes, cucumber ribbons, toasted pumpkin seeds, and house lemon-tahini dressing.",
    tastes: [{ emoji: "🌿", label: "Fresh" }, { emoji: "🍋", label: "Tangy" }, { emoji: "💚", label: "Healthy" }],
    tags: ["Healthy", "Gluten-Free", "High Fibre"],
    extras: ["Tri-colour quinoa", "Baby spinach", "Roasted cherry tomato", "Pumpkin seeds", "Lemon tahini"],
    calories: 310, protein: 12, carbs: 38, veg: true, time: "10 min", category: "Bowls",
    reviews_text: [{ stars: 4, text: "That tahini dressing — I could drink it. So good.", author: "Meghna A." }],
    pairsWith: [{ name: "Avocado Toast", price: 220 }, { name: "Cold Coffee", price: 120 }],
  },
];

const PROMO = [
  "🎉 Free delivery on orders above ₹499",
  "⚡ 15–20 min average prep time",
  "🌟 Code FIRST50 — 50% off your first order",
  "☕ New single-origin espresso now available",
  "🍰 Baked fresh every morning",
  "🔥 Cheese Burst Burger selling fast!",
];

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function DiscoverPage() {
  const [slide, setSlide]         = useState(0);
  const [modalItem, setModalItem] = useState(null);
  const [toast, setToast]         = useState(null);
  const [countKey, setCountKey]   = useState(0);

  const { cart, addToCart } = useContext(CartContext);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % heroSlides.length), 4200);
    return () => clearInterval(t);
  }, []);

  const handleAdd = useCallback((item) => {
    addToCart(item);
    setToast(item.name);
    setCountKey((k) => k + 1);
    setTimeout(() => setToast(null), 2200);
  }, [addToCart]);

  const promoTrack = [...PROMO, ...PROMO];

  return (
    <div className="discover-page">

      {/* ── HERO ── */}
      <section className="hero-banner">
        {heroSlides.map((s, i) => (
          <div key={i} className={`hero-slide ${i === slide ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }} />
        ))}
        <div className="hero-overlay" key={slide}>
          <span className="hero-eyebrow">Today's Highlight</span>
          <h1>{heroSlides[slide].title}</h1>
          <p>{heroSlides[slide].subtitle}</p>
          <a href="#featured" className="hero-btn">Explore Menu ↓</a>
          <div className="hero-dots">
            {heroSlides.map((_, i) => (
              <button key={i}
                className={`hero-dot ${i === slide ? "active" : ""}`}
                onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="hero-bottom-fade" />
      </section>

      {/* ── FILTERS ── */}
      <nav className="quick-filters">
        {["🔥 Trending", "☕ Coffee", "🍰 Desserts", "⭐ Specials", "🌱 Veg Only", "🆕 New"].map((f) => (
          <a key={f} href="#featured" className="filter-pill">{f}</a>
        ))}
      </nav>

      {/* ── PROMO MARQUEE ── */}
      <div className="promo-strip">
        <div className="promo-track">
          {promoTrack.map((p, i) => (
            <span key={i}>
              {p.includes("FIRST50")
                ? <>{p.split("FIRST50")[0]}<strong>FIRST50</strong>{p.split("FIRST50")[1]}</>
                : p}
              <span className="promo-divider"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ROWS ── */}
      <SectionRow id="featured" title="🔥 Trending Now"       items={trendingItems} onAdd={handleAdd} onOpen={setModalItem} />
      <SectionRow               title="☕ Coffee Collection"   items={coffeeItems}   onAdd={handleAdd} onOpen={setModalItem} />
      <SectionRow               title="🍰 Dessert Picks"       items={dessertItems}  onAdd={handleAdd} onOpen={setModalItem} />
      <SectionRow               title="⭐ Cafe Specials"        items={specialItems}  onAdd={handleAdd} onOpen={setModalItem} />

      {/* ── MODAL ── */}
      {modalItem && (
        <DetailModal item={modalItem} onClose={() => setModalItem(null)}
          onAdd={handleAdd} addedCount={cartCount} />
      )}

      {/* ── TOAST ── */}
      {toast && <div className="toast" role="status">✓ {toast} added</div>}

      {/* ── CART ── */}
      <Link to="/cafe" className="floating-cart" aria-label={`Cart ${cartCount} items`}>
        🛒 <span className="cart-label">View Cart</span>
        <span className="cart-count" key={countKey}>{cartCount}</span>
      </Link>
    </div>
  );
}
