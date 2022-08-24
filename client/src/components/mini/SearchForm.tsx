import React, { useEffect } from "react";
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
	onSubmit: (val?: string) => void;
	closeSearch: Function;
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
				if (props.text == inputText) props.closeSearch();
				props.setText(inputText);
			}}
			className="search-form"
			tabIndex={0}
			onBlur={(e) => {
				if (!form.current?.contains(e.relatedTarget)) setShowOptions(false);
			}}
			onKeyDown={(e) => {
				// console.log(e.key);
				if (e.key === "ArrowUp") {
				}
				if (e.key === "ArrowDown") {
				}
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
					endAdornment: (
						<InputAdornment position="end">
							<ArrowDropDownIcon></ArrowDropDownIcon>
						</InputAdornment>
					),
				}}
				label="Search"
				value={inputText}
			/>
			{inputText.length ? (
				<div className="options-container">
					<div className="options">
						{props.options
							.filter((option) =>
								option.label
									.toLowerCase()
									.includes(inputText.toLowerCase())
							)
							.map((option) => (
								<button
									type={"button"}
									key={option.id}
									className="option"
									onClick={() => {
										console.log("option clicked");
										props.setText(option.label);
										if (props.text == inputText) props.closeSearch();
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
