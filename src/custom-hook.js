import { useState } from "react";
export default function useFormInput(initValue) {
  const [value, setValue] = useState(initValue);

  function handleChange(e) {
    setValue(e.target.value);
    console.log("value ===>", value);
  }

  return {
    onChange: handleChange,
    value,
  };
}
