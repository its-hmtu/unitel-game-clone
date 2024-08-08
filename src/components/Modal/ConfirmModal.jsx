import React from 'react'
import BaseModal from '.'
import { Button, Container, Modal } from 'react-bootstrap'
import confirmIcon from 'images/modal-confirm-questionMark.svg'
import { useTranslation } from 'react-i18next'

const ConfirmModal = ({show, onHide, title, onLogout, onOpenOTP, hideDecor}) => {
  const {t} = useTranslation()
  return (
    <BaseModal show={show} onHide={onHide}>
      <Container className='modal-create-room' fluid>
        <Modal.Header>
          <img src={confirmIcon} alt='confirm icon' />
        </Modal.Header>
        <Modal.Body>
          <p 
            className='text-center'
            style={{
							fontWeight: 500,
							fontSize: '17px',
							lineHeight: '24px',
							color: '#B1B5C3',
						}}
          >
            {title}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='dark' onClick={onHide}>
            {t('modal.btn.cancel')}
          </Button>
          <Button variant='secondary' onClick={onOpenOTP || onLogout}>
            {t('modal.btn.agree')}
          </Button>
        </Modal.Footer>
      </Container>
    </BaseModal>
  )
}

export default ConfirmModal