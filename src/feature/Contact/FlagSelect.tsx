import React, { useMemo } from "react";
import Select, { StylesConfig } from "react-select";
import { getCountries } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

type CountryOption = {
  value: string;
  label: React.ReactNode;
};

type Props = {
  value?: string;
  onChange: (value?: string) => void;
};

function FlagSelect({ value, onChange }: Props) {

  const countryOptions = useMemo<CountryOption[]>(() => {
    return getCountries().map((country) => ({
      value: country,
      label: flags[country]
        ? React.createElement("div", {
            style: { width: 20, height: 15 },
            title: country,
          }, React.createElement(flags[country], {
            title: country,
          }))
        : country,
    }));
  }, []);

  const selected = countryOptions.find((c) => c.value === value);

  const customStyles: StylesConfig<CountryOption, false> = {
    control: (base) => ({
      ...base,
      background: "transparent",
      border: "none",
      boxShadow: "none",
      minHeight: 45,
      width: 70,
      cursor: "pointer",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
      justifyContent: "center",
    }),
    dropdownIndicator: () => ({ display: "none" }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (base) => ({
      ...base,
      width: 50,
      zIndex: 9999,
    }),
    option: (base) => ({
      ...base,
      display: "flex",
      justifyContent: "center",
      padding: 8,
    }),
  };

  return (
    <Select
      options={countryOptions}
      value={selected}
      onChange={(option) => onChange(option?.value)}
      isSearchable={false}
      styles={customStyles}
    />
  );
}

export default React.memo(FlagSelect);