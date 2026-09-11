# AI Writer

A modern AI-powered writing application built with React, Vite, and TypeScript.

## Features

* AI-powered writing assistance
* Rewrite and improve existing content
* Expand and develop ideas
* Summarize content
* Grammar and writing corrections
* Tone adjustment
* Multi-language translation
* Blog and content generation
* Responsive user interface
* Authentication support
* Production deployment support

## Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Node.js
* Express
* Firebase
* Stripe
* Tesseract.js
* React Markdown

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available at the local Vite address shown in the terminal.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## AI Backend

The application can connect to an external AI backend through the `VITE_API_URL` environment variable.

Example:

```env
VITE_API_URL=https://your-ai-backend.example.com
```

If the variable is not configured, the application uses its configured fallback API endpoint.

## Project Structure

```text
ai-writer/
├── app/
├── backend/
├── public/
├── src/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Development

Useful commands:

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run test:run

## AI Backend

The AI Writer frontend connects to the production AI backend hosted on Render.

The backend URL is configured through the `VITE_API_URL` environment variable.

Example:

```env
VITE_API_URL=https://my-backend-qdhh.onrender.com
```

## License

See `LICENSE.txt` and `LICENSE_APP.txt` for the applicable licensing terms.

## Status

The project is actively developed and includes a production-ready Vite build configuration.
