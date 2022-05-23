import {useQuery} from "react-query";
import {Album, FetchData, Todo} from "../interface";
import axios, {AxiosPromise} from "axios";
import {Link, Route, Routes} from "react-router-dom";
import {UserDetail} from "./UserDetail";
import {TodoDetail} from "./TodoDetail";

export const Todos = () => {
  const {data, isLoading, isSuccess} = useQuery(FetchData.FetchAlbums, (): AxiosPromise<Todo[]> =>
    axios.get("https://jsonplaceholder.typicode.com/todos")
  );
  return <div>Todos
    {isLoading && <p>Loading User</p>}
    {isSuccess && (
      <div>
        {
          data.data.map(todo => <Link key={todo.id} to={todo.id.toString()}><p>{todo.title}</p></Link>)
        }
        {
          <Routes>
            <Route path=":id" element={<TodoDetail/>}/>
          </Routes>
        }
      </div>

    )}
  </div>
}