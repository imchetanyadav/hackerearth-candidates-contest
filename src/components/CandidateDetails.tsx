import * as React from "react";
import { useHistory } from "react-router-dom";

import { Candidate } from "../App";
import CandidateRow from "./CandidateRow";

interface Props {
  candidate?: Candidate;
  onStatusChange: (status: "APPLIED" | "SHORTLISTED" | "REJECTED") => void;
}

const CandidateList: React.FC<Props> = ({ candidate, onStatusChange }) => {
  let history = useHistory();

  return (
    <div>
      {candidate ? (
        <>
          <CandidateRow candidate={candidate} />
          <div className="flex">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md mr-4"
              onClick={() => {
                if (candidate.status === "SHORTLISTED") return;
                onStatusChange("SHORTLISTED");
                history.push("/");
              }}
            >
              Shortlist
            </button>
            <button
              className="bg-red-500 py-2 px-4 rounded-md text-white"
              onClick={() => {
                if (candidate.status === "REJECTED") return;
                onStatusChange("REJECTED");
                history.push("/");
              }}
            >
              Reject
            </button>
          </div>
        </>
      ) : (
        "Candidate not found"
      )}
    </div>
  );
};

export default CandidateList;
