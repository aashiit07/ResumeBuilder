import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

   const onDelete = () => {
     setLoading(true);
     GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
       toast('Resume Deleted!✅');
       refreshData();
       setLoading(false);
       setOpenAlert(false);
     }).catch(error => {
       console.error("Delete failed: ❌", error);
       setLoading(false);
     });
   }
   console.log("Resume Title:", resume.Title);
   console.log("Resume object:", resume);


  return (
    <div className=''>
      <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
        <div className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4'
          style={{ borderColor:'#ff6666' }}>
          <div className='flex items-center justify-center h-[180px]'>
            <img src="/cv.png" width={80} height={80} />
          </div>
        </div>
      </Link>

      <div className='border p-3 flex justify-between text-black rounded-b-lg shadow-lg'
        style={{ background: '#ff6666' }}>

        <h2 className='text-sm text-purple'>{resume.Title}</h2>

         <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation('/dashboard/resume/'+resume.documentId+"/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/'+resume.documentId+"/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/'+resume.documentId+"/view")}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume and remove your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div> 
      </div>

  );
}

export default ResumeCardItem;
