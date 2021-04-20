import React,{createContext,useEffect,useReducer,useContext} from 'react';
import Navbar from './Components/Navbar'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './Components/screens/Home';
import Signin from './Components/screens/Login';
import Signup from './Components/screens/Signup';
import Profile from './Components/screens/Profile';
import CreatePost from './Components/screens/CreatePost';
import {reducer,initialState} from './Reducers/userReducer';
export const UserContext=createContext()
const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    //it is a string
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }
    else{
      history.push('/signin')
    }
  },[])
  return <Switch>
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
  </Switch>

}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar />
   <Routing/>
    
    </BrowserRouter>
      </UserContext.Provider>
     
  );
}

export default App;
