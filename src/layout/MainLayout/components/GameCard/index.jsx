import { Button, Card } from "react-bootstrap"
import banner from "images/banne-daovang.png"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const GameCard = ({type, isSmall}) => {
  const {t} = useTranslation();

  return (
    <Card className={isSmall ? "card-small" : "card-medium"}>
      <Card.Img src={banner} />
      <Card.Body>
        <div>
          <Card.Title>Miner gold</Card.Title>
          <Card.Text>{t('game_card.number_playing').replace("_NUMBER_", 138660)}</Card.Text>
        </div>
        <Button variant="primary" className="card-button">
          {type === "how-to-play" ? t('game_card.how_to_play_btn') : t('game_card.play_btn')}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default GameCard