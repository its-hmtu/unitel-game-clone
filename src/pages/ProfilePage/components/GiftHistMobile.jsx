import React from 'react'
import { Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import SearchBar from 'src/components/SearchBar';
import noData from 'images/profilepage-gifthist-nodata.svg'
import { useQuery } from 'react-query';
import { getGiftHistQuery } from 'src/data/user';

function GiftHistMobile() {
  const {t} = useTranslation();
  
  const TIME = {
    1: t('profile.gift_hist.today'),
    2: t('profile.gift_hist.this_week'),
    3: t('profile.gift_hist.this_month'),
  }
  const [timeFilter, setTimeFilter] = React.useState(3)
  const {data: giftHist, isLoading} = useQuery(getGiftHistQuery(timeFilter, 0, 10));

  return (
    <>
      <Row>
        <div className='search-bar gift-hist m-3'>
          <SearchBar type='text' placeholder={t('profile.gift_hist.search')} searchicon/>
          <Dropdown align='end'>
            <Dropdown.Toggle>{TIME[timeFilter]}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setTimeFilter(1)}>
                {t('profile.gift_hist.today')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeFilter(2)}>
                {t('profile.gift_hist.this_week')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeFilter(3)}>
                {t('profile.gift_hist.this_month')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Row>
      <Row className={`profile-page-content__body ${giftHist?.length > 0 ? 'gifthist' : 'no-gifthist'} my-3`}>
        {
          giftHist?.length > 0 ? (
            giftHist.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="reward"
                  style={{
                    backgroundImage: `url(${item?.image})`,
                  }}
                >
                  <div className="reward-title">
                    <p>{item?.name}</p>
                    <p>{item?.description}</p>
                  </div>
                  <div className="reward-date">
                    {new Intl.DateTimeFormat('lo-LA').format(
                      new Date(item?.received_time),
                    )}
                  </div>
                </div>
              )
            })
          ) :
          (<img src={noData} alt='No reward is found' />)
        }
      </Row>
    </>
  )
}

export default GiftHistMobile