import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <>
    <h2 className=' font-bold text-sm '
      style={{
        color:resumeInfo?.themeColor ||"#ff6666",
        letterSpacing: "0.5px"
      }}>
        SUMMARY
      </h2>
      <hr
        className='border-[1px] my-1'
        style={{
          borderColor: resumeInfo?.themeColor || "#ff6666"
        }}
      />

      <p className='text-xs'>
        {resumeInfo?.summery}
        </p>
        
    </>
    

  )
}

export default SummaryPreview