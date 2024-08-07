import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import PackageCard from './PackageCard'
import { queryPoint, useMediaQuery } from 'src/utils/hooks/useMediaQuery'
import { useQuery } from 'react-query'
import { getPackageQuery } from 'src/data/game'

const ShopPage = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState(1)
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px`)
  const {data: packages, isLoading} = useQuery(getPackageQuery());

  const [sub, setSub] = useState(packages?.filter(item => item.packageType === 1))
  const [retail, setRetail] = useState(packages?.filter(item => item.packageType === 1))
  
  useEffect(() => {
    setSub(packages?.filter(item => item.packageType === 1))
    setRetail(packages?.filter(item => item.packageType === 2))
  }, [packages])

  return (
    <Container fluid className={`shoppage ${isMobile ? "mobile": ""}`}>
      {
        !isMobile && (
          <div>
            <p>{t('shoppage.choose')}</p>
            <h1>{t('shoppage.title')}</h1>
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
            title={t('shoppage.sub')}
          >
            <PackageCard data={sub}/>
          </Tab>
          <Tab
            eventKey={2}
            title={t('shoppage.retail')}
          >
            <PackageCard data={retail} isRetail/>
          </Tab>
        </Tabs>
      </div>
    </Container>
  )
}

export default ShopPage