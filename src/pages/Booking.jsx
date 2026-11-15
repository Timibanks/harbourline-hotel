import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Field from '../components/Field.jsx';
import { rooms } from '../data/rooms.js';
import { useBooking } from '../context/BookingContext.jsx';
import { nightsBetween, todayISO, validateBooking } from '../utils/validation.js';

const MAX_GUESTS = 4;
const blankForm = { name: '', email: '', roomId: '', checkIn: '', checkOut: '', guests: 2 };

export default function Booking() {
  const [params] = useSearchParams(); // reads ?room=... from the Book button on a room card
  const { bookings, addBooking, cancelBooking } = useBooking();
  const [form, setForm] = useState({
    ...blankForm,
    roomId: params.get('room') ?? '',
    checkIn: params.get('checkIn') ?? '',
    checkOut: params.get('checkOut') ?? '',
    guests: Number(params.get('guests')) || 2,
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const room = rooms.find((r) => r.id === form.roomId);
  const nights = form.checkIn && form.checkOut ? Math.max(0, nightsBetween(form.checkIn, form.checkOut)) : 0;
  const total = room && nights ? room.price * nights : 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined })); // clear the message as soon as the field changes
  }

  function changeGuests(delta) {
    setForm((f) => ({ ...f, guests: Math.min(MAX_GUESTS, Math.max(1, f.guests + delta)) }));
    setErrors((er) => ({ ...er, guests: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateBooking(form, room);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setConfirmation(null);
      return;
    }
    const booking = {
      ref: 'HL' + Date.now().toString(36).toUpperCase(),
      name: form.name.trim(),
      roomName: room.name,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      total,
    };
    addBooking(booking);
    setConfirmation(booking);
    setForm({ ...blankForm });
  }

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <h1>Book a stay</h1>
          <p>Choose a room and your dates. We confirm by email within one business day.</p>
        </div>
      </section>

      <section className="container booking-layout">
        <div>
          {confirmation && (
            <div className="feedback" role="status">
              <strong>Booking {confirmation.ref} received.</strong>
              <p>
                Thank you, {confirmation.name}. Your {confirmation.roomName} is requested from{' '}
                {confirmation.checkIn} to {confirmation.checkOut} for {confirmation.guests} guest(s).
              </p>
            </div>
          )}

          <form className="form card-form" onSubmit={handleSubmit} noValidate>
            <Field id="name" label="Guest name" error={errors.name}>
              <input id="name" name="name" value={form.name} onChange={handleChange} autoComplete="name" />
            </Field>

            <Field id="email" label="Email address" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Field>

            <Field id="roomId" label="Room" error={errors.roomId}>
              <select id="roomId" name="roomId" value={form.roomId} onChange={handleChange}>
                <option value="">Choose a room</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} (${r.price} a night)
                  </option>
                ))}
              </select>
            </Field>

            <div className="form-row">
              <Field id="checkIn" label="Check-in" error={errors.checkIn}>
                <input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  min={todayISO()}
                  value={form.checkIn}
                  onChange={handleChange}
                />
              </Field>
              <Field id="checkOut" label="Check-out" error={errors.checkOut}>
                <input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  min={form.checkIn || todayISO()}
                  value={form.checkOut}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <Field label="Guests" error={errors.guests}>
              <div className="counter">
                <button
                  type="button"
                  onClick={() => changeGuests(-1)}
                  disabled={form.guests <= 1}
                  aria-label="Remove a guest"
                >
                  −
                </button>
                <output aria-live="polite">{form.guests}</output>
                <button
                  type="button"
                  onClick={() => changeGuests(1)}
                  disabled={form.guests >= MAX_GUESTS}
                  aria-label="Add a guest"
                >
                  +
                </button>
              </div>
            </Field>

            <button className="button" type="submit">
              Confirm booking
            </button>
          </form>
        </div>

        <aside className="summary">
          <h2>Your stay</h2>
          {room ? (
            <dl>
              <dt>Room</dt>
              <dd>{room.name}</dd>
              <dt>Nightly rate</dt>
              <dd>${room.price}</dd>
              <dt>Nights</dt>
              <dd>{nights}</dd>
              <dt>Estimated total</dt>
              <dd>${total}</dd>
            </dl>
          ) : (
            <p>Choose a room to see the price.</p>
          )}
          <p className="fine">The final price is confirmed in your email.</p>

          <h3>Saved on this device</h3>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul className="booking-list">
              {bookings.map((b) => (
                <li key={b.ref}>
                  <span>
                    <strong>{b.ref}</strong>
                    <br />
                    {b.roomName}, {b.checkIn} to {b.checkOut}
                  </span>
                  <button className="button ghost small" onClick={() => cancelBooking(b.ref)}>
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>
    </>
  );
}
