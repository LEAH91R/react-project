import React from 'react'; // חשוב לייבוא
import axios from 'axios';

const Login: React.FC = () => {
    const handleLogin = async () => {
        const response = await axios.post('/api/auth/login', {
            username: 'אינפוט מהמשתמש',
            password: 'אינפוט מהמשתמש',
        });
        console.log(response.data);
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login; // ייצוא הוא הכרחי