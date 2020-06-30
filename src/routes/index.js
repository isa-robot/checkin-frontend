import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Diary from '../pages/Diary';
import Qualis from '../pages/Qualis';
import NotFound from '../pages/NotFound';
import Monitoring from '~/pages/Monitoring';
import Panel from '~/pages/Panel';
import Forgot from '~/pages/Forgot';
import ResetPassword from '~/pages/ResetPassword';
import Profile from '~/pages/Profile';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} resource={false} />
      <Route
        path="/esqueci-minha-senha"
        exact
        component={Forgot}
        resource={false}
      />
      <Route path="/trocar-senha" component={ResetPassword} resource={false} />
      <Route
        path="/registrar"
        component={SignUp}
        resource={false}
        isPrivate={false}
      />
      <Route path="/perfil" component={Profile} resource={false} isPrivate />
      <Route path="/diario" component={Diary} resource="Diário" isPrivate />
      <Route path="/qualis" component={Qualis} resource={false} isPrivate />
      <Route path="/painel" component={Panel} resource="Painel" isPrivate />
      <Route
        path="/monitoramento"
        component={Monitoring}
        resource="Monitoramento"
        isPrivate
      />
      <Route component={NotFound} />
    </Switch>
  );
}
