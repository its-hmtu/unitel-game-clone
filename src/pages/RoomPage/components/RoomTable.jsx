import { Button, ProgressBar } from "react-bootstrap";
import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Table from "src/components/Table";
import table_status from "images/roompage-table-status.svg";
import table_user from "images/roompage-table-user.svg";
import table_coin from "images/coin.svg";
import { getUserInfo } from "utils/localStorage";
import LoginModal from "components/Modal/LoginModal";
import CreateRoomModal from "components/Modal/CreateRoomModal";
import {
  getListRoomOfGameQuery,
  useCreateRoomByPlayNowOfGame,
  useJoinRoomNowOfGame,
} from "data/game";
import { SnackBarContext } from "contexts/SnackBarContext";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { SocketContext } from "contexts/SocketContext";
import JoinModal from "components/Modal/JoinModal";
import { getUserQuery } from "data/user";
import { RoomSearchContext } from "contexts/RoomSearchContext";

const RoomTable = ({ game, level }) => {
  const { roomId } = useParams();
  const { snackBar, setSnackBar } = useContext(SnackBarContext);
  const { socket, setSocketRoomId } = useContext(SocketContext);
  const { t } = useTranslation();
  const [loginModal, setLoginModal] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [limit, setLimit] = useState(10);
  const [roomList, setRoomList] = useState([]);
  const [joinModal, setJoinModal] = useState(false);
  const [roomSelect, setRoomSelect] = useState({});

  const {roomSearch, setRoomSearch} = useContext(RoomSearchContext);

  const { data, isLoading } = useQuery(
    getListRoomOfGameQuery(roomId, pageIndex * limit, limit, "", level)
  );

  const {data: userInfo} = useQuery(getUserQuery());
  const user = getUserInfo();
  let totalCount = data?.total;

  const openLoginModal = () => {
    setLoginModal((prev) => !prev);
  };

  const openJoinModal = (data) => {
    if (user) {
      setRoomSelect(data);
      if (data.required_password) {
        setJoinModal(true);
      } else {
        if (data.coin <= userInfo.coin) {
          join({
            room_id: data.id
          })
        } else {
          setSnackBar({
            open: true,
            message: t("room.table.check_coin"),
            severity: "error",
          })
        }
      }
    } else {
      openLoginModal()
    }
  };

  const handlePlayNow = () => {
    if (user) {
      mutate({
        game_id: roomId,
        level_id: level,
      });
    } else {
      openLoginModal();
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <span>{t("room.table.id")}</span>,
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorFn: (row) => row.player_count,
        id: "player_count",
        header: () => <span>{t("room.table.player")}</span>,
        cell: (info) => (
          <div className="progress-indicator">
            <img src={table_user} alt="Table User Icon" />
            <ProgressBar now={info.getValue()} max="2" variant="secondary" />
            <p>{`${info.getValue()}/2`}</p>
          </div>
        ),
        footer: (info) => info.column.id,
      },
      {
        accessorFn: (row) => row.coin,
        id: "coin",
        header: () => <span>{t("room.table.bet_level")}</span>,
        cell: (info) => (
          <div className="bet-container">
            <div className="d-flex" style={{ marginLeft: "30%", gap: "15px" }}>
              <img src={table_coin} alt="" />
              <p style={{ marginLeft: "15%" }}>
                {new Intl.NumberFormat("lo").format(info.getValue())}
              </p>
            </div>
          </div>
        ),
        footer: (info) => info.column.id,
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        header: () => <span>{t("room.table.status")}</span>,
        cell: (info) =>
          info.getValue() === 2 ? (
            <div className="status-container">
              <img src={table_status} alt="Table Status Icon" />
            </div>
          ) : null,
        footer: (info) => info.column.id,
      },
      {
        accessorFn: (row) => row.status,
        id: "play_now",
        header: () => (
          <Button onClick={handlePlayNow} className="room-table-btn">
            {t("game_card.play_btn")}
          </Button>
        ),
        cell: (info) => (
          <Button
            variant="primary"
            className="room-table-btn room-table-btn--join"
            onClick={() => openJoinModal(info.row.original)}
            disabled={info.row.original.player_count === 1 ? false : true}
          >
            {t("room.table.join")}
          </Button>
        ),
        footer: (info) => info.column.id,
      },
    ],
    [handlePlayNow]
  );

  const { mutate, data: dataPlay } = useCreateRoomByPlayNowOfGame(
    (result) => {
      if (result) {
        let data = result.data.playing;

        socket.emit("join room", { room_id: data.room_id });
      }
      setSnackBar({
        open: true,
        message: t("modal.success"),
        severity: "success",
      });
    },

    (data) => {
      console.log(data);
      setSnackBar({
        open: true,
        message: data.message || "Can't play now!",
        severity: "error",
      });
    }
  );

  const { mutate: join } = useJoinRoomNowOfGame(
    (result) => {
      if (result) {
        let data = result.data.joinRom;
        socket.emit("join room", { room_id: data.room_id });
      }
      setSnackBar({
        open: true,
        message: t("modal.success"),
        severity: "success",
      });
    },

    (data) => {
      console.log(data);
      setSnackBar({
        open: true,
        message: data.message || "Can't join room!",
        severity: "error",
      });
    }
  );

  useEffect(() => {
    if (data) {
      setRoomList(data?.rooms);
    }
  }, [data, level]);

  const onChangePage = (page) => {
    setPageIndex(page);
  };

  const onChangePageSize = (num_limit) => {
    setPageIndex(0);
    setLimit(num_limit);
  };

  const handleDataJoinGame = useCallback(
    data => {
      if (roomSelect.coin <= userInfo.coin) {
        join({
          room_id: roomSelect.id,
          password: data
        })
      } else {
        setSnackBar({
          open: true,
          message: t("room.table.check_coin"),
          severity: "error",
        })
      }
    }
  )

  // display rooms that includes roomSearch
  useEffect(() => {
    if (roomSearch) {
      setRoomList(roomList?.filter(room => room.id.toString().includes(roomSearch)))
    } else {
      setRoomList(data?.rooms)
    }
  }, [roomSearch, roomList])

  return (
    <>
      <Table
        data={roomList}
        columns={columns}
        totalCount={totalCount}
        onChangePage={onChangePage}
        onChangePageSize={onChangePageSize}
        pageIndex={pageIndex}
        roomTable
      />

      <LoginModal show={loginModal} onHide={openLoginModal} />

      {user ? (
        <JoinModal
          show={joinModal}
          onHide={() => setJoinModal(false)}
          hideDecor
          handleDataJoinGame={handleDataJoinGame}
        />
      ) : null}

      {/* {data.length > 0 ? (
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
      )} */}
    </>
  );
};

export default RoomTable;
