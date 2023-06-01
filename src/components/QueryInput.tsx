import React, { FC } from "react";
import debounce from "lodash.debounce";

const QueryInput: FC<{
  handleChange: (text: string) => void;
}> = ({ handleChange }) => {
  const handleInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  }, 500);

  return (
    <div>
      <span>請輸入欲查詢的 repo : </span>
      <input onChange={handleInput} />
    </div>
  );
};

export default QueryInput;
