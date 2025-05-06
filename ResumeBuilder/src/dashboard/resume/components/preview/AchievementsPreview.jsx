import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function AchievementPreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const themeColor = resumeInfo?.themeColor || "#ff6666";

  return (
    <div className="mt-2">
      <h2
        className="font-bold text-sm mb-1 mt-2"
        style={{
          color: themeColor,
          letterSpacing: "0.5px",
        }}
      >
        ACHIEVEMENTS
      </h2>
      <hr
        className="border-[1px] my-1"
        style={{ borderColor: themeColor }}
      />

      {resumeInfo?.achievements?.map((achievement, index) => (
        <div key={index} className="mt-2">
          <h2
            className="text-sm font-bold"
            style={{ color: themeColor }}
          >
            {achievement?.titleachievement}
          </h2>
          {achievement?.descachievement && (
            <p className="text-xs text-gray-700">{achievement.descachievement}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default AchievementPreview;
