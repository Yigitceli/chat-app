import React from "react";

interface IProps {
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const Loading: React.FC<IProps> = ({ loading, children }) => {
  return <>{loading === "pending" ? <div>Loading</div> : children}</>;
};
export default Loading;
