import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className=''>
    <h2
        className=" font-bold text-sm mb-1"
        style={{
          color: resumeInfo?.themeColor || "#ff6666",
          letterSpacing: "0.5px",
        }}
      >
    SKILLS
    </h2>
    <hr className="border-[1px] my-1"
    style={{
      borderColor:resumeInfo?.themeColor ||"#ff6666"
    }}/>
    <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} className='flex  items-center justify-between'>
                <h2 className='text-xs'>{skill.name}</h2>
                <div className='h-2 bg-gray-200 w-[120px]'>
                    <div className='h-2'
                    style={{
                        backgroundColor:resumeInfo?.themeColor ||"#ff6666",
                        width:(skill?.rating * 20) +'%'
                    }}>

                    </div>
                </div>
                </div>
      
        ))}
    </div>
    </div>
  )
}

export default SkillsPreview