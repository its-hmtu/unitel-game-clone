import UniteModal from 'components/Modal/UniteModal'
import { getUserQuery, useUpdateUserInfo } from 'data/user';
import React, { useEffect, useState } from 'react'
import { Button, Row, Spinner, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { getUserInfo, saveUserInfo } from 'utils/localStorage';
import editProfile from 'images/profilepage-editInfo.svg'
import cancelEditProfile from 'images/profilepage-cancelEditInfo.svg';

function UserInfoMobile() {
  const { t } = useTranslation();
  const { data: user, isLoading: isUserLoading } = useQuery(getUserQuery());
  
  const [info, setInfo] = useState({})

  useEffect(() => {
    setInfo({
      full_name: user?.displayName,
      phone: user?.msisdn
    
    })
  }, [user])

  const handleInfoChange = e => {
    const newInfoData = { ...info }
    newInfoData[e.target.id] = e.target.value
    console.log(newInfoData)
    setInfo(newInfoData)
  }
  
  const prevInfo = React.useRef();
  useEffect(() => {
    prevInfo.current = info
  }, [info])
  
  const focusInputRef = React.useRef()
  const [isEdit, setIsEdit] = React.useState(false)
  const handleEditInfo = () => {
    setInfo({
      full_name: user?.displayName,
      phone: user?.msisdn
    })

    setIsEdit(prev => !prev)
    
  }

  useEffect(() => {
    if (isEdit) {
      focusInputRef.current.focus()
    }
  }, [isEdit])

  const { mutate, data: updateUserInfo, isLoading} = useUpdateUserInfo(
    () => {
      setIsEdit(false)
      const currentUser = getUserInfo()
      saveUserInfo({
        ...currentUser,
        fullname: user?.displayName,
        msisdn: user?.msisdn
      })

      // console.log(getUserInfo())
    }
  )

  function handleUpdateInfo() {
    mutate(info)
  }
  return (
    <>
      <Row className='profile-page-content__body m-3 border-0 p-0'>
        <Form className='baseinput-container'>
          <Form.Group className='mb-3 base-input personal-info'>
            <Form.Label>{t('profile.personal_info.name')}</Form.Label>
            <Form.Control
              disabled={!isEdit}
              type='text'
              value={info?.full_name}
              onChange={handleInfoChange}
              ref={focusInputRef}
              id='full_name'
            />
            <img 
              onClick={handleEditInfo}
              src={isEdit ? cancelEditProfile : editProfile} 
              alt='Edit personal infomation' />
          </Form.Group>

          <Form.Group className='mb-3 base-input personal-info'>
            <Form.Label>{t('profile.personal_info.phone')}</Form.Label>
            <Form.Control 
              disabled={true}
              type='phone'
              value={info?.phone}
              onChange={handleInfoChange}
              id='phone'
            />
          </Form.Group>
        </Form>
        {isEdit ? (
          <Button 
            className='profile-confirm' 
            onClick={handleUpdateInfo} 
            disabled={prevInfo.current?.full_name === info?.full_name && prevInfo.current?.phone === info?.phone}>
            {t('confirm')}
            {isLoading ? 
              (<Spinner animation='border' role='status'/>)
              : null
            }
          </Button>
        ) : null}
      </Row>
      <UniteModal data={updateUserInfo} />
    </>
  )
}

export default UserInfoMobile