import React, { useState, useEffect } from "react";
import CardTemplate from "../Card";
import LocationsTable, { ILocation } from "../tables/LocationsTable";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import config from "../../assets/config";
import TableSkeleton from "../skeletons/TableSkeleton";
interface IGetLocationsOptions {
  id?: number;
  limit: number;
  offset: number;
  search?: string;
}

const getLocations = async (options: IGetLocationsOptions) => {
  const searchParams = new URLSearchParams(Object.entries(options));
  const url = `${config.apiHost}api/get/Locations?${searchParams.toString()}`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    if (data.success) return data as { locations: ILocation[]; pages: number };
    else {
      return { locations: [], pages: 0 };
    }
  } else {
    return { locations: [], pages: 0 };
  }
};

function LocationsPage(props: { setPage: Function }) {
  props.setPage("locations");
  const [locations, setLocations] = useState<ILocation[]>([]);
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
    const search = searchParams.get("search") || undefined;
    const limit = 20;
    const offset = (page - 1) * limit;

    // set fetch options
    const options: IGetLocationsOptions = { limit, offset };

    id && (options.id = id);
    search && (options.search = search);

    // get socks
    getLocations(options).then((data) => {
      setLocations(data.locations);
      setPages(data.pages);
      setSkeleton(false);
    });
  }, [searchParams]);

  function deleteById(id: number) {
    setLocations((pre) => {
      const newLocations = pre.filter((location) => location.id != id);
      return newLocations;
    });
  }

  return (
    <div id="container">
      <CardTemplate title="locations table">
        {skeleton ? (
          <>
            <TableSkeleton cols={6} rows={10} />
          </>
        ) : (
          <LocationsTable
            deleteItemById={deleteById}
            rows={locations}
          ></LocationsTable>
        )}
      </CardTemplate>
      <div className="pagination">
        <Pagination
          count={pages}
          page={page}
          onChange={(e, value: number) => {
            setPage(value);
            // set current page to search params
            searchParams.set("page", page + "");
            setSearchParams(searchParams);
          }}
        />
      </div>
    </div>
  );
}

export default LocationsPage;
