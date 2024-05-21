import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gamecard_ishot from "images/gamecard-ishot.svg";
import { useEffect, useState } from "react";
import BaseModal from "components/Modal";
import ModalHelpPlay from "src/components/Modal/ModalHelpPlay";
import { useDispatch } from "react-redux";
import { gameSlice } from "src/store/game/gameSlice";

const GameCard = ({ type, isSmall, data, idGame }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const handleSelectGame = (game) => {
    dispatch(gameSlice.actions.selectGame(game));
  }

  // useEffect(() => {
  //   console.log(show)

  //   console.log(idGame)
  // }, [idGame, show])

  return (
    <Card className={isSmall ? "card-small" : "card-medium"}>
      <Link
        onClick={
          type === "how-to-play"
            ? () => {
                setShow(true);
              }
            : () => handleSelectGame(data)
        }
        to={
          type === "how-to-play"
            ? "/"
            : "/room/:roomId".replace(":roomId", idGame)
        }
        replace
      >
        <Card.Img src={data.img} />
        {data.isHot && (
          <img src={gamecard_ishot} alt="" className="card-ishot" />
        )}
        <Card.Body>
          <div>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
              {t("game_card.number_playing").replace("_NUMBER_", data.player)}
            </Card.Text>
          </div>
          <Button
            variant="primary"
            className="card-button"
            onClick={
              type === "how-to-play"
                ? () => {
                  setShow(true);
                  console.log(show)
                }
                : () => handleSelectGame(data)
            }
          >
            {type === "how-to-play"
              ? t("game_card.how_to_play_btn")
              : t("game_card.play_btn")}
          </Button>
        </Card.Body>
      </Link>
      <ModalHelpPlay
        show={show}
        onHide={() => setShow((prev) => !prev)}
        idGame={idGame}
      ></ModalHelpPlay>
    </Card>
  );
};

export default GameCard;
