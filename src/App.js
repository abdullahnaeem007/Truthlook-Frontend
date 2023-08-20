import './App.css'
import {Fragment} from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import LogIn from './Components/LogIn';
import SearchPage from './Components/SearchPage';
import SignUp from './Components/SignUp';
import SearchHistory from './Components/SearchHistory';
import LandingPage from './Components/LandingPage';

function App() {
  return (
    <div class='backMain'>

      <BrowserRouter>
        <Fragment>
          <Routes>

            <Route path='/' exact Component={LandingPage} />
            <Route path='/login' exact Component={LogIn}/>
            <Route path='/signup' exact Component={SignUp}/>
            <Route path='/search' exact Component={SearchPage}/>
            <Route path='/history' exact Component={SearchHistory}/>

          </Routes>
        </Fragment>
      </BrowserRouter>

    </div>
  );
}

export default App;
