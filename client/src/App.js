import { useState, useEffect, useRef } from "react";
import { uploadFile } from "./service/api";
import "./App.css";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  const [fileType, setFileType] = useState("file"); // file, video, audio
  const [sharedLinks, setSharedLinks] = useState([]);

  const fileInputRef = useRef();

  const placeholderImage =
    "https://static.vecteezy.com/system/resources/thumbnails/030/756/332/small_2x/black-orange-red-3d-abstract-wallpaper-ai-generative-free-photo.jpg";

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
        setSharedLinks((prev) => [...prev, response.path]);
      }
    };
    uploadImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="app-container">
      {/* Banner Section */}
      <header className="app-header">
        <h1>FILE EASE</h1>
        <p>Share files instantly and seamlessly!</p>
      </header>

      {/* Upload Card Section */}
      <div className="card">
        <img src={placeholderImage} alt="Placeholder" className="img" />
        <h2>File Sharing Made Easy</h2>
        <p>Upload your file and share the download link instantly.</p>

        <div className="file-type-container">
          <label>
            <input
              type="radio"
              name="fileType"
              value="file"
              checked={fileType === "file"}
              onChange={(e) => setFileType(e.target.value)}
            />
            File
          </label>
          <label>
            <input
              type="radio"
              name="fileType"
              value="video"
              checked={fileType === "video"}
              onChange={(e) => setFileType(e.target.value)}
            />
            Video
          </label>
          <label>
            <input
              type="radio"
              name="fileType"
              value="audio"
              checked={fileType === "audio"}
              onChange={(e) => setFileType(e.target.value)}
            />
            Audio
          </label>
        </div>

        <button className="upload-btn" onClick={onUploadClick}>
          Choose {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept={
            fileType === "file"
              ? "*"
              : fileType === "video"
                ? "video/*"
                : "audio/*"
          }
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && (
          <div className="result-container">
            <div className="result-box">
              <a href={result} target="_blank" rel="noopener noreferrer">
                {result}
              </a>
            </div>
            <button className="copy-btn" onClick={copyToClipboard}>
              {copyStatus ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {/* Previous Shared Links Section */}
      {sharedLinks.length > 0 && (
        <div className="shared-links">
          <h3>Previous Shared Links</h3>
          <ul>
            {sharedLinks.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
