import { t } from "i18next";
import React, { useEffect } from "react";
import PropTypes from "prop-types"; // Add this line
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import no_data from "images/profilepage-gifthist-nodata.svg";

import { Button } from "react-bootstrap";
import RankTable from "src/pages/RankPage/RankTable";
import RoomTable from "src/pages/RoomPage/components/RoomTable";
import Pagination from "../Pagination";
import { queryPoint, useMediaQuery } from "utils/hooks/useMediaQuery";

const Table = ({ 
  rankTable = false, 
  rankTableMobile = false,
  roomTable = false,
  totalCount,
  onChangePage,
  onChangePageSize,
  data,
  columns,
  pageIndex = 0,
  setParamRank = () => {},
	paramRank = {},
}) => {
  
  Table.propTypes = {
    rankTable: PropTypes.bool,
    rankTableMobile: PropTypes.bool,
    roomTable: PropTypes.bool,
    data: PropTypes.array,
    columns: PropTypes.array,
  };

  // const columnHelper = createColumnHelper()

  // useEffect(() => {
  //   console.log(data)
  // })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const {pageSize} = table.getState().pagination
  const totalRoom = totalCount ? totalCount : table.options.data?.length
  const width = rankTable && columns.length === 3 ? '33.33' : "auto"

  const isMobileMD = useMediaQuery(`(max-width: ${queryPoint.md}px)`)

  return (
    <div className={`table-wrapper ${rankTable && "rank-table"} ${rankTableMobile && "rank-table-mobile"} ${roomTable && "room-table"}`}>
      <table>
        {
          rankTableMobile ? null : (
            <thead>
          {
            table.getHeaderGroups().map(header => (
              <tr key={header.id}>
                {header.headers.map(header => {
                  return (
                    <th key={header.id} width={`${width}%`}>
                      <div>
                        {
                          flexRender(header.column.columnDef.header, header.getContext())
                        }
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))
          }
        </thead>
          )
        }
        <tbody>
          {table.getRowModel().rows.length ? table.getRowModel().rows.map(row => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									)
								})}
							</tr>
						)
					}) :
						<tr>
							<td colSpan={60} style={{ height: '500px' }}>
								<img
									style={{ width: rankTableMobile ? "40%" : "20%", margin: 'auto' }}
									src={no_data}
									alt="No reward is found"
								/>
							</td>
						</tr>
					}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="pagination-pagesize d-flex">
            <select 
              value={pageSize}
              onChange={(e) => {
                if (onChangePageSize instanceof Function) {
                  onChangePageSize(e.target.value)
                  
                }
                table.setPageSize(Number(e.target.value))
                setParamRank({...paramRank, limit: e.target.value})
              }}
            >
              {
                [10, 20, 30, 40, 50].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))
              }
            </select>
            <span>
              <div>
                {
                  t("room.table.pagination")
                  .replace("_FIRSTROOM_", `${pageIndex * pageSize + 1}`)
                  .replace("_LASTROOM_", `${
                    totalRoom >= pageIndex * pageSize + pageSize
										? pageIndex * pageSize + pageSize
										: totalRoom % ((pageIndex + 1) * pageSize)
                  }`)
                  .replace("_TOTALROOM_", totalRoom)
                }
              </div>
            </span>
          </div>

          <Pagination 
            className="pagination-bar"
            currentPage={pageIndex}
            totalCount={totalRoom}
            pageSize={pageSize}
            table={table}
            onChangePage={onChangePage}
          />
      </div>
    </div>
  );
  
};


export default Table;

