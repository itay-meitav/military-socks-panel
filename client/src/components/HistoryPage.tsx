import React, { useState, useEffect } from "react";
import Card from "./Card";
import HistoryTable, { IHistory } from "./tables/HistoryTable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

import config from "../assets/config";

interface IGetHistoryOptopns {
  id?: number;
  sock_id?: number;
  location_id?: number;
  limit: number;
  offset: number;
}

const getHistory = async (options: IGetHistoryOptopns) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}/api/get/history?${searchParams.toString()}`;
  console.log(url);

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    if (data.success) return data as { history: IHistory[]; pages: number };
    else {
      console.log(data.message);
      return { history: [], pages: 0 };
    }
  } else {
    console.log(response);
    return { history: [], pages: 0 };
  }
};

function HistoryPage() {
  const [history, setHistory] = useState<IHistory[]>([]);
  const [searchParams, setSearParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // set current page from search params to state
    const page = Number(searchParams.get("page")) || 1;
    setPage(page);

    const id = Number(searchParams.get("id")) || undefined;
    const sock_id = Number(searchParams.get("sock_id")) || undefined;
    const location_id = Number(searchParams.get("location_id")) || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;

    // set fetch options
    const options: IGetHistoryOptopns = { limit, offset };

    id && (options.id = id);
    sock_id && (options.sock_id = sock_id);
    location_id && (options.location_id = location_id);

    // get socks
    getHistory(options).then((data) => {
      setHistory(data.history);
      setPages(data.pages);
    });
  }, [searchParams]);

  return (
    <div id="container">
      <Card
        title="locations history table"
        subTitle="table to view sock location history"
      >
        <HistoryTable rows={history}></HistoryTable>
      </Card>

      <div className="pagination">
        <Pagination
          count={pages}
          page={page}
          onChange={(e, value: number) => {
            setPage(value);

            searchParams.set("page", value + "");
            setSearParams(searchParams);
          }}
        />
      </div>
    </div>
  );
}

export default HistoryPage;
