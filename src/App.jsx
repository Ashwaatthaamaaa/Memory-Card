import './App.css';
import Header from './components/Header/Header';
import Scoreboard from './components/Header/Scoreboard';
import Content from './components/Content/Content';
import { useState} from 'react';

function App() {
  const [currScore,setCurrScore] = useState(0);
  const [bestScore,setBestScore] = useState(0);




  return (
    <>

    <Header/>

    <Scoreboard currScore={currScore} bestScore={bestScore}/>

    <Content currScore={currScore} setCurrScore={setCurrScore} bestScore={bestScore} setBestScore={setBestScore}/>
    </>

  );
}

export default App;
