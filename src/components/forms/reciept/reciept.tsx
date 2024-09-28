import React, { useEffect } from "react";
import { convertToPDF } from "../../../utils/convertToPDF";
import { useAppSelector } from "../../../hooks/useAppSelector";

const Receipt: React.FC = () => {
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const button = document.querySelector(".fa-stream");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (sidebar) {
          sidebar.classList.toggle("open");
        }
        if (button) {
          button.classList.toggle("fa-stream");
          button.classList.toggle("fa-times-square");
        }
      });
    }
  }, []);

  const data = useAppSelector((state) => state.formData);
  const name = data.data?.cardNo || "card";

  const date = new Date();

  return (
    <>
      <div className="w-[380px] border rounded-lg mx-auto p-6">
        <div id="print">
          <div className="card-head text-center">
            <img
              src="/logo.png"
              alt="LOGO"
              className="mx-auto"
              style={{ width: 60 }}
            />
            <h3 className="text-center text-lg m-0 p-0">
              LIFE FOUNT MEDICAL CENTRE
            </h3>
            <p className="text-center text-sm m-0 p-0">CARE AT IT'S BEST!</p>
            <p className="text-center p-0 m-0 mt-3">
              NO. 103, MOSHALASHI RD, EGAN
            </p>
            <p className="text-center p-0 m-0">IGANDO, LAGOS.</p>
            <p className="text-center p-0 m-0">TEL : 08033337117</p>
            <hr />
          </div>
          <div className="py-2.5 grid grid-cols-2 gap-y-1.5  ">
            <div className="m-0 p-0">
              <p className="form-label p-0 m-0">
                INV :{" "}
                <span id="r_date">
                  {date.toLocaleDateString().replace(/\//g, "")}
                </span>
              </p>
            </div>
            <div className="m-0 p-0">
              <p className="form-label p-0 m-0">
                CASHIER : <span id="username"></span>
              </p>
            </div>

            <div className="m-0 p-0">
              <p className="form-label p-0 m-0">
                DATE :{" "}
                <span id="today">
                  {date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
            <div className="m-0 p-0">
              <p className="form-label p-0 m-0">
                TIME :{" "}
                <span id="time">
                  {date.toLocaleTimeString("en-GB", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>

          <hr />
          <div className="card-body mt-3">
            <div className="mb-3">
              <p className="form-label">
                Card Number : <span id="r_cardno"> {data.data?.cardNo}</span>
              </p>
            </div>
            <div className="mb-3">
              <p className="form-label">
                Patient Name : <span id="r_name">{data.data?.patientName}</span>
              </p>
            </div>
            <div className="mb-3">
              <p className="form-label">
                Payment Method :{" "}
                <span id="r_pay">{data.data?.paymentMethod}</span>
              </p>
            </div>
            <div className="mb-3">
              <p className="form-label">
                Amount Paid : <span id="r_paid">{data.data?.amountPaid}</span>
              </p>
            </div>
            <div className="mb-3">
              <p className="">Outstanding : {data.data?.amountOutstanding}</p>
            </div>
          </div>
          <div className="card-footer text-center my-2 bg-white">
            <div className="opening my-2">
              <p className="text-sm p-0 m-0 text-center">OPENING HOURS</p>
              <p className="font-normal p-0 m-0 text-center">
                Monday - Sunday : 24/7
              </p>
            </div>
            <div className="opening my-2">
              <p className="text-sm p-0 m-0 text-center">FOR MORE INFO</p>
              <p className="font-normal p-0 m-0 text-center">
                Visit www.lifefountmedical.com
              </p>
              <p className="font-normal p-0 m-0 text-center">
                Call 08033337117
              </p>
            </div>
            <br />
            <p className="text-center">CARE AT IT'S BEST</p>
          </div>
        </div>
        <button
          className="w-full rounded-md py-3 px-5 font-normal text-white text-base focus:text-black focus:border-black bg-black border hover:border-neutral-700 focus:outline-none"
          id="button"
          onClick={() => convertToPDF(name)}
        >
          Print
        </button>
      </div>
    </>
  );
};

export default Receipt;
