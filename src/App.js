import './App.css';
import LayoutLoggedIn from './layout/LayoutLoggedIn';
import LayoutLoggedOut from './layout/LayoutLoggedOut';
import AppRouter from './router';

function App() {
  return (
    <>
      <LayoutLoggedOut/>
      <AppRouter/>
    </>
  );
}

export default App;
