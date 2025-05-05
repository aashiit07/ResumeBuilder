import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="mt-3">
      <h2
        className=" font-bold text-sm mb-1"
        style={{
          color: resumeInfo?.themeColor || "#ff6666",
          letterSpacing: "0.5px",
        }}
      >
        EXPERIENCE
      </h2>
      <hr
        className="border-[1px] my-1"
        style={{
          borderColor: resumeInfo?.themeColor || "#ff6666",
        }}
      />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="mt-2">
          <div className="flex justify-between">
            <h2
              className="text-sm font-bold"
              style={{
                color: resumeInfo?.themeColor || "#ff6666",
                letterSpacing: "0.5px",
              }}
            >
              {experience?.companyName}
            </h2>
            <h2 className="text-xs text-gray-800 italic">
              {experience?.city}, {experience?.state}
            </h2>
          </div>

          <div className="flex justify-between">
            <h2 className="text-xs flex justify-between text-gray-500 italic">
              {experience?.title}{" "}
            </h2>
            <h2 className="text-xs flex justify-between text-gray-500">
  <span>
    {experience?.startDate
      ? new Date(experience.startDate).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      : "Start Date Unknown"}{" "}
    -{" "}
    {experience?.currentlyWorking || !experience?.endDate
      ? "Present"
      : new Date(experience.endDate).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
  </span>
</h2>

          </div>
          {/* <p className='text-xs my-2'>
            {experience.workSummery}
          </p> */}
          <div
            className="text-xs pt-2"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
