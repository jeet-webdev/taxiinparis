// import React, { useMemo } from "react";
// import Select, { StylesConfig } from "react-select";
// import { getCountries } from "react-phone-number-input";
// import flags from "react-phone-number-input/flags";

// type CountryOption = {
//   value: string;
//   label: React.ReactNode;
// };

// type Props = {
//   value?: string;
//   onChange: (value?: string) => void;
// };

// function FlagSelect({ value, onChange }: Props) {
//   const countryOptions = useMemo<CountryOption[]>(() => {
//     return getCountries().map((country) => ({
//       value: country,
//       label: flags[country]
//         ? React.createElement(
//             "div",
//             {
//               style: { width: 20, height: 15 },
//               title: country,
//             },
//             React.createElement(flags[country], {
//               title: country,
//             }),
//           )
//         : country,
//     }));
//   }, []);

//   const selected = countryOptions.find((c) => c.value === value);

//   const customStyles: StylesConfig<CountryOption, false> = {
//     control: (base) => ({
//       ...base,
//       background: "transparent",
//       border: "none",
//       boxShadow: "none",
//       minHeight: 45,
//       width: 70,
//       cursor: "pointer",
//     }),
//     valueContainer: (base) => ({
//       ...base,
//       padding: 0,
//       justifyContent: "center",
//     }),
//     dropdownIndicator: () => ({ display: "none" }),
//     indicatorSeparator: () => ({ display: "none" }),
//     menu: (base) => ({
//       ...base,
//       width: 50,
//       zIndex: 9999,
//     }),
//     option: (base) => ({
//       ...base,
//       display: "flex",
//       justifyContent: "center",
//       padding: 8,
//     }),
//   };

//   return (
//     <Select
//       options={countryOptions}
//       value={selected}
//       onChange={(option) => onChange(option?.value)}
//       isSearchable={false}
//       styles={customStyles}
//     />
//   );
// }

// export default React.memo(FlagSelect);

"use client";

import React, { useState, useRef, useEffect } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

type Props = {
  value?: string;
  onChange: (value?: string) => void;
};

const countries = getCountries();

export default function FlagSelect({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const Flag = value ? flags[value as Country] : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = countries.filter(
    (c) =>
      c.toLowerCase().includes(search.toLowerCase()) ||
      `+${getCountryCallingCode(c)}`.includes(search),
  );

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button - narrow */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-2"
      >
        {Flag ? (
          <span style={{ width: 22, height: 15, display: "inline-block" }}>
            <Flag title={value || ""} />
          </span>
        ) : (
          <span className="text-xs text-gray-500">{value}</span>
        )}
        <span className="text-gray-400 text-[10px]">▾</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-[-8px] z-50 bg-white/95 border border-gray-200 rounded-lg shadow-xl w-15 max-h-80 flex flex-col">
          {/* <div className="absolute top-full left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-36 max-h-56 flex flex-col"> */}
          {/* Search */}
          {/* <div className="p-1.5 border-b">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full text-[#000] px-2 py-1 text-xs border rounded outline-none focus:ring-1 focus:ring-amber-500"
              autoFocus
            />
          </div> */}

          {/* Options - flag only */}
          <div className="overflow-y-auto flex-1 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filtered.map((country) => {
              const CountryFlag = flags[country];
              return (
                <button
                  key={country}
                  type="button"
                  onClick={() => {
                    onChange(country);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 hover:bg-amber-50 transition-colors ${
                    value === country ? "bg-amber-50" : ""
                  }`}
                >
                  {CountryFlag && (
                    <span
                      style={{
                        width: 25,
                        height: 14,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    >
                      <CountryFlag title={country} />
                    </span>
                  )}
                  {/* <span className="text-xs text-gray-500">
                    +{getCountryCallingCode(country)}
                  </span> */}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
