import SingleTracking from "./SingleTracking";
import Home from "./Home";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return(
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/vehicles/tracking/single/:deviceID' element={<SingleTracking />} />
      </Routes>
    </Router>
  );
}

export default App;
