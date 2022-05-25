import { useQueries, useQuery } from "react-query";
import { Link, Route, Routes } from "react-router-dom";
import ReactECharts from "echarts-for-react";

import { FetchData, User } from "../interface";
import { UserDetail } from "./UserDetail";
import { fetchTodos, fetchUsers } from "../requests";

const UserCharts: React.FC<{ users: User[] | undefined }> = ({ users }) => {
  const usersByName: string[] = users?.map((user) => user.name) || [];
  const todoResult = useQueries(
    users?.map((user) => ({
      queryKey: [FetchData.FetchTodos, user.id, true],
      queryFn: async () => {
        const {data: completed} = await fetchTodos({ userId: user.id, completed: true });
        return completed.length;
      },
    })) || []
  );
  const usersByTodos = todoResult.map(({data}) => data);
  const options = {
    grid: { top: 8, right: 100, bottom: 24, left: 150},
    yAxis: {
      data: usersByName,
      inverse: true,
    },
    xAxis: {},
    series: [
      {
        realtimeSort: true,
        type: "bar",
        data: usersByTodos,
        name: "User Chart",
        label: {
          show: true,
          position: "right",
          valueAnimation: true,
        }
      },
    ],
  };

  return (
    <div className="user chart">
      <h2>Todo LeaderBoard</h2>
      <ReactECharts option={options} />
    </div>
  );
};
export const Users = () => {
  const { data, isLoading, isSuccess } = useQuery(FetchData.FetchUsers, () =>
    fetchUsers()
  );
  return (
    <div className="detailOuter">
      {isLoading && <p>Loading User</p>}
      {isSuccess && (
        <div className="index">
          {data.data.map((user) => (
            <Link className="linkFont" key={user.id} to={user.id.toString()}>
              <p>
                {user.id} - {user.name}
              </p>
            </Link>
          ))}
        </div>
      )}
      <div className="detail">
        <Routes>
          <Route index element={<UserCharts users={data?.data} />} />
          <Route path=":userId" element={<UserDetail />} />
        </Routes>
      </div>
    </div>
  );
};
