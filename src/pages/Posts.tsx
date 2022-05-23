import {useQuery} from "react-query";
import {FetchData, Post, User} from "../interface";
import axios, {AxiosPromise} from "axios";
import {Link, Route, Routes} from "react-router-dom";
import {UserDetail} from "./UserDetail";
import {PostDetail} from "./PostDetail";

export const Posts = () => {
  const {
    data,
    isLoading,
    isSuccess,
  } = useQuery(FetchData.FetchUsers, (): AxiosPromise<Post[]> => axios.get('https://jsonplaceholder.typicode.com/posts'));
  return <div>Posts
    {isLoading && <p>Loading User</p>}
    {isSuccess && (
      <div>
        {
          data.data.map(post => <Link key={post.id} to={post.id.toString()}><p>{post.title}</p></Link>)
        }
        {
          <Routes>
            <Route path=":id" element={<PostDetail/>}/>
          </Routes>
        }
      </div>
    )}

  </div>
}