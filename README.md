# Face Recognition Photo Matcher

This project is a web application that allows users to upload photos, extract facial features using face-api.js, and match uploaded photos against stored images. It uses SvelteKit for the frontend and Node.js with Express for the backend to handle file uploads.

## Features

- Upload images and extract facial features
- Store facial features and filenames in localStorage
- Search for matches by uploading an image
- Display matched images with a percentage match

## Technologies Used

- SvelteKit
- face-api.js
- Node.js
- HTML, CSS, JavaScript/TypeScript

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/photomatcher.git
   cd photomatcher
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```


3. **Start the SvelteKit development server:**

   ```bash
   npm run dev
   ```

### Usage

1. **Upload Images:**

   - Navigate to the upload section of the web app.
   - Select and upload images. Extracted facial features will be stored in `localStorage` and the images should be copied to userdata folder in static.

2. **Search for Matches:**

   - Navigate to the search section of the web app.
   - Upload an image to search for matches. The app will display matched images with a percentage match.

### Project Structure

- `src/`: Contains Svelte components and client-side code.
  - `components/`: Contains reusable Svelte components.
  - `routes/`: Contains route-specific Svelte components.
- `static/`: Contains static files like the face-api.js models.
- `userdata/`: Directory where uploaded images are stored.


### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements

- [SvelteKit](https://kit.svelte.dev/)
- [face-api.js](https://github.com/justadudewhohacks/face-api.js)