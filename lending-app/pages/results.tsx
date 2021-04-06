import { Input } from "antd";
import { withRouter, useRouter } from "next/router";
import { useState } from "react";

export default function Results() {
  const router = useRouter();
  const data = router.query;
  const [approved, setApproved] = useState<string | string[]>(data.approved);

  return (
    <div className="my-container">
      <h1 className="title">Based on your information, you have been:</h1>
      {approved === "approved" ? (
        <h1 className="title" style={{color:"green"}}>Approved</h1>
      ) : (
        <h1 className="title" style={{color:"red"}}>Denied</h1>
      )}
    </div>
  );
}
