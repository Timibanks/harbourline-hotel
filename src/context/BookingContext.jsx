import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'harbourline-state';
const defaultState = { favourites: [], bookings: [] };

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // Read saved state once, on first render.
  const [state, setState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? defaultState;
    } catch {
      return defaultState;
    }
  });

  // Save every change so favourites and bookings survive a page reload.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleFavourite = (roomId) =>
    setState((s) => ({
      ...s,
      favourites: s.favourites.includes(roomId)
        ? s.favourites.filter((id) => id !== roomId)
        : [...s.favourites, roomId],
    }));

  const addBooking = (booking) =>
    setState((s) => ({ ...s, bookings: [booking, ...s.bookings] }));

  const cancelBooking = (ref) =>
    setState((s) => ({ ...s, bookings: s.bookings.filter((b) => b.ref !== ref) }));

  return (
    <BookingContext.Provider
      value={{ ...state, toggleFavourite, addBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used inside BookingProvider');
  return context;
}
