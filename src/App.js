import Auth from "./components/Auth";
import Posts from "./components/Posts";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import AddPost from "./components/AddPostComp";
import AddPostPage from "./components/AddPostPage";
import SinglePost from "./components/SinglePost";
import Footer from "./components/Footer";

function App() {


  return (
    <div className="App">

      <BrowserRouter>
        <Navbar ></Navbar>
        <div className="container">
          <Switch>

            {/* //auth route */}
            <Route path='/auth/'>
              <Auth ></Auth>
            </Route>

            <Route path='/add-post'>
              <AddPostPage></AddPostPage>
            </Route>

            <Route path='/user/:id'>
              <div>User</div>
            </Route>

            <Route path='/post/:id'>
              <SinglePost></SinglePost>
            </Route>


            <Route path={['/:page', '/']}>
              <AddPost></AddPost>
              <Posts></Posts>
            </Route>



          </Switch>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
