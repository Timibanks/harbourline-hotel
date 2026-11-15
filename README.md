# Harbourline Hotel

A responsive hotel website and booking application built with React JS. Visitors can explore the hotel, browse and filter rooms, save favourite rooms, make a booking with validated form inputs, and send an enquiry through a contact form.

This project was built as an individual React JS coursework assignment (hotel booking application option).

## Project Description

Harbourline is a fictional boutique coastal hotel. The application contains six pages:

- **Home:** welcome message, introduction, featured rooms and an expandable "Before you arrive" section.
- **About:** the hotel's story, mission, vision and objectives.
- **Rooms:** six rooms and suites with search, category filter and a favourites-only toggle.
- **Services:** dining, spa, transfers, meeting rooms and pool, displayed from a data array.
- **Booking:** a controlled booking form with validation, a guest counter, a live price estimate and saved bookings that can be cancelled.
- **Contact:** contact details and a validated enquiry form with success and error feedback.

Favourite rooms and bookings are saved in the browser's local storage, so they remain after a page reload.

## Technologies Used

- React JS (functional components, hooks)
- React Router DOM (client-side routing)
- Vite (development server and build tool)
- JavaScript (ES modules), JSX
- CSS3 (external stylesheet, Flexbox, CSS Grid, media queries)
- Git and GitHub (version control)
- Netlify or Vercel (hosting)

## Installation

Requirements: Node.js 18 or newer and npm.

1. Clone or download the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/harbourline-hotel.git
   ```
2. Open the project folder in VS Code.
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:

```bash
npm run dev
```

Then open the address shown in the terminal, usually http://localhost:5173.

To create a production build and preview it:

```bash
npm run build
npm run preview
```

## Project Structure

```
harbourline-hotel/
├── public/              Static files (favicon, Netlify/Vercel redirect rules)
├── src/
│   ├── components/      Reusable components: Navbar, Footer, RoomCard, ServiceCard, Field
│   ├── context/         BookingContext (useContext + localStorage)
│   ├── data/            Sample data: hotel details, rooms, services
│   ├── pages/           Home, About, Rooms, Services, Booking, Contact
│   ├── utils/           Form validation and date helpers
│   ├── App.jsx          Layout and route definitions
│   ├── main.jsx         Entry point: mounts React, router and context
│   └── styles.css       Global external stylesheet
├── index.html           HTML entry page
├── package.json         Project dependencies and scripts
└── vite.config.js       Vite configuration
```

## React Concepts Used

| Concept | Where to find it |
| --- | --- |
| Project setup, `src` and `public` folders | Whole project; `main.jsx` and `App.jsx` are the entry files |
| Functional components | Every file in `components/` and `pages/` |
| Component imports and exports | Named and default exports across `pages/` and `components/` |
| JSX and JavaScript expressions | `Footer.jsx` (year), `RoomCard.jsx` (price), `Booking.jsx` (price summary) |
| `className` in JSX | All components; styles live in `styles.css` |
| Props | `RoomCard.jsx`, `ServiceCard.jsx`, `Field.jsx`, and `Pillar` in `About.jsx` |
| `.map()` for repeated content | Navbar links, rooms grid, services list, booking options, guest notes |
| `useState` | `Rooms.jsx` (filters), `Booking.jsx` and `Contact.jsx` (form state), `Navbar.jsx` (mobile menu), `Home.jsx` (accordion) |
| `useEffect` | `BookingContext.jsx` (saves to localStorage), `App.jsx` (scroll to top on route change) |
| `useContext` with a custom hook | `context/BookingContext.jsx`, used by `Rooms`, `Home`, `Booking` |
| Event handling (`onClick`, `onChange`, `onSubmit`) | Favourite button, filters, guest counter, both forms |
| Controlled inputs | `Booking.jsx` and `Contact.jsx` |
| Form validation | `utils/validation.js`: required fields, email format, date order, guest limit |
| Error and success messages | `Field.jsx` (field errors) and the feedback boxes in `Booking.jsx` and `Contact.jsx` |
| React Router | `App.jsx` routes, `NavLink` in `Navbar.jsx`, `Link` in `RoomCard.jsx`, `useSearchParams` in `Booking.jsx` |
| External CSS, Flexbox, Grid, media queries | `src/styles.css` |

## Deployment

The app is a single-page application, so deep links such as `/rooms` must be redirected to `index.html`. This is already configured:

- **Netlify:** `public/_redirects`
- **Vercel:** `vercel.json`
- **Render:** add a rewrite rule `/*` to `/index.html` on the static site.

Publish with Netlify or Vercel by connecting the GitHub repository. The build command is `npm run build` and the publish directory is `dist`.

## Notes

- All hotel details, prices and contact information are sample data. Replace them in `src/data/` with real details.
- Room and service photos are placeholders from picsum.photos. Replace the image URLs in `src/data/` and `src/pages/` with your own images.
- Form submissions are not sent to a server. They are stored in the browser for demonstration.
- Node modules are not stored in this repository. Run `npm install` to download them.

## Adding Your Hotel Photos

Save each photo as a `.jpg` file in `public/images/` using these exact names. Until a photo is added, the site shows the built-in illustration with the same name.

| File name | Used on |
| --- | --- |
| `harbourline-hero.jpg` | Home page hero (landscape or portrait) |
| `harbourline-about.jpg` | About page (portrait works best) |
| `harbour-standard.jpg` | Harbour Standard room |
| `garden-standard.jpg` | Garden Standard room |
| `deluxe-balcony.jpg` | Deluxe Balcony room |
| `family-deluxe.jpg` | Family Deluxe room |
| `ocean-suite.jpg` | Ocean Suite |
| `penthouse-suite.jpg` | Penthouse Suite |
| `service-dining.jpg` | Restaurant service |
| `service-spa.jpg` | Spa service |
| `service-transfers.jpg` | Airport transfers service |
| `service-meetings.jpg` | Meeting rooms service |
| `service-pool.jpg` | Rooftop pool service |

Room and service photos work best at 4:3 (for example 1200 × 900 pixels). Photos of about 1 MB or less keep the site fast.

### Using Unsplash Links Instead of Files

You can skip downloading. Open `src/data/photos.js`, and paste an Unsplash image link next to the matching name. To get a link, open the photo on unsplash.com, right-click the image, and choose "Copy image address". Photos from Unsplash are free to use, and crediting the photographer is appreciated.
