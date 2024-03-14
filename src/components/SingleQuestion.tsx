import { FaPlus, FaMinus } from 'react-icons/fa6';

interface SingleQuestionProps {
  question: { question: string; answer: string }; // Define the type for the question prop
  id: number; // Define the type for the id prop
  activeId: number | null; // Define the type for the activeId prop
  handleActiveId: (id: number) => void; // Define the type for the handleActiveId prop
}

function SingleQuestion({ question, id, activeId, handleActiveId }: SingleQuestionProps) {
  const isActive = activeId === id;
  return (
    <article className='question' onClick={() => handleActiveId(id)}>
      <div className='question-header'>
        <h2 className='question-header-title'>{question.question}</h2>
        <button className='question-btn'>
          {isActive ? (
            <FaMinus cursor={'pointer'} />
          ) : (
            <FaPlus cursor={'pointer'} />
          )}
        </button>
      </div>
      <p className={`question-body ${isActive && 'active'}`}>
        {isActive && question.answer}
      </p>
    </article>
  );
}

export default SingleQuestion;
