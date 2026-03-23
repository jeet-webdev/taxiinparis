"use client";

import React, { useState } from "react";
import { getCountryCallingCode } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import FlagSelect from "./FlagSelect";

export default function PhoneField() {
  const [country, setCountry] = useState<Country>("FR");
  const [phone, setPhone] = useState("");

  const handleCountryChange = (value?: string) => {
    setCountry(value as Country);
    setPhone("");
  };

  const dialCode = "+" + getCountryCallingCode(country);

  return (
    <div className="w-full border border-gray-300 rounded focus-within:ring-1 focus-within:ring-[#8B6C26] transition-all">
      <div className="flex items-center">
        {/* Flag */}
        <div className="flex justify-center border-r border-gray-300">
          <FlagSelect value={country} onChange={handleCountryChange} />
        </div>

        {/* Dial Code */}
        {/* <span className="px-2 text-gray-500 text-sm select-none">{dialCode}</span> */}

        {/* Hidden input submits full number with dial code */}
        <input
          type="hidden"
          name="phone"
          value={phone ? `${dialCode}${phone}` : ""}
        />

        {/* Plain input - no library conflicts */}
        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // only numbers

            if (value.length <= 10) {
              setPhone(value);
            }
          }}
          placeholder="6123456789"
          maxLength={10}
          inputMode="numeric"
          pattern="[0-9]{10}"
          required
          className="flex-1 p-2.5 outline-none bg-transparent text-sm text-black"
        />
      </div>
    </div>
  );
}
