import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../service/AIModal'

const prompt="Job Title:{jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field experience Level and Summary with experience level for Fresher,Mid-Level,Experienced"

function Summary({enableNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [summery,setSummery]=useState();
    const[loading,setLoading]=useState(false);
    const params =useParams()
    const [aiGeneratedSummaryList,setAiGeneratedSummaryList]=useState();


     useEffect(()=>{
       summery&&setResumeInfo({
        ...resumeInfo,
        summery:summery
       })
     },[summery])
     
     const GenerateSummeryFromAI=async()=>{
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
        console.log(PROMPT)
        const result=await AIChatSession.sendMessage(PROMPT)
        console.log(JSON.parse(result.response.text()))
        setAiGeneratedSummaryList(JSON.parse(result.response.text()));
        setLoading(false)
     }


     const onSave=(e)=>{
        e.preventDefault()
        console.log("Form submitted! 🎯"); 
        setLoading(true)
        const data={
            data:{
                summery:summery
            }
            
        }
        GlobalApi.UpdateResumeDetail(params?.ResumeId,data).then(resp=>{
            console.log(resp);
            enableNext(true)
            setLoading(false)
            toast("Details updated")
        },(error)=>{
            setLoading(false)
        })
     }


  return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Summary</h2>
    <p>Add Summary For your Job Title</p>
    <form className='mt-7' onSubmit={onSave}>
        <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button variant="outline" onClick={()=>GenerateSummeryFromAI()}
             type="button" size="sm"className="border-primary text-primary flex gap-2">
             <Brain className='h-4 w-4'/>   Generate from AI</Button>
        </div>
        <Textarea className="mt-5" required
        onChange={(e)=>setSummery(e.target.value)}
        />
        <div className='mt-2 flex justify-end'>
        <Button type="submit"
                disabled={loading}>
                {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                </Button>
        </div>
    </form>
    </div>

    {aiGeneratedSummaryList&& <div>
        <h2 className='font-bold text-lg'>Suggestions</h2>
        {Array.isArray(aiGeneratedSummaryList) &&aiGeneratedSummaryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
     </div>}




    </div>
  )
}

export default Summary