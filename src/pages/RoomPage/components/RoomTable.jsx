import no_data from "images/profilepage-gifthist-nodata.svg";
import table_user from "images/roompage-table-user.svg";
import table_coin from "images/coin.svg"
import { Button, ProgressBar } from "react-bootstrap";

const RoomTable = ({data}) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <div className="progress-indicator">
                  <img src={table_user} alt="Table User Icon" />
                  <ProgressBar now={1} max="2" variant="secondary"/>
                  <p>1/2</p>
                </div>
              </td>
              <td>
                <div className="bet-container">
                  <div className="d-flex" style={{marginLeft: '30%', gap: "15px"}}>
                    <img src={table_coin} alt="" />
                    <p style={{marginLeft: "15%"}}>
                      {new Intl.NumberFormat("lo").format(item.betLevel)}
                    </p>
                  </div>
                </div>
              </td>
              <td>{item.status}</td>
              <td>
                <Button variant="primary" className="room-table-btn room-table-btn--join">Join</Button>
              </td>
            </tr>
          )
        })
      ) : (
        <tr>
          <td colSpan={60} style={{ height: "500px" }}>
            <img src={no_data} alt = "No data" className="no-data-img" />
          </td>
        </tr>
      )}
    </>
  )
}

export default RoomTable