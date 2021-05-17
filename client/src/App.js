import React, { useLayoutEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import { requestAuthAction } from './actions/actionCreator';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import TransactionHistory from './pages/TransactionHistory';

function App () {
  const dispatch = useDispatch();
  const history = useHistory();

  useLayoutEffect(() => {
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (refreshToken) {
      const {
        location: { pathname },
      } = history;

      const redirect = (path = pathname) => history.push(path);

      dispatch(requestAuthAction(refreshToken, redirect));
    }
  }, []);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/history' component={TransactionHistory} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/registration' component={RegistrationPage} />
        <PrivateRoute
          exact
          roles={['customer']}
          path='/payment'
          component={Payment}
        />
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest'
          component={StartContestPage}
        />

        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest/nameContest'
        >
          <ContestCreationPage
            contestType={CONSTANTS.NAME_CONTEST}
            title={'Company Name'}
          />
        </PrivateRoute>
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest/taglineContest'
        >
          <ContestCreationPage
            contestType={CONSTANTS.TAGLINE_CONTEST}
            title={'TAGLINE'}
          />
        </PrivateRoute>
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest/logoContest'
        >
          <ContestCreationPage
            contestType={CONSTANTS.LOGO_CONTEST}
            title={'LOGO'}
          />
        </PrivateRoute>
        <PrivateRoute
          exact
          roles={['customer', 'creator']}
          path='/dashboard'
          component={Dashboard}
        />
        <PrivateRoute
          exact
          roles={['customer', 'creator']}
          path='/contest/:id'
          component={ContestPage}
        />
        <PrivateRoute
          exact
          roles={['customer', 'creator']}
          path='/account'
          component={UserProfile}
        />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </>
  );
}

export default App;
