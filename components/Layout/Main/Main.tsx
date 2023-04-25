import React from "react";

interface MainProps {
  children: React.ReactNode;
}
export default function Main({children}: MainProps): JSX.Element {
  return <div className="main">{children}</div>;
}
