import { useMemo, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { FetchData, Photo } from "../interface";
import { queryClient } from "../App";
import { fetchPhotos } from "../requests";

export const AlbumDetail = () => {
  const { albumId: paramAlbumId } = useParams();
  const [albumPhotos, setAlbumPhotos] = useState<Photo[]>();
  const navigate = useNavigate();
  useMemo(async () => {
    const { data } = await queryClient.fetchQuery(
      FetchData.FetchPhotos,
      () => fetchPhotos()
    );
    setAlbumPhotos(
      data.filter(({ albumId }) => albumId.toString() === paramAlbumId)
    );
  }, [paramAlbumId]);
  // console.log(`albumPhotos - `, albumPhotos);
  const handleClick = (id: number) => {
    navigate(`photo_detail/${id}`);
  }
  return (
    <div>
      {albumPhotos &&
        albumPhotos.map((photo) => (
          <div className="albumDetailContent" key={photo.id} onClick={() => handleClick(photo.id)}>
            <img alt={photo.title} src={photo.thumbnailUrl} />
            <p className="albumDetailText">{photo.title}</p>
          </div>
        ))}
    </div>
  );
};
