"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { getCountryCallingCode } from "react-phone-number-input";
import FlagSelect from "./FlagSelect";

export default function PhoneField() {
  const [country, setCountry] = useState<
    Parameters<typeof getCountryCallingCode>[0]
  >("FR");

  const [phone, setPhone] = useState("");

  const dialCode = "+" + getCountryCallingCode(country);

  return (
    <div className="w-full border border-gray-300 rounded focus-within:ring-1 focus-within:ring-amber-500 transition-all">

      <div className="flex items-center">

        {/* Flag */}
        <div className="w-[60px] flex justify-center border-r border-gray-300">
          <FlagSelect
            value={country}
            onChange={(value) => setCountry(value as typeof country)}
          />
        </div>

        {/* Dial Code */}
        <span className="px-2 text-gray-500 text-sm">
          {dialCode}
        </span>

        {/* Phone Input */}
        <PhoneInput
          country={country}
          value={phone}
          onChange={(value) => setPhone(value || "")}
          name="phone"
          className="flex-1 p-2.5 outline-none bg-transparent text-white"
        />
      </div>
    </div>
  );
}