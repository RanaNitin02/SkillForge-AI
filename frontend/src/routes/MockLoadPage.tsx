import { db } from "@/config/firebase.config";
import type { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "./Loader";
import WebCam from "react-webcam";
import { CustomBreadCrumb } from "@/components/CustomBreadCrumb";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import InterviewPin from "@/components/InterviewPin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const MockLoadPage = () => {

  const { interviewId } = useParams<{ interviewId: string }>();
  const [isLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);
  const [interview, setInterview] = useState<Interview | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {

      if (interviewId) {

        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));

          if (interviewDoc.exists()) {
            setInterview({ ...interviewDoc.data() } as Interview);
          }
        } catch (error) {
          console.log("Error fetching interview: ", error);
        }
      }
    }
    fetchInterview();
  }, [interviewId, navigate])

  if (isLoading) {
    return <Loader classname="w-full h-[70vh]" />
  }

  if( !interviewId ){
    navigate("/generate", { replace: true });
  }

  if( !interview ){
    navigate("/generate", { replace: true });
  }

  return (
    <div className="flex-col w-full gap-8 py-5 flex">
      <div className="items-center justify-between w-full gap-2 flex">
        <CustomBreadCrumb
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />

        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button size={"sm"}>Start <Sparkles /></Button>
        </Link>
      </div>

      {interview && <InterviewPin data={interview} onMockPage />}

      <Alert className="bg-yellow-100/50 border-yellow-200 p-4 rounded-lg">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <div>
          <AlertTitle className="text-yellow-800 font-semibold">Important Information</AlertTitle>
          <AlertDescription className="text-sm text-yellow-700 mt-1">
            Please enable your webcam and microphone to start the AI-generated mock interview. The interview consists of 5 questions. You'll receive a personalized report based on your responses at the end.
            <br />
            <br />
            <span className="font-medium">Note:<span> Your video is {" "} <strong>never recorded</strong>. You can disable your webcam at any time.</span></span>
          </AlertDescription>
        </div>
      </Alert>

      <div className="items-center justify-center w-full h-full flex">
        <div className="w-full h-[400px] md:w-96 flex-col items-center justify-center border p-4 bg-gray-50 rounded-md flex">
          {isWebCamEnabled ? (
            <WebCam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="w-full h-[400px] md:w-96 flex-col items-center justify-center border p-4 bg-gray-50 rounded-md flex"
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="items-center justify-center flex">
        <Button onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}>
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  )
}

export default MockLoadPage