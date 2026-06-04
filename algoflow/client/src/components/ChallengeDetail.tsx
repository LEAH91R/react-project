import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getChallenge, createSubmission } from '../api';
import { Challenge } from '../api';
import { useAuth } from '../context/AuthContext';

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { isAuthenticated } = useAuth();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }

    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const response = await getChallenge(id);
        setChallenge(response.data.data);
        setError('');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, isAuthenticated, history]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!code.trim()) {
      setSubmitMessage('Please enter code');
      return;
    }

    setSubmitting(true);
    setSubmitMessage('');

    try {
      await createSubmission({
        challengeId: id,
        code
      });
      setSubmitMessage('Code submitted successfully!');
      setCode('');
      setTimeout(() => {
        history.push('/submissions');
      }, 1500);
    } catch (err: any) {
      setSubmitMessage(err.response?.data?.message || 'Failed to submit code');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div><p>Loading challenge...</p></div>;
  if (error) return <div><p style={{ color: 'red' }}>{error}</p></div>;
  if (!challenge) return <div><p>Challenge not found</p></div>;

  return (
    <div>
      <h2>{challenge.title}</h2>
      <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
      <p><strong>Category:</strong> {challenge.category}</p>
      <p><strong>Description:</strong> {challenge.description}</p>

      <h3>Test Cases:</h3>
      <ul>
        {challenge.testCases.map((tc, idx) => (
          <li key={idx}>
            Input: <code>{tc.input}</code> → Expected: <code>{tc.expectedOutput}</code>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h3>Submit Solution</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default ChallengeDetail;
