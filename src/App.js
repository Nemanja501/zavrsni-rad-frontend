import { useState } from 'react';
import './App.css';
import LayoutLoggedIn from './layout/LayoutLoggedIn';
import LayoutLoggedOut from './layout/LayoutLoggedOut';
import AppRouter from './router';
import { tokenContext } from './contexts/tokenContext';


function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const value = {token, setToken};

  return (
    <tokenContext.Provider value={value}>
      {token ? <LayoutLoggedIn/> : <LayoutLoggedOut/>}
      <AppRouter/>
    </tokenContext.Provider>
  );
}

export default App;
