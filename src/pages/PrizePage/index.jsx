import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import PrizeCard from './PrizeCard'
import { useMediaQuery,queryPoint } from 'src/utils/hooks/useMediaQuery'

const PrizePage = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState(1)
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px`)

  const data = [
    {
      title: '50MB',
      descript: t('prizepage.sub_title').replace('_DATA_', '50MB'),
      gold: "2,500"
    },

    {
      title: '100MB',
      descript: t('prizepage.sub_title').replace('_DATA_', '100MB'),
      gold: "5,000"
    },

    {
      title: '500MB',
      descript: t('prizepage.sub_title').replace('_DATA_', '500MB'),
      gold: "25,000"
    },

    {
      title: '1GB',
      descript: t('prizepage.sub_title').replace('_DATA_', '1GB'),
      gold: "50,000"
    },
  ]

  const minutes = [
    {
      title: '2 minutes',
      descript: t('prizepage.sub_title').replace('_DATA_', '2 minutes'),
      gold: "1,200"
    },

    {
      title: '5 minutes',
      descript: t('prizepage.sub_title').replace('_DATA_', '5 minutes'),
      gold: "3,000"
    },

    {
      title: '10 minutes',
      descript: t('prizepage.sub_title').replace('_DATA_', '10 minutes'),
      gold: "6,000"
    },

    {
      title: '20 minutes',
      descript: t('prizepage.sub_title').replace('_DATA_', '20 minutes'),
      gold: "12,000"
    },
  ]
  
  return (
    <Container fluid className='shoppage'>
      {
        !isMobile && (
          <div>
            <p>{t('prizepage.choose')}</p>
            <h1>{t('prizepage.title')}</h1>
          </div>
        )
      }

      <div className='package-container'>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab
            eventKey={1}
            title={t('prizepage.data')}
          >
           <PrizeCard data={data} />
          </Tab>
          <Tab
            eventKey={2}
            title={t('prizepage.minutes')}
          >
            <PrizeCard data={minutes} bgMinutes/>
          </Tab>
        </Tabs>
      </div>
    </Container>
  )
}

export default PrizePage