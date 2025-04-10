import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
const [loading,setLoading]=useState(false)
const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
const params=useParams()
const[educationalList,seteducationalList]=useState([
    {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
    }
])
useEffect(()=>{
    resumeInfo&&seteducationalList(resumeInfo?.education)
  },[])

const handleChange=(event,index)=>{
        const newEntries=educationalList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
       seteducationalList(newEntries);
}
const AddNewEducation=()=>{
  seteducationalList([...educationalList,{
    universityName:'',
    degree:'',
    major:'',
    startDate:'',
    endDate:'',
    description:''
  }])
}
const RemoveEducation=()=>{
    seteducationalList(educationalList=>educationalList.slice(0,-1))

}


const onSave=()=>{
    setLoading(true)
    const data={
        data:{
            education:educationalList.map(({ id, ...rest }) => rest)
        }
    }
     GlobalApi.UpdateResumeDetail(params.ResumeId,data).then(resp=>{
        console.log(resp)
        setLoading(false)
        toast("Details updated! ✅")
     },(error)=>{
        setLoading(false)
        console.error("❌ Error from Strapi:", error.response?.data?.error);
        toast("Update failed ❌");
     })







}
useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])
  




  return (

      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Education </h2>
        <p>Add Your Previous Educational Detail</p>
        <div>
            {educationalList.map((item,index)=>(
                <div>
                 <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div className='col-span-2'>
                        <label>University Name</label>
                        <Input name="universityName" defaultValue={item?.universityName}
                         onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div>
                        <label>Degree</label>
                        <Input name="degree"  defaultValue={item?.degree}
                         onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div>
                        <label>Major</label>
                        <Input name="major"  defaultValue={item?.major}
                        onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div>
                        <label>Start Date</label>
                        <Input type="date" name="startDate" defaultValue={item?.startDate}
                         onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div>
                        <label>End Date</label>
                        <Input type="date" name="endDate" defaultValue={item?.endDate}
                         onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div className='col-span-2'>
                        <label>Description</label>
                        <Input name="description" defaultValue={item?.description}
                        onChange={(e)=>handleChange(e,index)}/>
                    </div>
                </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
                          <div className='flex gap-2'>
                          <Button variant="outline" onClick={AddNewEducation} className="text-primary">+ Add More Education</Button>
                          <Button variant="outline" onClick={RemoveEducation} className="text-primary">- Remove </Button>
                          </div>
                          <Button disabled={loading} onClick={()=>onSave()}>
                          {loading?<LoaderCircle className='animate-spin' />:'Save'}    
                          </Button>
                </div>
        </div>
   
  )
}

export default Education