import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Upload,
  Copy,
  Download,
  Loader2,
  AlertCircle,
  RefreshCw,
  Camera,
} from 'lucide-react';

import Navbar from './components/Navbar';
import History from './components/History';
import Footer from './components/Footer';


import { ModelService } from './services/modelService';
import { useHistory } from './hooks/useHistory';
import type { HistoryEntry } from './hooks/useHistory';
import { validateImageFile } from './utils/fileValidation';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Pricing from './pages/Pricing';
import Success from './pages/Success';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import WritingTools from './pages/WritingTools';
import Privacy from './pages/Privacy';
import ResetPassword from './pages/ResetPassword';
import FunBlogPostPage from './pages/FunBlogPostPage';
import ImageCaptureDialogDesktop from './components/ImageCaptureDialogDesktop';
import ImageCaptureDialogMobile from './components/ImageCaptureDialogMobile';
import ProtectedRoute from "./components/ProtectedRoute";

interface OCRResult {
  text: string;
  confidence: number;
  source: 'tesseract' | 'tf' | 'combined';
}

function ToolTabs() {
  return (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex rounded-xl border border-[#DDD2C7] bg-white p-1">
        <Link
          to="/dashboard"
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[#6B625B] hover:bg-[#F7F2EC]"
        >
          Dashboard
        </Link>

        <Link
          to="/app"
          className="rounded-lg bg-[#35D07F] px-5 py-2.5 text-sm font-semibold text-[#07140D]"
        >
          Scanner
        </Link>

        <Link
          to="/camera"
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-[#6B625B] hover:bg-[#F7F2EC]"
        >
          Camera
        </Link>
      </div>
    </div>
  );
}
function MainContent() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [editableText, setEditableText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [modelStatus, setModelStatus] = useState<string>(
    'Initializing models...'
  );
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { history, addEntry, removeEntry, clearHistory } = useHistory();
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    const initializeModels = async () => {
      try {
        const modelService = ModelService.getInstance();
        await modelService.ready;

        if (!cancelled) {
          setModelStatus(
            modelService.isEnhanced()
             ? 'Ready to scan (custom model active)'
             : 'Ready to scan'
          );
        }
      } catch (error) {
        console.error('Model initialization error:', error);

        if (!cancelled) {
          setModelStatus(
            'Error initializing models. Some features may be limited.'
          );
        }
      }
    };

    initializeModels();

    return () => {
      cancelled = true;
    };
  }, []);

  const loadAndProcessFile = (file: File) => {
    const validation = validateImageFile(file);

    if (!validation.valid) {
      setUploadError(
        validation.error ?? 'This file cannot be processed.'
      );
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    setOcrResult(null);
    setEditableText('');
    setProcessingStatus('');

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      loadAndProcessFile(file);
    }
  };

  const handleReselect = () => {
    setImage(null);
    setSelectedFile(null);
    setOcrResult(null);
    setEditableText('');
    setProcessingStatus('');
    setUploadError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processImage = async (imageFile: File) => {
    setIsProcessing(true);
    setProcessingStatus('Processing image...');

    try {
      const modelService = ModelService.getInstance();
      const result = await modelService.processImage(imageFile);

      const newResult = {
        text: result.text,
        confidence: result.confidence,
        source: (
          modelService.isEnhanced() ? 'combined' : 'tesseract'
        ) as OCRResult['source'],
      };

      setOcrResult(newResult);
      setEditableText(newResult.text);
      addEntry(newResult);
      setProcessingStatus('');
    } catch (error) {
      console.error('Processing Error:', error);
      setProcessingStatus('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunOCR = () => {
    if (selectedFile) {
      processImage(selectedFile);
    }
  };

  const selectFromHistory = (entry: HistoryEntry) => {
    if (entry.imageData) {
      setImage(entry.imageData);
      setSelectedFile(null);
      setOcrResult(null);
      setEditableText('');
      setProcessingStatus('');
      setUploadError(null);
      return;
    }

    setEditableText(entry.text);
  };

  return (
    <div className="flex min-h-screen">
      <History
        history={history}
        onSelect={selectFromHistory}
        onRemove={removeEntry}
        onClear={clearHistory}
        isOpen={isHistoryOpen}
        onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
      />

      <div
        className={`flex-1 min-h-screen bg-[#F7F2EC] transition-all duration-300 ${
          isHistoryOpen ? 'ml-64' : 'ml-0'
        }`}
      >

        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ToolTabs />
            <div className="text-center mb-8 paper-card p-8">
             <h1 className="mt-3 text-4xl font-bold text-[#2f241f]">
               NOAH AI Visual Scanner
            </h1>

            <p className="mt-4 text-lg text-[#5c493d] opacity-80">
               Upload, drag and drop, or capture an image to recognize text and
               turn it into editable digital content.
            </p>

              {modelStatus && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    modelStatus.includes('Error')
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  <p className="flex items-center justify-center">
                    {modelStatus.includes('Error') && (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    )}
                    {modelStatus}
                  </p>
                </div>
              )}
            </div>

            <div className="notebook-paper p-8">
              {uploadError && (
                <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-700">
                  <p className="flex items-center justify-center text-center">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    {uploadError}
                  </p>
                </div>
              )}

              <div
                className="border-2 border-dashed border-[var(--text-brown)] rounded-lg p-12 text-center bg-[var(--paper-bg)]"
                onDrop={(e) => {
                  e.preventDefault();

                  const file = e.dataTransfer.files[0];

                  if (file) {
                    loadAndProcessFile(file);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {!image ? (
                  <>
                    <Upload className="mx-auto h-16 w-16 text-[var(--text-brown)] opacity-60" />

                    <div className="mt-6">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="upload-button px-6 py-3 text-lg font-medium rounded-xl"
                      >
                        Select Image
                      </button>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    <p className="mt-4 text-lg text-[var(--text-brown)] opacity-70">
                      or drag and drop your image here
                    </p>
                  </>
                ) : (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="max-h-96 mx-auto rounded-lg shadow-lg"
                    />

                    <button
                      onClick={handleReselect}
                      className="absolute top-4 right-4 upload-button p-2 rounded-full bg-white shadow-lg hover:bg-[var(--cream-bg)]"
                      title="Select new image"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>

                    {!isProcessing && !ocrResult && selectedFile && (
                      <div className="mt-6">
                        <button
                          onClick={handleRunOCR}
                          className="upload-button px-6 py-3 text-lg font-medium rounded-xl"
                        >
                          Run OCR
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isProcessing && (
                <div className="mt-8 text-center">
                  <Loader2 className="animate-spin h-10 w-10 mx-auto text-[var(--text-brown)]" />

                  <p className="mt-4 text-lg text-[var(--text-brown)] opacity-70">
                    {processingStatus}
                  </p>
                </div>
              )}

              {ocrResult && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-medium text-[var(--text-brown)]">
                        Recognized Text
                      </h3>

                      <p className="text-sm text-[var(--text-brown)] opacity-70">
                        Confidence: {ocrResult.confidence.toFixed(1)}%
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(editableText)
                        }
                        className="upload-button px-4 py-2 rounded-lg flex items-center"
                      >
                        <Copy className="h-5 w-5 mr-2" />
                        Copy
                      </button>

                      <button
                        onClick={() => {
                          const blob = new Blob([editableText], {
                            type: 'text/plain',
                          });

                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');

                          a.href = url;
                          a.download = 'ocr-result.txt';

                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);

                          URL.revokeObjectURL(url);
                        }}
                        className="upload-button px-4 py-2 rounded-lg flex items-center"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    className="block w-full rounded-xl p-4 bg-[var(--paper-bg)] border-2 border-[var(--text-brown)] text-[var(--text-brown)] min-h-[200px] shadow-inner"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

function CameraPage() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto flex flex-col items-center px-4 py-8 h-screen">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            NOAH Camera Scanner
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience seamless image capture with our responsive camera component.
            Optimized for both desktop and mobile devices with intelligent UI adaptation.
          </p>
        </div>

        <div className="max-w-4xl flex-1 w-full h-full">
          <div className="bg-white dark:bg-slate-800 h-full flex items-center justify-center rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            <div className="text-center">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
  className="h-12 bg-[#35D07F] hover:bg-[#2DBA70] text-[#07140D] px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Launch Camera
                </button>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {isMobile
                    ? 'Mobile-optimized interface'
                    : 'Desktop-enhanced experience'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? (
        <ImageCaptureDialogMobile
          open={open}
          onOpenChange={() => setOpen(false)}
        />
      ) : (
        <ImageCaptureDialogDesktop
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/camera" element={<CameraPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<MainContent />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/writing-tools" element={<WritingTools />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/blog" element={<FunBlogPostPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;