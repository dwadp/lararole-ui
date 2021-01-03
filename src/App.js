import { useEffect } from 'react';

import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import { web } from './lib/api';

/**
 * ******************************
 * Pages
 * ******************************
 */
import Login from './pages/Login';
import Home from './pages/Home';

// Dashboard
import DashboardRoute from './pages/dashboard/Route';
import DashboardIndex from './pages/dashboard/Index';
import PostIndex from './pages/dashboard/posts/Index';
import PostCreateForm from './pages/dashboard/posts/Create';

/**
 * ******************************
 * Context
 * ******************************
 */
import { AuthProvider } from './context/auth/AuthContext';
import { AbilityContext } from './context/ability/AbilityContext';
import ability from './context/ability/ability';

const { Content, Footer } = Layout;

function App() {
  useEffect(() => {
    web.get('/sanctum/csrf-cookie');
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AbilityContext.Provider value={ability}>
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Layout style={{ padding: '24px 0' }}>
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  <Route path="/login" exact>
                      <Login />
                  </Route>
                  <DashboardRoute path="/dashboard" exact>
                    <DashboardIndex />
                  </DashboardRoute>
                  <DashboardRoute
                    exact
                    path="/dashboard/posts"
                    permission={{action: "all", subject: "posts"}}
                  >
                    <PostIndex />
                  </DashboardRoute>
                  <DashboardRoute
                    exact
                    path="/dashboard/posts/create"
                    permission={{action: "create", subject: "post"}}
                  >
                    <PostCreateForm />
                  </DashboardRoute>
                </Switch>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Lararole</Footer>
          </Layout>
        </AbilityContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
