import { useState } from 'react'
import { Search, Upload, CheckCircle, XCircle, Loader, FileText, Shield, AlertCircle } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import axios from 'axios'
import { validateFile } from '../../utils/hashFile'
import Toast from '../../components/Toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [method, setMethod] = useState('file')
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile, 10);
    if (!validation.valid) {
      setError(validation.error);
      showToast(validation.error, 'error');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
    console.log('✅ File selected:', selectedFile.name);
  };

  const verifyById = async () => {
    if (!certificateId.trim()) {
      const errorMsg = 'Please enter a certificate ID';
      setError(errorMsg);
      showToast(errorMsg, 'error');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      showToast('Verifying certificate...', 'info');

      const { data } = await axios.post(`${API_URL}/api/verify/by-id`, {
        certificateId
      });

      if (data.isValid) {
        setResult({
          isValid: true,
          certificateId: data.certificate.certificateId,
          certificate: {
            studentName: data.certificate.studentName,
            course: data.certificate.course,
            issueDate: data.certificate.issueDate,
            issuedBy: data.certificate.issuedBy,
            ipfsHash: data.certificate.ipfsHash
          },
          verifiedAt: new Date().toISOString()
        });
        showToast('✅ Certificate verified successfully!', 'success');
      } else {
        setResult({
          isValid: false,
          error: data.error || 'Certificate not found'
        });
        showToast('❌ ' + (data.error || 'Certificate not found'), 'error');
      }
    } catch (err) {
      console.error('❌ Verification error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Verification failed';
      setError(errorMsg);
      showToast(errorMsg, 'error');
      setResult({
        isValid: false,
        error: errorMsg
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyByFile = async () => {
    if (!file) {
      const errorMsg = 'Please select a file to verify';
      setError(errorMsg);
      showToast(errorMsg, 'error');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('🔄 Starting verification process...');
      showToast('Verifying certificate...', 'info');

      const formData = new FormData();
      formData.append('file', file);

      console.log('📤 Sending file to backend...');
      const { data } = await axios.post(`${API_URL}/api/verify/by-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('✅ Backend response received:', data);

      const isValid = data.isValid && 
                     data.certificate.issueDate !== '0' &&
                     data.certificate.studentName !== '';

      setResult({
        isValid,
        certificateId: data.certificate.certificateId,
        certificate: {
          studentName: data.certificate.studentName,
          course: data.certificate.course,
          issueDate: data.certificate.issueDate,
          issuedBy: data.certificate.issuedBy,
          ipfsHash: data.certificate.ipfsHash
        },
        fileHash: data.fileHash,
        verifiedAt: new Date().toISOString()
      });

      if (isValid) {
        showToast('✅ Certificate verified successfully!', 'success');
      } else {
        showToast('❌ Certificate not found or invalid', 'error');
      }
    } catch (err) {
      console.error('❌ Verification error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Verification failed';
      setError(errorMsg);
      showToast(errorMsg, 'error');
      
      setResult({
        isValid: false,
        error: errorMsg
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setCertificateId('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: '' })} 
        />
      )}

      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">Verify Certificate</h1>
        <p className="text-gray-400">Check the authenticity of a certificate on the blockchain</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => {
            setMethod('id');
            handleReset();
          }}
          className={`px-6 py-3 rounded-xl transition-all ${
            method === 'id' 
              ? 'bg-gradient-to-r from-primary to-secondary text-white' 
              : 'glass hover:bg-primary/10'
          }`}
        >
          By Certificate ID
        </button>
        <button
          onClick={() => {
            setMethod('file');
            handleReset();
          }}
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
                  disabled={loading}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              <button
                onClick={verifyById}
                disabled={loading || !certificateId.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Verify
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Upload Certificate (PDF, JPG, PNG)</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="verify-file"
                  disabled={loading}
                />
                <label
                  htmlFor="verify-file"
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-colors ${
                    loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary'
                  } ${file ? 'border-primary' : 'border-primary/30'}`}
                >
                  {file ? (
                    <div className="text-center">
                      <FileText className="w-10 h-10 mx-auto text-primary mb-2" />
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload certificate</p>
                      <p className="text-xs text-gray-600 mt-1">Max 10MB</p>
                    </div>
                  )}
                </label>
              </div>
              <button
                onClick={verifyByFile}
                disabled={loading || !file}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Verify File
                  </>
                )}
              </button>
              {file && !loading && (
                <button
                  onClick={handleReset}
                  className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear and select another file
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          {result ? (
            <div className="animate-fadeIn">
              {result.isValid ? (
                <>
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-2" />
                      <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full"></div>
                    </div>
                    <h2 className="text-xl font-bold text-green-400">✅ Valid Certificate</h2>
                    <p className="text-sm text-gray-400 mt-1">Verified on blockchain</p>
                  </div>
                  
                  {result.certificateId && (
                    <div className="bg-dark-300/50 rounded-xl p-4 mb-4">
                      <QRCodeSVG 
                        value={result.certificateId} 
                        size={120}
                        className="mx-auto"
                        bgColor="transparent"
                        fgColor="#cdd6f4"
                      />
                    </div>
                  )}

                  <div className="space-y-3 text-sm">
                    {result.certificate?.studentName && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Student:</span>
                        <span className="font-medium">{result.certificate.studentName}</span>
                      </div>
                    )}
                    {result.certificate?.course && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Course:</span>
                        <span className="font-medium">{result.certificate.course}</span>
                      </div>
                    )}
                    {result.certificate?.issueDate && result.certificate.issueDate !== '0' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Issued:</span>
                        <span className="font-medium">
                          {new Date(Number(result.certificate.issueDate) * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {result.fileHash && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Hash:</span>
                        <span className="font-mono text-xs">{result.fileHash.slice(0, 10)}...{result.fileHash.slice(-8)}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="relative inline-block">
                    <XCircle className="w-16 h-16 mx-auto text-red-400 mb-2" />
                    <div className="absolute inset-0 bg-red-400/20 blur-xl rounded-full"></div>
                  </div>
                  <h2 className="text-xl font-bold text-red-400">❌ Invalid Certificate</h2>
                  <p className="text-gray-400 mt-2">
                    {result.error || 'This certificate was not found on the blockchain or has been revoked'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Verification result will appear here</p>
                <p className="text-xs text-gray-600 mt-2">Upload a certificate to verify its authenticity</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {import.meta.env.DEV && (
        <div className="mt-8 glass-card p-4 text-xs text-gray-500">
          <p className="font-bold mb-2">Debug Info:</p>
          <p>File: {file?.name || 'None'}</p>
          <p>Loading: {loading ? 'Yes' : 'No'}</p>
          <p>Error: {error || 'None'}</p>
          <p>Result: {result ? 'Present' : 'None'}</p>
        </div>
      )}
    </div>
  )
}
