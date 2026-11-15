export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

// Returns today's date as YYYY-MM-DD in the user's local time.
export const todayISO = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// YYYY-MM-DD strings compare correctly as text, so < and <= work for dates.
export const nightsBetween = (checkIn, checkOut) =>
  Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);

// Each function returns an object of { fieldName: message }. An empty object means the form is valid.
export function validateContact(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your full name.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!isEmail(values.email)) errors.email = 'Enter a valid email, such as name@example.com.';
  if (!values.subject.trim()) errors.subject = 'Add a subject for your message.';
  if (!values.message.trim()) errors.message = 'Write a message.';
  else if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

export function validateBooking(values, room) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter the guest name.';
  if (!values.email.trim()) errors.email = 'Enter an email address.';
  else if (!isEmail(values.email)) errors.email = 'Enter a valid email, such as name@example.com.';
  if (!room) errors.roomId = 'Choose a room.';
  if (!values.checkIn) errors.checkIn = 'Choose a check-in date.';
  else if (values.checkIn < todayISO()) errors.checkIn = 'Check-in cannot be in the past.';
  if (!values.checkOut) errors.checkOut = 'Choose a check-out date.';
  else if (values.checkIn && values.checkOut <= values.checkIn)
    errors.checkOut = 'Check-out must be after check-in.';
  if (room && values.guests > room.guests)
    errors.guests = `${room.name} sleeps up to ${room.guests} guests.`;
  return errors;
}
