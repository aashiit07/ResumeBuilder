import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Certificate() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [certificateList, setCertificateList] = useState([
    {
      certificateName: '',
      issuedBy: '',
      issueDate: '',
      certificateURL: '',
    },
  ]);

  // ✅ Load from context when component mounts
  useEffect(() => {
    if (resumeInfo?.certificates) {
      setCertificateList(resumeInfo.certificates);
    }
  }, [resumeInfo?.certificates]);

  const handleChange = (event, index) => {
    const newEntries = [...certificateList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setCertificateList(newEntries);
  };

  const AddNewCertificate = () => {
    setCertificateList([
      ...certificateList,
      {
        certificateName: '',
        issuedBy: '',
        issueDate: '',
        certificateURL: '',
      },
    ]);
  };

  const RemoveCertificate = () => {
    setCertificateList((prevList) => prevList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        certificates: certificateList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.ResumeId, data).then(
      (resp) => {
        setLoading(false);
        toast('Details updated! ✅');

        // ✅ Safely update context here
        setResumeInfo((prev) => ({
          ...prev,
          certificates: certificateList,
        }));
      },
      (error) => {
        setLoading(false);
        console.error('❌ Error from Strapi:', error.response?.data?.error);
        toast('Update failed ❌');
      }
    );
  };

  // ❌ Removed the problematic useEffect

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Certificates</h2>
      <p>Add your certificates</p>
      <div>
        {certificateList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>Certificate Name</label>
                <Input
                  name="certificateName"
                  defaultValue={item?.certificateName || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Issued By</label>
                <Input
                  name="issuedBy"
                  defaultValue={item?.issuedBy || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div>
                <label>Issue Date</label>
                <Input
                  type="month"
                  name="issueDate"
                  defaultValue={item?.issueDate || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className="col-span-2">
                <label>Certificate URL</label>
                <Input
                  name="certificateURL"
                  defaultValue={item?.certificateURL || ""}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewCertificate} className="text-primary">
            + Add More Certificates
          </Button>
          <Button variant="outline" onClick={RemoveCertificate} className="text-primary">
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

export default Certificate;
