import React, { useState } from 'react'; // חשוב
import axios from 'axios';
import './styles.css';

const CodeInput: React.FC = () => {
    const [code, setCode] = useState('');
    const [expectedTime, setExpectedTime] = useState<number | ''>('');
    const [result, setResult] = useState<string | null>(null);
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/codes', { code, expectedTime });
            setResult(`Output: ${response.data.executionResult}, Time Taken: ${response.data.actualTime}ms`);
        } catch (error) {
            setResult('Error executing code');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Run Your Code</h2>
            <label>Code:</label>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} required />
            <label>Expected Time (ms):</label>
            <input type="number" value={expectedTime} onChange={(e) => setExpectedTime(Number(e.target.value))} required />
            <button type="submit">Run Code</button>
            {result && <div className="result">{result}</div>}
        </form>
    );
};

export default CodeInput; // ייצוא הוא הכרחי