import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../service/AIModal'

// const prompt="Job Title:{jobTitle},  Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

const prompt = `
Job Title: {jobTitle}

Please ONLY respond with a JSON array of 3 objects, each having "experience_level" and "summary" fields.
The summaries should be 3-4 lines each.
Do NOT include any extra text outside the JSON.
Example format:
[
  { "experience_level": "Fresher", "summary": "..." },
  { "experience_level": "Mid Level", "summary": "..." },
  { "experience_level": "Senior", "summary": "..." }
]
`;








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
     
    //  const GenerateSummeryFromAI=async()=>{
    //     setLoading(true)
    //     setAiGeneratedSummaryList([]); 
    //     const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
    //     console.log(PROMPT)
    //      const result=await AIChatSession.sendMessage(PROMPT)
    //     try {
    //         const rawText = await result.response.text();
    //         const parsed = JSON.parse(rawText); // 👈 This is where it usually fails if AI returns plain text
    //         console.log("AI parsed result:", parsed);
    //         setAiGeneratedSummaryList(parsed.summaries);
    //       } catch (error) {
    //         toast("⚠️ Failed to parse AI response");
    //         console.error("Parsing error:", error);
    //       }
    //     setLoading(false)
    //  }


    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        setAiGeneratedSummaryList([]);  // Clear previous suggestions
      
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log("Sending prompt to AI:", PROMPT);
      
        try {
          const result = await AIChatSession.sendMessage(PROMPT);
          const rawText = await result.response.text();
          console.log("Raw AI response:", rawText);
      
          // Try parse JSON safely
          let parsed;
          try {
            parsed = JSON.parse(rawText);
            if (!Array.isArray(parsed)) {
              throw new Error("Response JSON is not an array");
            }
          } catch (parseError) {
            console.warn("JSON parse error:", parseError);
            toast("⚠️ AI returned invalid data. Try again.");
            setLoading(false);
            return;
          }
      
          setAiGeneratedSummaryList(parsed);
        } catch (error) {
          console.error("AI call failed:", error);
          toast("⚠️ AI request failed. Check your connection or try later.");
        }
      
        setLoading(false);
      };
      
   




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
            toast("Details updated ✅!")
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
             <Brain className='h-4 w-4'/> Generate from AI</Button>
        </div>
        <Textarea className="mt-5" required value={summery}
            defaultValue={summery?summery:resumeInfo?.summery}
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

    {aiGeneratedSummaryList&& Array.isArray(aiGeneratedSummaryList) && aiGeneratedSummaryList.length > 0 && (
    <div className='my-5'>
        <h2 className='font-bold text-lg'>Suggestions</h2>
        {aiGeneratedSummaryList.map((item, index) => (
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
     </div>)}
    </div>
  )
}

export default Summary