import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SearchBar from 'src/components/SearchBar'
import addIcon from 'images/roompage-add.svg'

const RoomSearchCreate = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className='search-bar search-bar-room'>
        <SearchBar
          placeholder={t('room.search_id')}
        />
      </div>
      <div className="d-flex">
        <Button variant='primary'>
          <img src={addIcon} alt="" />
          <p className='m-0'>{t('room.create_room')}</p>
        </Button>
      </div>
    </div>
  )
}

export default RoomSearchCreate