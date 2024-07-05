import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SearchBar from 'src/components/SearchBar'
import addIcon from 'images/roompage-add.svg'
import { useMediaQuery } from '@mui/material'
import { queryPoint } from 'src/utils/hooks/useMediaQuery'

const RoomSearchCreate = () => {
  const { t } = useTranslation()
  const isIconHidden = useMediaQuery(`(max-width: ${queryPoint.lg}px)`)
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)

  return (
    <div className='room-search'>
      <div className='search-bar search-bar-room'>
        <SearchBar
          placeholder={t('room.search_id')}
          searchicon={isMobile ?  true : !isIconHidden}
        />
      </div>
      
      {
        isMobile ? 
        (<div className='d-flex'>
          <div className="d-flex">
            <Button variant='primary' className='room-search-btn'>
              <img src={addIcon} alt="" />
              <p className='m-0'>{t('room.create_room')}</p>
            </Button>
          </div>
          { isMobile && 
            <div className="d-flex">
              <Button variant='primary' className='room-play-btn'>
                <p className='m-0'>Play now</p>
              </Button>
            </div>
          }
        </div> ) : 
        (
          <>
            <div className="d-flex">
              <Button variant='primary' className='room-search-btn'>
                <img src={addIcon} alt="" />
                <p className='m-0'>{t('room.create_room')}</p>
              </Button>
            </div>
            { isMobile && 
              <div className="d-flex">
                <Button variant='primary' className='room-play-btn'>
                  <p className='m-0'>Play now</p>
                </Button>
              </div>
            }
          </>
        )
      }
    </div>
  )
}

export default RoomSearchCreate