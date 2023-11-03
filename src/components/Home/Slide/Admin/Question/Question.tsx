import React, { useState } from 'react';
import { Question as QuestionType } from './types';

interface Props {
  question: QuestionType;
  onChange: (newData: QuestionType) => void;
}

const Question: React.FC<Props> = ({ question, onChange }) => {

  return (
    <div className='quizz'>
      <div className='quizz_all'>
        <div>
          <input className='quizz_text' type="text" value={question.value}
            onChange={(e) => onChange({
              ...question,
              value: e.target.value
            })} />
        </div>
        {question.options.map((opt, index) => (
          <div className='quizz_options' key={index}>
            <input className='quizz_options_check'
              type="radio"
              checked={opt.isCorrect}
              onClick={(e) => {
                const allOptions = question.options.map((item, i) => {
                  if (i === index) {
                    return {
                      option: item.option,
                      isCorrect: !item.isCorrect
          
                    };
                  }
                  return item
                })
                onChange({
                  ...question,
                  options: allOptions
                })
              }}
            />
            <input className='quizz_options_text'
              type="text"
              value={opt.option}
              onChange={(e) => {
                const allOptions = question.options.map((item, i) => {
                  if (i === index) {
                    return {
                      option: e.target.value,
                      isCorrect: item.isCorrect,
                      
                    };
                  }
                  return item
                }) 
                onChange({
                  ...question,
                  options: allOptions
                })
              }}
            />


          </div>
        ))}
      </div>
      <div className='btn_quizz'>
        <div className='quizz_btn_add'>
          {question.options.length < 4 && <button onClick={
            () => onChange({
              ...question,
              options: [
                ...question.options,
                { option: ' ', isCorrect: false },
              ]
            })
          }>Add option</button>} </div>
        <div className='quizz_btn_remove' >
          {question.options.length > 1 && <button onClick={
            () => onChange({
              ...question,
              options: question.options.slice(0, -1)
            })
          }>Remove option</button>}</div>
      </div>
    </div>
  );
};

export default Question;
