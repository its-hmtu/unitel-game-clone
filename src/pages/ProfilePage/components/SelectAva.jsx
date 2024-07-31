import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import circleIcon from 'images/playroompage-tickCircle.svg'

const SelectAva = ({defaultAva}) => {
  const { t } = useTranslation();
  let isSelectAva = false;

  const [selectAva, setSelectAva] = React.useState(null)

  const handleSelectAva = (id) => {
    setSelectAva(id)
  }
  console.log(defaultAva, 'defaultAva')
  
  return (
    <>
      <Row className="profile-page-content__title">
        {t('profile.select_ava')}
      </Row>

      <Row className="profile-page-content__body select-ava-stack row-cols-5 my-3">
        {
          defaultAva?.map(item => {
            isSelectAva = selectAva === item?.id
            return (
              <Col
                key={item?.id}
                className={`select-ava-img ${isSelectAva ? 'selected' : ''}`}
              >
                <img 
                  src={item?.image}
                  className='ava'
                  onClick={() => handleSelectAva(item?.id)}
                  alt='Default avatar'
                />

                {selectAva && item?.id === selectAva ? (
                  <img 
                    src={circleIcon}
                    className='current-ava'
                    alt='Current avatar'
                  />
                ) : null}
              </Col>
            )
          })
        }
      </Row>
      <Button className='profile-confirm' disabled={!selectAva}>
        {t('confirm')}
      </Button>
    </>
  )
}

export default SelectAva