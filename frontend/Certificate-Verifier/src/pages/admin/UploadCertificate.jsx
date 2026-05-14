import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'

export default function UploadCertificate() {
  const [file, setFile] = useState(null)
  const [studentName, setStudentName] = useState('')
  const [course, setCourse] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !studentName || !course) {
      setError('All fields are required')
      return
    }

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('studentName', studentName)
    formData.append('course', course)

    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post('/api/certificates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      setResult(data.certificate)
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upload Certificate</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Certificate File (PDF/Image)</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary transition-colors"
                >
                  {file ? (
                    <div className="text-center">
                      <FileText className="w-10 h-10 mx-auto text-primary mb-2" />
                      <p className="text-sm">{file.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="input-field"
                placeholder="Enter student name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Course Name</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="input-field"
                placeholder="Enter course name"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload & Register
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Display */}
        <div className="glass-card p-6">
          {result ? (
            <div className="text-center animate-fadeIn">
              <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
              <h2 className="text-xl font-bold mb-4">Certificate Registered!</h2>
              
              <div className="bg-dark-300/50 rounded-xl p-4 mb-4">
                <QRCodeSVG 
                  value={result.certificateId} 
                  size={150}
                  className="mx-auto"
                />
              </div>

              <div className="text-left space-y-2 text-sm">
                <p><span className="text-gray-500">Certificate ID:</span> {result.certificateId}</p>
                <p><span className="text-gray-500">Student:</span> {result.studentName}</p>
                <p><span className="text-gray-500">Course:</span> {result.course}</p>
                <p><span className="text-gray-500">Status:</span> 
                  <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                    Verified
                  </span>
                </p>
                <p className="break-all"><span className="text-gray-500">Tx Hash:</span> {result.txHash}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Upload a certificate to see details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
