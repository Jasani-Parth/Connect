import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModel from "./components/StatusModel";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from './redux/actions/postAction'

function App() {
  const { auth, status, modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch]);

  useEffect(() => {
    if(auth.token) dispatch(getPosts(auth.token))
  }, [dispatch, auth.token]);

  const firstLogin = localStorage.getItem("firstLogin");
  // console.log(firstLogin);
  // console.log("user", auth.user);
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme"></input>
      <div className={`App ${(status|| modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModel />}

          <Routes>
            <Route exact path="/" Component={auth.token ? Home : Login} />
            <Route exact path="/register" Component={Register} />
            <Route
              exact
              path="/:page"
              Component={firstLogin ? PageRender : Login}
            />
            <Route
              exact
              path="/:page/:id"
              Component={firstLogin ? PageRender : Login}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
