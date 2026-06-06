import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listChallenges } from '../api';
import { Challenge } from '../api';

const ChallengeList: React.FC = () => {
  const [challenges, setChallenge] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await listChallenges();
        setChallenge(response.data.data.items);
        setError('');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load challenges');
        setChallenge([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) return <div><p>Loading challenges...</p></div>;

  return (
    <div>
      <h2>Challenges</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {challenges.length === 0 && !error && <p>No challenges available.</p>}
      <div className="challenge-grid">
  {challenges.map((challenge) => (
    <div
      key={challenge._id}
      className="challenge-card"
    >
      <h3>{challenge.title}</h3>

      <span
        className={`difficulty ${challenge.difficulty.toLowerCase()}`}
      >
        {challenge.difficulty}
      </span>

      <p>{challenge.description}</p>

      <Link
        to={`/challenges/${challenge._id}`}
        className="challenge-button"
      >
        Solve Challenge
      </Link>
    </div>
  ))}
</div>
    </div>
  );
};

export default ChallengeList;
