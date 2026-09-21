import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/Dashboard'
import UploadCertificate from './pages/admin/UploadCertificate'
import CertificateList from './pages/admin/CertificateList'
import VerifierDashboard from './pages/verifier/Dashboard'
import VerifyCertificate from './pages/verifier/VerifyCertificate'
import SuperAdminDashboard from './pages/superadmin/Dashboard'
import PendingColleges from './pages/superadmin/PendingColleges'

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
        
        {/* Super Admin Routes */}
        <Route path="/superadmin" element={
          <ProtectedRoute role="superadmin">
            <SuperAdminDashboard user={user} />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="pending" />} />
          <Route path="pending" element={<PendingColleges />} />
          <Route path="upload" element={<UploadCertificate />} />
          <Route path="certificates" element={<CertificateList />} />
        </Route>

        {/* College Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="college">
            <AdminDashboard user={user} />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="upload" />} />
          <Route path="upload" element={<UploadCertificate />} />
          <Route path="certificates" element={<CertificateList />} />
        </Route>

        {/* Verifier Routes */}
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
