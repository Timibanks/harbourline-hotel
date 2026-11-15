import { useState } from 'react';
import RoomCard from '../components/RoomCard.jsx';
import { categories, rooms } from '../data/rooms.js';
import { useBooking } from '../context/BookingContext.jsx';

export default function Rooms() {
  const { favourites, toggleFavourite } = useBooking();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  const term = search.trim().toLowerCase();
  const visibleRooms = rooms.filter(
    (room) =>
      (category === 'All' || room.category === category) &&
      (!favouritesOnly || favourites.includes(room.id)) &&
      (room.name.toLowerCase().includes(term) || room.beds.toLowerCase().includes(term))
  );

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <h1>Rooms and suites</h1>
          <p>Every room has a view, a rain shower and fresh linen. Save the ones you like.</p>
        </div>
      </section>

      <section className="container">
        <div className="toolbar">
          <label>
            Search
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or bed type"
            />
          </label>

          <div className="chips" role="group" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                className={`chip ${category === item ? 'is-active' : ''}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="check">
            <input
              type="checkbox"
              checked={favouritesOnly}
              onChange={(e) => setFavouritesOnly(e.target.checked)}
            />
            Favourites only
          </label>
        </div>

        {visibleRooms.length === 0 ? (
          <p className="empty">No rooms match these filters. Try another category or clear the search.</p>
        ) : (
          <div className="grid rooms-grid">
            {visibleRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isFavourite={favourites.includes(room.id)}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
