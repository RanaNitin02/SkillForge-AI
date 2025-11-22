import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import type { Interview } from "@/types";
import { CustomBreadCrumb } from "./CustomBreadCrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import Headings from "./Headings";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { chatSession } from "@/scripts/script";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface FormMockInterviewProps {
  initialData?: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  techStack: z.string().min(1, "Tech stack is required"),
});

type FormData = z.infer<typeof formSchema>;

const InterviewForm = ({ initialData }: FormMockInterviewProps) => {
  // Make the resolver explicitly typed so react-hook-form and the resolver agree on FormData
  const resolver = zodResolver(formSchema) as unknown as Resolver<FormData>;

  const form = useForm<FormData>({
    resolver,
    mode: "onChange",
    defaultValues: {
      position: initialData?.position || "",
      description: initialData?.description || "",
      experience: initialData?.experience || 0,
      techStack: initialData?.techStack || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData ? initialData.position : "Create a new mock interview";

  const breadCrumpPage = initialData ? initialData.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated!", description: "Changes saved successfully" }
    : { title: "Created!", description: "New Mock Interview created" };

  const cleanJsonResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateAiResult = async (data: FormData) => {
    const prompt = `
As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

[
  { "question": "<Question text>", "answer": "<Answer text>" },
  ...
]

Job Information:
- Job Position: ${data.position}
- Job Description: ${data.description}
- Years of Experience Required: ${data.experience}
- Tech Stacks: ${data.techStack}

The questions should assess skills in ${data.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
`;

    const aiResult = await chatSession.sendMessage(prompt);
    const cleanedResponse = cleanJsonResponse(aiResult.response.text());
    return cleanedResponse;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      // Generate AI questions
      const aiResult = await generateAiResult(data);

      if (initialData) {
        // Update existing interview
        await updateDoc(doc(db, "interviews", initialData.id), {
          ...data,
          questions: aiResult,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Create new interview
        const interviewRef = await addDoc(collection(db, "interviews"), {
          ...data,
          userId,
          questions: aiResult,
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "interviews", interviewRef.id), {
          id: interviewRef.id,
          updatedAt: serverTimestamp(),
        });
      }

      toast(toastMessage.title, { description: toastMessage.description });
      navigate("/generate", { replace: true });
    } catch (error) {
      console.error("Form submission error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again later";

      // sonner toast usage: showing error
      toast.error?.("Error", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    form.reset({
      position: "",
      description: "",
      experience: 0,
      techStack: "",
    });
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />

        {initialData && (
          <Button size="icon" variant="ghost">
            <Trash2 className="text-red-500 min-w-4 min-h-4" />
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      <div className="my-6"></div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md"
        >
          {/* Position Field */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={isLoading}
                    placeholder="e.g., Full Stack Developer"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="min-h-24"
                    disabled={isLoading}
                    placeholder="e.g., Describe your job role and responsibilities"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Experience Field */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={isLoading}
                    placeholder="e.g., 5"
                    min="0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.valueAsNumber;
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Tech Stack Field */}
          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="min-h-24"
                    disabled={isLoading}
                    placeholder="e.g., React, TypeScript, Node.js, PostgreSQL"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isLoading}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button type="submit" size="sm" disabled={isLoading || !form.formState.isValid}>
              {isLoading ? <Loader className="text-gray-50 animate-spin h-4 w-4" /> : actions}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default InterviewForm;
