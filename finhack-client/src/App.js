import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Particle from './components/Particle/Particle';

function App() {
  return (
    <div className="App">
      <Particle className = "particle"/>
      <Navigation />
      <Logo />
    </div>
  );
}

export default App;
