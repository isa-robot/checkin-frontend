import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

// AppRoutes
import Diary from '../pages/Diary';
import Qualis from '../pages/Qualis';
import NotFound from '../pages/NotFound';
import Monitoring from '~/pages/Monitoring';
import Panel from '~/pages/Panel';
import Profile from '~/pages/Profile';
import Setup from '~/pages/Setup';
import Eleicao from '~/pages/Election';
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
        roles={['admin']}
        component={SignUp}
        resource={false}
        isPrivate={false}
      />
      <Route
        path="/configuracoes"
        component={Setup}
        roles={[]}
        resource={false}
        isPrivate
      />
      <Route
        path="/perfil"
        roles={['infectologist', 'admin']}
        component={Profile}
        resource={false}
        isPrivate
      />
      <Route
        path="/diario"
        roles={['admin']}
        component={Diary}
        resource="diary"
        isPrivate
      />
      <Route
        path="/qualis"
        roles={[]}
        component={Qualis}
        resource={false}
        isPrivate
      />
      <Route
        path="/configuracao"
        roles={['admin']}
        component={Setup}
        resource={false}
        isPrivate
      />
      <Route
        path="/eleicao"
        roles={['admin']}
        component={Eleicao}
        resource={false}
        isPrivate
      />
      <Route
        path="/painel"
        roles={['admin']}
        component={Panel}
        resource="Painel"
        isPrivate
      />
      <Route
        path="/monitoramento"
        roles={['admin']}
        component={Monitoring}
        resource="monitoring"
        isPrivate
      />
      <Route
        path="/usuarios"
        roles={['admin']}
        component={Users}
        resource={false}
        isPrivate
      />
      <Route component={NotFound} roles={[]} />
    </Switch>
  );
}
