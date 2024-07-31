import React, { useState } from 'react'
import BaseModal from '.'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const JoinModal = ({
  show,
  onHide,
  gameId,
  handleDataJoinGame,
  ...otherProps
}) => {
  const { t } = useTranslation();

  const { roomId } = useParams();

  const [pass, setPass] = useState()

  function handlePassInput(e) {
    setPass(e.target.value)
  }

  return (
    <BaseModal show={show} onHide={onHide} {...otherProps}>
      <Container className="modal-create-room" fluid>
        <Modal.Header>
          <Modal.Title>
            {t('modal.join_playroom.join_game')}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className='baseinput-container'>
            <Form.Group className='mb-3 base-input join-modal'> 
              <Form.Control 
                type='password'
                value={pass}
                onChange={handlePassInput}
                placeholder={t('modal.create_room.room_pass')}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='dark' onClick={onHide}>
            {t('modal.btn.cancel')}
          </Button>

          <Button
            onClick={() => {
              onHide()
              handleDataJoinGame(pass)
            }}
            variant='secondary'
          >
            {t('modal.btn.agree')}
          </Button>
        </Modal.Footer>
      </Container>
    </BaseModal>
  )
}

export default JoinModal