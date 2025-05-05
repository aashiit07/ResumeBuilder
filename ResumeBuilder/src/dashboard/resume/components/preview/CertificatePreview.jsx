import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function CertificatePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const themeColor = resumeInfo?.themeColor || "#ff6666";

  // Function to format date as "Month Year"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="mt-2">
      <h2
        className="font-bold text-sm mb-1"
        style={{
          color: resumeInfo?.themeColor || "#ff6666",
          letterSpacing: "0.5px",
        }}
      >
        CERTIFICATIONS
      </h2>
      <hr
        className="border-[1px] my-1"
        style={{ borderColor: resumeInfo?.themeColor || "#ff6666" }}
      />

      {resumeInfo?.certificates?.map((certificate, index) => (
        <div key={index} className="mt-2">
          <div className="flex justify-between items-center">
            <h2
              className="text-sm font-bold cursor-pointer"
              style={{ color: themeColor }}
            >
              {certificate?.certificateURL && (
            <a
              href={certificate.certificateURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm "
              style={{color:resumeInfo?.themeColor||"#ff6666"}}
            >
              {certificate?.certificateName}
            </a>
          )}
              
            </h2>
            <span className="text-xs text-gray-500">
              {formatDate(certificate?.issueDate)}
            </span>
          </div>

          <h2 className="text-xs ">Issued By: {certificate?.issuedBy}</h2>
          
        </div>
      ))}
    </div>
  );
}

export default CertificatePreview;
