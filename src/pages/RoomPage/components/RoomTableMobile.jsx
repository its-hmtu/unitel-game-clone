import { Button, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import table_coin from "images/coin.svg";
import table_status from "images/roompage-table-status.svg";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getListRoomOfGameQuery } from "data/game";
import { useEffect, useState } from "react";
import no_data from "images/profilepage-gifthist-nodata.svg";

const RoomTableMobile = ({ level }) => {
  const { roomId } = useParams();
  const [pageIndex, setPageIndex] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useQuery(
    getListRoomOfGameQuery(roomId, pageIndex * limit, limit, "", level)
  );
  const { t } = useTranslation();

  const [roomListMobile, setRoomListMobile] = useState([]);

  useEffect(() => {
    if (data) {
      setRoomListMobile(data);
    }
  }, [data]);

  return (
    <Container fluid className="roompage-table-mobile-container">
      <Row className="p-3">
        {roomListMobile?.length > 0 ? (
          roomListMobile?.map((item, index) => (
            <Col md={6} className="roompage-mobile-tabs mb-3" key={index}>
              <Row className="justify-content-between">
                <Col>
                  <div className="roompage-mobile-tab">
                    <h2>{t("room.table.id")}:</h2>
                    <p>{item?.id}</p>
                  </div>

                  <div className="roompage-mobile-tab mt-2">
                    <h2>{t("room.table.player")}:</h2>
                    <p>{item?.player_count}/2</p>
                  </div>

                  <div className="roompage-mobile-tab mt-2">
                    <h2>{t("room.table.bet_level")}:</h2>
                    <img src={table_coin} alt="" />
                    <p>{new Intl.NumberFormat("lo").format(item?.bet_level)}</p>
                  </div>
                </Col>
                <Col
                  xs={3}
                  className="d-flex flex-column align-items-end justify-content-end"
                >
                  {item?.status === 2 && (
                    <img
                      src={table_status}
                      alt=""
                      width="40"
                      className="room-status"
                    />
                  )}

                  <Button variant="primary">
                    <Link
                      to={"/"}
                      style={{
                        color: "white",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {t("room.table.join")}
                    </Link>
                  </Button>
                </Col>
              </Row>
            </Col>
          ))
        ) : (
          <img
            style={{ width: "40%", margin: "auto" }}
            src={no_data}
            alt="No reward is found"
          />
        )}
      </Row>
    </Container>
  );
};

export default RoomTableMobile;
