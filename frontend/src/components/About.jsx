import "../styles/components/About.css";
export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">

        <div className="about-visual">
          <div className="about-box-main">
            <div className="about-box-inner">
              <div className="big-num">Folio</div>
              <p>"A place to slow down, order something warm, and lose yourself in a good page."</p>
            </div>
          </div>

          <div className="about-box-accent">
            <div className="yr">2024</div>
            <span>Est. Pune</span>
          </div>
        </div>

          <div className="about-content">
  <h2>
    Crafted for Coffee Lovers.<br />
    <em>Built for Every Occasion.</em>
  </h2>

  <p>
    Located in Pune, Folio Café brings together premium coffee,
    handcrafted desserts, fresh vegetarian meals, and a welcoming
    atmosphere designed for conversations, study sessions, and
    relaxing evenings.
  </p>

  <p>
    Our menu features signature burgers, wraps, pasta, sandwiches,
    brownies, waffles, pancakes, specialty coffees, and refreshing
    beverages prepared with carefully selected ingredients.
  </p>

  <p>
    Whether you're meeting friends, working remotely, celebrating
    special moments, or simply enjoying a quiet cup of coffee,
    Folio offers a space where great food and comfort come together.
  </p>

  <div className="about-highlights">
    <div>
      <strong>25+</strong>
      <span>Menu Items</span>
    </div>

    <div>
      <strong>100%</strong>
      <span>Vegetarian</span>
    </div>

    <div>
      <strong>Free</strong>
      <span>WiFi</span>
    </div>

    <div>
      <strong>2024</strong>
      <span>Established</span>
    </div>
  </div>
</div>
</div>
    </section>
  );
}
