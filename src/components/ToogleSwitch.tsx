import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

// Properties that the toggleSwitch component can receive
interface ToggleSwitchProps {
  url: string; // URL to be copied to clipboard
  onChange: (checked: boolean) => void;
  onClick?: () => void; // Make onClick optional
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ url, onChange, onClick }) => {
  const [checked, setChecked] = useState(false);

  // Function to Handle the toggle action
  const handleToggle = () => {
    // Update the component state and toggle the checked state.
    setChecked(!checked);
    // Call the onChange callback with the updated checked state
    onChange(!checked);
    // Call the onClick callback if provided
    if (onClick) {
      onClick();
    }
  };

  // Function to handle the clipboard icon click
  const handleClipboardClick = () => {
    // Copy URL to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log("URL copied to clipboard:", url);
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };

  return (
    <div className="flex items-center space-x-2" onClick={handleToggle}>
      {/* Label and Input elements for the switch */}
      <label className="cursor-pointer">
        {/* Hidden checkbox input that is controlled by the component's state */}
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={() => {}}
        />

      </label>
      {/* Clipboard icon */}
      <MdContentCopy
        className="text-primaryBlue cursor-pointer"
        onClick={handleClipboardClick}
      />
    </div>
  );
};

export default ToggleSwitch;
