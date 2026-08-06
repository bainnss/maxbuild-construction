import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import BrandTheme from './components/common/BrandTheme'
import AppBootstrap from './components/common/AppBootstrap'
import AppRoutes from './routes'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppBootstrap />
          <BrandTheme />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  )
}
