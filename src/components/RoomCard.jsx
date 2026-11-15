import { Link } from 'react-router-dom';
import SiteImage from './SiteImage.jsx';

// Presentational component: all data and actions come in through props.
export default function RoomCard({ room, isFavourite, onToggleFavourite }) {
  return (
    <article className="room-card">
      <div className="room-image">
        <SiteImage name={room.image} alt={`${room.name} room`} />
        <button
          className={`fav ${isFavourite ? 'is-on' : ''}`}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite ? `Remove ${room.name} from favourites` : `Save ${room.name} to favourites`
          }
          onClick={() => onToggleFavourite(room.id)}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>

      <div className="room-body">
        <p className="room-meta">
          {room.category}, {room.size} m², {room.beds}
        </p>
        <h3>{room.name}</h3>
        <p>{room.summary}</p>
        <div className="room-foot">
          <p className="price">
            ${room.price} <span>per night</span>
          </p>
          <Link to={`/booking?room=${room.id}`} className="button small">
            Book this room
          </Link>
        </div>
      </div>
    </article>
  );
}
