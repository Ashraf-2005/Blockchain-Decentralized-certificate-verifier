import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Loader, Users, Building2 } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function PendingColleges() {
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const [pendingRes, approvedRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/api/superadmin/pending-colleges`, { headers }),
        axios.get(`${API_URL}/api/superadmin/approved-colleges`, { headers }),
        axios.get(`${API_URL}/api/superadmin/stats`, { headers })
      ])

      setPending(pendingRes.data.pending)
      setApproved(approvedRes.data.approved)
      setStats(statsRes.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleApprove = async (email) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${API_URL}/api/superadmin/approve-college/${encodeURIComponent(email)}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchData()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to approve')
    }
  }

  const handleReject = async (email) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${API_URL}/api/superadmin/reject-college/${encodeURIComponent(email)}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchData()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reject')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-3xl font-bold">{stats.pendingColleges}</p>
                <p className="text-sm text-gray-400">Pending</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-3xl font-bold">{stats.approvedColleges}</p>
                <p className="text-sm text-gray-400">Approved Colleges</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-3xl font-bold">{stats.verifiers}</p>
                <p className="text-sm text-gray-400">Verifiers</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
                <p className="text-sm text-gray-400">Total Users</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Pending Colleges */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Pending College Registrations</h2>
        {pending.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Users className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No pending registrations</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((college) => (
              <div key={college.id} className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{college.name}</h3>
                    <p className="text-sm text-gray-400">{college.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                      Pending Approval
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(college.email)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(college.email)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Colleges */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Approved Colleges</h2>
        {approved.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Building2 className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No approved colleges yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approved.map((college) => (
              <div key={college.id} className="glass-card p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-green-400" />
                  <div>
                    <h3 className="font-bold">{college.name}</h3>
                    <p className="text-sm text-gray-400">{college.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                      ✓ Approved
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
