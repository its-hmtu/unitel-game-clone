import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import BaseModal from '.'
import { Container, Modal } from 'react-bootstrap'
import modalSuccess from "images/modal-success.svg"
import modalError from "images/modal-error.svg"

function UniteModal({data, ...props}) {
  const { t } = useTranslation()
  const [show, setShow] = React.useState(false)
  const onClose = () => setShow(false)
  useEffect(() => {
    if (data) {
      setShow(true)
    }
  }, [data])

  return (
    <BaseModal show={show} onHide={onClose} hideDecor {...props}>
      <Container fluid className='modal-create-room'>
        <Modal.Header>
          {data?.data || data?.data?.[0] === 1 ? (
            <img src={modalSuccess} alt='success' />
          ) : (
            <img src={modalError} alt='error' />
          )}
        </Modal.Header>
        <Modal.Body>
          <p className='text-center'
            style={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              color: 'white'
            }}
          >
            {data?.message ?? t('modal.error')}
          </p>
        </Modal.Body>
      </Container>
    </BaseModal>
  )
}

export default UniteModal