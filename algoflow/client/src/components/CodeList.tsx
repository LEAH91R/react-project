import React, { useEffect, useState } from 'react';
import { fetchCodes } from '../api';

const CodeList: React.FC = () => {
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCodes = async () => {
      try {
        const response = await fetchCodes();
        setCodes(response.data);
      } catch (err) {
        setError('Failed to fetch codes');
      } finally {
        setLoading(false);
      }
    };
    getCodes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {codes.map((code) => (
        <li key={code._id ?? code.id}>
          <strong>Code:</strong> {code.code} <br />
          <strong>Expected Time:</strong> {code.expectedTime}ms
        </li>
      ))}
    </ul>
  );
};

export default CodeList;
