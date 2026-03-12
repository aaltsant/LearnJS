import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Questions from './learnjs/questions';

function App() {

  return (
    <BrowserRouter>
      <Questions />
    </BrowserRouter>
  );
}

export default App
