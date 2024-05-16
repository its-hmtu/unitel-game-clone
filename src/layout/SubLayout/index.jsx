import React from 'react'
import { Container, Button } from 'react-bootstrap'
import backIcon from "assets/images/arrow-back.svg"
import subLayoutCircle from "assets/images/login-circle.svg"
const SubLayout = () => {
  return (
    <div className='sub-layout-container'>
      <Container className="sub-layout-header" fluid>
        <Button variant="dark" >
          <img src={backIcon} alt="back" />
        </Button>
        
      </Container>
      <img src={subLayoutCircle} alt="circle" />
    </div>
  )
}

export default SubLayout