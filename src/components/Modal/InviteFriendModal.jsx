import React, { useContext, useEffect, useState, useTransition } from 'react'
import BaseModal from '.'
import { queryPoint, useMediaQuery } from 'utils/hooks/useMediaQuery'
import { SocketContext } from 'utils/socket'
import { useQuery } from 'react-query'
import { getListFriendInvitePlayQuery } from 'data/game'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import no_data from "images/profilepage-gifthist-nodata.svg";
import friendStatus from "images/invite-friend-status.svg";
import { useTranslation } from 'react-i18next'
import avaDefault from 'images/ava-default.jpeg'
import avaFrame from "images/ava-frame-medium.svg";

function InviteFriendModal({
  show,
  onHide,
  roomId,
  ...otherProps
}) {
  const { t } = useTranslation()
  const isMobileMD = useMediaQuery(`(max-width: ${queryPoint.md}px)`)
  const [listEnableSendInvite, setListEnableSendInvite] = useState({})
  const {socket} = useContext(SocketContext)
  const limit = 50
  const [pageIndex, setPageIndex] = useState(0)

  const {data, isLoading} = useQuery(getListFriendInvitePlayQuery(pageIndex * limit, limit))

  let friendList = (data && data?.friends) || []

  const setEnableSendInvite = id => {
    setTimeout(() => {
      const enableReset = {...listEnableSendInvite}
      enableReset[id] = 0
      setListEnableSendInvite(enableReset)
    }, 4000)
  }

  useEffect(() => {
    socket.on('send invite success', data => {
      const enableNew = {...listEnableSendInvite}
      enableNew[data.user_invitee_id] = 1

      setListEnableSendInvite(enableNew)
      setEnableSendInvite(data.user_invitee_id)
    })
  }, [socket])

  const onPressInvite = item => {
    if (item.status && !item.room_id && socket && socket.connected) {
      socket.emit('send invite', {
        room_id: roomId, 
        user_id: item.id
      })
    }
  }

  return (
    <>
      <BaseModal show={show} onHide={onHide} {...otherProps}>
        <Container fluid className='invite-friend-modal'>
          <Modal.Header className='p-0 p-sm-3'>
            <Modal.Title id='contained-modal-title-vcenter'
              style={isMobileMD ? {fontSize: 20, lineHeight: '24px'} : null} 
            >
              {t('modal.invite.friend')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='p-0 p-sm-3'>
            <Container fluid className='invite-list'>
              <Row className='mb-2 list-header'>
                <Col xs={6}>{t('room.table.player')}</Col>
                <Col xs={4}>{t('room.tab.gold')}</Col>
                <Col xs={2} className='text-center'>
                  {t('modal.invite.invite')}
                </Col>
              </Row>
              {
                friendList.length > 0 ? (
                  friendList?.map(item => (
                    <Row key={item.id} className='friend'>
                      <Col xs={6} className='friend-info'>
                        <div className='friend-info--avatar'>
                          <div className='ava-frame'>
                            <img src={item.image || avaDefault} alt="Friend's avatar"/>
                            <img src={avaFrame} />
                          </div>
                          {
                            item.status === 1 ? (
                              <img src={friendStatus} alt='Friend status'/>
                            ) : null
                          }
                        </div>
                        <p>{item.full_name}</p>
                      </Col>
                      <Col xs={4} className='friend-gold'>
                        {new Intl.NumberFormat('lo').format(item.coin)}
                      </Col>
                      <Col xs={2} className='friend-invite'>
                        <Button
                          disabled={
                            item.status === 0 || 
                            item.room_id > 0 ||
                            (listEnableSendInvite[item.id] !== undefined &&
                              listEnableSendInvite[item.id])
                          }

                          onClick={() => onPressInvite(item)}
                        >
                          {t('modal.invite.invite')}
                        </Button>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <img
									style={{ width: '40%', margin: 'auto', height: '90%' }}
									src={no_data}
									alt="No reward is found"
								/>
                )
              }
            </Container>
          </Modal.Body>
        </Container>
      </BaseModal>
    </>
  )
}

export default InviteFriendModal