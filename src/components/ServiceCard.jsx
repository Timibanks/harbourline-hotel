import SiteImage from './SiteImage.jsx';

export default function ServiceCard({ title, description, note, image }) {
  return (
    <article className="service-card">
      <SiteImage name={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="note-text">{note}</p>
      </div>
    </article>
  );
}
