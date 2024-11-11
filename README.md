
# nibo

**nibo** is a web application platform designed for wholesalers to efficiently list their products and specify the stores where they are available. Built with **TypeScript** and styled using **Tailwind CSS**, nibo provides a modern and responsive solution for product and store management.

## Features

- **Product Management**: Wholesalers can add, edit, and organize their products.
- **Store Association**: Products can be linked to specific store locations, giving wholesalers a comprehensive view of product availability.
- **User-Friendly UI**: Clean, responsive design styled with Tailwind CSS for a seamless user experience.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## Getting Started

Follow these steps to set up nibo locally:

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed
- Basic knowledge of TypeScript and Tailwind CSS

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nibo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nibo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server, run:

```bash
npm run dev
```

This command will start the app locally on `http://localhost:3000`.

### Building for Production

To build the app for production, use:

```bash
npm run build
```

The compiled files will be in the `dist` folder.

## Folder Structure

```
nibo/
├── public/           # Static assets
├── src/              # Application source code
│   ├── components/   # Reusable components
│   ├── pages/        # Pages of the application
│   ├── styles/       # Tailwind CSS styles
│   └── App.tsx       # Main app component
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.ts    # Vite configuration
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

