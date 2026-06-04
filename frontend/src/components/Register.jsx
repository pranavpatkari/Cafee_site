import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    people: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reservation Submitted!");
    console.log(form);
  };

  return (
    <section id="register" className="register">
      <h2>Reserve a Table</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="people" placeholder="People" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />

        <button type="submit">Reserve</button>
      </form>
    </section>
  );
}
