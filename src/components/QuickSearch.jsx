import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todayISO } from '../utils/validation.js';

export default function QuickSearch() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError('Choose both dates to check availability.');
      return;
    }
    if (checkOut <= checkIn) {
      setError('Check-out must be after check-in.');
      return;
    }
    setError('');
    navigate(`/booking?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  }

  return (
    <div className="container quick-search">
      <form className="search-bar" onSubmit={handleSubmit} noValidate>
        <label>
          Check-in
          <input
            type="date"
            min={todayISO()}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Check-out
          <input
            type="date"
            min={checkIn || todayISO()}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
        <label>
          Guests
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <button className="button" type="submit">
          Check availability
        </button>
      </form>
      {error && (
        <p className="error search-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
