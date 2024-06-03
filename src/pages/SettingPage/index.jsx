import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SettingPage = () => {
  const { type } = useParams();
  const helpData = [
    {
      type: "contact",
      name: "footer.contact",
      content: "<p>contact</p>"
    },
    {
      type: "faq",
      name: "footer.faq",
      content: "<p>faq</p>"
    }
  ]
  const HTML = helpData && helpData.find(item => item.type === type) || ''

  return (
    <Container fluid className='setting-container'>
      <div className='setting-content' dangerouslySetInnerHTML={{__html: HTML.content}} />
    </Container>
  )
}

export default SettingPage