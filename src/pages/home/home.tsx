import React from "react";
import ReceiptInvoice from "../../components/forms/invoice/invoice";
import Reciept from "../../components/forms/reciept/reciept";

function Home() {
  return (
    <section className="w-full h-screen grid items-center grid-cols-2">
      <div className="">
        <ReceiptInvoice />
      </div>
      <div className="">
        <Reciept />
      </div>
    </section>
  );
}

export default Home;
