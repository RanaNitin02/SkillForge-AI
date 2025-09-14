import type { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { CustomBreadCrumb } from "@/components/CustomBreadCrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import QuestionSection from "@/components/QuestionSection";


const MockInterviewPage = () => {

    const { interviewId } = useParams<{ interviewId: string }>();
    const [isLoading, setIsLoading] = useState(false);
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

    if (!interviewId) {
        navigate("/generate", { replace: true });
    }

    if (!interview) {
        navigate("/generate", { replace: true });
    }



    return (
        <div className="flex flex-col w-full gap-8 py-5">
            <CustomBreadCrumb
                breadCrumbPage="Start"
                breadCrumpItems={[
                    { label: "Mock Interviews", link: "/generate" },
                    { label: interview?.position || "", link: `/generate/interview/${interviewId}` },
                ]}
            />

            <div className="w-full">
                <Alert className="bg-sky-100/50 border-sky-200 p-4 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-sky-600" />
                    <div>
                        <AlertTitle className="text-sky-800 font-semibold">Important Information</AlertTitle>
                        <AlertDescription className="text-sm text-sky-700 mt-1">
                            Press "Record Answer" to begin answering the question. Once you finish the interview, you&apos;ll recieve feedback comparing your responses with the ideal answers.
                            <br />
                            <br />
                            <span className="font-medium">Note:<span> Your video is never recorded. You can disable your webcam at any time.</span></span>
                        </AlertDescription>
                    </div>
                </Alert>
            </div>

            {interview?.questions && interview?.questions.length > 0 && (
                <div className="w-full flex flex-col items-center gap-4 mt-4">
                    <QuestionSection questions={interview.questions} />
                </div>
            )}

        </div>
    )
}

export default MockInterviewPage