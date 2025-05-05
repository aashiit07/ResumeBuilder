import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Achievement() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [achievementList, setAchievementList] = useState([
    {
     titleachievement: '',
     descachievement: '',
    },
  ]);

  useEffect(() => {
    if (resumeInfo?.achievements) {
      setAchievementList(resumeInfo.achievements);
    }
  }, [resumeInfo?.achievements]);

  const handleChange = (event, index) => {
    const newEntries = [...achievementList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setAchievementList(newEntries);
  };

  const AddNewAchievement = () => {
    setAchievementList([
      ...achievementList,
      {
       titleachievement: '',
       descachievement: '',
      },
    ]);
  };

  const RemoveAchievement = () => {
    setAchievementList((prevList) => prevList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        achievements: achievementList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.ResumeId, data).then(
      (resp) => {
        setLoading(false);
        toast('Achievements updated! ✅');

        setResumeInfo((prev) => ({
          ...prev,
          achievements: achievementList,
        }));
      },
      (error) => {
        setLoading(false);
        console.error('❌ Error from Strapi:', error.response?.data?.error);
        toast('Update failed ❌');
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Achievements</h2>
      <p>Add your notable achievements</p>
      <div>
        {achievementList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label>Title</label>
                <Input
                  name="titleachievement"
                  defaultValue={item?. titleachievement || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Description</label>
                <Input
                  name="descachievement"
                  defaultValue={item?.descachievement || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewAchievement} className="text-primary">
            + Add More Achievements
          </Button>
          <Button variant="outline" onClick={RemoveAchievement} className="text-primary">
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Achievement;
