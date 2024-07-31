import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "routes/path";
import { SocketContext } from "utils/socket";
import { HeaderHomeSvg } from "assets/svg/Header";
import avaDefault from "images/ava-default.jpeg";
import tickCircleIcon from "images/playroompage-tickCircle.svg";
import coinIcon from "images/coin.svg";
import statusIcon from "images/roompage-table-status.svg";
import iconDrop from "images/eventWater/iconDrop.png";
import { getData, getLanguage, getUserInfo, setData } from "utils/localStorage";
import { queryPoint, useMediaQuery } from "utils/hooks/useMediaQuery";
import { useQuery } from "react-query";
import { getCheckEventWaterQuery, getRoomDetailOfGameQuery } from "data/game";
import { SnackBarContext } from "contexts/SnackBarContext";
import { handleFlyWater } from "utils/helpers";
import invitePlayerIcon from "images/playroompage-waitplayer.svg";
import crossIcon from "images/playroompage-cross.svg";
import arrowNextIcon from "images/angle-right-svgrepo-com.svg";
import RankTableMobile from "pages/RankPage/RankTableMobile";
import InviteFriendModal from "components/Modal/InviteFriendModal";

// variables
let firstScrollEndChat = true;
let pageComment = 1;
let lastScroll = 0;
let isScrollUp = false;
let isLastPageComment = false;
let enableScrollLoadMoreComment = true;
let isLoadingMoreComment = false;
let isScrollEndBoxChat = -1;
let totalNewMessageChat = 0;

