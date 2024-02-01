// ShowDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketBookingForm from "./TicketBookingForm";
import "./ShowDetails.css";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const officialSite = show && show.officialSite;
  const navigate = useNavigate();
  // State to store user details from local storage
  const [userDetails, setUserDetails] = useState({
    name: "", // Add other relevant user details
  });

  // Retrieve user details from local storage on component mount
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching show details: ${response.status}`);
        }
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error(error.message);
        setShow(null);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  const handleBookTicket = (formData) => {
    // Perform booking logic with formData
    console.log("Booking Details:", formData);

    // Update user details in local storage
    localStorage.setItem("userDetails", JSON.stringify(formData));

    // Hide the booking form
    setShowBookingForm(false);
  };

  const handleCancelBooking = () => {
    setShowBookingForm(false);
  };

  return (
    <div className="content">
      <div className="show-detail-container">
        <div className="left">
          {/* Image */}
          {show.image && show.image.medium && (
            <img
              src={show.image.medium}
              alt={show.name}
              style={{ width: "300px", height: "400px" }}
            />
          )}
        </div>
        {/* Summary */}

        <div className="right">
          {/* Individual details */}
          <p className="show-name">{show.name}</p>
          <p className="show-detail">
            <span className="content-name">Genre:</span>{" "}
            {show.genres && show.genres.join(", ")}
          </p>
          <p className="show-detail">
            <span className="content-name">Language:</span>
            {show.language}
          </p>
          {show.rating && show.rating.average ? (
            <p className="show-detail">
              <span className="content-name">Rating:</span>
              {show.rating.average}
            </p>
          ) : (
            <p className="show-detail">
              <span className="content-name">Rating:</span> Not Available
            </p>
          )}
          <p className="show-detail">
            <span className="content-name">Premiered:</span> {show.premiered}
          </p>
          <p className="show-detail">
            <span className="content-name">Ended:</span>
            {show.ended}
          </p>
          <p className="show-detail">
            <span className="content-name">Country:</span>
            {show.network && show.network.country && show.network.country.code}
          </p>
          {officialSite && (
            <p className="show-detail">
              <a href={officialSite} target="_blank" rel="noopener noreferrer">
                Visit Official site
              </a>
            </p>
          )}

          {show.schedule && show.schedule.time && show.schedule.days ? (
            <p className="show-detail">
              <span className="content-name">Schedule:</span>{" "}
              {show.schedule.time} on {show.schedule.days.join(", ")}
            </p>
          ) : (
            <p className="show-detail">
              <span className="content-name">Schedule:</span>: Not Available
            </p>
          )}

          {/* Booking Form */}
          <div className="booking-form">
            <button type="book" onClick={() => setShowBookingForm(true)}>
              Book Tickets
            </button>
            <button type="back" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>

        {/* Render the booking form when showBookingForm is true */}
        {showBookingForm && (
          <TicketBookingForm
            movieDetails={show}
            onBookTicket={handleBookTicket}
            onCancel={handleCancelBooking}
          />
        )}
      </div>
      <div>
        {/* Summary */}
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: ` ${show.summary}` }}
        />
      </div>
    </div>
  );
};

export default ShowDetail;
