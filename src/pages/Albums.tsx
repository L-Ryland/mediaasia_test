import {useQueries, useQuery} from "react-query";
import {Album, FetchData, User} from "../interface";
import { Link, Route, Routes } from "react-router-dom";
import { AlbumDetail } from "./AlbumDetail";
import {fetchAlbums, fetchPhotos, fetchTodos} from "../requests";
import {PhotoDetail} from "./PhotoDetail";
import ReactECharts from "echarts-for-react";

const AlbumCharts: React.FC<{ albums: Album[] | undefined }> = ({ albums }) => {
  const picResult = useQueries(
    albums?.map((album) => ({
      queryKey: [FetchData.FetchPhotos, album.id],
      queryFn: async () => {
        const {data: pics} = await fetchPhotos({ albumId: album.id});
        return {name: album.title, value: pics.length};
      },
    })) || []
  );
  const albumByPics: any[] = picResult.map(({data}) => data);
  const options = {
    series: [
      {
        type: 'pie',
        stillShowZeroSum: false,
        data: albumByPics
      }
    ]
  };
  return (
    <div className="album chart">
      <h2>Albums Resource</h2>
      <ReactECharts option={options} />
    </div>
  );
};
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
            <Link className="linkFont" key={album.id} to={album.id.toString()}>
              <p>{album.id} - {album.title}</p>
            </Link>
          ))}
        </div>
      )}
      <div className="detail">
        <Link className="linkFont" to=":albumId/photo_detail" hidden>DetailedPhoto</Link>
        <Routes>
          <Route index element={<AlbumCharts albums={data?.data}/>}/>
          <Route path=":albumId" element={<AlbumDetail />} />
          <Route path=":albumId/photo_detail/:photoId" element={<PhotoDetail/>}/>
        </Routes>
      </div>
    </div>
  );
};