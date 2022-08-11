import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./Card";
import Pagination from "@mui/material/Pagination";
import OfficersTable, { IOfficer } from "./tables/OfficersTable";

import config from "../assets/config";

interface IGetofficersOptopns {
  id?: number;
  page: number;
  limit: number;
  offset: number;
}

const getofficers = async (options: IGetofficersOptopns) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const response = await fetch(
    `${config.apiHost}/api/get/officers?${searchParams.toString()}`
  );
  if (response.ok) {
    const data = await response.json();
    if (data.success) return data as { officers: IOfficer[]; pages: number };
    else {
      console.log(data.message);
      return { officers: [], pages: 0 };
    }
  } else {
    console.log(response);
    return { officers: [], pages: 0 };
  }
};

function OfficersPage() {
  const [officers, setOfficers] = useState<IOfficer[]>([]);
  const [searchParams, setSearParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );

  const [pages, setPages] = useState(0);

  useEffect(() => {
    // set current page to search params
    searchParams.set("page", page + "");
    setSearParams(searchParams);

    const id = Number(searchParams.get("id")) || undefined;
    const officer_id = Number(searchParams.get("officer_id")) || undefined;
    const location_id = Number(searchParams.get("location_id")) || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;

    // set fetch options
    const options: IGetofficersOptopns = { page, limit, offset };

    id && (options.id = id);

    // get officers
    getofficers(options).then((data) => {
      setOfficers(data.officers);
      setPages(data.pages);
    });
  }, [page]);
  return (
    <div id="container">
      <Card
        title="officers table"
        subTitle="this table shows a list of all officers on the russian army"
      >
        <OfficersTable rows={officers}></OfficersTable>
      </Card>
      <div className="pagination">
        <Pagination
          count={pages}
          page={page}
          onChange={(e, value: number) => {
            setPage(value);
          }}
        />
      </div>
    </div>
  );
}

export default OfficersPage;
