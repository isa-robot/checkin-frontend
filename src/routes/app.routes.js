import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

// AppRoutes
import Diary from '../pages/Diary';
import Qualis from '../pages/Qualis';
import NotFound from '../pages/NotFound';
import Monitoring from '~/pages/Monitoring';
import Panel from '~/pages/Panel';
import Setup from '~/pages/Setup';
import Users from '~/pages/Users';

// AuthRoutes
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Forgot from '~/pages/Forgot';
import ResetPassword from '~/pages/ResetPassword';

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} resource={false} />
      <Route
        path="/esqueci-minha-senha"
        roles={[]}
        exact
        component={Forgot}
        resource={false}
      />
      <Route
        path="/trocar-senha"
        roles={[]}
        component={ResetPassword}
        resource={false}
      />
      <Route
        path="/registrar"
        roles={['']}
        component={SignUp}
        resource={false}
      />
      <Route
        path="/configuracoes"
        component={Setup}
        roles={['admin']}
        resource={false}
      />
      <Route
        path="/diario"
        roles={['assisted']}
        component={Diary}
        resource="diary"
      />
      <Route path="/qualis" roles={[]} component={Qualis} resource={false} />
      <Route
        path="/configuracao"
        roles={['admin']}
        component={Setup}
        resource={false}
      />
      <Route
        path="/painel"
        roles={['admin']}
        component={Panel}
        resource="Painel"
      />
      <Route
        path="/monitoramento"
        roles={['admin']}
        component={Monitoring}
        resource="monitoring"
      />
      <Route
        path="/usuarios"
        roles={['admin']}
        component={Users}
        resource={false}
      />
      <Route component={NotFound} roles={[]} />
    </Switch>
  );
}
