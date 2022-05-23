import React from "react";
import {
  BrowserRouter as Router, Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
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
          <NavLink className="linkFont" to="users">
            User
          </NavLink>
          <NavLink className="linkFont" to="albums">
            Albums
          </NavLink>
          <NavLink className="linkFont" to="photos">
            Photos
          </NavLink>
          <NavLink className="linkFont" to="posts">
            Posts
          </NavLink>
          <NavLink className="linkFont" to="todos">
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
      <div>
        <Router>
          <Header />
          {/*<Router>*/}
          {/*  <div>*/}
          {/*<nav>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      <NavLink to="/">Home</NavLink>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <NavLink to="users">User List</NavLink>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <NavLink to="albums">Albums List</NavLink>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <NavLink to="photos">Photos List</NavLink>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <NavLink to="posts">Posts List</NavLink>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <NavLink to="todos">Todos List</NavLink>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</nav>*/}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <div className="content">
          <Routes>
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
