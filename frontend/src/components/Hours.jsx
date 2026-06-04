export default function Hours() {
  return (
    <section className="hours" id="visit">

      <div className="hours-header">
        <p className="eyebrow">Come Visit</p>
        <h2>We’re <em>Open</em></h2>
      </div>

      <div className="hours-grid">
        <div className="hours-card">
          <h3>Mon – Thu</h3>
          <p>9 AM – 10 PM</p>
        </div>

        <div className="hours-card">
          <h3>Fri – Sat</h3>
          <p>9 AM – 11:30 PM</p>
        </div>

        <div className="hours-card">
          <h3>Sunday</h3>
          <p>10 AM – 9 PM</p>
        </div>
      </div>

      <div className="location-bar">
        <span>📍 Koregaon Park, Pune</span>
        <span>📞 +91 98765 43210</span>
      </div>

    </section>
  );
}
