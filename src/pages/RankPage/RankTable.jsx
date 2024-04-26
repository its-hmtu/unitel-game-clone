import React, { useEffect } from "react";
import top1 from "images/rankpage-top1.svg";
import top2 from "images/rankpage-top2.svg";
import top3 from "images/rankpage-top3.svg";
import coin from "images/coin.svg";
import no_data from "images/profilepage-gifthist-nodata.svg";

const RankTable = ({ data, time }) => {
  useEffect(() => {
    console.log(time);
  }, []);

  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => (
          <tr key={index}>
            {item.rank === 1 ? (
              <td className="top-rank">
                <img src={top1} alt="" />
              </td>
            ) : item.rank === 2 ? (
              <td className="top-rank">
                <img src={top2} alt="" />
              </td>
            ) : item.rank === 3 ? (
              <td className="top-rank">
                <img src={top3} alt="" />
              </td>
            ) : (
              <td>{item.rank}</td>
            )}
            <td>{item.playerName}</td>
            <td>
              <div className="betcoin">
                <div>
                  <img src={coin} alt="" />
                  <p>{item.gold}</p>
                </div>
              </div>
            </td>
            <td>
              {item.win}/{item.lose}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={60} style={{ height: "500px" }}>
            <img src={no_data} alt="No data" className="no-data-img" />
          </td>
        </tr>
      )}
    </>
  );
};

export default RankTable;
