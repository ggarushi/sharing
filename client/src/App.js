import React from 'react';
import Navbar from './Components/Navbar'
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './Components/screens/Home';
import Signin from './Components/screens/Login';
import Signup from './Components/screens/Signup';
import Profile from './Components/screens/Profile';
import CreatePost from './Components/screens/CreatePost';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Route exact path="/">
    <Home />
      </Route>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/createpost">
      <CreatePost />
    </Route>
    
    </BrowserRouter>
     
  );
}

export default App;
