import React, { useEffect, useState, useContext } from 'react'
import BaseModal from '.'
import { Form, Container, Modal, Button } from 'react-bootstrap'
import { useParams,  useNavigate  } from 'react-router-dom'
import coinIcon from 'images/coin.svg'
import { useTranslation } from 'react-i18next'
import { useCreateRoomOfGame } from "data/game";
import { SnackBarContext } from "contexts/SnackBarContext";
import { PATHS } from "routes/path";

const CreateRoomModal = ({
  show,
  onHide,
  title,
  game,
  ...otherProps
}) => {
  const {roomId} = useParams()
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { snackBar, setSnackBar } = useContext(SnackBarContext);

  const [info, setInfo] = useState({
    coin: '',
    game_id: parseInt(roomId),
    password: '',
  })

  const handleInfoChange = (e) => {
    const newInfo = {...info}
    newInfo[e.target.name] = e.target.value
    setInfo(newInfo)
  }

  useEffect(() => {
    console.log(game);
  })

  const { mutate, isLoading } = useCreateRoomOfGame(
    (result) => {
      if (!result.status) {
        setSnackBar({
          open: true,
          message: result.message || t("modal.error"),
          severity: "error",
        })
      } else {
        navigate(PATHS.PLAYROOM_PAGE.replace(":roomId", result.data.room.game_id).replace(
          ":gameId",
          result.data.room.id
        ))
        setSnackBar({
          open: true,
          message: t("modal.success"),
          severity: "success"
        })
      }
    }
  );

  const onPressCreateRoom = () => {
    if (isLoading) return;
    if (info.coin <= 0 || isNaN(parseInt(info.coin))) {
      setSnackBar({
        open: true,
        message: "Please enter an amount of coin" || t("modal.error"),
        severity: "error"
      })
    } else {
      mutate(info)
    }
  }

  return (
    <BaseModal show={show} onHide={onHide} hideDecor className="modal-content">
      <Container fluid className="create-room-modal-container modal-create-room"> 
        <Modal.Header>
          <Modal.Title>
            {title}
          </Modal.Title>
          <img src={game?.image} loading='lazy'/>
        </Modal.Header>
        <Modal.Body>
          <Form className='baseinput-container'>
            <Form.Group className='mb-3 base-input'>
              <img src={coinIcon} width={36} height={36} alt='Coin Icon' className='position-absolute' 
                style={{
                  right: "10px",
                  left: "auto"
                }}
              />
              <Form.Control 
                type='tel' 
                placeholder={t('modal.create_room.gold_bet')}
                name='coin'
                onChange={handleInfoChange} 
              />
            </Form.Group>

            <Form.Group className='mb-3 base-input'>
              <Form.Control 
                type='password' 
                placeholder={t('modal.create_room.room_pass')}
                name='password'
                onChange={handleInfoChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
          
        <Modal.Footer>
          <Button variant='dark' onClick={onHide}>
            {t('modal.btn.cancel')}
          </Button>
          <Button variant='secondary' onClick={onPressCreateRoom}>
            {t('modal.btn.agree')}
          </Button>
        </Modal.Footer>
      </Container>
    </BaseModal>
  )
}

export default CreateRoomModal