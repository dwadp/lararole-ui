import { useContext, useEffect } from 'react';
import { useAbility } from '@casl/react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth/AuthContext';
import { AbilityContext, updateAbility } from '../../context/ability/AbilityContext';

import DashboardTemplate from './Template';

const DashboardRoute = ({ children, permission, ...args }) => {
  const {
    setAuthenticated,
    checkIsAuthenticated,
    authenticated,
    user
  } = useContext(AuthContext);

  const ability = useAbility(AbilityContext);

  useEffect(() => {
    setAuthenticated(true);
    checkIsAuthenticated();
  }, [setAuthenticated, checkIsAuthenticated]);

  useEffect(() => {
    updateAbility(ability, user.permissions);
  }, [user, ability]);

  if(permission) {
    if(!ability.can(permission.action, permission.subject)) {
      return <div>Access denied</div>;
    }
  }

  return (
    <Route
      {...args}
      render={() => !authenticated ? <Redirect to="/login" /> : (
        <DashboardTemplate>
          {children}
        </DashboardTemplate>
      )}
    />
  );
};

export default DashboardRoute;