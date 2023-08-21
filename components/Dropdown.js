import Select from "react-select";

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "",
  isSearchable = false,
}) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      isSearchable={isSearchable}
      className="dropdown-select"
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
    />
  );
};

export default Dropdown;
