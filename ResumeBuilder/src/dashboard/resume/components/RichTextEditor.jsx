import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
const PROMPT='position title:{positonTitle},depends on position title give me 5-7 bullet points for my experience in resume,give me result in HTML format'

function RichTextEditor({onRichTextEditorChange,index}) {
    const[value,setValue]=useState('');
     const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
     const [loading,setLoading]=useState(false)

   const GenerateSummeryFromAI=async()=>{
    setLoading(true)
    if(!resumeInfo.experience[index].title)
    {
      toast('Please add Position Title')
      return;
    }
    const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title)
    const result=await AIChatSession.sendMessage(prompt)
    console.log((result.response.text()))
    const resp=result.response.text()
    setValue(resp.replace('[','').replace(']',''))
    setLoading(false)

   }


  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery
        </label>
        <Button variant="outline" size="sm"
        onClick={GenerateSummeryFromAI}
        className='flex gap-2 border-primary  text-primary'>
          {loading?
          <LoaderCircle className='animate-spin'/>:
          <>
          <Brain className='h-4 w-4'/>Generate from AI
          </>
          }
          </Button>
          
      </div>
     <EditorProvider>
        <Editor value={value} onChange={(e)=>{
            setValue(e.target.value)
            onRichTextEditorChange(e)
        }}>
            <Toolbar>
                <BtnBold/>
                <BtnItalic/>
                <BtnUnderline/>
                <BtnStrikeThrough/>
                <Separator/>
                <BtnNumberedList/>
                <BtnBulletList/>
                <Separator/>
                <BtnLink/>


            </Toolbar>

        </Editor>
     </EditorProvider>

    </div>
  )
}

export default RichTextEditor