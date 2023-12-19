import { useState, useEffect } from 'react';
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
    } else {
      alert('Wrong answer!');
      return;
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 pt-5'>
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {data.questions.length}
        </div>
      ) : (
        <div style={{ width: '75vw' }}>
          {data.questions.length > 0 ? (
            <div className="card">
              <div className="card-body">
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
