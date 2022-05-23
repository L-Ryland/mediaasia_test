import { useQuery } from "react-query";
import { Link, Route, Routes } from "react-router-dom";

import { FetchData } from "../interface";
import { UserDetail } from "./UserDetail";
import { fetchUsers } from "../requests";

export const Users = () => {
  const { data, isLoading, isSuccess } = useQuery(
    FetchData.FetchUsers,
    fetchUsers
  );
  console.log(`[users] `, data);
  return (
    <div className="detailOuter">
      {isLoading && <p>Loading User</p>}
      {isSuccess && (
        <div className="index">
          {data.data.map((user) => (
            <Link key={user.id} to={user.id.toString()}>
              <p>
                {user.id} - {user.name}
              </p>
            </Link>
          ))}
        </div>
      )}
      <div className="detail">
        <Routes>
          <Route path=":userId" element={<UserDetail />} />
        </Routes>
      </div>
    </div>
  );
};
