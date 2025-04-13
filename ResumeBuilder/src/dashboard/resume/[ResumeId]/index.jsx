import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../components/FormSection";
import ResumePreview from "../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../service/GlobalApi";
import dummy from "@/data/dummy";


function EditResume(){
    const {ResumeId}=useParams();
    const [resumeInfo,setResumeInfo]=useState();
    useEffect(()=>{
        GetResumeInfo()
    },[])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(ResumeId).then(resp => {
            console.log("Fetched resume data:", resp.data.data); // Add this
            setResumeInfo(resp.data.data);
          });
          
      }


    return(
        <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
            <FormSection/>
            <ResumePreview/>
        </div>
        </ResumeInfoContext.Provider>
    )
}
export default EditResume