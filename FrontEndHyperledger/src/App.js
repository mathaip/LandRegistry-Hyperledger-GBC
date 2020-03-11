import React, { useState, Component } from 'react';
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

function App() {

  

  return (
    <BrowserRouter>
    <Switch>

    <Route exact={true} path='/' render={()=> <Login/>}/>

    <Route exact={true} path='/dashboard' render={()=> <Dashboard/>}/>
    <Route exact={true} path='/transferownership' render={()=> <TransferOwnership/>}/>

    </Switch>
      
    </BrowserRouter>
    
  );
}

function Login(props){
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
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default App;
