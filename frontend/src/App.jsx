import React, { useRef, useState, useEffect } from 'react';
import { uploadFile } from './services/api';

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const MAX_FILE_SIZE_MB = 100;

  const handleUploadButton = () => {
    setResult('');
    setStatus('Selecting file...');
    fileInputRef.current.value = '';
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setStatus('');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setStatus(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
      return;
    }

    setFile(selectedFile);
  };

  useEffect(() => {
    const upload = async () => {
      if (file) {
        setStatus('Uploading...');
        setProgress(0);

        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await uploadFile(data, (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          });
          setResult(response.path);
          setStatus('Successfully uploaded!');
        } catch {
          setStatus('Upload failed. Please try again.');
        }
      }
    };
    upload();
  }, [file]);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-mono">
      <header className="w-full pt-12 pb-16 px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-black uppercase">
          Swift Share
        </h1>
        <p className="mt-4 text-sm text-gray-600">
          This website is hosted on a free-tier hosting platform. Due to this, if inactive for a long time, the service might get paused. If it doesn't work the first time, please refresh the page and try again.
        </p>
      </header>

      <main className="flex-grow px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <section className="space-y-10">
            <p className="text-lg uppercase tracking-widest">
              Upload and share files instantly
            </p>

            <button
              onClick={handleUploadButton}
              className="w-full py-6 px-8 bg-black text-white hover:bg-gray-900 transition-colors duration-300 text-lg uppercase tracking-widest"
            >
              Select File
            </button>

            <p className="mt-2 text-sm uppercase tracking-widest text-gray-500">
              Max file size: {MAX_FILE_SIZE_MB}MB
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {status && (
              <p className="text-base text-gray-700 font-semibold">{status}</p>
            )}

            {progress > 0 && progress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-black h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {result && (
              <div className="pt-10 border-t border-black">
                <p className="text-lg uppercase tracking-widest mb-4">Your share link:</p>
                <div className="bg-gray-100 border border-black p-4 rounded-lg flex items-center justify-between">
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-semibold break-all underline"
                  >
                    {result}
                  </a>
                  <button
                    onClick={handleCopy}
                    className="ml-4 bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="space-y-10">
            <h2 className="text-lg uppercase tracking-widest">How it works</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <span className="text-6xl font-bold">1</span>
                <p className="text-lg leading-tight pt-3">
                  Select the file to share.
                </p>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-6xl font-bold">2</span>
                <p className="text-lg leading-tight pt-3">
                  Wait for the upload to complete for few seconds.
                  A link will be generated below.
                </p>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-6xl font-bold">3</span>
                <p className="text-lg leading-tight pt-3">
                  Copy and share the generated link to download.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-base uppercase tracking-widest text-gray-500">
            Created by @DipsanKadariya, © {new Date().getFullYear()} | No Copyright
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
