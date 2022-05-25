import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {FetchData} from "../interface";
import {fetchPhotos} from "../requests";

export const PhotoDetail = () => {
  const {photoId} = useParams();
  const {data, isLoading} = useQuery([FetchData.FetchPhotos, photoId], () => fetchPhotos({id: parseInt(photoId || "")}));
  const detailedPhoto = data?.data[0];
  return <div>
    <h2>{detailedPhoto ? detailedPhoto.title : "Photo Detail"}</h2>
    {isLoading && <p>Loading Photos ... </p>}
    {detailedPhoto && (<div>
    <img src={detailedPhoto.url}/>
    <ul>
      <li>AlbumId - {detailedPhoto.albumId}</li>
      <li>PhotoId - {detailedPhoto.id}</li>
      <li>Title - {detailedPhoto.title}</li>
      <li>Url - {detailedPhoto.url}</li>
      <li>Thumbnail Url - {detailedPhoto.thumbnailUrl}</li>
    </ul></div>)}
  </div>
}