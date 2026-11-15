import { hotel } from '../data/hotel.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">{hotel.name}</p>
          {hotel.address && <p>{hotel.address}</p>}
        </div>
        <div>
          <p>{hotel.email}</p>
          <p>{hotel.phone}</p>
        </div>
        <p className="copy">
          © {new Date().getFullYear()} {hotel.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
