import {Container, Row, Col} from 'react-bootstrap';
import laoApp from 'images/footer-lao-app.svg'

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Footer = () => {
  const {t} = useTranslation();
  const gameList = useSelector(state => state.game.games)

  const gameHot = gameList.filter((item) => item.isHot)
  // useEffect(() => {
  //   console.log(gameList)
  //   console.log(gameHot)
  // }, [gameList])

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
      <Row className="justify-content-center mx-auto">
        <Col className='footer-copyright col-xl-5 col-md-6'>
          <img src={laoApp} alt="Lao App logo" />
          <h6>{t("footer.all_right")}</h6>
          <p>{t('footer.content')}</p>
        </Col>

        <Col className='col-xl-3 col-md-3'>
          <h2>{t('footer.hot')}</h2>
          <ul>
            {gameHot.map((item, index) => (
              <li key={index} >
                <Link to={"/room/:roomId".replace(":roomId", item.id)}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Col>

        <Col className='col-xl-3 col-md-3'>
          <h2>{t('footer.help')}</h2>
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