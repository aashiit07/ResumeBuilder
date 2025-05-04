// import { createContext } from "react";

// export const ResumeInfoContext=createContext(null);

// context/ResumeInfoContext.js


import React, { createContext, useState } from 'react';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
  const [certificates, setCertificates] = useState([]);

  const addCertificate = (certificate) => {
    setCertificates((prev) => [...prev, certificate]);
  };

  const removeCertificate = (index) => {
    const updatedCertificates = certificates.filter((_, idx) => idx !== index);
    setCertificates(updatedCertificates);
  };

  return (
    <ResumeInfoContext.Provider value={{ certificates, addCertificate, removeCertificate }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
