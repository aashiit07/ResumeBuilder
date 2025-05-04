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
        <div className='shadow-lg h-full px-10 py-5 border'>
           <PersonalDetailPreview resumeInfo={resumeInfo}/>
           {resumeInfo?.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo}/>}
           <SummaryPreview resumeInfo={resumeInfo}/>
           {resumeInfo?.experience?.length>0&&  <ExperiencePreview resumeInfo={resumeInfo}/>}
           {resumeInfo?.skills?.length>0&&     <SkillsPreview resumeInfo={resumeInfo}/>}
        </div>
    )
}
export default ResumePreview