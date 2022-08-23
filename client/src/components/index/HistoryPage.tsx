import React, { useState, useEffect } from "react";
import Card from "../mini/Card";
import HistoryTable, { IHistory } from "../tables/HistoryTable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

import config from "../../assets/config";
import TableSkeleton from "../skeletons/TableSkeleton";

interface IGetHistoryOptions {
  id?: number;
  sock_id?: number;
  location_id?: number;
  limit: number;
  offset: number;
  search?: string;
}

const getHistory = async (options: IGetHistoryOptions) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}/api/get/history?${searchParams.toString()}`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    if (data.success) return data as { history: IHistory[]; pages: number };
    else {
      return { history: [], pages: 0 };
    }
  } else {
    return { history: [], pages: 0 };
  }
};

function HistoryPage(props: { setPage: Function }) {
  props.setPage("history");
  const [history, setHistory] = useState<IHistory[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [pages, setPages] = useState(0);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    // set current page from search params to state
    const page = Number(searchParams.get("page")) || 1;
    setPage(page);

    const id = Number(searchParams.get("id")) || undefined;
    const sock_id = Number(searchParams.get("sock_id")) || undefined;
    const location_id = Number(searchParams.get("location_id")) || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;

    // set fetch options
    const options: IGetHistoryOptions = { limit, offset };

    id && (options.id = id);
    sock_id && (options.sock_id = sock_id);
    location_id && (options.location_id = location_id);
    search && (options.search = search);

    // get socks
    getHistory(options).then((data) => {
      setHistory(data.history);
      setPages(data.pages);
      setSkeleton(false);
    });
  }, [searchParams]);

  function deleteById(id: number) {
    setHistory((pre) => {
      const newHistory = pre.filter((loc) => loc.id != id);
      return newHistory;
    });
  }

  return (
    <div id="container">
      <Card
        title="locations history table"
        subTitle="table to view sock location history"
      >
        {skeleton ? (
          <>
            <TableSkeleton cols={7} rows={10} />
          </>
        ) : (
          <HistoryTable
            deleteItemById={deleteById}
            rows={history}
          ></HistoryTable>
        )}
      </Card>

      <div className="pagination">
        <Pagination
          count={pages}
          page={page}
          onChange={(e, value: number) => {
            setPage(value);

            searchParams.set("page", value + "");
            setSearchParams(searchParams);
          }}
        />
      </div>
    </div>
  );
}

export default HistoryPage;
