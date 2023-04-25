import React, {useState} from "react";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";
import Main from "./Main/Main";
import LoadingLayout from "./LoadingLayout";
import Sidebar from "@app/components/Layout/Sidebar/Sidebar";
import {ContextSearchHome} from "@app/components/Layout/Sidebar/ContextProvider/ContextSearchHome";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  const [searchHomeListBook, setSearchHomeListBook] = useState("null");
  return (
    <ContextSearchHome.Provider
      value={{searchHomeListBook, setSearchHomeListBook}}
    >
      <div className="wrapper">
        <Main>
          <Navbar />
          <div style={{display: "flex", padding: "20px", marginTop: "55px"}}>
            <Sidebar />
            <LoadingLayout>
              <Content>{children}</Content>
            </LoadingLayout>
          </div>
        </Main>
      </div>
    </ContextSearchHome.Provider>
  );
}
