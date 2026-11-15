import { useState } from 'react';
import { photos } from '../data/photos.js';

// Image source order:
// 1. A link pasted in src/data/photos.js (for example an Unsplash link)
// 2. public/images/<name>.jpg
// 3. The built-in illustration public/images/<name>.svg
export default function SiteImage({ name, alt, className, loading = 'lazy' }) {
  const [src, setSrc] = useState(photos[name] || `/images/${name}.jpg`);
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setSrc(`/images/${name}.svg`)}
    />
  );
}
