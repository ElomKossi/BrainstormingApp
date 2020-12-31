import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './containers/Content';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Topic from './containers/Topic/Topic'
import Thread from './containers/Thread/Thread'

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Content} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/reset_password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />

                    <Route exact path='/topic' component={Topic} />
                    <Route exact path='/topic/:topic' component={Thread} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;