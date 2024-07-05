import { Button, ProgressBar } from "react-bootstrap";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Table from "src/components/Table";
import table_status from "images/roompage-table-status.svg"
import table_user from "images/roompage-table-user.svg";
import table_coin from "images/coin.svg"

const RoomTable = ({data}) => {
  const {t} = useTranslation()
  
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: () => <span>{t('room.table.id')}</span>,
      cell: info => info.getValue(),
      footer: info => info.column.id
    }, 
    {
      accessorFn: row => row.player_count,
      id: 'player_count',
      header: () => <span>{t('room.table.player')}</span>,
      cell: info => (
        <div className="progress-indicator">
          <img src={table_user} alt="Table User Icon" />
          <ProgressBar now={info.getValue()} max="2" variant="secondary"/>
          <p>{`${info.getValue()}/2`}</p>
        </div>
      ),
      footer: info => info.column.id
    },
    {
      accessorFn: row => row.coin,
      id: 'coin',
      header: () => <span>{t('room.table.bet_level')}</span>,
      cell: info => (
        <div className="bet-container">
          <div className="d-flex" style={{marginLeft: '30%', gap: "15px"}}>
            <img src={table_coin} alt="" />
            <p style={{marginLeft: "15%"}}>
              {new Intl.NumberFormat("lo").format(info.getValue())}
            </p>
          </div>
        </div>
      ),
      footer: info => info.column.id
    },
    {
      accessorFn: row => row.status,
      id: 'status',
      header: () => <span>{t('room.table.status')}</span>,
      cell: info => info.getValue() === 2 ? (
        <div className="status-container">
          <img src={table_status} alt="Table Status Icon" />
        </div>
      ) : null,
      footer: info => info.column.id
    },
    {
      accessorFn: row => row.status,
      id: 'play_now',
      header: () => <Button variant="primary" className="room-table-btn">{t('game_card.play_btn')}</Button>,
      cell: info => <Button variant="primary" className="room-table-btn room-table-btn--join">Join</Button>,
      footer: info => info.column.id
    }
  ])

  

  return (
    <>
      {/* {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <div className="progress-indicator">
                  <img src={table_user} alt="Table User Icon" />
                  <ProgressBar now={1} max="2" variant="secondary"/>
                  <p>1/2</p>
                </div>
              </td>
              <td>
                <div className="bet-container">
                  <div className="d-flex" style={{marginLeft: '30%', gap: "15px"}}>
                    <img src={table_coin} alt="" />
                    <p style={{marginLeft: "15%"}}>
                      {new Intl.NumberFormat("lo").format(item.betLevel)}
                    </p>
                  </div>
                </div>
              </td>
              <td>{item.status}</td>
              <td>
                <Button variant="primary" className="room-table-btn room-table-btn--join">Join</Button>
              </td>
            </tr>
          )
        })
      ) : (
        <tr>
          <td colSpan={60} style={{ height: "500px" }}>
            <img src={no_data} alt = "No data" className="no-data-img" />
          </td>
        </tr>
      )} */}
      <Table data={data} columns={columns} roomTable/>
    </>
  )
}

export default RoomTable