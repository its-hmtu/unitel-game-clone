import {Container, Row, Col} from 'react-bootstrap';
import laoApp from 'images/footer-lao-app.svg'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAllGameQuery } from 'src/data/game';

const Footer = () => {
  const {t} = useTranslation();
  // const gameList = useSelector(state => state.game.games)

  const {data: games, isLoading} = useQuery(getAllGameQuery())

  const gameHot = games?.filter((item) => item.is_hot === 1)

  const [listGameHot, setListGameHot] = useState([])
  // useEffect(() => {
  //   console.log(gameList)
  //   console.log(gameHot)
  // }, [gameList])

  useEffect(() => {
    if (games) {
      setListGameHot(gameHot)
    } else {
      setListGameHot([])
    }
  }, [games])

  const helpData = [
    {
      type: 'contact',
      name: 'footer.contact'
    },
    {
      type: 'faq',
      name: 'footer.faq'
    }
  ]

  return (
    <Container fluid className='footer-container'>
      <Row className={`${listGameHot?.length > 0 ? "justify-content-center" : "justify-content-evenly"} mx-auto`}>
        <Col className='footer-copyright col-xl-5 col-md-6'>
          <img src={laoApp} alt="Lao App logo" />
          <h6>{t("footer.all_right")}</h6>
          <p>{t('footer.content')}</p>
        </Col>

       {listGameHot?.length > 0 && (<Col className='col-xl-3 col-md-3'>
          <h2 className='mb-3'>{t('footer.hot')}</h2>
          <ul>
            {listGameHot?.map((item, index) => (
              <li key={index} >
                <Link to={"/room/:roomId".replace(":roomId", item.id)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Col>)}

        <Col className='col-xl-3 col-md-3'>
          <h2 className='mb-3'>{t('footer.help')}</h2>
          <ul>
            {
              helpData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={"/:type".replace(":type", item.type)} >
                      {t(item.name)}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer