import React, { useState, useEffect } from "react";
import Card from "./Card";
import LocationsTable, { ILocation } from "./tables/LocationsTable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

import config from "../assets/config";

interface IGetLocationsOptopns {
  id?: number;
  limit: number;
  offset: number;
}

const getLocations = async (options: IGetLocationsOptopns) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}/api/get/Locations?${searchParams.toString()}`;
  console.log(url);

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    if (data.success) return data as { locations: ILocation[]; pages: number };
    else {
      console.log(data.message);
      return { locations: [], pages: 0 };
    }
  } else {
    console.log(response);
    return { locations: [], pages: 0 };
  }
};

function LocationsPage() {
  const [locations, setLocations] = useState<ILocation[]>([]);
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
    const options: IGetLocationsOptopns = { limit, offset };

    id && (options.id = id);

    // get socks
    getLocations(options).then((data) => {
      setLocations(data.locations);
      setPages(data.pages);
    });
  }, [searchParams]);

  return (
    <div id="container">
      <Card
        title="locations table"
        subTitle="this is a locations table of all the locations"
      >
        <LocationsTable rows={locations}></LocationsTable>
      </Card>
      <div className="pagination">
        <Pagination
          count={pages}
          page={page}
          onChange={(e, value: number) => {
            setPage(value);
            // set current page to search params
            searchParams.set("page", page + "");
            setSearParams(searchParams);
          }}
        />
      </div>
    </div>
  );
}

export default LocationsPage;
