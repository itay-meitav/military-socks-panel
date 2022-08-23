import React, { useState, useEffect } from "react";
import Card from "../mini/Card";
import SocksTable, { ISock } from "../tables/SocksTable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

import config from "../../assets/config";
import TableSkeleton from "../skeletons/TableSkeleton";

interface IGetSocksOptions {
  id?: number;
  officer_id?: number;
  location_id?: number;
  limit: number;
  offset: number;
}

const getSocks = async (options: IGetSocksOptions) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}/api/get/socks?${searchParams.toString()}`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    if (data.success) return data as { socks: ISock[]; pages: number };
    else {
      return { socks: [], pages: 0 };
    }
  } else {
    return { socks: [], pages: 0 };
  }
};

function SocksPage(props: { setPage: Function }) {
  props.setPage("socks");
  const [socks, setSocks] = useState<ISock[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [pages, setPages] = useState(0);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setPage(page);
    const id = Number(searchParams.get("id")) || undefined;
    const officer_id = Number(searchParams.get("officer_id")) || undefined;
    const location_id = Number(searchParams.get("location_id")) || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;
    // set fetch options
    const options: IGetSocksOptions = { limit, offset };

    id && (options.id = id);
    officer_id && (options.officer_id = officer_id);
    location_id && (options.location_id = location_id);

    // get socks
    getSocks(options).then((data) => {
      setSocks(data.socks);
      setPages(data.pages);
      setSkeleton(false);
    });
  }, [searchParams]);

  function deleteById(id: number) {
    setSocks((pre) => {
      const newSocks = pre.filter((sock) => sock.id != id);
      return newSocks;
    });
  }

  return (
    <div id="container">
      <Card subTitle="this is the socks table" title="socks table">
        {skeleton ? (
          <>
            <TableSkeleton cols={9} rows={10} />
          </>
        ) : (
          <SocksTable deleteItemById={deleteById} rows={socks}></SocksTable>
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

export default SocksPage;
