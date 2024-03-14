import { useState } from 'react';
import { questions } from '../composables/data';

import SingleQuestion from './SingleQuestion';

function Questions() {
  const [activeId, setActiveId] = useState<number | null>(null); // Specify the type of activeId as number or null

  const handleActiveId = (id: number) => { // Specify the type of id as number
    if (id === activeId) {
      setActiveId(null);
      return;
    }
    setActiveId(id);
  };
  return (
    <section className='questions' id='questions'>
      <div className='question-title-container'>
        <div className='section-title-bar'></div>
        <h1 className='question-title'>FAQs</h1>
      </div>
      <div className='section-center question-center'>
        {questions.map((question, id: number) => ( // Specify the type of id as number
          <SingleQuestion
            key={question.id}
            question={question}
            activeId={activeId}
            handleActiveId={handleActiveId}
            id={id}
          />
        ))}
      </div>
    </section>
  );
}

export default Questions;
