import { Skeleton } from "@mui/material";
import React from "react";

function FormSkeleton() {
  return (
    <div>
      <Skeleton
        className="skeleton"
        variant="rounded"
        width={"60%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"30%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"30%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton"
        variant="rounded"
        width={"60%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"15%"}
        height={35}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"15%"}
        height={35}
        animation={"wave"}
      ></Skeleton>
    </div>
  );
}

export default FormSkeleton;
