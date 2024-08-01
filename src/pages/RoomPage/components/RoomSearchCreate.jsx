import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SearchBar from "src/components/SearchBar";
import addIcon from "images/roompage-add.svg";
import { useMediaQuery } from "@mui/material";
import { queryPoint } from "src/utils/hooks/useMediaQuery";
import CreateRoomModal from "components/Modal/CreateRoomModal";
import LoginModal from "components/Modal/LoginModal";
import { getUserInfo } from "utils/localStorage";
import { RoomSearchContext } from "contexts/RoomSearchContext";
import { useQuery } from "react-query";
import { getListRoomOfGameQuery } from "data/game";
import { useParams } from "react-router-dom";


const RoomSearchCreate = ({ game, level }) => {
  const { t } = useTranslation();
  const {roomId} = useParams()
  
  const user = getUserInfo();
  const isIconHidden = useMediaQuery(`(max-width: ${queryPoint.lg}px)`);
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const {roomSearch, setRoomSearch, roomListSearch, setRoomListSearch} = useContext(RoomSearchContext);

  const { data, isLoading } = useQuery(
    getListRoomOfGameQuery(roomId, 0, 10, searchValue, level)
  )
  useEffect(() => {
    if (searchValue) {
      setRoomSearch(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (data) {
      setRoomListSearch(data.rooms)
    }
  }, [roomSearch, data, level])

  const handleShowCreateRoom = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };
 
  const handleRoomSearch = (e) => {
    if (roomSearch == null || roomSearch === "") {
      setRoomListSearch([])
    }

    setRoomSearch(e.target.value)
  }

  return (
    <div className="room-search">
      <div className="search-bar search-bar-room">
        <SearchBar
          type="text"
          placeholder={t("room.search_id")}
          searchicon={isMobile ? true : !isIconHidden}
          onChange={handleRoomSearch}
        />
      </div>

      {isMobile ? (
        <div className="d-flex">
          <div className="d-flex">
            {user ? (
              <Button
                variant="primary"
                className="room-search-btn"
                onClick={handleShowCreateRoom}

              >
                <img src={addIcon} alt="" />
                <p className="m-0">{t("room.create_room")}</p>
              </Button>
            ) : (
              <Button
                variant="primary"
                className="room-search-btn"
                onClick={handleShowLogin}

              >
                <img src={addIcon} alt="" />
                <p className="m-0">{t("room.create_room")}</p>
              </Button>
            )}
          </div>
          {isMobile && (
            <div className="d-flex">
              <Button variant="primary" className="room-play-btn">
                <p className="m-0">Play now</p>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="d-flex">
            {user ? (
              <Button
                variant="primary"
                className="room-search-btn"
                onClick={handleShowCreateRoom}

              >
                <img src={addIcon} alt="" />
                <p className="m-0">{t("room.create_room")}</p>
              </Button>
            ) : (
              <Button
                variant="primary"
                className="room-search-btn"
                onClick={handleShowLogin}

              >
                <img src={addIcon} alt="" />
                <p className="m-0">{t("room.create_room")}</p>
              </Button>
            )}
          </div>
          {isMobile && (
            <div className="d-flex">
              <Button variant="primary" className="room-play-btn">
                <p className="m-0">Play now</p>
              </Button>
            </div>
          )}
        </>
      )}
      <CreateRoomModal
        show={showCreateRoom}
        game={game}
        title={t("room.create_room")}
        onHide={handleShowCreateRoom}
      />
      <LoginModal show={showLogin} onHide={handleShowLogin} />
    </div>
  );
};

export default RoomSearchCreate;
