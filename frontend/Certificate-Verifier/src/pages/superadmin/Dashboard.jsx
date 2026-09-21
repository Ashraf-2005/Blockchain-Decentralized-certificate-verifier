import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Shield, FileCheck, Users, LogOut } from 'lucide-react'

export default function SuperAdminDashboard({ user }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300">
      <nav className="glass border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold gradient-text">DCVS Super Admin</h1>
              <p className="text-sm text-gray-400">{user?.name || user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Link
            to="/superadmin/pending"
            className="flex items-center gap-2 px-6 py-3 glass hover:bg-primary/10 rounded-xl transition-colors"
          >
            <Users className="w-5 h-5" />
            Pending Colleges
          </Link>
          <Link
            to="/superadmin/upload"
            className="flex items-center gap-2 px-6 py-3 glass hover:bg-primary/10 rounded-xl transition-colors"
          >
            <FileCheck className="w-5 h-5" />
            Upload Certificate
          </Link>
          <Link
            to="/superadmin/certificates"
            className="flex items-center gap-2 px-6 py-3 glass hover:bg-primary/10 rounded-xl transition-colors"
          >
            <FileCheck className="w-5 h-5" />
            All Certificates
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
