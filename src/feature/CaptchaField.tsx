"use client";

import { useEffect, useState } from "react";

type Props = {
    cssClass?: string;
  onChange: (isValid: boolean) => void;
};

export default function CaptchaField({ onChange, cssClass }: Props) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [value, setValue] = useState("");

  const generate = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);

    setNum1(a);
    setNum2(b);
    setValue("");
    onChange(false);
  };

  useEffect(() => {
    generate();
  }, []);

  const handleChange = (v: string) => {
    setValue(v);

    if (parseInt(v) === num1 + num2) {
      onChange(true);
    } else {
      onChange(false);
    }
  };

  return (
    <div>
      <label className="text-zinc-400 text-sm flex items-center gap-2">
        Solve: {num1} + {num2} = ?
        <button
          type="button"
          onClick={generate}
          className="text-[#a88435] text-xs"
        >
          refresh
        </button>
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={cssClass}
      />
    </div>
  );
}
