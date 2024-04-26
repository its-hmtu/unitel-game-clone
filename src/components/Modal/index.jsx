import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { CloseSvg } from 'src/assets/svg/Modal/CloseSvg'

const BaseModal = ({
  show,
  onHide,
  children,
  ...otherProps
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      {...otherProps}
      size='xl'
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='base-modal'
    >
      {children}
      {/* {hideDecor && <img src={starCircle} width="166" alt="" className="circle" />} */}
      <Button variant='dark' onClick={onHide} className="btn-modal-close">
        <CloseSvg width="32" height="32" viewBox="0 0 32 32" />
      </Button>
    </Modal>
  )
}

export default BaseModal