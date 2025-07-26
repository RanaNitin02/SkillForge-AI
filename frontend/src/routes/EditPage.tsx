import InterviewForm from '@/components/InterviewForm';
import { db } from '@/config/firebase.config';
import type { Interview } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditPage = () => {

    const { interviewId } = useParams<{ interviewId: string }>();
    const [ interview, setInterview ] = useState<Interview | null>(null);

    useEffect(() => {
        const fetchInterview = async() => {

            if(interviewId){

                try {
                    const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
    
                    if(interviewDoc.exists()){
                        setInterview({...interviewDoc.data()} as Interview);
                    }
                } catch (error) {
                    console.log("Error fetching interview: ", error);
                }

            }
        }
        fetchInterview();
    }, [interviewId])

  return (
    <div className='my-4 flex-col w-full'>
        <InterviewForm initialData={interview} />
    </div>
  )
}

export default EditPage