import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { 
  Upload, 
  FileCheck, 
  LayoutDashboard, 
  LogOut, 
  Shield,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export default function AdminDashboard({ user }) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navItems = [
    { to: '/admin/upload', icon: Upload, label: 'Upload Certificate' },
    { to: '/admin/certificates', icon: FileCheck, label: 'All Certificates' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} sidebar min-h-screen transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-xl gradient-text">DCVS Admin</span>}
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">{user?.name?.[0] || 'A'}</span>
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-item w-full text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-4 p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Outlet />
      </main>
    </div>
  )
}
