import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect, Select, TextInput } from "@mantine/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectInputStyles, inputStyles } from "../../../utils/inputStyles";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updateForm } from "../../../store/slices/formDataReducer";
import cardData from "../../../data/index.json";

export const RecieptFormSchema = yup.object().shape({
  cardNo: yup.string().required(),
  cardType: yup.string().required(),
  patientName: yup.string().required(),
  services: yup.array().required(),
  paymentMethod: yup.string().required("Please select a payment method"),
  paymentTotal: yup.number().required(),
  amountPaid: yup.number().required(),
  amountOutstanding: yup.number().required(),
});

interface RecieptFormProps {
  cardNo: string;
  cardType: string;
  patientName: string;
  services: string[];
  paymentMethod: string;
  paymentTotal: number;
  amountPaid: number;
  amountOutstanding: number;
}

const ReceiptInvoice: React.FC = () => {
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<RecieptFormProps>({
    resolver: yupResolver(RecieptFormSchema),
    defaultValues: {
      cardNo: "",
      cardType: "FC",
      patientName: "",
      services: [],
      paymentMethod: "",
      amountOutstanding: 0,
    },
  });

  const dispatch = useAppDispatch();

  const cardNo = watch("cardNo");
  const cardType = watch("cardType");
  const patientName = watch("patientName");
  const services = watch("services");
  const paymentMethod = watch("paymentMethod");
  const paymentTotal = watch("paymentTotal");
  const amountPaid = watch("amountPaid");
  const amountOutstanding = watch("amountOutstanding");

  const data = {
    cardNo: cardNo,
    patientName: patientName,
    services: services,
    paymentMethod: paymentMethod,
    paymentTotal: paymentTotal,
    amountPaid: amountPaid,
    amountOutstanding: amountOutstanding,
  };

  dispatch(updateForm(data));

  const handleAmountPaidChange = (value: string) => {
    const newAmountOutstanding = paymentTotal - parseFloat(value);
    setValue("amountPaid", parseFloat(value));
    setValue("amountOutstanding", newAmountOutstanding);
  };

  const checkAllFieldsValidity = async () => {
    const isFormValid = await trigger();
    return isFormValid;
  };

  const onSubmit = async (data: RecieptFormProps, e: any) => {
    e.preventDefault();
    console.log(data);
    const isValid = await checkAllFieldsValidity();
    if (isValid) {
      console.log(data);
    }
  };

  useEffect(() => {
    setValue("amountOutstanding", paymentTotal - amountPaid);
  }, [amountPaid, paymentTotal, setValue]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = cardData.filter((item) => {
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

  useEffect(() => {
    // setSearchTerm(`${cardType}${cardNo}`);
    searchTerm !== "" &&
      setValue("patientName", filteredData[0].data.data.name ?? "");
  }, [cardNo, cardType, filteredData, setValue]);

  return (
    <>
      <div className="w-full sm:w-[360px] p-6 mx-auto border rounded-lg">
        <form className=" rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-[1.7rem] font-[600] mb-2 ">Invoice</h3>
          <div className="mb-3">
            <label htmlFor="cardno" className="form-label text-sm ">
              Card Number
            </label>
            <div className="w-full rounded-md font-normal text-neutral-600 text-base focus:text-black focus-within:border-black bg-transparent border hover:border-neutral-700 focus:outline-none flex items-center">
              <select
                onChange={(e) => {
                  setSearchTerm(`${cardType}${cardNo}`);
                }}
                className="p-2.5 font-[600] rounded-md focus:outline-none"
              >
                <option value="FC">FC</option>
                <option value="FC">PC</option>
                <option value="FC">OP</option>
              </select>
              <input
                type="number"
                className="w-full rounded-md py-2.5 px-3 font-normal text-neutral-600 text-base focus:text-black  bg-transparent focus:outline-none"
                placeholder="0"
                autoFocus
                autoComplete="none"
                // {...register("cardNo")}
                onChange={(e) => {
                  setSearchTerm(`${cardType}${cardNo}`);
                  setValue("cardNo", e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <TextInput
              type="text"
              styles={inputStyles}
              size="lg"
              style={inputStyles}
              // defaultValue={filteredData[0].data.data.name ?? ""}
              {...register("patientName")}
              error={
                errors.services && (
                  <p className="text-xs text-red-text font-semibold">
                    {errors.services.message}
                  </p>
                )
              }
            />
          </div>

          <div className="mb-3">
            <Controller
              name="services"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  label={
                    <div className="font-[500] text-[1rem] text-[#1a202c] mb-[0.5rem]">
                      Services
                    </div>
                  }
                  data={[
                    "Immunization",
                    "Consultation",
                    "Drugs",
                    "Test",
                    "Scan",
                    "Surgery",
                    "Deliveries",
                    "Others",
                  ]}
                  placeholder="Select services"
                  clearable
                  nothingFoundMessage="Nothing found..."
                  hidePickedOptions
                  styles={selectInputStyles}
                  size="lg"
                  radius="lg"
                  error={
                    errors.services && (
                      <p className="text-xs text-red-text font-semibold">
                        {errors.services.message}
                      </p>
                    )
                  }
                />
              )}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method
            </label>
            <div className="">
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    data={[
                      { label: "Cash", value: "Cash" },
                      { label: "POS", value: "POS" },
                      { label: "Transfer", value: "Transfer" },
                    ]}
                    searchable
                    className="font-normal"
                    placeholder="Select Payment Method"
                    styles={selectInputStyles}
                    size="lg"
                    radius="xl"
                    error={
                      errors.paymentMethod && (
                        <p className="text-xs text-red-text font-semibold">
                          {errors.paymentMethod.message}
                        </p>
                      )
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="p_total" className="form-label">
              Total Amount
            </label>
            <div className="w-full rounded-md font-normal text-neutral-600 text-base focus:text-black focus:border-black bg-transparent border hover:border-neutral-700 focus:outline-none flex items-center">
              <div className="py-2.5 pl-4 font-[600]">#</div>
              <input
                type="number"
                className="w-full rounded-md py-2.5 px-2 font-normal text-neutral-600 text-base focus:text-black  bg-transparent focus:outline-none"
                autoComplete="none"
                {...register("paymentTotal")}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="p_paid" className="form-label">
              Amount Paid
            </label>
            <div className="w-full rounded-md font-normal text-neutral-600 text-base focus:text-black focus:border-black bg-transparent border hover:border-neutral-700 focus:outline-none flex items-center">
              <div className="py-2.5 pl-4 font-[600]">#</div>
              <input
                type="number"
                className="w-full rounded-md py-2.5 px-2 font-normal text-neutral-600 text-base focus:text-black  bg-transparent focus:outline-none"
                autoComplete="none"
                {...register("amountPaid")}
                onChange={(e) => handleAmountPaidChange(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Outstanding Amount</label>
            <div className="w-full rounded-md font-normal text-neutral-600 text-base focus:text-black focus:border-black bg-transparent border hover:border-neutral-700 focus:outline-none flex items-center">
              <div className="py-2.5 pl-4 font-[600]">#</div>
              <input
                type="number"
                className="w-full rounded-md py-2.5 px-2 font-normal text-neutral-600 text-base focus:text-black  bg-transparent focus:outline-none"
                autoComplete="none"
                disabled
                {...register("amountOutstanding")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md py-3 px-5 font-normal text-white text-base focus:text-black focus:border-black bg-black border hover:border-neutral-700 focus:outline-none"
          >
            Generate
          </button>
        </form>
      </div>
    </>
  );
};

export default ReceiptInvoice;
