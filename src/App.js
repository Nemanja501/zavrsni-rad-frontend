import { useState } from 'react';
import './App.css';
import LayoutLoggedIn from './layout/LayoutLoggedIn';
import LayoutLoggedOut from './layout/LayoutLoggedOut';
import AppRouter from './router';
import { tokenContext } from './contexts/tokenContext';
import { userContext } from './contexts/userContext';


function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '');
  const valueUser = {loggedInUser, setLoggedInUser};
  const valueToken = {token, setToken};

  return (
    <userContext.Provider value={valueUser}>
    <tokenContext.Provider value={valueToken}>
      {token ? <LayoutLoggedIn/> : <LayoutLoggedOut/>}
      <AppRouter/>
    </tokenContext.Provider>
    </userContext.Provider>
  );
}

export default App;
