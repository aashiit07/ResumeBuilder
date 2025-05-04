
import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
    const { user, isLoaded } = useUser(); // ✅ use isLoaded too
    const [resumeList, setResumeList] = useState([]);

    // ✅ Prevent API call until user info is fully loaded
    useEffect(() => {
        if (isLoaded && user) {
            GetResumesList();
        }
    }, [isLoaded, user]);

    const GetResumesList = () => {
        GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
            .then(resp => {
                console.log("Fetched resumes:", resp.data.data);
                setResumeList(resp.data.data);
            })
            .catch(err => {
                console.error("Failed to fetch resumes:", err);
            });
    };

    // ✅ Show loader while user is loading
    if (!isLoaded) {
        return <div className="p-10 text-lg font-semibold">Loading user info...</div>;
    }

    return (
        <div className='p-10 md:px-20 lg:px-32'>
            <h2 className='font-bold text-3xl'>My Resume</h2>
            <p>Start creating AI Resume for your next Job role</p>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
                <AddResume refreshData={GetResumesList} />
                {resumeList.length > 0 ? (
                    resumeList.map((resume, index) => (
                        <ResumeCardItem
                            resume={resume}
                            key={index}
                            refreshData={GetResumesList} // ✅ correctly passed
                        />
                    ))
                ) : (
                    [1, 2].map((item, index) => (
                        <div
                            key={index}
                            className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Dashboard;
