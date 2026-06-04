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
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge._id}>
            <Link to={`/challenges/${challenge._id}`}>
              {challenge.title} <span>({challenge.difficulty})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
