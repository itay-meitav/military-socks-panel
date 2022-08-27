import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../App";
import config from "../../assets/config";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchForm from "./SearchForm";
import { getUniq } from "../../assets/functions";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(245, 245, 245)",
  border: "1px #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

type IProps = {
  open: boolean;
  setOpen: Function;
};

type IInputOptions = {
  id: number;
  label: string;
};
const validPages = ["socks", "locations", "officers"];
function getOptions(page: string) {
  if (!validPages.includes(page))
    return Promise.reject("cant search for this page");

  return fetch(config.apiHost + "/api/get/search-options/" + page)
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("something went wrong");
    })
    .then((data) => {
      return data;
    });
}

function SearchPopup(props: IProps) {
  const [open, setOpen] = [props.open, props.setOpen];
  const [options, setOptions] = useState<IInputOptions[]>([]);
  const [page] = useContext(PageContext);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputText, setInputText] = useState(searchParams.get("search") || "");

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (validPages.includes(page)) {
      setInputText("");
      getOptions(page)
        .then((data) => {
          setOptions(data);
        })
        .catch((err) => {
          console.error("error while fetching search options");
        });
    }
  }, [location, page]);

  const submitSearch = (val: string | undefined = undefined) => {
    handleClose();
    // remove all current search params
    const keys = searchParams.keys();
    let next = keys.next();
    while (next?.value) {
      searchParams.delete(next.value);
      next = keys.next();
    }
    const value = val ?? inputText;
    if (value) searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <SearchForm
            text={inputText}
            onSubmit={submitSearch}
            options={getUniq(options, (cell) => cell.label)}
          />
        </Box>
      </Fade>
    </Modal>
  );
}

export default SearchPopup;
