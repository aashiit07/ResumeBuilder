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
        cgpa:'',
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
    cgpa:'',
    startDate:'',
    endDate:'',
    description:''
  }])
}
const RemoveEducation=()=>{
    seteducationalList(educationalList=>educationalList.slice(0,-1))

}
// const onSave=()=>{
//     for (let i = 0; i < educationalList.length; i++) {
//         const { startDate, endDate } = educationalList[i];
//         if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
//           toast.error(`End date should be after start date for entry ${i + 1}`);
//           return;
//         }
//       }

//     setLoading(true)
//     const data={
//         data:{
//             education:educationalList.map(({ id, ...rest }) => rest)
//         }
//     }
//      GlobalApi.UpdateResumeDetail(params.ResumeId,data).then(resp=>{
//         console.log(resp)
//         setLoading(false)
//         toast("Details updated! ✅")
//      },(error)=>{
//         setLoading(false)
//         console.error("❌ Error from Strapi:", error.response?.data?.error);
//         toast("Update failed ❌");
//      })
// }


const onSave = () => {
    // Validation: Check if any startDate > endDate
    for (let i = 0; i < educationalList.length; i++) {
      const { startDate, endDate } = educationalList[i];
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        toast.error(`End date should be after start date for entry ${i + 1}`);
        return;
      }
    }
    const educationData = educationalList.map(({ id, cgpa, ...rest }) => ({
      ...rest,
      cgpa: cgpa ? parseInt(cgpa,10) : null 
    }));
  
    setLoading(true);
    const data = {
      data: {
        // education: educationalList.map(({ id, ...rest }) => rest),
        education:educationData
      },
    };
    console.log("Sending data to Strapi:", data);

    GlobalApi.UpdateResumeDetail(params.ResumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated! ✅");
      },
      (error) => {
        setLoading(false);
        const errorMessage = error.response?.data?.message || "Update failed ❌";
        console.error("❌ Error from Strapi:", errorMessage);
        toast(errorMessage);
      }
    );
  }    
  
  useEffect(() => {
    if (Array.isArray(resumeInfo?.education)) {
      seteducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);
  

  return (

      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Education </h2>
        <p>Add Your Previous Educational Detail</p>
        <div>
            {educationalList.map((item,index)=>(
                <div>
                 <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div className='col-span-2'>
                        <label>University Name/School Name</label>
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
                            <label>CGPA / Marks</label>
                            <Input
                                name="cgpa"
                                defaultValue={item?.cgpaOrMarks}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="e.g. 8.5 or 85%"
                            />
                        </div>

                    <div>
                        <label>Start Month</label>
                        <Input type="month" name="startDate" defaultValue={item?.startDate}
                         onChange={(e)=>handleChange(e,index)}/>
                    </div>

                    <div>
                        <label>End Month</label>
                        <Input type="month" name="endDate" defaultValue={item?.endDate}
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