interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

const QuestionSection = ({ questions }: QuestionSectionProps) => {
  return (
    <div>
      {questions.map((q, index) => (
        <div key={index}>
          <h3>{`Question ${index + 1}: ${q.question}`}</h3>
          <p>{`Answer: ${q.answer}`}</p>
        </div>
      ))}
    </div>
  )
}

export default QuestionSection