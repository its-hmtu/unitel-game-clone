import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import no_data from 'images/profilepage-gifthist-nodata.svg'
import top1 from 'images/rankpage-top1.svg'
import top2 from 'images/rankpage-top2.svg'
import top3 from 'images/rankpage-top3.svg'
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import Table from 'src/components/Table'

const RankTableMobile = ({dataRank, pageIndex = 0}) => {
  const {t} = useTranslation()

  const data = dataRank?.map(item => {
    
    return item
  })

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor("id", {
      cell: info => {
        const orderId = parseInt(info.row.id) + 1
        return orderId === 1 ? (
            <img src={top1} alt="" />
          ) : orderId === 2 ? (
            <img src={top2} alt="" />
          ) : orderId === 3 ? (
            <img src={top3} alt="" />
          ) : orderId
      },
      id: "id",
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => row.msisdn, {
      id: "msisdn",
      cell: info => (<p>{info.getValue()}</p>),
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => row.gold, {
      id: t("rankpage.table.gold"),
      cell: info => {
				return (
          <p>
            {new Intl.NumberFormat('lo').format(info.getValue())}
            {/* {info.getValue()} */}
          </p>
				)
			},
      
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => `${row.win}/${row.lose}`, {
      id: t("rankpage.table.winrate"),
      cell: info => (<p>{info.getValue()}</p>),
      footer: info => info.column.id
    }),
  ]

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
      {/* {
        data?.length > 0 ? data?.map((item, index) => {
          return (
            <Row className='rank-mobile-row' key={index}>
              <Col className='col-3'>
                {
                  index === 0 ? <img src={top1} alt="" /> :
                  index === 1 ? <img src={top2} alt="" /> :
                  index === 2 ? <img src={top3} alt="" /> :
                  index + 1
                }
              </Col>

              <Col className='col-3'>
                <p>{item?.msisdn}</p>
              </Col>

              <Col className='col-3'>
                <p>{new Intl.NumberFormat('lo').format(item?.gold)}</p>
              </Col>

              <Col className='col-3'>
                <p>{item.win}/{item.lose}</p>
              </Col>
            </Row>
          ) 
        }) : (
          <img src={no_data} alt="No data" className='no-data-img'/>
        )
      } */}

      <Row className='rank-mobile-row'>
        <Table rankTable rankTableMobile data={data} columns={columns} pageIndex={pageIndex} />
      </Row> 
    </div>
  )
}

export default RankTableMobile