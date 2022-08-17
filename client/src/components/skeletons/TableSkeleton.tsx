import { Skeleton } from "@mui/material";
import React from "react";

function TableSkeleton(props: { cols: number; rows: number }) {
  let cols = props.cols;
  let rows = props.rows;
  const rowsArr = Array(rows).fill(Array(cols).fill(1));
  return (
    <div style={{ overflow: "hidden" }}>
      <table className="skeleton-table">
        <thead className="table-head">
          <tr>
            {rowsArr[0].map(() => (
              <th>
                <Skeleton className="skeleton" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {rowsArr.map((row: any[]) => (
            <>
              <tr>
                {row.map((_: any, i) => (
                  <td>
                    <Skeleton
                      animation={"wave"}
                      className={
                        "skeleton animation={'wave'}" + (i == 0 ? " small" : "")
                      }
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={cols}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={1}
                    animation={"wave"}
                  ></Skeleton>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;
