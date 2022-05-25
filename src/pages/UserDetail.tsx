import { useParams } from "react-router-dom";
import {FetchData, Geo, User} from "../interface";
import { fetchUsers } from "../requests";
import { useQuery } from "react-query";
import Map, {Marker} from "react-map-gl";
import {useEffect, useState} from "react";

interface MapProperties {
  longitude: number,
  latitude: number,
  zoom: number
}
const UserMap: React.FC<{location: MapProperties}> = ({location}) => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 14,
  });
  useEffect(() => setViewState(location), [location]);
  return (
    <div className="map">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: 600, height: 400 }}

        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoicnlsYW5kbCIsImEiOiJjbDNrM2ZuenowMmg3M2RwMzFkaXR2MG53In0.xmEqALC0y4A-5LBwbCtAFw"
      >
        <Marker {...location} anchor="center" />
      </Map>
    </div>
  )
}
export const UserDetail = () => {
  const { userId } = useParams();
  const { data, isLoading } = useQuery([FetchData.FetchUsers, userId], () =>
    fetchUsers({ id: parseInt(userId || "") })
  );
  const userInfo: User | undefined = data?.data[0];
  const userGeo: Geo | undefined = userInfo?.address.geo;
  const mapGeo = {
    longitude: parseFloat(userGeo?.lng || "-122.4"),
    latitude:  parseFloat(userGeo?.lat || "37.8"),
    zoom: 14,
  }
  return (
    <div>
      <h2>{userInfo && `${userInfo.name}'s `}Profile</h2>
      {isLoading && <p>Loading user profile...</p>}
      {userInfo && (
        <div>
          <ul>
            <li>id: {userInfo.id}</li>
            <li>name: {userInfo.name}</li>
            <li>username: {userInfo.username}</li>
            <li>email: {userInfo.email}</li>
            <li>Address:</li>
            <ul>
              <li>Street: {userInfo.address.street}</li>
              <li>Suite: {userInfo.address.suite}</li>
              <li>City: {userInfo.address.city}</li>
              <li>Zip Code: {userInfo.address.zipcode}</li>
              <li>
                Geo: lat: {userInfo.address.geo.lat}, lng:
                {userInfo.address.geo.lng}{" "}
              </li>
            </ul>
            <li>Phone: {userInfo.phone}</li>
            <li>Website: {userInfo.website}</li>
            <li>Company:</li>
            <ul>
              <li>Name: {userInfo.company.name}</li>
              <li>CatchPhrase: {userInfo.company.catchPhrase}</li>
              <li>BS: {userInfo.company.bs}</li>
            </ul>
          </ul>
        </div>
      )}
      <UserMap location={mapGeo}/>
    </div>
  );
};