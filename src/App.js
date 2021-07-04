import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeMain from './Components/Home/HomeMain/HomeMain';
import Navbar from './Components/Navbar/Navbar';


function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path="/">
          <HomeMain></HomeMain>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
