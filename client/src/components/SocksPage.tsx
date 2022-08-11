import React, { useState, useEffect } from "react";
import Card from "./Card";
import SocksTable, { ISock } from "./tables/SocksTable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

import config from "../assets/config";

interface IGetSocksOptopns {
  id?: number;
  officer_id?: number;
  location_id?: number;
  limit: number;
  offset: number;
}

const getSocks = async (options: IGetSocksOptopns) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}/api/get/socks?${searchParams.toString()}`;
  console.log(url);

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    if (data.success) return data as { socks: ISock[]; pages: number };
    else {
      console.log(data.message);
      return { socks: [], pages: 0 };
    }
  } else {
    console.log(response);
    return { socks: [], pages: 0 };
  }
};

function SocksPage() {
  const [socks, setSocks] = useState<ISock[]>([]);
  const [searchParams, setSearParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setPage(page);
    const id = Number(searchParams.get("id")) || undefined;
    const officer_id = Number(searchParams.get("officer_id")) || undefined;
    const location_id = Number(searchParams.get("location_id")) || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;
    // set fetch options
    const options: IGetSocksOptopns = { limit, offset };
    console.log("page:", page, "queryPage:", searchParams.get("page"));

    id && (options.id = id);
    officer_id && (options.officer_id = officer_id);
    location_id && (options.location_id = location_id);

    // get socks
    getSocks(options).then((data) => {
      setSocks(data.socks);
      setPages(data.pages);
    });
  }, [searchParams]);

  return (
    <div id="container">
      <Card subTitle="this is the socks table" title="socks table">
        <SocksTable rows={socks}></SocksTable>
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

export default SocksPage;
