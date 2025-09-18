import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { TooltipButton } from "@/components/ToolTipButton";
import { Volume2, VolumeX } from "lucide-react";
import RecordAnswer from "./RecordAnswer";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

const QuestionSection = ({ questions }: QuestionSectionProps) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);

  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        setCurrentSpeech(speech);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        }
      }
    }
  }

  return (
    <div className="min-h-96 border rounded-md p-4 w-full">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-12"
        orientation="vertical"
      >
        <TabsList className="w-full flex-wrap items-center justify-start gap-4 bg-transparent flex">
          {
            questions?.map((tab, index) => (
              <TabsTrigger
                className={cn("data-[state=active]:bg-blue-100 data-[state=active]:shadow-md text-xs px-2")}
                key={tab.question}
                value={tab.question}
              >
                {`Question No. ${index + 1}`}
              </TabsTrigger>
            ))
          }
        </TabsList>
        {
          questions?.map((tab, index) => (
            <TabsContent
              key={index}
              value={tab.question}
            >
              <p className="text-left tracking-wide text-neutral-500 text-base">
                {tab.question}
              </p>

              <div className="flex
               items-center justify-end w-full">
                <TooltipButton
                  content={isPlaying ? "Stop" : "Start"}
                  icon={
                    isPlaying ? (
                      <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                    ) : (
                      <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                    )
                  }
                  onClick={() => handlePlayQuestion(tab.question)}
                />
              </div>

              <RecordAnswer
                question={tab}
                isWebCam={isWebCam}
                setIsWebCam={setIsWebCam}
              />
            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  )
}

export default QuestionSection