import React, { useEffect, useState } from "react";
import top1 from "images/rankpage-top1.svg";
import top2 from "images/rankpage-top2.svg";
import top3 from "images/rankpage-top3.svg";
import coin from "images/coin.svg";
import no_data from "images/profilepage-gifthist-nodata.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import Table from "src/components/Table";
import { useQuery } from "react-query";
import { getRankQuery } from "src/data/game";
import { hidePhoneNumber } from "src/utils/helpers";

const RankTable = ({ time }) => {
  const [paramRank, setParamRank] = useState({
    offset: 0,
    limit: 10,
  })
  const {data: rank, isLoading} = useQuery(getRankQuery(time, paramRank.offset, paramRank.limit))

  let rankList = (rank && rank?.filter(item => item.coin_win !== 0));
  const rankData = rankList?.map(item => {
    item.msisdn = hidePhoneNumber(item.msisdn)
    return item
  })

  useEffect(() => {
    console.log(rankData);
  }, [])

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
      header: () => <span>{t('rankpage.table.rank')}</span>,
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => row.msisdn, {
      id: "msisdn",
      cell: info => info.getValue(),
      header: () => <span>{t('rankpage.table.player')}</span>,
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => row.coin_win, {
      id: t("rankpage.table.gold"),
      cell: info => {
        console.log(info.getValue())
				return (
					<div className="betcoin">
						<div>
							<img src={coin} width="20" alt="Bet's coin" />
							<p>
								{new Intl.NumberFormat('lo').format(info.getValue())}
                {/* {info.getValue()} */}
							</p>
						</div>
					</div>
				)
			},
      header: () => <span>{t('rankpage.table.gold')}</span>,
      footer: info => info.column.id
    }),
    columnHelper.accessor(row => `${row.total_win}/${row.total_lose}`, {
      id: t("rankpage.table.winrate"),
      header: () => <span>{t('rankpage.table.winrate')}</span>,
      footer: info => info.column.id
    }),
  ]

  return (
    <>
      <Table
        {
          ...{
            data: !isLoading ? rankData : [],
            columns,
          }
        }
        rankTable
        setParamRank={setParamRank}
        paramRank={paramRank}
      />
    </>
  );
};

export default RankTable;
