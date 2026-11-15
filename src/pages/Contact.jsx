import { useState } from 'react';
import Field from '../components/Field.jsx';
import { hotel } from '../data/hotel.js';
import { validateContact } from '../utils/validation.js';

const blankValues = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState(blankValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ type: 'error', text: 'Please correct the highlighted fields and try again.' });
      return;
    }

    setStatus({
      type: 'success',
      text: `Thanks, ${values.name.trim()}. We have received your message and will reply to ${values.email.trim()} within one business day.`,
    });
    setValues(blankValues);
  }

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <h1>Contact us</h1>
          <p>Questions about rooms, dates or events? Send us a note.</p>
        </div>
      </section>

      <section className="container contact-layout">
        <div className="contact-info">
          <h2>Talk to the front desk</h2>
          <p>
            Email <a href={`mailto:${hotel.email}`}>{hotel.email}</a>
          </p>
          <p>
            Phone <a href={`tel:${hotel.phone.replace(/[^+\d]/g, '')}`}>{hotel.phone}</a>
          </p>
          {hotel.address && <p>{hotel.address}</p>}
          <p>Check-in is from {hotel.checkInTime}. Check-out is by {hotel.checkOutTime}.</p>
        </div>

        <div>
          {status && (
            <div className={`feedback ${status.type === 'error' ? 'is-error' : ''}`} role="status">
              {status.text}
            </div>
          )}

          <form className="form card-form" onSubmit={handleSubmit} noValidate>
            <Field id="contact-name" label="Full name" error={errors.name}>
              <input id="contact-name" name="name" value={values.name} onChange={handleChange} autoComplete="name" />
            </Field>

            <Field id="contact-email" label="Email address" error={errors.email}>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Field>

            <Field id="contact-subject" label="Subject" error={errors.subject}>
              <input id="contact-subject" name="subject" value={values.subject} onChange={handleChange} />
            </Field>

            <Field id="contact-message" label="Message" error={errors.message}>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={handleChange}
              />
            </Field>

            <button className="button" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
