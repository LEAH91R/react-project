import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import CodeInput from './components/CodeInput';
import CodeList from './components/CodeList';
import Login from './components/Login';
import Register from './components/Register';
import ChallengeList from './components/ChallengeList';
import ChallengeDetail from './components/ChallengeDetail';
import SubmissionList from './components/SubmissionList';

const ProtectedRoute: React.FC<{ component: React.ComponentType; path: string; exact?: boolean }> = ({
  component: Component,
  path,
  exact = false
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        isAuthenticated ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid gray' }}>
      <Link to="/">Home</Link>
      {' | '}
      {isAuthenticated ? (
        <>
          <Link to="/challenges">Challenges</Link>
          {' | '}
          <Link to="/submissions">My Submissions</Link>
          {' | '}
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          {' | '}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={CodeInput} />
          <Route path="/codes" component={CodeList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/challenges" exact component={ChallengeList} />
          <ProtectedRoute
          path="/challenges/:id"
          component={ChallengeDetail}
          />
          <ProtectedRoute path="/submissions" exact component={SubmissionList} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
