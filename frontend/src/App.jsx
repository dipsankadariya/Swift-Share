import React, { useRef, useState, useEffect } from 'react';
import { uploadFile } from './services/api';

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState(''); // Upload status

  const MAX_FILE_SIZE_MB = 100;

  const handleUploadButton = () => {
    setStatus('Selecting file...');
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setStatus('Uploading...');
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          let response = await uploadFile(data);
          setResult(response.path);
          setStatus('Successfully uploaded!');
          console.log("File uploaded:", response);
        } catch (error) {
          console.error("Error uploading file:", error);
          setStatus('Upload failed. Please try again.');
        }
      }
    };

    getImage();
  }, [file]);

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
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />

            {status && (
              <p className="text-base text-gray-700 font-semibold">{status}</p>
            )}

            {result && (
              <div className="pt-10 border-t border-black">
                <p className="text-lg uppercase tracking-widest mb-4">Your share link:</p>
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg break-all underline decoration-1 hover:text-gray-600"
                >
                  {result}
                </a>
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
                  A link will be Generated below.
                </p>
              </div>
              <div className="flex items-start gap-6">
                <span className="text-6xl font-bold">3</span>
                <p className="text-lg leading-tight pt-3">
                  Copy and share the generated link, to Download.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-base uppercase tracking-widest text-gray-500">
            Created by @DipsanKadariya , © 2024 | No Copyright
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
