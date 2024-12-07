import React, { useState, useEffect, useRef } from "react";

export const FilterDropDown = ({ options = [], placeholder, func, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchQuery, options]);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectOption = (option) => {
    setSearchQuery(option);
    setIsOpen(false);
    func({
      target: {
        name,
        value: option,
      },
    });
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredOptions.length > 0) {
      handleSelectOption(filteredOptions[0]);
    } else if (e.key === "ArrowDown") {
      setIsOpen(true);
    }
  };

  const onchangeAreaFunc = (e) => {
    setSearchQuery(e.target.value);
    func(e); // Pass the event to the parent onchangeFunc
  };

  return (
    <div className="relative max-w-full" ref={dropdownRef}>
      <div
        className="w-full flex justify-between items-center"
        onClick={handleToggleDropdown}
      >
        <input
          type="text"
          name={name} // Ensure the name is passed down
          value={searchQuery}
          onChange={onchangeAreaFunc}
          placeholder={placeholder}
          className="text-sm font-normal placeholder:text-[#00000080] w-full focus:outline-none"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 border border-gray-300 bg-white z-10 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}
                className="px-2.5 py-[5px] cursor-pointer hover:bg-gray-200"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};
