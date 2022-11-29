import React, { useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material/";

type TOption = {
  label: string;
  id: string | number;
};

type IProps = {
  options: TOption[];
  text: string;
  onSubmit: (val?: string) => void;
};

function SearchForm(props: IProps) {
  const [showOptions, setShowOptions] = React.useState(false);
  const [inputText, setInputText] = React.useState(props.text);
  const form = React.useRef<HTMLFormElement>(null);
  const input = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    input.current?.focus();
    console.log(input.current);
  }, []);

  return (
    <form
      ref={form}
      autoComplete={"off"}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(inputText);
      }}
      className="search-form"
      onBlur={(e) => {
        if (!form.current?.contains(e.relatedTarget)) setShowOptions(false);
      }}
    >
      <TextField
        style={{ width: "100%" }}
        inputProps={{
          onInput: (e) => setInputText(e.currentTarget.value),
          onFocusCapture: () => setShowOptions(true),
          ref: input,
          autoFocus: true,
        }}
        InputProps={{
          endAdornment: inputText ? (
            <InputAdornment position="end">
              <IconButton onClick={() => props.onSubmit("")}>
                <Clear></Clear>
              </IconButton>
            </InputAdornment>
          ) : (
            <></>
          ),
        }}
        label="Search"
        value={inputText}
      />
      {inputText.length || showOptions ? (
        <div className="options-container">
          <div className="options">
            {props.options
              .filter((option) =>
                option.label.toLowerCase().includes(inputText.toLowerCase())
              )
              .map((option) => (
                <button
                  type={"button"}
                  key={option.id}
                  className="option"
                  onClick={() => {
                    console.log("option clicked");
                    props.onSubmit(option.label);
                  }}
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
