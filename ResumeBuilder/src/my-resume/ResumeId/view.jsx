import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from "../../../service/GlobalApi";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { ResumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(ResumeId).then(resp => {
      console.log(resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }

  const HandleDownload = () => {
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
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard! Share it anywhere.'))
        .catch(() => alert('Could not copy link automatically. Please copy it manually from the address bar.'));
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className='my-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
          <div className='bg-white rounded-lg shadow-md p-6 md:p-8'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>Congratulations! 🎉</h2>
              <h3 className='text-xl font-medium text-gray-700 mb-4'>Your AI-generated resume is ready!</h3>
              <p className='text-gray-500 max-w-2xl mx-auto'>
                Download your professional resume or share the unique URL with potential employers, friends, and family.
              </p>
            </div>
            
            <div className='flex flex-col sm:flex-row justify-center gap-4 mb-8'>
              <Button 
                onClick={HandleDownload}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-sm'
              >
                Download PDF
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline"
                className='border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors shadow-sm'
              >
                Share Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='mb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div id="print-area" className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <ResumePreview />
        </div>
        
        
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume