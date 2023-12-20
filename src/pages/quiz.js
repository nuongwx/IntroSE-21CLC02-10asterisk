import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Map from '../components/Map';

export default function Quiz() {
  const { questId } = useParams();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['questions', questId],
    queryFn: () =>
      axios
        .get(`http://localhost:3001/api/quest/${questId}/questions`)
        .then((response) => response.data),
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [userLocation, setUserLocation] = useState(null); // Define userLocation state

  console.log(data)

  // Function to get user's location
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
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 pt-5'>
      {showScore ? (
        <h1 className="score-section">
          Your score is <span className='text-danger' style={{ fontSize: '3rem' }}>{score}/{data.length}</span>
        </h1>
        
        
      ) : (
        <div style={{ width: '75vw' }}>
          {data.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Question {currentQuestion + 1} of {data.length}</h3>
                <p className="card-text">{data[currentQuestion].question}</p>
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
                <button className="btn btn-primary" onClick={() => handleAnswerOptionClick(answer === data[currentQuestion].answer)}>
                  Submit
                </button>
                {/* Render Map component with user's location */}
                <Map userLocation={userLocation} destination={data[currentQuestion].location.coordinates} />
              </div>
            </div>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      )}
    </div>
  );
}
