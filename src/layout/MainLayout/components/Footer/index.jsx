import {Container, Row, Col} from 'react-bootstrap';
import laoApp from 'images/footer-lao-app.svg'

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation();
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
            <li>Miner gold</li>
          </ul>
        </Col>

        <Col className='col-xl-3 col-md-3'>
          <h2>{t('footer.help')}</h2>
          <ul>
            <li>{t('footer.contact')}</li>
            <li>{t('footer.faq')}</li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer