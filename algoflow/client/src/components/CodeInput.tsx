import React, { useState } from 'react';
import { runCode } from '../api';
import '../styles/playground.css';
const CodeInput: React.FC = () => {
  const [code, setCode] = useState('');
  const [expectedTime, setExpectedTime] = useState<number | ''>('');
  const [result, setResult] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!code || expectedTime === '') {
      setIsError(true);
      setResult('Please provide code and expected execution time');
      return;
    }

    try {
      const response = await runCode({
        code,
        expectedTime
      });

      setIsError(false);

      setResult(
        `Output: ${response.data.executionResult}
Time Taken: ${response.data.actualTime}ms`
      );
    } catch (error) {
      setIsError(true);
      setResult('Error executing code');
    }
  };

  return (<div className="code-page">
  <div className="code-container">

    <h1 className="code-title">
      AlgoFlow Playground
    </h1>

    <p className="code-subtitle">
      Test and analyze algorithm performance
    </p>

    <form onSubmit={handleSubmit}>

      <label className="code-label">
        Source Code
      </label>

      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="controls">

        <input
          className="time-input"
          type="number"
          placeholder="Expected Time (ms)"
          value={expectedTime}
          onChange={(e) =>
            setExpectedTime(Number(e.target.value))
          }
        />

        <button
          className="run-button"
          type="submit"
        >
          Run Code
        </button>

      </div>

      {result && (
        <div className="result">
          {result}
        </div>
      )}

    </form>

  </div>
</div>
  );
};

export default CodeInput;