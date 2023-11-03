import React from 'react';
import './../Slide.css';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Question from './Question/Question';
import { Question as QuestionType, Exam, Option } from './Question/types';
import Select from 'react-select';


interface QuestionValidation {
    erValue?: string,
    erOption?: string,
    erIsCorrect?: string,
}
interface Validation {
    erTitle?: string;
    erAbc?: string;
    erText?: string,
    erTime?: string;
    erCategory?: string;

}


function Create_Exams() {
    const optionTime = [
        { values: '30p', label: '30p' },
        { values: '60p', label: '60p' },
        { values: '90p', label: '90p' },
        { values: '120p', label: '120p' }

    ]
    const optionLabel = [
        { values: 'Toan', label: 'Toan' },
        { values: 'Van', label: 'Van' },
        { values: 'Ly', label: 'Ly' },
        { values: 'Hoa', label: 'Hoa' }

    ]
    const [exam, setExam] = useState<Exam>({
        title: '',
        abc: '',
        text: '',
        time: '',
        category: '',
        questions: [
            {
                value: '',
                options: [
                    { option: '', isCorrect: false },
                    { option: '', isCorrect: false },

                ],
            },
        ],
    })


    const [error, setError] = useState<Validation>({})
    const [erQues, setErQues] = useState<QuestionValidation[]>([])


    const handleSubmit = () => {
        const examsString = localStorage.getItem('exams');
        const exams: Exam[] = JSON.parse(examsString || '[]');
        let errorMessages: Validation = {}

        if (!exam.title) {
            errorMessages.erTitle = 'Title can not be null'
        }

        if (!exam.abc) {
            errorMessages.erAbc = 'Abc can not be null'
        }
        if (!exam.text) {
            errorMessages.erText = 'Text can not be null'
        }
        if (!exam.time) {
            errorMessages.erTime = 'Time can not be null'
        }
        if (!exam.category) {
            errorMessages.erCategory = 'Category can not be null'
        }
        setError(errorMessages)

        const questionErrors: QuestionValidation[] = [];
        exam.questions.map((question, index) => {
            let erQuestion: QuestionValidation = {}
            if (!question.value) {
                erQuestion.erValue = 'Value - Question can not be null'
            }
            question.options.map((option, index) => {
                if (!option.option) {
                    erQuestion.erOption = 'Option - Question can not be null'
                }
            })
            if (!question.options.some(opt => opt.isCorrect === true)) {
                erQuestion.erIsCorrect = 'IsCorrect - Question can not be null'
            }
            questionErrors.push(erQuestion)
        })

        setErQues(questionErrors)

        if (
            !errorMessages.erTitle &&
            !errorMessages.erAbc &&
            !errorMessages.erText &&
            !errorMessages.erTime &&
            !errorMessages.erCategory &&
            !questionErrors.filter(item => !!Object.keys(item).length).length) {
            localStorage.setItem('exams', JSON.stringify([...exams, exam]))
            alert('Tao thanh cong')
        }
    }


    return (
        <div className='create_exam'>
            <div className='div_1'>
                <p className='p_div_1'>Tên sản phẩm</p>
                <input className='input_div_1'
                    value={exam.title}
                    onChange={e => setExam({
                        ...exam,
                        title: e.target.value
                    })}
                />
                {
                    !!error.erTitle && (<p style={{ color: 'red' }}>{error.erTitle}</p>)

                }
            </div>
            <div className='div_1'>
                <p className='p_div_1'>Giá </p>
                <input className='input_div_1'
                    value={exam.abc}
                    onChange={e => setExam({
                        ...exam,
                        abc: e.target.value
                    })}
                />
                {
                    !!error.erAbc && (<p style={{ color: 'red' }}>{error.erAbc}</p>)

                }
            </div>
            <div className='div_1_2'>
                <p className='p_div_1_2'>Mô tả</p>
                <input className='input_div_1_2'
                    value={exam.text}
                    onChange={e => setExam({
                        ...exam,
                        text: e.target.value
                    })}
                />
                {
                    !!error.erText && (<p style={{ color: 'red' }}>{error.erText}</p>)

                }
            </div>
            <div className='div_1'>
                <p className='p_div_1'>Hình ảnh</p>
                <Select
                    className='input_div_12'
                    options={optionTime}
                    value={{ values: exam.time, label: exam.time }}
                    onChange={e => setExam({
                        ...exam,
                        time: e?.values
                    })}
                />

                {
                    !!error.erTime && (<p style={{ color: 'red' }}>{error.erTime}</p>)

                }
            </div>
            <div className='div_1'>
                <p className='p_div_1'>Số lượng</p>
                <Select
                    className='input_div_12'
                    options={optionLabel}
                    value={{ values: exam.category, label: exam.category }}
                    onChange={e => setExam({
                        ...exam,
                        category: e?.values
                    })}
                />
                {
                    !!error.erCategory && (<p style={{ color: 'red' }}>{error.erCategory}</p>)

                }
            </div>
            {/* {exam.questions.map((question, indexQ) => <div><Question
                question={question}
                onChange={(newData) => {
                    const newQuestions = exam.questions.map((item, index) => {
                        if (index === indexQ) {
                            return newData
                        }
                        return item;
                    })
                    setExam(
                        {
                            ...exam,
                            questions: newQuestions
                        }
                    )
                }} />
                {
                    !!erQues[indexQ] && Object.entries(erQues[indexQ]).map(([key, value]) => (
                        <p key={key} style={{ color: 'red', marginLeft: 28 }}>{`${value}`}</p>
                    ))

                }
                <button className='btn_add_quizz' onClick={() => setExam({
                    ...exam,
                    questions: [...exam.questions.slice(0,indexQ),...exam.questions.slice(indexQ + 1, exam.questions.length) ]

                })
                }>Remove Question </button>
            </div>)
            } */}
            {/* <button className='btn_add_quizz' onClick={() => setExam({
                ...exam,
                questions: [...exam.questions,
                {
                    value: '',
                    options: [
                        { option: '', isCorrect: false },

                    ],
                }
                ]

            })
            }>Add </button> */}
            <div className='btn_submit'>
                <button
                    onClick={handleSubmit}
                >Submit</button>
            </div>
        </div>

    );
}

export default Create_Exams;

