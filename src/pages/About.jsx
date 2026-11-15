import SiteImage from '../components/SiteImage.jsx';
import { hotel } from '../data/hotel.js';

const objectives = [
  'Keep every room clean, quiet and ready on time.',
  'Source food from farms and fishers within 50 km.',
  'Cut single-use plastic in the restaurant and rooms by 2028.',
];

// Reusable layout block: a heading plus any content passed as children.
function Pillar({ title, children }) {
  return (
    <article className="pillar">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export default function About() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <h1>About {hotel.name}</h1>
          <p>A family-run hotel on the harbour, built around comfort, good food and attentive service.</p>
        </div>
      </section>

      <section className="container split">
        <div>
          <h2>Our story</h2>
          <p>
            Harbourline opened in 2009 as a guesthouse with six rooms. The founding family ran the
            kitchen, the front desk and the boat tours themselves, and guests kept coming back for the
            breakfasts and the quiet.
          </p>
          <p>
            Over the years we added the restaurant, the rooftop pool and the Ocean Suites. We kept the
            same rule from the start: every guest should feel expected, and nobody should feel like a
            booking number.
          </p>
        </div>
        <SiteImage name="harbourline-about" alt="The hotel lobby with wooden floors and large windows" />
      </section>

      <section className="container">
        <h2>What we stand for</h2>
        <div className="pillars">
          <Pillar title="Mission">
            <p>To give every guest a calm, well-run stay and a meal worth remembering.</p>
          </Pillar>
          <Pillar title="Vision">
            <p>To be the harbour hotel guests recommend first, for its service and its respect for the sea.</p>
          </Pillar>
          <Pillar title="Objectives">
            <ul>
              {objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Pillar>
        </div>
      </section>
    </>
  );
}
