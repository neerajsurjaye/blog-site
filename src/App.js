import Auth from "./components/Auth";
import Posts from "./components/Posts";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">



      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          {/* //auth route */}
          <Route path='/auth/'>
            <Auth></Auth>
          </Route>

          <Route path='/'>
            <Posts></Posts>
          </Route>


        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
