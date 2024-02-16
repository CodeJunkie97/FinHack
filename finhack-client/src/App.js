import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Particle from './components/Particle/Particle';
import SignIn from './components/SignIn/SignIn'
const initialState = {
  route: 'signin',
  isSignedIn: false,
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

  render(){
    const{isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
      <Particle className = "particle"/>
      <Navigation/>
      { route === 'home'
      ?<div>
      <Logo />
      </div>
    : (
      route === 'signin'
      ?<SignIn/>
      :<Logo/>
    )
  }
    </div>
  );
  }
}

export default App;