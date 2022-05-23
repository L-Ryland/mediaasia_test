import {useQuery} from "react-query";
import {Album, FetchData, Photo} from "../interface";
import axios, {AxiosPromise} from "axios";
import {Link, Route, Routes} from "react-router-dom";
import {AlbumDetail} from "./AlbumDetail";
import {PhotoDetail} from "./PhotoDetail";
import {fetchAlbums} from "../requests";

export const Photos = () => {
  const {data, isLoading, isSuccess} = useQuery(FetchData.FetchAlbums, fetchAlbums);
  return <div>Photos
    {isLoading && <p>Loading Photos</p>}
    {isSuccess && (
      <div>
        {
          data.data.map(photo => <Link key={photo.id} to={photo.id.toString()}><p>{photo.title}</p></Link>)
        }
        {
          <Routes>
            <Route path=":id" element={<PhotoDetail/>}/>
          </Routes>
        }
      </div>)
    }
  </div>
}