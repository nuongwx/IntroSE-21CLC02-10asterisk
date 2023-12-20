import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Map from '../components/Map';
import { Link } from 'react-router-dom';

export default function Quiz() {
    const { questId } = useParams();
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['questions', questId],
        queryFn: () =>
            axios
                .get(`http://localhost:3001/api/quest/${questId}`)
                .then((response) => response.data),
    });

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState('');
    const [showInfo, setShowInfo] = useState(false); // Define showInfo state
    const [userLocation, setUserLocation] = useState(null); // Define userLocation state


    //     // Function to get user's location

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };


    // Call getUserLocation when the component mounts
    useEffect(() => {
        getUserLocation();
    }, []);

    console.log('userLocation:', userLocation); // Log the user's location

    if (isPending || isFetching) return 'Loading...';

    if (error) return `An error has occurred: ${error.message}`;

    // Answer handler function
    const handleAnswerOptionClick = (isCorrect) => {
        setAnswer('');

        if (isCorrect) {
            setShowInfo(true); // Set showInfo to true when the user answers correctly
            setScore((prevScore) => prevScore + 1);
        } else {
            alert('Wrong answer!');
            return;
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < data.questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setCurrentQuestion(nextQuestion);
            setShowScore(true);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 pt-5'>
            {showScore ? (
                <div className='row'>
                    <div className="card-body">
                        <div>
                            <span className="badge bg-success">Correct</span>
                        </div>
                        <div>
                            <span dangerouslySetInnerHTML={{ __html: data.questions[currentQuestion - 1].info }}></span>
                        </div>

                    </div>
                    <div className='card-body'>
                        You scored {score} out of {data.questions.length}
                    </div>
                    <div className='card-body'>
                        <Link to={`/quest/${questId}`} className="btn btn-primary">Back to Quest</Link>
                    </div>

                </div>
            ) : (
                <div style={{ width: '75vw' }}>
                    {data.questions.length > 0 ? (
                        <div className="card">
                            {showInfo ? (<div className="card-body">
                                <div>
                                    <span className="badge bg-success">Correct</span>
                                </div>
                                <div>
                                    <span dangerouslySetInnerHTML={{ __html: data.questions[currentQuestion - 1].info }}></span>
                                </div>
                                <button className="btn btn-primary" onClick={() => setShowInfo(false)}>
                                    Next</button>
                            </div>)

                                : (<div className="card-body">
                                    <h3 className="card-title">Question {currentQuestion + 1} of {data.questions.length}</h3>
                                    <p className="card-text">{data.questions[currentQuestion].question}</p>
                                    <div className="mb-3">
                                        <label htmlFor="userAnswer" className="form-label">Your Answer:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="userAnswer"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            style={{ height: '5rem' }}
                                        />
                                    </div>
                                    <button className="btn btn-primary" onClick={() => handleAnswerOptionClick(answer === data.questions[currentQuestion].answer)}>
                                        Submit
                                    </button>
                                    {/* Render Map component with user's location */}
                                    <Map userLocation={userLocation} destination={data.questions[currentQuestion].location.coordinates} />
                                </div>)}
                        </div>
                    ) : (
                        <p>No questions available.</p>
                    )}
                </div>
            )}
            {/* 
//     if (isCorrect) {
//       setScore((prevScore) => prevScore + 1);
//     }

//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < data.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowScore(true);
//     }
//   };

//   return (
//     <div className='d-flex justify-content-center align-items-center vh-100 pt-5'>
//       {showScore ? (
//         <h1 className="score-section">
//           Your score is <span className='text-danger' style={{ fontSize: '3rem' }}>{score}/{data.length}</span>
//         </h1>
        
        
//       ) : (
//         <div style={{ width: '75vw' }}>
//           {data.length > 0 ? (
//             <div className="card">
//               <div className="card-body">
//                 <h3 className="card-title">Question {currentQuestion + 1} of {data.length}</h3>
//                 <p className="card-text">{data[currentQuestion].question}</p>
//                 <div className="mb-3">
//                   <label htmlFor="userAnswer" className="form-label">Your Answer:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="userAnswer"
//                     value={answer}
//                     onChange={(e) => setAnswer(e.target.value)}
//                     style={{ height: '5rem' }}
//                   />
//                 </div>
//                 <button className="btn btn-primary" onClick={() => handleAnswerOptionClick(answer === data[currentQuestion].answer)}>
//                   Submit
//                 </button>
//                 <Map userLocation={userLocation} destination={data[currentQuestion].location.coordinates} />
//               </div>
//             </div>
//           ) : (
//             <p>No questions available.</p>
//           )} */}
        </div>
    );
}