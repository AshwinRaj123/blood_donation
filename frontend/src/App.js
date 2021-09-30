import Main from './components/main'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
