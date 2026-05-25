import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CodeInput from './components/CodeInput';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={CodeInput} />
            </Switch>
        </Router>
    );
};

export default App;