import React from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaMapPin,
  FaLink,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function PersonalDetailPreview({ resumeInfo }) {
  const handleEmailCopy = () => {
    if (resumeInfo?.email) {
      navigator.clipboard
        .writeText(resumeInfo.email)
        .then(() => {
          toast.success("Email copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy email.");
          console.error("Copy error:", err);
        });
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />

      <h2
        className="font-semibold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor || "#ff6666",
        }}
      >
        {`${resumeInfo?.firstName?.toUpperCase()} ${resumeInfo?.lastName?.toUpperCase()}`}
      </h2>

      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>

      <h2
        className="text-center font-normal text-xs"
        style={{
          color: resumeInfo?.themeColor || "#ff6666",
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between items-center mt-1 mb-2 flex-wrap gap-2">
        <h2
          className="font-normal text-xs flex items-center gap-1"
          style={{ color: resumeInfo?.themeColor || "#ff6666" }}
        >
          <FaPhoneAlt className="text-[10px]" />
          {resumeInfo?.phone}
        </h2>

        {resumeInfo?.link && (
          <a
            href={resumeInfo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1"
            style={{ color: resumeInfo?.themeColor || "#ff6666" }}
            title="LinkedIn Profile"
          >
            <FaLinkedin className="text-base" />
            Linkedin
          </a>
        )}

        <h2
          className="font-normal text-xs flex items-center gap-1 cursor-pointer"
          style={{ color: resumeInfo?.themeColor || "#ff6666" }}
          onClick={handleEmailCopy}
          title="Click to copy email"
        >
          <FaEnvelope className="text-[10px]" />
          {resumeInfo?.email}
        </h2>
        {resumeInfo?.link2 && (
          <a
            href={resumeInfo.link2}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1"
            style={{ color: resumeInfo?.themeColor || "#ff6666" }}
            title="Other Link"
          >
            <FaLink className="text-base" />
            Other
          </a>
        )}
      </div>
    </div>
  );
}

export default PersonalDetailPreview;
