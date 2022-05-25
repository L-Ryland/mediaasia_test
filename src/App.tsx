import React from "react";
import {
  BrowserRouter as Router, Link, Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Users } from "./pages/Users";
import { Albums } from "./pages/Albums";
import { Posts } from "./pages/Posts";
import { Photos } from "./pages/Photos";
import { Todos } from "./pages/Todos";

export const queryClient = new QueryClient();

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitle">Demo</div>
      <nav>
        <div className="navigator">
          {/*<NavLink className="linkFont" to="/">*/}
          {/*  Home*/}
          {/*</NavLink>*/}
          <NavLink className="linkFont bigFont" to="users">
            User
          </NavLink>
          <NavLink className="linkFont bigFont" to="albums">
            Albums
          </NavLink>
          <NavLink className="linkFont bigFont" to="photos">
            Photos
          </NavLink>
          <NavLink className="linkFont bigFont" to="posts">
            Posts
          </NavLink>
          <NavLink className="linkFont bigFont" to="todos">
            Todos
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main">
        <Router>
          <Header />
          <div className="content">
              <Routes>
                <Route index element={<Navigate to="users"/>}/>
                <Route path="users/*" element={<Users />} />
                <Route path="albums/*" element={<Albums />} />
                <Route path="photos/*" element={<Photos />} />
                <Route path="posts/*" element={<Posts />} />
                <Route path="todos/*" element={<Todos />} />
                {/*<Route path="/" element={<App/>}/>*/}
              </Routes>
            </div>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
