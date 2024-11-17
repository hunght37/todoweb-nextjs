import './globals.css'
import { Inter } from 'next/font/google'
import { metadata } from './metadata'
import { ThemeProvider } from '../context/ThemeContext'
import { TemplateProvider } from '../context/TemplateContext'
import ThemeToggle from '../components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <TemplateProvider>
            <div className="min-h-screen bg-[var(--theme-background)] text-[var(--theme-text)] transition-colors duration-200">
              <header className="bg-white/80 dark:bg-gray-800/90 shadow-sm backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                  <h1 className="text-2xl font-semibold text-[var(--theme-text)]">Todo App</h1>
                  <ThemeToggle />
                </div>
              </header>
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
          </TemplateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
