import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import no_data from 'images/profilepage-gifthist-nodata.svg'
import top1 from 'images/rankpage-top1.svg'
import top2 from 'images/rankpage-top2.svg'
import top3 from 'images/rankpage-top3.svg'

const RankTableMobile = ({data}) => {
  return (
    <div className='rank-mobile-table'>
      <Row className='rank-mobile-header'>
        <Col className='col-3'> 
          <p>Rank</p>
        </Col>

        <Col className='col-3'> 
          <p>Player</p>
        </Col>

        <Col className='col-3'> 
          <p>Gold</p>
        </Col>

        <Col className='col-3'> 
          <p>Win/Lose</p>
        </Col>
      </Row>
      {
        data.length > 0 ? data.map((item, index) => {
          return (
            <Row className='rank-mobile-row' key={index}>
              <Col className='col-3'>
                {
                  item.rank === 1 ? <img src={top1} alt="" /> :
                  item.rank === 2 ? <img src={top2} alt="" /> :
                  item.rank === 3 ? <img src={top3} alt="" /> :
                  <p>{item.rank}</p>
                }
              </Col>

              <Col className='col-3'>
                <p>{item.playerName}</p>
              </Col>

              <Col className='col-3'>
                <p>{item.gold}</p>
              </Col>

              <Col className='col-3'>
                <p>{item.win}/{item.lose}</p>
              </Col>
            </Row>
          ) 
        }) : (
          <img src={no_data} alt="No data" className='no-data-img'/>
        )
      }
    </div>
  )
}

export default RankTableMobile