import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRender from "./PageRender";

function App() {
  return (
    <Router>
      <input type="checkbox" id="theme"></input>
      <div className="App">
        <div className="main">
          <Routes>
            <Route path="/:page" Component={PageRender} />
            <Route path="/:page/:id" Component={PageRender} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
