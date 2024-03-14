import React, { useState } from "react";
import ToggleSwitch from "../components/ToogleSwitch";
import QRCode from "qrcode.react";
import Qrcode from "./QRcode";
import { FaTimes } from 'react-icons/fa'; // Import the X icon component
import ConfirmationDialog from '../components/ConfirmationDialog';

const ShortLink: React.FC<{
  url: string;
  qrCode: string;
  onDelete: () => void; // Function to handle deletion
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
        }, 2000); // Hide "Copied!" message after 2 seconds
      })
      .catch(error => {
        console.error("Error copying to clipboard:", error);
        setError("Failed to copy URL to clipboard. Please try again."); // Set error message
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
    onDelete(); // Call the onDelete function passed from the parent component
    setIsConfirmationOpen(false); 
  };

  const handleCancelRemove = () => {
    setIsConfirmationOpen(false); 
  };

  return (
    <div className="relative z-0">
      <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
        {/* Attach the handleRemoveShortUrl function to the onClick event */}
        <FaTimes onClick={handleRemoveShortUrl} style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#fff' }} />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 form py-5 qr">
        <div className="flex flex-col items-center">
          <p className="text-sm text-white mb-2">Shortened URL:</p>
          <div className="flex items-center">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{url}</a>
            {copied && <span className="text-green-500 ml-2">Copied!</span>}
            {error && <span className="text-red-500 ml-2">{error}</span>} {/* Display error message */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ToggleSwitch onChange={handleToggle} />
          <p className="text-sm text-white">Copy to Clipboard</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-center">
          <div className="qr-code-container align-middle">
            <Qrcode value={url} />
          </div>
        </div>
      </div>
      {/* Render the ConfirmationDialog component */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default ShortLink;
