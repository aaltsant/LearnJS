import { BrowserRouter } from 'react-router-dom';
import Questions from './learnjs/Questions';
import './App.css'
import HomePage from './learnjs/homepage';

function App() {

  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}

export default App
