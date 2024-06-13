import {
  IonAlert,
  IonApp,
  setupIonicReact,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';


import {
  Main,
  Login,
  Register,
  TermsConditions,
  AddExercise,
  AddFood,
  CreateFood,
} from './pages';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './global.css';
import React, { useEffect, useState } from 'react';
import MainTabRoot from './pages/MainTabRoot';
import AdminTabRoot from './pages/AdminTabRoot';
import CreateExercise from './pages/CreateExercise';
import EditFood from './pages/EditFood';
import EditExercise from './pages/EditExercise';


setupIonicReact();

interface UserData {
  idUsuario: number
  nombre: string
  rol: string
  token: string
}

interface ContextValue {
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UserContext = React.createContext<ContextValue | undefined>(undefined);
export const API_URL = import.meta.env.VITE_API_URL

const defaultUserData = { idUsuario: 0, nombre: '', rol: '', token: '' }

export const updateToken = (setUserData: React.Dispatch<React.SetStateAction<UserData>>, newToken: string) => {
  setUserData(prevState => ({
    ...prevState,
    token: newToken
  }));
};

export function logout(setUserData: React.Dispatch<React.SetStateAction<UserData>>) {
  setUserData(defaultUserData)
}

const App: React.FC = () => {
  const [userData, setUserData] = React.useState(defaultUserData);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (userData.idUsuario != 0 && userData.token === '') {
      setShowAlert(true);
    }
  }, [userData.idUsuario, userData.token]);

  return (
    <IonApp>
      <UserContext.Provider value={{ userData, setUserData }}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/"
              component={Main} />
            <Route path="/login"
              component={Login} />
            <Route path="/signup"
              component={Register} />
            <Route path="/terms_and_conditions"
              component={TermsConditions} />
            <Route path="/tabs"
              render={() => <MainTabRoot />} />
            <Route path="/admin"
              render={() => <AdminTabRoot />} />
            <Route path="/exercise_add">
              <AddExercise />
            </Route>
            <Route path="/exercise_create">
              <CreateExercise />
            </Route>
            <Route path="/exercise_edit">
              <EditExercise />
            </Route>
            <Route path="/food_add">
              <AddFood />
            </Route>
            <Route path="/food_create">
              <CreateFood />
            </Route>
            <Route path="/food_edit">
              <EditFood />
            </Route>
          </Switch>

          {showAlert && (
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => {
                setShowAlert(false)
                setUserData(defaultUserData)
              }}
              header={'Error'}
              message={"Sesión expirada. Por favor vuelva a ingresar"}
              buttons={['OK']}
            />
          )}
          {userData.token === '' && userData.idUsuario == 0 && <Redirect to="/login" />}
        </IonReactRouter>
      </UserContext.Provider>
    </IonApp>
  );
}
export default App;