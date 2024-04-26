import React, { useEffect, useState } from 'react'
import BaseModal from './index'
import { Carousel, Container, Modal } from 'react-bootstrap'

import g1 from 'images/imgplay/g1.png'
import g2 from 'images/imgplay/g2.png'
import k1 from 'images/imgplay/k1.png'
import k2 from 'images/imgplay/k2.png'
import m1 from 'images/imgplay/m1.png'
import m2 from 'images/imgplay/m2.png'
import b3 from 'images/imgplay/b3.png'
import b4 from 'images/imgplay/b4.png'
import b5 from 'images/imgplay/b5.png'
import b6 from 'images/imgplay/b6.png'
import { useMediaQuery, queryPoint } from 'src/utils/hooks/useMediaQuery'
import ModalHelpMobile from './components/ModalHelpMobile'
import ModalHelp from './components/ModalHelp'

const ModalHelpPlay = ({
  show,
  onHide,
  idGame,
  ...otherProps
}) => {
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`)

  const [stateModal, setStateModal] = useState({
    title: "",
    help: []
  })

  useEffect(() => {
    const goldMiner = {
      title:"Miner gold",
      help: [
        {
          img: g1,
          text: 'ເລືອກເກມທີ່ຕ້ອງການຫຼິ້ນ(Minnergold)',
        },
        {
          img: g2,
          text: 'ເຂົ້າໜ້າListroom, ກົດCreateRoom ເພື່ອສ້າງຫ້ອງຫຼິ້ນເກມ',
        },
        {
          img: b3,
          text: 'ໃສ່ຈຳນວນgoldທີ່ທ່ານຕ້ອງການພະນັນແລະclickAgree ເພື່ອເຫັນດີທີ່ຈະສ້າງຫ້ອງ(ໝາຍເຫດຄຳທີ່ຈະພະນັນຕໍ່າສຸດແມ່ນ100ຄຳແລະສູງສຸດ2000ຄຳ',
        },
        {
          img: b4,
          text: 'ສໍາລັບເຈົ້າຂອງຫ້ອງ: ລໍຖ້າຜູ້ຫຼິ້ນອື່ນເຂົ້າຮ່ວມຫ້ອງເກມ',
        },
        {
          img: b5,
          text: 'ສໍາລັບຜູ້ຫຼິ້ນທີ່ບໍ່ໄດ້ເປັນເຈົ້າຂອງຫ້ອງ: ເລືອກຫ້ອງທີ່ສ້າງແລ້ວເຂົ້າຮ່ວມມັນ',
        },
        {
          img: b6,
          text: 'ຫຼັງຈາກຜູ້ນແມ່ນກຽມພ້ອມ,ກົດປຸ່ມ Start ເພື່ອເລີ່ມຕົ້ນການຫຼິ້ນເກມ',
        },
      ]
    }
  
    const knifeHit = {
      title: "Knife hit",
      help: [
        {
          img: k1,
          text: 'ເລືອກເກມທີ່ຕ້ອງການຫຼິ້ນ(Knife Hit)',
        },
        {
          img: k2,
          text: 'ເຂົ້າໜ້າListroom, ກົດCreateRoom ເພື່ອສ້າງຫ້ອງຫຼິ້ນເກມ',
        },
        {
          img: b3,
          text: 'ໃສ່ຈຳນວນgoldທີ່ທ່ານຕ້ອງການພະນັນແລະclickAgree ເພື່ອເຫັນດີທີ່ຈະສ້າງຫ້ອງ(ໝາຍເຫດຄຳທີ່ຈະພະນັນຕໍ່າສຸດແມ່ນ100ຄຳແລະສູງສຸດ2000ຄຳ',
        },
        {
          img: b4,
          text: ' ສໍາລັບເຈົ້າຂອງຫ້ອງ: ລໍຖ້າຜູ້ຫຼິ້ນອື່ນເຂົ້າຮ່ວມຫ້ອງເກມ',
        },
        {
          img: b5,
          text: 'ສໍາລັບຜູ້ຫຼິ້ນທີ່ບໍ່ໄດ້ເປັນເຈົ້າຂອງຫ້ອງ: ເລືອກຫ້ອງທີ່ສ້າງແລ້ວເຂົ້າຮ່ວມມັນ.',
        },
        {
          img: b6,
          text: 'ຫຼັງຈາກຜູ້ນແມ່ນກຽມພ້ອມ,ກົດປຸ່ມ Start ເພື່ອເລີ່ມຕົ້ນການຫຼິ້ນເກມ',
        },
      ],
    }
  
    const beatMouse = {
      title: 'Beat mouse',
      help: [
        {
          img: m1,
          text: 'ເລືອກເກມທີ່ຕ້ອງການຫຼິ້ນ(Beat mouse)',
        },
        {
          img: m2,
          text: 'ເຂົ້າໜ້າListroom, ກົດCreateRoom ເພື່ອສ້າງຫ້ອງຫຼິ້ນເກມ',
        },
        {
          img: b3,
          text: 'ໃສ່ຈຳນວນgoldທີ່ທ່ານຕ້ອງການພະນັນແລະclickAgree ເພື່ອເຫັນດີທີ່ຈະສ້າງຫ້ອງ(ໝາຍເຫດຄຳທີ່ຈະພະນັນຕໍ່າສຸດແມ່ນ100ຄຳແລະສູງສຸດ2000ຄຳ',
        },
        {
          img: b4,
          text: ' ສໍາລັບເຈົ້າຂອງຫ້ອງ: ລໍຖ້າຜູ້ຫຼິ້ນອື່ນເຂົ້າຮ່ວມຫ້ອງເກມ',
        },
        {
          img: b5,
          text: 'ສໍາລັບຜູ້ຫຼິ້ນທີ່ບໍ່ໄດ້ເປັນເຈົ້າຂອງຫ້ອງ: ເລືອກຫ້ອງທີ່ສ້າງແລ້ວເຂົ້າຮ່ວມມັນ.',
        },
        {
          img: b6,
          text: 'ຫຼັງຈາກຜູ້ນແມ່ນກຽມພ້ອມ,ກົດປຸ່ມ Start ເພື່ອເລີ່ມຕົ້ນການຫຼິ້ນເກມ',
        },
      ],
    }
    
    if (idGame === 1) setStateModal(goldMiner)
    else if (idGame === 2) setStateModal(knifeHit)
    else if (idGame === 3) setStateModal(beatMouse)
  }, [idGame])
  

  return (
    <BaseModal show={show} onHide={onHide} {...otherProps}>
      <Container className='modal-help-play px-0'>
        <Modal.Header>{stateModal.title}</Modal.Header>
        <Modal.Body>
          {
            isMobile 
            ? (<ModalHelpMobile data={stateModal.help} />) 
            : (<ModalHelp data={stateModal.help} />)
          }
        </Modal.Body>
      </Container>
    </BaseModal>

  )
}

export default ModalHelpPlay