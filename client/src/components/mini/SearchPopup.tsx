import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../App";
import config from "../../assets/config";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchForm from "./SearchForm";
import { getUniq } from "../../assets/functions";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(245, 245, 245)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
  const [retry, setRetry] = useState(0);
  const [reload, setReload] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputText, setInputText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    if (validPages.includes(page))
      getOptions(page)
        .then((data) => {
          setOptions(data);
        })
        .catch((err) => {
          console.log("error while fetching search options");
          if (retry >= 0 && retry < 3) {
            console.log("retrying to ");

            setRetry((pre) => pre + 1);
            setReload((pre) => !pre);
          } else {
            setRetry(0);
          }
        });
  }, [location, page, reload]);

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <Box sx={{ ...style, borderRadius: "15px" }}>
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={getUniq(options, (cell) => cell.label)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Model" />}
          /> */}
          <SearchForm
            text={inputText}
            setText={setInputText}
            onSubmit={(e) => {
              handleClose();

              const keys = searchParams.keys();
              let next = keys.next();
              while (next?.value) {
                searchParams.delete(next.value);
                next = keys.next();
              }
              setSearchParams(searchParams);
              searchParams.set("search", inputText);
              setSearchParams(searchParams);
              // navigate(
              //   location.pathname + `?search=${encodeURIComponent(inputText)}`
              // );
            }}
            options={getUniq(options, (cell) => cell.label)}
          />
        </Box>
      </Fade>
    </Modal>
  );
}

export default SearchPopup;
