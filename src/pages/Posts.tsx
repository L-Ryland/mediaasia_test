import {useQuery} from "react-query";
import {FetchData, Post} from "../interface";
import axios, {AxiosPromise} from "axios";
import {Link, Route, Routes} from "react-router-dom";
import {PostDetail} from "./PostDetail";

export const Posts = () => {
  const {
    data,
    isLoading,
    isSuccess,
  } = useQuery(FetchData.FetchUsers, (): AxiosPromise<Post[]> => axios.get('https://jsonplaceholder.typicode.com/posts'));
  return <div className="detailOuter">
    {isLoading && <p>Loading post...</p>}
    {isSuccess && (
      <div className="index">
        {
          data.data.map(post => <Link className="linkFont" key={post.id} to={post.id.toString()}><p>{post.id} - {post.title}</p></Link>)
        }
      </div>
    )}
  <div className="detail">
    <Routes>
      <Route path=":postId" element={<PostDetail/>}/>
    </Routes>
  </div>
  </div>
}