import { useQuery } from "react-query";
import { FetchData, Todo } from "../interface";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { TodoDetail } from "./TodoDetail";
import { fetchTodos, fetchUsers } from "../requests";
import "./Todos.css";
import React from "react";

const TodosByUser: React.FC<{ todos: Todo[] | undefined }> = ({todos}) => {
  const { data: users } = useQuery(FetchData.FetchUsers, () => fetchUsers());
  return (
    <ul>
      {users && users.data.map((user) => (
        <div key={user.id}>
          <p>{user.name}'s Todos</p>
          <ul>
            {todos?.filter(({ userId }) => userId === user.id)
              .map((todo) => (
                <li key={todo.id} className={todo.completed ? "done" : ""}>
                  {todo.title} - {todo.completed ? "completed" : "not done"}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </ul>
  )
};
const BriefTodos: React.FC<{ todos: Todo[] | undefined }> = ({ todos }) => (
  <ul>
    {todos?.map((todo) => (
      // <Link key={todo.id} to={todo.id.toString()}>
        <li key={todo.id} className={todo.completed ? "done" : ""}>
          {todo.title} - {todo.completed ? "completed" : "not done"}
        </li>
      // </Link>
    ))}
  </ul>
);
export const Todos = () => {
  const {
    data: todos,
    isLoading,
  } = useQuery(FetchData.FetchAlbums, () => fetchTodos({_sort: "completed", _order: "asc"}));
  const finishedTodos: Todo[] | undefined = todos?.data.filter(
    ({ completed }) => completed === true
  );
  const notFinishedTodos: Todo[] | undefined = todos?.data.filter(
    ({ completed }) => completed === false
  );
  return (
    <div className="index">
      <div className="todo tab">
        <NavLink
          to="/todos"
          className={({ isActive }) => `button ${isActive && "active"}`}
        >
          Main
        </NavLink>
        <NavLink
          to="finishedTodos"
          className={({ isActive }) => `button ${isActive && "active"}`}
        >
          Finished
        </NavLink>
        <NavLink
          to="unfinishedTodos"
          className={({ isActive }) => `button ${isActive && "active"}`}
        >
          Not Done
        </NavLink>
      </div>
      {isLoading && <p>Loading Todos</p>}
      <Routes>
        <Route path=":id" element={<TodoDetail />} />
        <Route index element={<TodosByUser todos={todos?.data}/>}/>
        <Route
          path="finishedTodos"
          element={<BriefTodos todos={finishedTodos} />}
        />
        <Route
          path="unfinishedTodos"
          element={<BriefTodos todos={notFinishedTodos} />}
        />
      </Routes>
    </div>
  );
};