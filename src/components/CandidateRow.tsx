import * as React from "react";
import { Candidate } from "../App";

interface Props {
  candidate: Candidate;
}

const CandidateRow: React.FC<Props> = ({ candidate }) => (
  <div className="hover:bg-light-blue-500 hover:shadow-md rounded-lg p-4 border border-gray-200 flex items-center mb-6">
    <img
      src={candidate.Image}
      alt={candidate.name}
      className="rounded-full bg-gray-500 border-2 border-white mr-3"
      style={{ width: 40, height: 40 }}
    />
    <span className="text-black text-left flex-1">{candidate.name}</span>
    <span
      className={
        candidate.status === "SHORTLISTED"
          ? "text-green-500"
          : candidate.status === "REJECTED"
          ? "text-red-500"
          : ""
      }
    >
      {candidate.status === "SHORTLISTED"
        ? "Shortlisted"
        : candidate.status === "REJECTED"
        ? "Rejected"
        : ""}
    </span>
  </div>
);

export default CandidateRow;
