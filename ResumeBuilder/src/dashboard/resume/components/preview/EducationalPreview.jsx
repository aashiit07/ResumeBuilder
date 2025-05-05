import React from 'react'


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.getFullYear();
};


function EducationalPreview({ resumeInfo }) {
  return (
    <div className='my-4'>
      <h2 className=' font-bold text-sm '
      style={{
        color:resumeInfo?.themeColor ||"#ff6666",
        letterSpacing: "0.5px"
      }}>
        EDUCATION
      </h2>
      <hr
        className='border-[1px] my-1'
        style={{
          borderColor: resumeInfo?.themeColor || "#ff6666"
        }}
      />

      {resumeInfo?.education.map((education, index) => (
        <div key={index} className='my-2'>
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
          {/* <p className='text-xs my-2'>
            {education?.description}
          </p> */}
          {education?.cgpa && (
            <p className='text-xs font-semibold'>
              CGPA / Marks: {education?.cgpa}
            </p>
          )}

        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;