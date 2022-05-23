import { useQuery } from "react-query";
import { FetchData } from "../interface";
import { Link, Route, Routes } from "react-router-dom";
import { AlbumDetail } from "./AlbumDetail";
import { fetchAlbums } from "../requests";
import {PhotoDetail} from "./PhotoDetail";

export const Albums = () => {
  const { data, isLoading, isSuccess } = useQuery(
    FetchData.FetchAlbums,
    fetchAlbums
  );
  return (
    <div className="detailOuter">
      {isLoading && <p>Loading Albums</p>}
      {isSuccess && (
        <div className="index">
          {data.data.map((album) => (
            <Link key={album.id} to={album.id.toString()}>
              <p>{album.id} - {album.title}</p>
            </Link>
          ))}
        </div>
      )}
      <div className="detail">
        <Link to=":albumId/photo_detail">DetailedPhoto</Link>
        <Routes>
          <Route path=":albumId" element={<AlbumDetail />} />
          <Route path=":albumId/photo_detail/:photoId" element={<PhotoDetail/>}/>
        </Routes>
      </div>
    </div>
  );
};