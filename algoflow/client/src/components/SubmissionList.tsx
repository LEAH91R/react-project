import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { listSubmissions } from '../api';
import { Submission } from '../api';
import { useAuth } from '../context/AuthContext';

const SubmissionList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const history = useHistory();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await listSubmissions();
        setSubmissions(response.data.data.items);
        setError('');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load submissions');
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [isAuthenticated, history]);

  if (loading) return <div><p>Loading submissions...</p></div>;

  return (
    <div>
      <h2>My Submissions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {submissions.length === 0 && !error && <p>No submissions yet. <Link to="/challenges">Start solving challenges!</Link></p>}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Challenge ID</th>
            <th>Status</th>
            <th>Result</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td>{submission.challengeId}</td>
              <td>{submission.status}</td>
              <td>{submission.result || '-'}</td>
              <td>{new Date(submission.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionList;
