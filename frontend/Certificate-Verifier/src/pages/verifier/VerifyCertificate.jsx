import { useState } from 'react'
import { Search, Upload, CheckCircle, XCircle, Loader, FileText, Shield } from 'lucide-react'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [method, setMethod] = useState('id')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const verifyById = async () => {
    if (!certificateId) {
      setError('Please enter a certificate ID')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data } = await axios.post('/api/verify/by-id', { certificateId })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const verifyByFile = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data } = await axios.post('/api/verify/by-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">Verify Certificate</h1>
        <p className="text-gray-400">Check the authenticity of a certificate</p>
      </div>

      {/* Method Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMethod('id')}
          className={`px-6 py-3 rounded-xl transition-all ${
            method === 'id' 
              ? 'bg-gradient-to-r from-primary to-secondary text-white' 
              : 'glass hover:bg-primary/10'
          }`}
        >
          By Certificate ID
        </button>
        <button
          onClick={() => setMethod('file')}
          className={`px-6 py-3 rounded-xl transition-all ${
            method === 'file' 
              ? 'bg-gradient-to-r from-primary to-secondary text-white' 
              : 'glass hover:bg-primary/10'
          }`}
        >
          By File Upload
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="glass-card p-6">
          {method === 'id' ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Certificate ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="input-field pl-12"
                  placeholder="CERT-1234567890-ABC123"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              <button
                onClick={verifyById}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                Verify
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Upload Certificate</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="verify-file"
                />
                <label
                  htmlFor="verify-file"
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
              <button
                onClick={verifyByFile}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                Verify File
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
              <XCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="glass-card p-6">
          {result ? (
            <div className="animate-fadeIn">
              {result.isValid ? (
                <>
                  <div className="text-center mb-6">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-2" />
                    <h2 className="text-xl font-bold text-green-400">Valid Certificate</h2>
                  </div>
                  
                  {result.certificateId && (
                    <div className="bg-dark-300/50 rounded-xl p-4 mb-4">
                      <QRCodeSVG 
                        value={result.certificateId} 
                        size={120}
                        className="mx-auto"
                      />
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    {result.certificate?.studentName && (
                      <p><span className="text-gray-500">Student:</span> {result.certificate.studentName}</p>
                    )}
                    {result.certificate?.course && (
                      <p><span className="text-gray-500">Course:</span> {result.certificate.course}</p>
                    )}
                    {result.certificate?.issueDate && (
                      <p><span className="text-gray-500">Issued:</span> {new Date(result.certificate.issueDate * 1000).toLocaleDateString()}</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <XCircle className="w-16 h-16 mx-auto text-red-400 mb-2" />
                  <h2 className="text-xl font-bold text-red-400">Invalid Certificate</h2>
                  <p className="text-gray-400 mt-2">This certificate is not valid or has been revoked</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Verification result will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
