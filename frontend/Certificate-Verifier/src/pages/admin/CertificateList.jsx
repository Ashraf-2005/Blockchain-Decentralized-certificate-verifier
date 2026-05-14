import { useState, useEffect } from 'react'
import { Search, FileText, ExternalLink, CheckCircle, XCircle, Loader } from 'lucide-react'
import axios from 'axios'

export default function CertificateList() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get('/api/certificates/all', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCertificates(data.certificates)
    } catch (err) {
      console.error('Failed to fetch certificates:', err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = certificates.filter(cert => 
    cert.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    cert.certificateId?.toLowerCase().includes(search.toLowerCase()) ||
    cert.course?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Certificates</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-300/50">
                <tr>
                  <th className="text-left p-4 font-medium">Certificate ID</th>
                  <th className="text-left p-4 font-medium">Student Name</th>
                  <th className="text-left p-4 font-medium">Course</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No certificates found
                    </td>
                  </tr>
                ) : (
                  filtered.map((cert, idx) => (
                    <tr key={idx} className="border-t border-gray-700/30 hover:bg-primary/5 transition-colors">
                      <td className="p-4">
                        <span className="font-mono text-sm text-primary">{cert.certificateId}</span>
                      </td>
                      <td className="p-4">{cert.studentName}</td>
                      <td className="p-4">{cert.course}</td>
                      <td className="p-4 text-sm text-gray-400">
                        {new Date(cert.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                          cert.status === 'verified' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {cert.status === 'verified' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {cert.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
