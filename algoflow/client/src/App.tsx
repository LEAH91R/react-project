import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import CodeInput from './components/CodeInput';
import ChallengeList from './components/ChallengeList';
import ChallengeDetail from './components/ChallengeDetail';
import SubmissionList from './components/SubmissionList';

import './styles/globals.css';
import './styles/layout.css';
import './styles/auth.css';
import './styles/challenge.css';
import './styles/playground.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">

          <Navbar />

          <main className="main-content">

            <Switch>

              <Route exact path="/">
                <CodeInput />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

              <Route exact path="/challenges">
                <ChallengeList />
              </Route>

              <Route path="/challenges/:id">
                <ChallengeDetail />
              </Route>

              <Route path="/submissions">
                <SubmissionList />
              </Route>

            </Switch>

          </main>

        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;