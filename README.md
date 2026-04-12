# The Stone Master

A modern React-based website for "The Stone Master" - showcasing traditional stone carvings from Mahad, Maharashtra. Features a beautiful gallery, contact form with WhatsApp integration, and an admin panel for managing products.

## Features

- **Welcome Modal**: Collects visitor information before entering the gallery
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Gallery**: Showcases stone carvings with pricing and descriptions
- **Contact Form**: Direct WhatsApp integration for enquiries
- **Admin Panel**: Password-protected dashboard to manage products
- **Modern UI**: Built with Tailwind CSS and smooth animations

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd thestonemaster
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
thestonemaster/
├── public/                 # Static assets
│   └── *.png              # Placeholder images
├── src/
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## Admin Panel

Access the admin panel by clicking the settings icon in the navigation. Use password: `mahad123`

Features:
- Add new stone carvings
- Update prices
- Delete products
- Manage gallery items

## Contact Integration

The contact form integrates with WhatsApp for direct communication. Messages are pre-formatted with customer details and sent to +91 7208324505.

## Images

Placeholder SVG images are included for demonstration. Replace them with actual product photos in the `public/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Test the build: `npm run build`
6. Submit a pull request

## License

All rights reserved. The Stone Master, Mahad.