import React from "react";

export default function Error({ error }) {

  return <div className="text-danger">
      {error}
    </div>;
}