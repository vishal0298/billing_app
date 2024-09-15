export const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "white",
    borderStyle: "hidden",
    border: "1px solid #E0E0E0",
    boxShadow: 0,
    borderRadius: "4px",
    color: "#dddddd",
    fontSize: "14px",
    fontWeight: "400",
    height: "43px",
    "&:hover": {
      border:  0,
      color: "black",
    },
    outline: "none",
  }),
  menu: (base) => ({ ...base }),
  menuList: (base) => ({ ...base, padding: "0" }),
  container: (base) => ({ ...base, border: 0 }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#d6261d" : "white",
    fontSize: "14px",
    color: state.isSelected ? "white" : "#999",
    "&:hover": {
      backgroundColor: "#d6261d",
      color: "white",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  valueContainer: (base, state) => ({
    ...base,
    padding: "0 15px",
    border: "0",
    color: state.selected ? "black" : "#dddddd",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "black",
    fontSize: "12px",
    transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
    transition: "250ms",
  }),
  singleValue: (base) => ({ ...base, margin: "0", padding: "0", top: "45%" }),
  placeholder: (base) => ({
    ...base,
    color: "#6c757d",
    fontWeight: "400",
    margin: "0",
  }),
};
