import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import no_data from 'images/profilepage-gifthist-nodata.svg'
import top1 from 'images/rankpage-top1.svg'
import top2 from 'images/rankpage-top2.svg'
import top3 from 'images/rankpage-top3.svg'
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import Table from 'src/components/Table'
import { useQuery } from 'react-query'
import { getRankQuery } from 'data/game'
import { hidePhoneNumber } from 'utils/helpers'

const RankTableMobile = ({dataRank, pageIndex = 0, time}) => {
  const [paramRank, setParamRank] = useState({
    offset: 0,
    limit: 10,
  })
  const {data: rank, isLoading} = useQuery(getRankQuery(time, paramRank.offset, paramRank.limit))

  let rankList = (rank && rank?.filter(item => item.coin_win !== 0)) || []
  const rankData = rankList?.map(item => {
    item.msisdn = hidePhoneNumber(item.msisdn)
    return item
  })

  const { t } = useTranslation();

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
    columnHelper.accessor(row => row.coin_win, {
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
    columnHelper.accessor(row => `${row.total_win}/${row.total_lose}`, {
      id: t("rankpage.table.winrate"),
      cell: info => (<p>{info.getValue()}</p>),
      footer: info => info.column.id
    }),
  ]

  return (
    <div className="rank-mobile-table">
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

      <Row className='rank-mobile-row'>
        <Table 
          rankTable 
          rankTableMobile 
          {
            ...{
              columns,
              data: !isLoading ? rankData : [],
            }
          }
          pageIndex={pageIndex} 
        />
      </Row> 
    </div>
  )
}

export default RankTableMobile