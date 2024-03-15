import React, { useState } from "react";
import ToggleSwitch from "../components/ToogleSwitch";
import { FaTimes } from 'react-icons/fa';
import ConfirmationDialog from '../components/ConfirmationDialog';
// import QRCode from "qrcode.react"; 
import QRcode from '../components/QRcode'

const ShortLink: React.FC<{
  url: string;
  qrCode: string;
  onDelete: () => void;
}> = ({ url, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(error => {
        console.error("Error copying to clipboard:", error);
        setError("Failed to copy URL to clipboard. Please try again.");
      });
  };

  const handleToggle = (checked: boolean) => {
    if (checked) {
      copyToClipboard();
    }
  };

  const handleRemoveShortUrl = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmRemove = () => {
    onDelete();
    setIsConfirmationOpen(false); 
  };

  const handleCancelRemove = () => {
    setIsConfirmationOpen(false); 
  };

  return (
    <div className="relative z-0">
      <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
        <FaTimes onClick={handleRemoveShortUrl} style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#fff' }} />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 form py-5 qr">
        <div className="flex flex-col items-center">
          <p className="text-sm text-white mb-2">Shortened URL:</p>
          <div className="flex items-center">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{url}</a>
            {copied && <span className="text-green-500 ml-2">Copied!</span>}
            {error && <span className="text-red-500 ml-2">{error}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ToggleSwitch onChange={handleToggle} url={url} /> {/* Pass url prop to ToggleSwitch */}
          <p className="text-sm text-white">Copy to Clipboard</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center">
          <div className="qr-code-container align-middle">
            <QRcode qrUrl={url} /> 
          </div>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default ShortLink;
