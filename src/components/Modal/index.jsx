import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { CloseSvg } from 'src/assets/svg/Modal/CloseSvg'
import starCircle from 'images/login-starcircle.svg'
import circle from 'images/login-circle.svg'

const BaseModal = ({
  show,
  onHide,
  hideDecor = false,
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
      // style={{width: login ? 'calc(min(100%, 640px))' : 'calc(min(100%, 1000px))'}}
    >
      {children}
      {hideDecor && <img src={starCircle} width="166" alt="" className="star-circle" />}
      {hideDecor && <img src={circle} width="110" alt="" className="circle" />}
      <Button variant='dark' onClick={onHide} className="btn-modal-close">
        <CloseSvg width="32" height="32" viewBox="0 0 32 32" />
      </Button>
    </Modal>
  )
}

export default BaseModal