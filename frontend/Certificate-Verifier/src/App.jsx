import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/Dashboard'
import UploadCertificate from './pages/admin/UploadCertificate'
import CertificateList from './pages/admin/CertificateList'
import VerifierDashboard from './pages/verifier/Dashboard'
import VerifyCertificate from './pages/verifier/VerifyCertificate'

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const ProtectedRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" />
    if (role && user.role !== role) return <Navigate to="/login" />
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard user={user} />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="upload" />} />
          <Route path="upload" element={<UploadCertificate />} />
          <Route path="certificates" element={<CertificateList />} />
        </Route>

        <Route path="/verifier" element={
          <ProtectedRoute role="verifier">
            <VerifierDashboard user={user} />
          </ProtectedRoute>
        }>
          <Route index element={<VerifyCertificate />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
