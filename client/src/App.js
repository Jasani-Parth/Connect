import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Login from "./pages/login";

import Alert from "./components/alert/Alert";
import Header from "./components/Header";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme"></input>
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          <Routes>
            <Route exact path="/" Component={auth.token ? Home : Login} />
            <Route exact path="/:page" Component={PageRender} />
            <Route exact path="/:page/:id" Component={PageRender} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
