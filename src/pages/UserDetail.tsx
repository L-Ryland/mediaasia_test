import { useParams } from "react-router-dom";
import { queryClient } from "../App";
import { FetchData, User } from "../interface";
import { useMemo, useState } from "react";
import { fetchUsers } from "../requests";

export const UserDetail = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<User>();
  // alert(`userId - ${userId}`)
  const {} = queryClient.fetchQuery(FetchData.FetchUsers);
   useMemo(async () => {
    const { data } = await queryClient.fetchQuery(
      FetchData.FetchUsers,
      fetchUsers
    );
    setUserInfo(data.find(({ id }) => id.toString() === userId));
  }, [userId]);
  return (
    <div>
      UserDetail
      {userInfo && <div>
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
                  <li>Geo: lat - {userInfo.address.geo.lat}, lng - {userInfo.address.geo.lng} </li>

              </ul>
              <li>Phone: {userInfo.phone}</li>
              <li>Website: {userInfo.website}</li>
              <li>Company: </li>
              <ul>
                  <li>Name: {userInfo.company.name}</li>
                  <li>CatchPhrase: {userInfo.company.catchPhrase}</li>
                  <li>BS: {userInfo.company.bs}</li>
              </ul>
          </ul>
      </div>}
    </div>
  );
};