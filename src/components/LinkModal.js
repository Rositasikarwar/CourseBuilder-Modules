import React, { useState } from "react";

const LinkModal = ({ onClose, onAddLink }) => {
  const [url, setUrl] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleAddLink = () => {
    onAddLink({ url, displayName });
    setUrl("");
    setDisplayName("");
  };

  return (
    <div className="modal-overlay">
      <div className="link-modal">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
        <div className="button-container">
          <button
            className="style-button"
            style={{
              backgroundColor: "black",
              float: "unset",
              padding: "9px",
              marginRight: "15px",
              paddingRight: "20px",
              fontSize: "16px",
            }}
            onClick={handleAddLink}
          >
            Create
          </button>
          <button
            className="style-button"
            style={{
              backgroundColor: "black",
              float: "unset",
              padding: "9px",
              marginLeft: "15px",
              paddingRight: "20px",
              fontSize: "16px",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
