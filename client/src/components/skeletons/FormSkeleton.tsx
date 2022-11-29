import { Skeleton } from "@mui/material";
import React from "react";

function FormSkeleton() {
  return (
    <div className="form-skeleton">
      <Skeleton
        className="skeleton"
        variant="rounded"
        width={"50%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"20%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"20%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton"
        variant="rounded"
        width={"50%"}
        height={45}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"10%"}
        height={35}
        animation={"wave"}
      ></Skeleton>
      <Skeleton
        className="skeleton row"
        variant="rounded"
        width={"10%"}
        height={35}
        animation={"wave"}
      ></Skeleton>
    </div>
  );
}

export default FormSkeleton;
