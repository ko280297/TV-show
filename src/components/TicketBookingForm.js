// TicketBookingForm.js
import React, { useState, useEffect } from "react";
import "./TicketBookingForm.css";

const TicketBookingForm = ({ movieDetails, onBookTicket, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    movieName: "", // Add movieName field
  });

  useEffect(() => {
    if (movieDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        movieName: movieDetails.name,
      }));
    }
  }, [movieDetails]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookTicket(formData);
  };

  return (
    <div className="ticket-booking-form-container">
      <h2>Movie Ticket Booking</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Movie Name:
          <input
            type="text"
            name="movieName"
            value={formData.movieName}
            readOnly // Make it read-only to prevent user input
          />
        </label>
        <br />
        <button type="submit">Book Ticket</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TicketBookingForm;
