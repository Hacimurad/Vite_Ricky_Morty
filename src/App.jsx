import { Routes,Route } from 'react-router-dom';


import Menu from './components/Menu/Menu'
import Characters from './pages/Characters/Characters';
import Locations from './pages/Locations/Locations';

function App() {
  return (
    <div className="App">
        <Menu/>
        <Routes>
            <Route path="/" element={<Characters/>}/>
            <Route path="/locations" element={<Locations/>}/>
        </Routes>
    </div>
  )
}

export default App
