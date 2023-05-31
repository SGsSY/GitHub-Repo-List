import React, { FC } from "react";
import debounce from "lodash.debounce";

const QueryInput: FC<{
  handleChange: (text: string) => void;
}> = ({ handleChange }) => {
  const handleInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  }, 500);

  return <input onChange={handleInput} />;
};

export default QueryInput;