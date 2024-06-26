import React from "react";
import { Button } from "react-bootstrap";
import RankTable from "src/pages/RankPage/RankTable";
import RoomTable from "src/pages/RoomPage/components/RoomTable";

const Table = ({ rankTable = false, roomTable = false, data }) => {
  return (
    <div className={`table-wrapper ${rankTable && "rank-table"} ${roomTable && "room-table"}`}>
      <table>
        <thead>
          {rankTable && (
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Gold</th>
              <th>Win/Lose</th>
            </tr>
          )}
          {roomTable && (
            <tr>
              <th>ID</th>
              <th>Player</th>
              <th>Bet level</th>
              <th>Status</th>
              <th>
                <Button variant="primary" className="room-table-btn">Play now</Button>
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {
            rankTable && <RankTable data={data} />
          }

          {
            roomTable && <RoomTable data={data} />
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
