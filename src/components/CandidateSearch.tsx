import * as React from "react";

interface Props {
  inputValue: string;
  onInputChange: Function;
}

const CandidateSearch: React.FC<Props> = ({ inputValue, onInputChange }) => (
  <div className="mb-5">
    <input
      value={inputValue}
      className="p-2 border-b-2 w-full"
      placeholder="Enter candidate name"
      onChange={(e) => onInputChange(e.target.value.toLowerCase())}
    />
  </div>
);

export default CandidateSearch;
