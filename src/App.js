import './App.css';
import Home from './Components/Home';
import PhysicalState from './contextApis/physicalcheck/physicalState';
import About from './Components/About';
import Navbar from './Components/navbar';
import Login from './Components/Login';
import Physicalcheck from './Components/physicalcheck';
import Mentalcheck from './Components/mentalcheck';
import Signup from './Components/Signup';
import Diabetes from './Diabetes';
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import EditPhysical from './Components/EditPhysical';

function App() {

  return (
    <>          
      <PhysicalState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/physical">
              <Physicalcheck />
            </Route>
            <Route exact path="/mental">
              <Mentalcheck />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/physical/updatephysical">
              <EditPhysical/>
            </Route>
            <Route exact path="/physical/diabetes">
              <Diabetes/>
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/forgotpassword">
              <Login />
            </Route>
          </Switch>
        </Router>
      </PhysicalState>
    </>
  );
}

export default App;
