import React from "react";

type Props = {};

const sidebar = (props: Props) => {
  return (
    <>
      <div className="hidden md:block sidebar">
        <div className="logo-details">
          <i className="fas fa-house-medical-flag fa-lg fa-fw icon"></i>
          <div className="logo_name">LFMC</div>
          <i
            className="fas fa-stream fa-sm fa-fw"
            id="btn"
            onClick={() => {
              const sidebar = document.querySelector(".sidebar");
              if (sidebar) {
                sidebar.classList.toggle("open");
              }
            }}
          ></i>
        </div>
        <ul className="nav-list">
          <li>
            <a href="/dashboard.html" className="active">
              <i className="fa-solid fa-house fa-lg fa-fw"></i>
              <span className="links_name">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/invoice_reciept.html">
              <i className="fas fa-file-invoice fa-lg fa-fw"></i>
              <span className="links_name">Invoice - Reciept</span>
            </a>
          </li>
          <li>
            <a href="/reciepts.html">
              <i className="fas fa-file-medical fa-2x fa-fw"></i>
              <span className="links_name">Receipt Record</span>
            </a>
          </li>
          <li>
            <a href="/settings.html">
              <i className="fas fa-gear fa-lg fa-fw"></i>
              <span className="links_name">Settings</span>
            </a>
          </li>
          <li className="profile">
            <div className="profile-details">
              <i className="fas fa-user-tag fa-3x fa-fw"></i>
              <div className="name_job">
                <div className="name">MRS GIFT</div>
                <div className="job">Cashier</div>
              </div>
            </div>
            <button>
              <i className="fas fa-sign-out fa-lg fa-fw" id="log_out"></i>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default sidebar;
