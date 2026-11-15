import ServiceCard from '../components/ServiceCard.jsx';
import { services } from '../data/services.js';

export default function Services() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <h1>Services</h1>
          <p>Dining, wellness and practical help, all on site or a short call away.</p>
        </div>
      </section>

      <section className="container">
        <div className="services-list">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>
    </>
  );
}
