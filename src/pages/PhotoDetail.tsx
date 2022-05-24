import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {FetchData} from "../interface";
import {fetchPhotos} from "../requests";

export const PhotoDetail = () => {
  const {photoId} = useParams();
  const {data, isLoading} = useQuery([FetchData.FetchPhotos, photoId], () => fetchPhotos({id: parseInt(photoId || "")}));
  return <div>
    {isLoading && <p>Loading Photos ... </p>}
    <img src={data?.data[0].url}/>
  </div>
}