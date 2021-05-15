import React, { useEffect, useState } from "react";
import * as S from "./styled";
import * as api from "../../api";
import Moment from "react-moment";

const DashboardPage = () => {
  const [statistics, setStatistics] = useState();

  const getStatistics = async () => {
    try {
      const { data } = await api.getStatistics();
      console.log(data);
      setStatistics(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <S.Container>
      <h1>Dashboard</h1>

      {statistics && (
        <div>
          <p>Total threads: {statistics.totalThreads}</p>
          <p>Total users: {statistics.totalUsers}</p>
          <p>
            New users in <Moment format="MMMM">{new Date()}</Moment>:{" "}
            {statistics.newUsersThisMonth}
          </p>
        </div>
      )}
    </S.Container>
  );
};

export default DashboardPage;
