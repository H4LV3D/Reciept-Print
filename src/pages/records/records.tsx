import React, { useState } from "react";
import data from "../../data/index.json";

type Props = {};

const Records = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    return (
      (item.data?.data?.name &&
        item.data.data.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.data?.data?.cardNumber &&
        item.data.data.cardNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (item.data?.data?.amountPaid &&
        item.data.data.amountPaid
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <>
      <div className="container mx-auto min-h-screen p-6">
        <h5 className="text-sm font-[400]">Hi Toluwalope</h5>
        <h2 className="text-3xl font-[600]">Records</h2>
        <div className="group mt-4 flex items-center relative w-full">
          <input
            type="text"
            className="py-2.5 px-4 w-full sm:w-[350px] md:w-[400px] rounded-l-lg text-sm sm:text-base border dark:bg-transparent hover:border-neutral-600 dark:border-neutral-800 dark:hover:border-neutral-800 focus:outline-none dark:text-bblack focus:border-black dark:focus:border-neutral-700 font-raleway placeholder-neutral-400"
            placeholder="Search by name, card number, or amount"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="p-3 bg-black rounded-r-lg text-white dark:text-neutral-400 dark:bg-neutral-800"
          >
            <i className="fas fa-search fa-lg fa-fw"></i>
          </button>
        </div>
        <hr className="my-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 space-x-4 space-y-4">
          {filteredData.map((item, index) => (
            <div className="border p-4 rounded-lg" key={index}>
              <p className="text-sm font-[400]">{item.data?.data?.id}</p>
              <h3 className="text-xl font-[600]">{item.data?.data?.name}</h3>
              <div className="flex flex-row items-center justify-between">
                <p className="text-sm font-[400]">
                  {item.data?.data?.cardNumber}
                </p>
                <p className="text-sm font-[400]">
                  {item.data?.data?.paymentMethod}
                </p>
              </div>
              <h3 className="text-lg font-[500]">
                {item.data?.data?.amountPaid}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Records;
