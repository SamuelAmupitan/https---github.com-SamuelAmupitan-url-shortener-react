import React, { useRef } from "react";
import QRCode from "qrcode.react";

interface QRCodeComponentProps {
  qrUrl: string;
}

const QrCode: React.FC<QRCodeComponentProps> = ({ qrUrl }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <div className="flex justify-center flex-col items-center gap-3 form-center">
      <div ref={qrCodeRef}>
        <QRCode value={qrUrl} />
      </div>

      <button
        onClick={downloadQRCode}
        className="bg-blue p-1 px-2 rounded-md font-semibold py-4 btn btn-blue"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QrCode;
