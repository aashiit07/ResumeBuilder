
import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid'
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

// ✅ Accepting refreshData as a prop
function AddResume({ refreshData }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState('')
    const { user, isLoaded } = useUser()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onCreate = async () => {
        if (!isLoaded || !user) return;

        setLoading(true)
        const uuid = uuidv4();
        const data = {
            data: {
                Title: resumeTitle,
                ResumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
                themeColor: "#ff6666"
            }
        }

        GlobalApi.CreateNewResume(data).then(
            resp => {
                if (resp) {
                    setLoading(false)
                    setOpenDialog(false)

                    // ✅ Refresh parent resume list
                    refreshData && refreshData();

                    navigate('/dashboard/resume/' + resp.data.data.documentId + "/edit")
                }
            },
            error => {
                console.error("Create resume error:", error)
                setLoading(false)
            }
        )
    }

    return (
        <div>
            <div
                className='p-14 py-24 border items-center flex 
                justify-center bg-gray-100 rounded-xl h-[240px]
                hover:scale-105 transition-all hover:shadow-xl cursor-pointer
                border-dashed'
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add Title for your new Resume
                            <Input
                                className='my-2'
                                placeholder="Ex. Full Stack Resume"
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={onCreate}
                            >
                                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume
