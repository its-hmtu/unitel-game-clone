import Container from 'react-bootstrap/Container'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import PackageCard from './PackageCard'
import { queryPoint, useMediaQuery } from 'src/utils/hooks/useMediaQuery'

const ShopPage = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState(1)
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px`)

  const sub = [
    {
      title: 'Daily',
      descript: t('shoppage.reward_desc').replace('_GOLD_', "100"),
      img: './src/assets/images/shoppage-package1.svg',
      price: "500",
      isBestSale: false,
    }
  ]

  const retail = [
    {
      title: 'Package 1',
      descript: t('shoppage.reward_desc').replace('_GOLD_', "50"),
      img: './src/assets/images/shoppage-package1.svg',
      price: "500",
      isBestSale: false,

    },

    {
      title: 'Package 2',
      descript: t('shoppage.reward_desc').replace('_GOLD_', "100"),
      img: './src/assets/images/shoppage-package2.svg',
      price: "1,000",
      isBestSale: true,

    },

    {
      title: 'Package 3',
      descript: t('shoppage.reward_desc').replace('_GOLD_', "250"),
      img: './src/assets/images/shoppage-package3.svg',
      price: "2,000",
      isBestSale: false,

    },

    {
      title: 'Package 4',
      descript: t('shoppage.reward_desc').replace('_GOLD_', "700"),
      img: './src/assets/images/shoppage-package4.svg',
      price: "5,000",
      isBestSale: false,

    },

    {
      title: 'Package 5',
      descript: t('shoppage.reward_desc').replace('_GOLD_', "1,500"),
      img: './src/assets/images/shoppage-package5.svg',
      price: "10,000",
      isBestSale: false,

    }
  ]

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
            <PackageCard data={sub} />
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