import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";

function FormSection(){
    const[activeFormIndex,setActiveFormIndex]=useState(1);
    const[enableNext,setEnableNext]=useState(false)
    return(
        <div>
            <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid/>
                    Theme</Button>
                <div className="flex gap-2">
                    {activeFormIndex>1&&<Button className="" size="sm"
                     onClick={()=>setActiveFormIndex(activeFormIndex-1)}
                        ><ArrowLeft/></Button>}
                <Button 
                disabled={!enableNext}
                className="flex gap-2" size="sm"
                onClick={()=>setActiveFormIndex(activeFormIndex+1)}
                >Next <ArrowRight/></Button>
                </div>
            </div>
            {activeFormIndex==1?
            <PersonalDetail enableNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==2?
            <Summary enableNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==3?
            <Experience enableNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==4?
            <Education enableNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==5?
            <Skills enableNext={(v)=>setEnableNext(v)}/>

            :null}
        </div>
    )
}
export default FormSection