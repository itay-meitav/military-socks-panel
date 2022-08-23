import React from "react";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type IProps = {
  options: {
    label: string;
    id: string | number;
  }[];
  text: string;
  setText: Function;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

function SearchForm(props: IProps) {
  const [showOptions, setShowOptions] = React.useState(false);
  const form = React.useRef<HTMLFormElement>(null);
  return (
    <form
      ref={form}
      autoComplete={"off"}
      onSubmit={(e) => {
        e.preventDefault();
        setShowOptions(false);
        console.log("submitted");

        props.onSubmit(e);
      }}
      className="search-form"
      tabIndex={0}
      onBlur={(e) => {
        if (!form.current?.contains(e.relatedTarget)) setShowOptions(false);
      }}
    >
      <TextField
        style={{ width: "100%" }}
        inputProps={{
          onInput: (e) => props.setText(e.currentTarget.value),
          onFocusCapture: () => setShowOptions(true),
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </InputAdornment>
          ),
        }}
        label="Search"
        value={props.text}
      />
      {showOptions ? (
        <div className="options-container">
          <div className="options">
            {props.options
              .filter((option) =>
                option.label.toLowerCase().includes(props.text.toLowerCase())
              )
              .map((option) => (
                <button
                  type={"submit"}
                  key={option.id}
                  className="option"
                  onClick={() => {
                    console.log("option clicked");

                    props.setText(option.label);
                  }}
                  //  onClick={() => {
                  //    console.log("dispaching event", form.current?.submit());
                  //    props.setText(option.label);
                  //    setShowOptions(false);
                  //    console.log("clicked");
                  //  }}
                >
                  {option.label}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}

export default SearchForm;
