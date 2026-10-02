# OCR Translator

A modern mobile-first OCR and translation application built with React, Vite, TypeScript, and Tesseract.js.

## Features

* 📷 Capture text directly using the device camera
* 🖼️ Upload images from the device
* 🔎 Automatically detect and extract text from images
* ✏️ Review and edit extracted text
* 🌐 Translate detected text into multiple languages
* 🔤 Automatic source-language detection
* 🔊 Read translated text aloud with text-to-speech
* 📋 Copy extracted or translated text
* 📤 Share translations
* 💾 Save previous scans and translations
* 🔄 Retake and rescan images
* 📱 Mobile-first responsive interface
* ⚡ Fast client-side OCR processing
* 🤖 Optional AI backend for enhanced translation

## Main User Flow

```text
Open Camera
     ↓
Take Photo
     ↓
Detect Text
     ↓
OCR Processing
     ↓
Review Extracted Text
     ↓
Select Target Language
     ↓
Translate
     ↓
View / Listen / Copy / Share
```

## Example

A user points the camera at a Japanese menu.

**Detected text:**

寿司セット 1500円

**Translated result:**

Sushi Set — ¥1,500

The user can then listen to the translation, copy it, share it, or save the scan.

## Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Tesseract.js
* Node.js
* Express
* Translation API
* Web Speech API
* React Markdown

## Project Structure

```text
ocr-translator/
├── app/
├── backend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── utils/
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the Vite address shown in the terminal.

## Translation Backend

The application can connect to an external translation or AI backend through:

```env
VITE_API_URL=https://your-backend.example.com
```

If no backend is configured, the application can use its configured fallback translation service.

## Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Status

The project is designed as a production-ready OCR and translation application with a mobile-first camera experience.
