import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import PrizeCard from './PrizeCard'
import { useMediaQuery,queryPoint } from 'src/utils/hooks/useMediaQuery'
import { useQuery } from 'react-query'
import { getGiftQuery } from 'src/data/game'
import { ProgressBar } from 'react-bootstrap'

const PrizePage = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState(1)
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px`)
  const {data: gifts, isLoading} = useQuery(getGiftQuery())

  const [data, setData] = useState([])
  const [minutes, setMinutes] = useState([])

  useEffect(() => {
    if (!isLoading) {
      setData(gifts?.slice(0, 4))
      setMinutes(gifts?.slice(4))
    }
  }, [gifts, isLoading])
  
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

      <div className='package-container position-relative'>
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