import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar";

const AdminLayout = ({ children, title }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main">
        <Header />
        <Container>
          <p>
            <h3>{title}</h3>
          </p>
          <div className="page-content">{children}</div>
        </Container>
        <Footer />
      </main>
    </div>
  );
};

export default AdminLayout;
