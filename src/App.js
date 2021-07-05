import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeMain from './Components/Home/HomeMain/HomeMain';
import Navbar from './Components/Navbar/Navbar';
import Create from './Components/Create/Create';


function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/">
          <HomeMain></HomeMain>
        </Route>
        <Route path="/create">
          <Create></Create>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
