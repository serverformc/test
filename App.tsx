import { Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from './components/layout/Shell'
import { HomePage } from './pages/HomePage'
import { LauncherPage } from './pages/LauncherPage'
import { HelpPage } from './pages/HelpPage'

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launcher" element={<LauncherPage />} />
        <Route path="/help" element={<HelpPage />} />
        {/* The old site's help page lived at fix.html. Netlify 301s it via
            public/_redirects; this keeps the same link working in dev too. */}
        <Route path="/fix.html" element={<Navigate to="/help" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  )
}
