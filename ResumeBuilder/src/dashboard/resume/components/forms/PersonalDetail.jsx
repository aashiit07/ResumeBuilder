import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function PersonalDetail({enableNext}) {
   
    const params=useParams();

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const [formData, setFormData] = useState();
   
    const[loading,setLoading]=useState(false)
    console.log(resumeInfo?.themeColor)


     useEffect(()=>{
      console.log("---",resumeInfo)

    },[resumeInfo])


    const handleInputChange=(e)=>{
        enableNext(false)
        const {name,value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }
      
    const onSave=(e)=>{
        e.preventDefault()
        console.log("Form submitted! 🎯"); 
        console.log("Sending this data to Strapi:", formData);
        setLoading(true)
        const data={
            data:formData
        }

        console.log("Updating resume with ID:", params?.ResumeId);
console.log("Data:", data);

        GlobalApi.UpdateResumeDetail(params?.ResumeId,data).then(resp=>{
            console.log(resp);
            enableNext(true)
            setLoading(false)
            toast("Details updated ✅!")
        },(error)=>{
            console.error("Update failed:", error);
            setLoading(false)
            toast("Update failed ❌");
        })
    }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with basic information</p>
          
          <form onSubmit={onSave}>
            <div className='grid grid-cols-2  mt-5 gap-3'>
                <div>
                    <label className='text-sm'>
                        First Name
                    </label>
                   <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}/>
                </div>

                <div>
                    <label className='text-sm'>
                        Last Name
                    </label>
                   <Input name="lastName" required onChange={handleInputChange}
                    defaultValue={resumeInfo?.lastName}/>
                </div>

                <div className='col-span-2'>
                    <label className='text-sm'>
                        Job Title
                    </label>
                   <Input name="jobTitle" required  defaultValue={resumeInfo?.jobTitle}
                    onChange={handleInputChange}/>
                </div>

                <div className='col-span-2'>
                    <label className='text-sm'>
                       Address
                    </label>
                   <Input name="address" required  defaultValue={resumeInfo?.address}
                    onChange={handleInputChange}/>
                </div>

                <div >
                    <label className='text-sm'>
                      Phone Number
                    </label>
                   <Input name="phone" required  defaultValue={resumeInfo?.phone}
                   onChange={handleInputChange}/>
                </div>

                <div>
                    <label className='text-sm'>
                      Email
                    </label>
                   <Input name="email" required  defaultValue={resumeInfo?.email}
                   onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mt-3 flex justify-end'>
                <Button type="submit"
                disabled={loading}>
                {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                </Button>
            </div>
          </form>
    </div>
  )
}

export default PersonalDetail