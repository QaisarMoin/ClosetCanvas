# Wardrobe Gallery Hub

A modern, responsive item management system built with React, TypeScript, and shadcn/ui. Organize, manage, and showcase your wardrobe items with an intuitive and beautiful interface.

## 🚀 Features

- **Item Management**: Add, view, and organize your wardrobe items
- **Modern UI**: Beautiful interface built with shadcn/ui components
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Image Support**: Upload and manage multiple images for each item
- **Search & Filter**: Easily find specific items in your collection
- **TypeScript**: Full type safety for better development experience

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **bun** (package manager)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd wardrobe-gallery-hub-main
```

### 2. Install Dependencies

Choose one of the following package managers:

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

**Using bun:**
```bash
bun install
```

### 3. Start the Development Server

**Using npm:**
```bash
npm run dev
```

**Using yarn:**
```bash
yarn dev
```

**Using bun:**
```bash
bun dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ItemModal.tsx   # Item detail modal
│   └── Navigation.tsx  # Navigation component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Application pages
│   ├── Index.tsx       # Home page
│   ├── ViewItems.tsx   # Items gallery
│   ├── AddItems.tsx    # Add new items
│   └── NotFound.tsx    # 404 page
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. You can customize the design by modifying:
- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles
- Component-specific classes in individual files

### Components
All UI components are built with shadcn/ui. You can add new components using:
```bash
npx shadcn@latest add [component-name]
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy Options
- **Vercel**: Connect your GitHub repository to Vercel for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder to Netlify
- **GitHub Pages**: Use GitHub Actions to deploy to GitHub Pages
- **Any static hosting service**: Upload the contents of `dist/` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/wardrobe-gallery-hub/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) for the amazing frontend library
