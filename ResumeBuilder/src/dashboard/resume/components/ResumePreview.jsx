import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import CertificatePreview from './preview/CertificatePreview'
function ResumePreview(){


    const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    return(
        <div className='shadow-lg h-full p-14 border-t-[20px] '
        style={{
            borderColor:resumeInfo?.themeColor||"#ff6666"
        }}>
           <PersonalDetailPreview resumeInfo={resumeInfo}/>
           <SummaryPreview resumeInfo={resumeInfo}/>
           {resumeInfo?.experience?.length>0&&  <ExperiencePreview resumeInfo={resumeInfo}/>}
           {resumeInfo?.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo}/>}
           {resumeInfo?.certificates?.length > 0 && <CertificatePreview resumeInfo={resumeInfo} />}
           {resumeInfo?.skills?.length>0&&     <SkillsPreview resumeInfo={resumeInfo}/>}
        </div>
    )
}
export default ResumePreview