const PlayRoomPage = () => {
  // i18n
  const { t } = useTranslation();

  // media queries
  const isMobileMD = useMediaQuery(`(max-width: ${queryPoint.md}px)`);
  const isMobileXxl = useMediaQuery(`(max-width: ${queryPoint.xxl}px)`);

  // react router
  const { gameId, roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // contexts
  const { socket, setSocketRoomId } = useContext(SocketContext);
  const { snackBar, setSnackBar } = useContext(SnackBarContext);

  // refs
  const chatBoxRef = useRef(null);
  const textAreaRef = useRef(null);

  // states
  const [isReady, setIsReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [userPlay, setUserPlay] = useState(null);
  const [dataStartGame, setDataStartGame] = useState(null);
  const [flagChat, setFlagChat] = useState(false);
  const [listCommentOnLine, setListCommentOnLine] = useState([]);
  const [modalInviteFriend, setModalInviteFriend] = useState(false);
  const [textComment, setTextComment] = useState("");

  // local storage
  const userInfo = getUserInfo();
  const language = getLanguage();

  // handlers
  function handleInviteFriend() {
    setModalInviteFriend((prev) => !prev);
  }

  function scrollToBottomChat() {
    var chatBox = document.getElementById("chat-wrapper");
    if (chatBox) {
      setFlagChat(!flagChat);
      totalNewMessageChat = 0;
      chatBox.scroll({
        top: chatBox.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
    isScrollEndBoxChat = 0;
    isScrollUp = false;
    if (scrollTop < lastScroll) {
      isScrollUp = true;
    }

    if (scrollTop + clientHeight === scrollHeight) {
      isScrollEndBoxChat = 1;
    } else if (
      scrollTop <= 50 &&
      isScrollUp &&
      !isLastPageComment &&
      enableScrollLoadMoreComment
    ) {
      if (socket && socket.connected) {
        isLoadingMoreComment = true;
        enableScrollLoadMoreComment = false;
        pageComment += 1;
        socket.emit("get comment", {
          room_id: gameId,
          time: 1,
          pageComment,
        });
      }
    }
    lastScroll = scrollTop;
  }, []);

  const onPressPlayGameStart = () => {
    console.log(socket.connected)
    if (socket && socket.connected && !isStarted && userPlay) {
      socket.emit("start game");
    }
  };

  const onPressKickUser = (user_id) => {
    if (socket && socket.connected && userInfo.userId == data.room.owner_id) {
      socket.emit("kick user", { user_id });
    }
  };

  const onPressReadyToogle = () => {
    if (socket && socket.connected) {
      socket.emit("ready toggle", { status: !isReady });
    }
  };

  const sendComment = () => {
    let comment = textAreaRef.current.value.trim();
    if (comment) {
      if (socket && socket.connected) {
        socket.emit("send comment", comment);
      }
    } else {
      textAreaRef.current && textAreaRef.current.focus();
    }
  };

  const checkEnterChat = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      sendComment();
    }
  };

  const onChangeHandler = (e) => {
    setTextComment(e.target.value.trim());
  };

  // react queries
  const { data, isLoading, refetch, isFetching } = useQuery(
    getRoomDetailOfGameQuery(gameId)
  );

  const {
    data: eventWater,
    isLoading: isLoadingEvent,
    refetch: refetchEvent,
  } = useQuery(getCheckEventWaterQuery());

  // useEffects
  useEffect(() => {
    let commentList = [];
    let timeout = null;

    isLoadingMoreComment = true;
    socket.emit("get comment", { room_id: gameId, time: 1, pageComment: 1 });

    socket.on("get comment success", (comments) => {
      isLoadingMoreComment = false;

      setTimeout(() => {
        enableScrollLoadMoreComment = true;
      }, 450);

      if (comments.length < 20) isLastPageComment = true;
      if (pageComment === 1) commentList = comments;
      else commentList = [...commentList, ...comments];
      setListCommentOnLine([...commentList]);
    });

    socket.on("send comment success", function (data) {
      console.log("send comment success: ", data);
      console.log("text area ref: ", textAreaRef);

      let chatBoxInput = document.getElementById("inputChat");
      chatBoxInput.value = "";

      commentList.push(data);
      setListCommentOnLine([...new Set(commentList)]);
      scrollToBottomChat();
    });

    socket.on("add comment", function (data) {
      commentList.push(data);
      setListCommentOnLine([...new Set(commentList)]);
      if (!isScrollEndBoxChat) {
        totalNewMessageChat += 1;
      } else {
        scrollToBottomChat();
      }
    });

    socket.on("send comment error", (data) => {
      setSnackBar({
        open: true,
        message: data.message || "Can't send comment!",
        severity: "error",
      });
    });

    socket.on("ready toggle success", (data) => {
      setIsReady(data.status ? true : false);
    });

    socket.on("ready toggle success room", (data) => {
      setIsReady(data.status ? true : false);
    });

    socket.on("kick user success", (data) => {
      refetch();
      setUserPlay(null);
      setIsReady(false);
    });

    socket.on("kick user error", (message) => {
      setSnackBar({
        open: true,
        message: message || "Can't kick user!",
        severity: "error",
      });
    });

    socket.on("kick user success to room", () => {
      navigate(PATHS.HOME_PAGE);
      setSocketRoomId(0);
    });

    socket.on("cant join room", () => {
      document.body.classList.remove("disable-scroll");
      navigate(PATHS.HOME_PAGE);
      setSocketRoomId(0);
    });

    socket.on("user join you room", () => {
      refetch();
      setModalInviteFriend(false);
    });

    socket.on("player leave room success", () => {
      refetch();
    });

    socket.on("leave room success to room", () => {
      navigate(PATHS.HOME_PAGE);
      setSocketRoomId(0);
    });

    //
    socket.on("start game success", (data) => {
      document.body.classList.add("disable-scroll");
      if (eventWater?.is_show) {
        document.getElementById("icon-event").classList.add("none");
      }
      setDataStartGame(data);
      setIsStarted(true);
    });

    socket.on("start game error", (message) => {
      setSnackBar({
        open: true,
        message: message || "Can't start game!",
        severity: "error",
      });
    });

    //
    socket.on("check start game error", () => {
      document.body.classList.remove("disable-scroll");
      if (eventWater?.is_show) {
        document.getElementById("icon-event").classList.remove("none");
      }
      setIsStarted(false);
    });

    //
    socket.on("back to room", (data) => {
      data?.game_error == 1 &&
        setSnackBar({
          open: true,
          message: t("room.playroom.error_game") || "Can't back to room!",
          severity: "error",
        });
      document.body.classList.remove("disable-scroll");

      setIsStarted(false);
      if (eventWater?.is_show) {
        document.getElementById("icon-event").classList.remove("none");
      }

      if (eventWater?.is_show && !eventWater?.is_finished) {
        let checkUserWinGame = data.users?.find(
          (it) =>
            it.user_id == userInfo.userId &&
            it.result == 1 &&
            it.is_disconnect != true
        );

        let checkShowWater = getData("list-user-play")?.length;
        if (checkUserWinGame && !checkShowWater) {
          handleFlyWater(iconDrop);
          setData("list-user-play", data.users);
          timeout = setTimeout(() => {
            setData("list-user-play", []);
          }, 7000);
        }
      }

      refetch();
    });

    //
    socket.on("back to game", (data) => {
      document.body.classList.remove("disable-scroll");
      console.log(data);

      setIsStarted(false);
      navigate(PATHS.ROOM_PAGE.replace(":roomId", data.game_id));
      if (eventWater?.is_show) {
        document.getElementById("icon-event").classList.remove("none");
      }

      if (eventWater?.is_show && !eventWater?.is_finished) {
        let checkUserWinGame = data.users?.find(
          (it) =>
            it.user_id == userInfo.userId &&
            it.result == 1 &&
            it.is_disconnect != true
        );

        let checkShowWater = getData("list-user-play")?.length;
        if (checkUserWinGame && !checkShowWater) {
          handleFlyWater(iconDrop);
          setData("list-user-play", data.users);
          timeout = setTimeout(() => {
            setData("list-user-play", []);
          }, 7000);
        }
      }
      setSocketRoomId(0);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (data !== undefined && data.room !== undefined) {
      if (data.room.users.length > 0) setSocketRoomId(gameId);
      if (data.room.users.length === 2) {
        setUserPlay(data.room.users[1]);
        if (data.room.status === 1) {
          if (data.room.users[1].state) setIsReady(true);
          else if (data.room.status === 1) setIsReady(false);
        }
      } else if (data.room.users.length === 1) {
        if (userInfo.userId != data.room.users[0].id) {
          setUserPlay(null);
          setSocketRoomId(0);
          navigate(PATHS.ROOM_PAGE.replace(":roomId", data.room.game_id));
        } else if (data.room.status === 1) {
          setIsReady(false);
        }
      } else if (data.room.users.length <= 0 && !isStarted) {
        setSocketRoomId(0);
        navigate(PATHS.ROOM_PAGE.replace(":roomId", data.room.game_id));
      }
    } else if (!isFetching && data === undefined && !isStarted) {
      setSocketRoomId(0);
      navigate(PATHS.ROOM_PAGE.replace(":roomId", roomId));
    }
  }, [data, isFetching, isLoading]);

  useEffect(() => {
    if (listCommentOnLine.length > 0) {
      if (firstScrollEndChat) {
        firstScrollEndChat = false;
        scrollToBottomChat();
      } else if (isScrollEndBoxChat) {
        totalNewMessageChat = 0;
        scrollToBottomChat();
      }
    }
  }, [listCommentOnLine]);

  useEffect(() => {
    const div = chatBoxRef.current;
    if (div) div.addEventListener("scroll", handleScroll);
  }, [chatBoxRef.current]);

  let url_game = ``;
  if (data && dataStartGame) {
    url_game = `${data.room.game_url}/?token=token_user`;
    if (data.room.owner_id == userInfo.userId) {
      url_game = url_game.replace("token_user", dataStartGame.token1);
    } else {
      url_game = url_game.replace("token_user", dataStartGame.token2);
    }
  }

  return (
    <>
      {!isStarted ? (
        <Container fluid className="playroom-container mt-3">
          {!isMobileMD && (
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link
                  to={PATHS.ROOM_PAGE.replace(":roomId", roomId)}
                  replace
                  state={{ previous: location.pathname }}
                  className="d-flex align-items-center gap-2"
                >
                  <HeaderHomeSvg width={16} height={16} viewBox="0 0 16 16" />
                  {t("room.playroom.find_room")}
                </Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>{t("room.playroom.title")}</Breadcrumb.Item>
            </Breadcrumb>
          )}

          {data && data.room.users.length > 0 && (
            <Row className="readyscreen-container">
              <Row className="text-center">
                <Col
                  xs={4}
                  className="d-flex flex-column align-items-center justify-content-between"
                >
                  <div className="ava-frame">
                    <img
                      src={data.room.users[0].avatarImage || avaDefault}
                      alt="User avatar"
                    />
                  </div>
                  <div className="d-flex mt-2 align-items-center">
                    {data.room.users[0].state === 1 && (
                      <img
                        src={tickCircleIcon}
                        width={27}
                        height={27}
                        className="me-2"
                        alt="User status"
                      />
                    )}
                    <p className="user-name">{data.room.users[0].full_name}</p>
                  </div>
                  <div className="bet-box d-flex justify-content-center align-items-center mt-2">
                    <img src={coinIcon} alt="User's bet" className="me-2" />
                    <p>
                      {new Intl.NumberFormat("lo").format(
                        data.room.users[0].coin
                      )}
                    </p>
                  </div>
                </Col>

                <Col
                  xs={4}
                  className="readyscreen-status d-flex flex-column align-items-center"
                >
                  <p>
                    {t("room.table.id")}: {gameId}
                  </p>
                  <img
                    src={statusIcon}
                    width={isMobileMD ? "115" : "130"}
                    height={isMobileMD ? "115" : "130"}
                    alt="Playroom status"
                  />
                  <p>{new Intl.NumberFormat("lo").format(100)} Gold</p>
                  {isMobileMD ? null : userInfo.userId == data.room.owner_id ? (
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={onPressPlayGameStart}
                      disabled={!isReady}
                    >
                      {t("room.playroom.start")}
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="start-mobile ready mt-3"
                      onClick={onPressReadyToogle}
                    >
                      {t(
                        !isReady
                          ? "room.playroom.ready"
                          : "room.playroom.unready"
                      )}
                    </Button>
                  )}
                </Col>
                <Col
                  xs={4}
                  className="d-flex flex-column align-items-center justify-content-between"
                >
                  {data.room.users[1] === undefined ? (
                    <Button
                      className="ava-frame dark-bg"
                      onClick={handleInviteFriend}
                    >
                      <img
                        src={invitePlayerIcon}
                        className="invite-player"
                        alt="User avatar"
                      />
                    </Button>
                  ) : (
                    <>
                      <div className="ava-frame">
                        <img
                          src={data.room.users[1].avatarImage || avaDefault}
                          alt="User'avatar"
                        />
                      </div>
                      <div className="d-flex mt-2 align-items-center">
                        {isReady && (
                          <img
                            src={tickCircleIcon}
                            width="27"
                            height="27"
                            className="me-2"
                            alt="Player's status"
                          />
                        )}
                        <p className="user-name">
                          {data.room.users[1].full_name}
                        </p>
                      </div>
                      <div className="bet-box d-flex justify-content-center align-items-center mt-2">
                        <img
                          src={coinIcon}
                          width={20}
                          height={20}
                          alt="User's bet"
                          className="me-2"
                        />
                        <p>
                          {new Intl.NumberFormat("lo").format(
                            data.room.users[1].coin
                          )}
                        </p>
                      </div>
                    </>
                  )}
                </Col>
                {data.room.users[1] !== undefined &&
                  userInfo.userId == data.room.owner_id && (
                    <Row className="mt-2 mx-0 px-0 mt-md-4">
                      <Col
                        xs={{ span: 4, offset: 8 }}
                        className="justify-content-center"
                      >
                        <img
                          src={crossIcon}
                          onClick={() => onPressKickUser(data.room.users[1].id)}
                          width="27"
                          height="27"
                          className="mx-auto"
                          style={{ cursor: "pointer" }}
                          alt="Kick player"
                        />
                      </Col>
                    </Row>
                  )}
                {isMobileMD ? (
                  userInfo.userId == data.room.owner_id ? (
                    <Button
                      variant="primary"
                      className="start-mobile mt-3"
                      onClick={onPressPlayGameStart}
                    >
                      {t("room.playroom.start")}
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="start-mobile ready mt-3"
                      onClick={onPressReadyToogle}
                    >
                      {t(
                        !isReady
                          ? "room.playroom.ready"
                          : "room.playroom.unready"
                      )}
                    </Button>
                  )
                ) : null}
              </Row>
              <Row className="chat-container">
                <div
                  className="chat-container-body"
                  id="chat-wrapper"
                  ref={chatBoxRef}
                >
                  <div
                    className={`chat-container-body-content ${
                      listCommentOnLine.length <= 4 ? "full-height" : ""
                    }`}
                  >
                    {listCommentOnLine.length > 0 &&
                      listCommentOnLine.map((item, index) => {
                        return (
                          <div
                            className="line-chat"
                            id={`item_chat_${item._id}`}
                            key={`item_chat_${item._id}_${item.created_at}_${index}`}
                          >
                            <span
                              className={`line-chat-name ${
                                item.user_id == userInfo.userId ? "owner" : ""
                              }`}
                            >
                              {item.fullname}:
                            </span>
                            <span className="line-chat-content">
                              {item.comment}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder={t("room.playroom.enter_text")}
                      ref={textAreaRef}
                      onKeyDown={(e) => checkEnterChat(e)}
                      id="inputChat"
                    />
                  </Form.Group>
                </Form>
                <Button
                  variant="primary"
                  onClick={sendComment}
                  className="send-chat"
                >
                  <img src={arrowNextIcon} alt="Send chat" />
                </Button>
              </Row>
            </Row>
          )}
          {
            modalInviteFriend && (
              <InviteFriendModal 
                show={modalInviteFriend}
                onHide={handleInviteFriend}
                roomId={gameId}
              />
            )
          }

        </Container>
      ) : isMobileMD || isMobileXxl ? (
        <iframe
          id="game-play"
          src={url_game}
          title="PlayGame"
          className="playroom-game isMobileMD"
        ></iframe>
      ) : (
        <div className="container-playroom">
          <div className="container-playroom-content">
            <div className="playroom-game_box">
              <iframe
                id="game-play"
                title="PlayGame"
                className="playroom-game"
                src={url_game}
              ></iframe>
            </div>

            <div className="playroom-game-rank">
							<RankTableMobile playGame={true} />
						</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayRoomPage;
