import * as React from "react";
import { Link } from "react-router-dom";

import { Candidate } from "../App";
import CandidateRow from "./CandidateRow";

interface Props {
  list?: Array<Candidate>;
}

const CandidateList: React.FC<Props> = ({ list = [] }) => (
  <div>
    {list.map((c) => (
      <Link key={c.id} to={`/${c.id}`}>
        <CandidateRow candidate={c} />
      </Link>
    ))}
  </div>
);

export default CandidateList;
