import React from 'react'
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Answer from './Answer';
import QuestionPoll from './QuestionPoll';
import Login from './Login';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';

const routesConfig = [
    {
        component: Dashboard,
        path: '/home',
    }, {
        component: Login,
        path: '/',
        exact: true
    }, {
        component: Answer,
        path: '/answer'
    }, {
        component: QuestionPoll,
        path: '/poll'
    }, {
        component: NewQuestion,
        path: '/create-question'
    }, {
        component: LeaderBoard,
        path: '/leader-board'
    }
]

const getAppRuotes = () => {
    return routesConfig.map((routeConfig, index) => (
        <Route key={index} path={routeConfig.path} component={routeConfig.component} exact={routeConfig.exact} >
        </Route>
    ));
}

export const getRoutes = () => {
    return getAppRuotes();
}