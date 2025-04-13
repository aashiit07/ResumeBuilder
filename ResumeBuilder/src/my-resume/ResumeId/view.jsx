import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from "../../../service/GlobalApi";


function ViewResume() {

  const [resumeInfo,setResumeInfo]=useState();
  const {ResumeId}=useParams();

  useEffect(()=>{
    GetResumeInfo();
  },[])
  const  GetResumeInfo=()=>{
    GlobalApi.GetResumeById(ResumeId).then(resp=>{
      console.log(resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }


  const HandleDownload=()=>{
    window.print();
  }
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Resume',
        text: 'Check out my professional resume!',
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully!'))
      .catch((error) => console.log('Sharing failed', error));
    } else {
      alert('Your browser does not support Web Share API');
    }
  };
  
  return (
   <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div id="no-print">
      <Header/>
     <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
      <h2 className='text-center text-2xl font-medium'>Congratsss!! Your Ultimate AI  generated Resume is ready!!</h2>
      <p className='text-center text-gray-400'>No you're ready to download your resume and you can share unique resume url with 
        your frnds and family
      </p>
      <div className='flex justify-between px-44 my-10'>
        <Button onClick={(HandleDownload)}>Download</Button>
        <Button onClick={handleShare}>Share</Button>
      </div>
</div>
     </div>
     <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
     <div id="print-area">
        <ResumePreview/>
      </div>
      </div>
     </ResumeInfoContext.Provider>
  )
}

export default ViewResume