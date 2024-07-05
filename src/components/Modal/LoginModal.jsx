import React, {useRef, useEffect} from 'react'
import BaseModal from '.'
import { Container, Modal, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import phoneIcon from 'images/login-call.svg'
import lockIcon from 'images/login-lock.svg'
import hidePass from 'images/login-hidepass.svg'
import showPass from 'images/login-showpass.svg'
import { Link } from 'react-router-dom'
import { useLogin, userInfoKey } from 'src/data/user'
import axios from 'axios'
import { API_PATHS } from 'src/routes/api.path'
import i18n from 'src/i18n'
import { useQueryClient } from 'react-query'

const LoginModal = ({
  show,
  onHide,
  ...otherProps
}) => {
  const {t} = useTranslation()
  const ref = useRef()
  const errorRef = useRef(null)
  const [info, setInfo] = React.useState({
    msisdn: '',
    password: '',
    grant_type: 'login'
  })
  const queryClient = useQueryClient()

  const [isShowPass, setIsShowPass] = React.useState(false)

  const {mutate: loginMutate, data, isLoading: isLogin} = useLogin(
    (data) => {
      axios.get(API_PATHS.getUser).then(res => {
        const lng = res?.data.data?.language;
        if (lng) {
          i18n.changeLanguage(lng)
        } else {
          i18n.changeLanguage('la')
        }
      })

      console.log(data)
      onHide()
    },

    () => {
      if (errorRef.current) {
        errorRef.current.innerText = data?.mesage
      }
    }
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  const handleInfoChange = (e) => {
    const newInfo = { ...info }
    newInfo[e.target.id] = e.target.value
    setInfo(newInfo)
  }

  const handleHidePass = () => {
    setIsShowPass(prev => !prev)
  }

  const handleLoginClick = () => {
    loginMutate(info)
  }

  const onShowLoginSms = () => {}

  const handleLoginKeyDown = (e) => {
    if (e.key === 'Enter') {
      // TODO: Handle Login
    }
  }

  return (
    <BaseModal show={show} onHide={onHide} {...otherProps} hideDecor>
      <Container fluid  className="login-modal-container" onKeyDown={handleLoginKeyDown} >
        <Modal.Header>
          <Modal.Title>
            {t('modal.login.title')}
          </Modal.Title>
          <Modal.Body>
            <p>{t('modal.login.desc')}</p>
          </Modal.Body>
        </Modal.Header>

        <Modal.Body>
          <Form className='baseinput-container'>
            <Form.Group className='mb-3 base-input'>
              <img src={phoneIcon} alt="" />
              <Form.Control
                type="phone"
                onChange={handleInfoChange}
                id="msisdn"
                placeholder={t('modal.form.phone')}
                ref={ref}
              />
            </Form.Group>
            <Form.Group className='mb-3 base-input'>
              <img src={lockIcon} alt='' />
              <Button 
                variant="dark"
                onClick={handleHidePass}
                style={{
                  position: 'absolute',
                  top: "50%",
                  right: "0px",
                  translate: "0 -50%",
                  marginRight: "20px",
                  backgroundColor: "transparent",
                  border: "medium"
                }}
              >
                <img src={isShowPass ? showPass : hidePass} alt="" style={{margin: "0"}}/>
              </Button>
              <Form.Control
									type={isShowPass ? 'text' : 'password'}
									onChange={handleInfoChange}
									id="password"
									placeholder={t('modal.form.pass')}
								/>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Check
                    type='checkbox'
                    label={t('modal.login.save_pass')}
                  />
                </Form.Group>
              </Col>
              {parseInt(data?.responseCode) === 403 ? (
									<Col xs={6} className="error-login text-end">
										<p ref={errorRef}>{data?.message}</p>
									</Col>
								) : null}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={isLogin}
            onClick={handleLoginClick}
          >
            {
              isLogin ? <Spinner animation="border" /> : t('modal.login.login_pass_btn')
            }
          </Button>
          <Button variant='dark' onClick={onShowLoginSms}>
            {t('modal.login.login_otp')}
          </Button>
          <Button variant='dark'>
            <Link
              style={{color: 'white'}}
              to={"/"}
            >
              {t('modal.login.login_UniID')}
            </Link>
          </Button>
        </Modal.Footer>
      </Container>
    </BaseModal>
  )
}
  
export default LoginModal 