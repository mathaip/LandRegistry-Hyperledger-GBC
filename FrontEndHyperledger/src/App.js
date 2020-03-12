import React, { useState, Component,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchData from './utils/fetchData'
import './login.css'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useLocation
} from "react-router-dom";
import Dashboard from './Dashboard.js';
import TransferOwnership from './TransferOwnership';
import { isArray } from 'util';
import { CircularProgress } from '@material-ui/core';
import firebase from './firebase'

function App(props) {

  const [firebaseInitialized, setFirebaseInitialized] = useState(false)
  const [setLogged, logged] = useState("")
	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})

  return firebaseInitialized !== false ?(
    <BrowserRouter>
    <Switch>

    <Route exact={true} path='/' render={()=> <Login/>}/>
    <Route exact={true} path='/testAPI' render={()=> <API/>}/>

    <Route exact={true} path='/dashboard' render={()=> <Dashboard setLogged={setLogged}/>}/>
    <Route exact={true} path='/transferownership' render={()=> <TransferOwnership/>}/>

    </Switch>
      
    </BrowserRouter>
    
  ) : <div id="loader"><CircularProgress /></div>
}

function Login({logged, setLogged}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  return(

    <div className="Login">
      
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} onClick={login} type="submit">
          Login
        </Button>
      </form>
    </div>
  )
  async function login(props) {
    const setLogged = props.setLogged
    try {
			await firebase.login(email, password).then(res => setLogged(true))
			
		} catch(error) {
			alert(error.message)
		}
	}
}



  
  
  
  
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
    
        <ul>
          
          <li key={apiResponse.Key}>{apiResponse.Record}</li>
        </ul>
        {apiResponse}
      

    </div>
  )
}
export default App;
