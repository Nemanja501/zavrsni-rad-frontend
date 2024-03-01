import './App.css';
import LayoutLoggedIn from './layout/LayoutLoggedIn';
import LayoutLoggedOut from './layout/LayoutLoggedOut';
import AppRouter from './router';

const token = localStorage.getItem('token');
function App() {
  return (
    <>
      {token ? <LayoutLoggedIn/> : <LayoutLoggedOut/>}
      <AppRouter/>
    </>
  );
}

export default App;
