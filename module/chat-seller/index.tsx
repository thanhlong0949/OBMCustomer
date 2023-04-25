import React from "react";
import "./index.scss";
import SideBarChat from "./component/SideBarChat";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import ContentChat from "./component/ContentChat";

export function ChatSeller() {
  return (
    <div className="chat-seller">
      <Navbar />
      <div className="chat-seller-main">
        <SideBarChat />
        <div className="chat-seller-body">
          <ContentChat />
        </div>
      </div>
    </div>
  );
}
