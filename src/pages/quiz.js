import { useState } from 'react';
import axios from "axios";

import { useQuery } from '@tanstack/react-query';

export default function Quiz({questId}) {
    const { isPending, error, data: questions, isFetching } = useQuery({
        queryKey: ['questions'],
        queryFn: () =>
            axios
                .get('http://localhost:3001/api/quest/' + questId + '/questions')
                .then(function (response) {
                    console.log(response);
                    return response.data;
                }
                )
    })

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [location, setLocation] = useState({ coordinates: [] }); // [longitude, latitude]
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        else {
            alert("Wrong answer!");
            return;
        }
        document.getElementById('answer').value = '';
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const locationOK = () => {
        setLocation(questions[currentQuestion].location)
    }

    const locationClear = () => {
        setLocation({ coordinates: [] });
    }

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <button onClick={() => locationOK()}>OK</button>
            <button onClick={() => locationClear()}>Clear</button>
            <div className='app'>
                {showScore ? (
                    <div className='score-section'>
                        You scored {score} out of {questions.length}
                    </div>
                ) : (
                    location.coordinates.length === 0 ? (
                <div>
                    <h3>Enter your location</h3>
                </div>
                ) :
                (
                <div>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].question}</div>
                    </div>
                    <div className='answer-section'>
                        <input type='text' placeholder='Enter your answer here' id='answer' />
                        <button onClick={() => handleAnswerOptionClick(document.getElementById('answer').value === questions[currentQuestion].answer)}>Submit</button>
                    </div>
                </div>
                )
                )}
            </div>
        </div>
    )


    // http://localhost:3001/api/quest/65714cfc8765b8d95c173a96/questions


}