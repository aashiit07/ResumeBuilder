import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: ''
}

function Experience() {
  const [experienceList, setExperienceList] = useState([])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    resumeInfo?.experience?.length>0&&setExperienceList(resumeInfo?.experience)
    
},[])

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice()// Create a copy to prevent direct mutation
    const { name, value } = event.target
    newEntries[index][name] = value
    setExperienceList(newEntries)
  }

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummery: ''
      }
    ])
  }

  const RemoveExperience = () => {
    setExperienceList(experienceList => experienceList.slice(0, -1))
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice() // Create a copy to prevent direct mutation
    newEntries[index][name] = e.target.value
    setExperienceList(newEntries)
  }
  useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        experience:experienceList
    })
    },[experienceList]);
    console.log('Experience List:', experienceList);

  // Save function to update the resume info once changes are made
  const onSave = () => {
    setLoading(true)
    // experienceList.map(({ id, ...rest }) => rest) 
    const data = {
      data:{
        experience:experienceList.map(({ id, ...rest }) => rest) 
      }
    }
    
    console.log('Payload being sent to API:', JSON.stringify(data, null, 2))


  
    GlobalApi.UpdateResumeDetail(params?.ResumeId, data)
      .then((res) => {
        console.log('API Response:', res)
        setLoading(false)
        toast('Details updated!✅')
  
        // Set resume info only when successful
       
      },(error) => {
        setLoading(false)
        console.error('Error while updating:', error)
        console.error('Error while updating:', error.response?.data || error.message);
        toast('Update failed ❌')
      })
  }
  

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your Previous Job Experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-sm'>Position Title</label>
                  <Input
                    name='title'
                    defaultValue={item?.title}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className='text-sm'>Company Name</label>
                  <Input
                    name='companyName'
                    defaultValue={item?.companyName}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className='text-sm'>City</label>
                  <Input
                    name='city'
                    defaultValue={item?.city}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className='text-sm'>State</label>
                  <Input
                    name='state'
                    defaultValue={item?.state}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className='text-sm'>Start Date</label>
                  <Input
                    type='date'
                    name='startDate'
                    defaultValue={item?.startDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div>
                  <label className='text-sm'>End Date</label>
                  <Input
                    type='date'
                    name='endDate'
                    defaultValue={item?.endDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>

                <div className='col-span-2'>
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, 'workSummery', index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={AddNewExperience} className='text-primary'>
              + Add More Experience
            </Button>
            <Button variant='outline' onClick={RemoveExperience} className='text-primary'>
              - Remove Experience
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience
