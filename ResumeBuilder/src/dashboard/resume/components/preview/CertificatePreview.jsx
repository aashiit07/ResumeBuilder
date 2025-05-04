import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function CertificatePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const themeColor = resumeInfo?.themeColor || '#ff6666';

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: themeColor }}>
        Certificates
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {resumeInfo?.certificates?.map((certificate, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold' style={{ color: themeColor }}>
            {certificate?.certificateName}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {certificate?.issuedBy}
            <span>{certificate?.issueDate}</span>
          </h2>
          {certificate?.certificateURL && (
            <a
              href={certificate.certificateURL}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs text-blue-600 underline block mt-2'
            >
              View Certificate
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default CertificatePreview;
