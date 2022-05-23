import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {FetchData} from "../interface";
import {fetchPhotos} from "../requests";

export const PhotoDetail = () => {
  const {photoId} = useParams();
  console.log(`photoDetail - ${photoId}`)
  const {data} = useQuery([FetchData.FetchPhotos, photoId], () => fetchPhotos({id: parseInt(photoId || "")}));
  return <div>PhotoDetail
    <img src={data?.data[0].url}/>
  </div>
}