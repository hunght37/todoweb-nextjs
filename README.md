# Modern Todo App

A modern, feature-rich todo application built with Next.js and TypeScript. This application helps users manage their tasks efficiently with a beautiful and responsive user interface.

## 🌟 Features

- ✅ Create, edit, and delete tasks
- 📊 Task statistics and progress tracking
- 🏷️ Task categorization and priority levels
- 📅 Deadline management
- 🎨 Task templates for quick task creation
- 🌓 Dark/Light mode support
- 📱 Responsive design for all devices
- 💾 Local storage persistence

## 🛠️ Technologies Used

### Core Technologies
- **[Next.js](https://nextjs.org/)** (v13.4) - React framework for production
- **[React](https://reactjs.org/)** (v18.2) - Frontend library
- **[TypeScript](https://www.typescriptlang.org/)** (v5.1) - Type safety and enhanced developer experience

### Styling and UI
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.3) - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- Custom theme system with dark/light mode support

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS compatibility

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/todo-app.git
   ```

2. **Install dependencies**
   ```bash
   cd todo-app
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📦 Project Structure

```
todo-app/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── context/         # React context providers
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles
├── public/              # Static files
└── ...config files
```

## 🎯 Key Features Explained

### Task Management
- Create tasks with title, description, and priority
- Set deadlines and track progress
- Organize tasks with categories
- Mark tasks as complete/incomplete

### Task Templates
- Create reusable task templates
- Quick task creation from templates
- Manage template categories and priorities

### Statistics and Tracking
- View completion rates
- Track tasks by priority and category
- Monitor upcoming deadlines
- Visual progress indicators

## 🔄 GitHub Workflows

This project uses several GitHub Actions workflows to ensure code quality and security:

### 1. CI/CD Pipeline
- 🔄 Automatic builds and tests on every push and pull request
- 🚀 Automatic deployment to Vercel for main branch
- ✅ TypeScript type checking
- 🔍 Linting checks

### 2. Code Quality
- 📊 ESLint for code style enforcement
- 💅 Prettier for code formatting
- 🔍 SonarCloud for code quality analysis
- ⚡ TypeScript strict mode checks

### 3. Dependency Updates
- 📦 Weekly dependency checks (Mondays)
- 🔄 Automatic pull requests for updates
- 🛡️ Security vulnerability patches
- 🤖 Automated version bumps

### 4. Security Scanning
- 🛡️ Snyk vulnerability scanning
- 🔒 GitHub CodeQL analysis
- 📊 npm audit checks
- 🔄 Weekly security reports

### Required Secrets
To enable all workflows, set up these secrets in your GitHub repository:

```bash
# Vercel Deployment
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>

# Code Quality
SONAR_TOKEN=<your-sonar-token>

# Security
SNYK_TOKEN=<your-snyk-token>
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
