import { useState } from 'react';
import { Link } from 'react-router-dom';
import QuickSearch from '../components/QuickSearch.jsx';
import SiteImage from '../components/SiteImage.jsx';
import RoomCard from '../components/RoomCard.jsx';
import { hotel } from '../data/hotel.js';
import { rooms } from '../data/rooms.js';
import { useBooking } from '../context/BookingContext.jsx';

const guestNotes = [
  {
    question: 'Check-in and check-out',
    answer: `Check-in is from ${hotel.checkInTime} and check-out is by ${hotel.checkOutTime}. Ask the desk about an early arrival.`,
  },
  {
    question: 'Breakfast',
    answer: 'Breakfast is served daily in the harbour restaurant and is included in Deluxe and Suite rates.',
  },
  {
    question: 'Cancellation',
    answer: 'Cancel free of charge up to 48 hours before arrival.',
  },
];

export default function Home() {
  const { favourites, toggleFavourite } = useBooking();
  const [openNote, setOpenNote] = useState(0); // index of the open note, or -1 for none
  const featured = rooms.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-row">
          <div>
            <h1>Welcome to {hotel.name}</h1>
            <p className="lead">{hotel.tagline}</p>
            <div className="actions">
              <Link to="/booking" className="button">Book a stay</Link>
              <Link to="/rooms" className="button ghost">See the rooms</Link>
            </div>
          </div>
          <SiteImage name="harbourline-hero" className="hero-img" alt="View from the hotel terrace over the water" loading="eager" />
        </div>
      </section>

      <QuickSearch />

      <section className="container intro">
        <h2>A small hotel with a long view of the harbour</h2>
        <p>
          Harbourline has 24 rooms and suites, a harbour restaurant and a rooftop pool. We are a
          short walk from the marina and a short drive from the city centre, so you can spend the
          day wherever you like and come back to a quiet room.
        </p>
      </section>

      <section className="container">
        <h2>Featured rooms</h2>
        <div className="grid rooms-grid">
          {featured.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              isFavourite={favourites.includes(room.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      </section>

      <section className="container notes">
        <h2>Before you arrive</h2>
        {guestNotes.map((note, index) => {
          const isOpen = openNote === index;
          return (
            <div key={note.question} className="note">
              <h3>
                <button
                  className="note-toggle"
                  aria-expanded={isOpen}
                  aria-controls={`note-panel-${index}`}
                  onClick={() => setOpenNote(isOpen ? -1 : index)}
                >
                  {note.question}
                </button>
              </h3>
              <p id={`note-panel-${index}`} hidden={!isOpen}>
                {note.answer}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
}
