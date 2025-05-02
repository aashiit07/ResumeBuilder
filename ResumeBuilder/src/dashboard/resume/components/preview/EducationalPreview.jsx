import React from 'react'


const formatDate = (input) => {
  if (!input) return ''; // Safety check for undefined or null input
  const [year, month] = input.split('-');  // Split the string into year and month
  const date = new Date(year, month - 1);  // Create a new date using the year and month
  return date.toLocaleString('default', { month: 'short', year: 'numeric' }).toUpperCase();  // Return formatted month/year
};

function EducationalPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor || "#ff6666"
        }}
      >
        Education
      </h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor || "#ff6666"
      }} />

      {resumeInfo?.education.map((education, index) => (
        <div key={index} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{
              color: resumeInfo?.themeColor || '#ff6666'
            }}
          >
            {education.universityName}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {education?.degree} in {education?.major}
            <span>
              {/* Format and display start date and end date */}
              {formatDate(education.startDate)} - {education.endDate ? formatDate(education.endDate) : 'PRESENT'}
            </span>
          </h2>
          <p className='text-xs my-2'>
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
