import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../admin/components/input";
import Button from "./ui/button";
import { STATES } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddressAsync,
  updateAddressAsync,
} from "../feautures/orders/orderSlice";
import { selectLoggedInUser } from "../feautures/auth/authSlice";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
const AddressForm = ({ onClose, address }) => {
  const dispatch = useDispatch();
  const stateRef = useRef();
  const user = useSelector(selectLoggedInUser);
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      name: address?.name,
      mobile: address?.mobile,
      pincode: address?.pincode,
      locality: address?.locality,
      area: address?.area,
      city: address?.city,
      landmark: address?.landmark,
    },
  });

  const onSubmit = async (e) => {
    if (!stateRef.current?.value || stateRef.current?.value == "defalult")
      return toast.error("PLease select state");

    setLoading(true);

    if (address) {
      await dispatch(
        updateAddressAsync({
          ...e,
          state: stateRef.current.value,
          userId: user?.id,
          id: address?.id,
        })
      );
    } else {
      await dispatch(
        createAddressAsync({
          ...e,
          state: stateRef.current.value,
          userId: user?.id,
        })
      );
    }
    setLoading(false);
    onClose(false);
  };
  return (
    <form className=" px-4 py-2 space-y-4  border rounded-md w-full h-full bg-white z-[250] overflow-auto">
      <p className="text-xl font-bold text-cyan-600">Address</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          register={register}
          errors={errors}
          label="Name"
          name="name"
          required="Name is required"
        />
        <Input
          register={register}
          errors={errors}
          label="Mobile no"
          name="mobile"
          // rules={}
          required="Mobile no is required"
        />
      </div>

      <div className="grid gap-4 grid-cols-2">
        <Input
          register={register}
          errors={errors}
          label="Pincode"
          name="pincode"
          required="Pincode is required"
          type="number"
        />
        <Input
          register={register}
          errors={errors}
          label="Locality"
          name="locality"
          required="Locality is required"
        />
      </div>
      <Input
        register={register}
        errors={errors}
        label="Address (Area and Street)"
        name="area"
        required="Address is required"
      />
      <div className="grid gap-4 grid-cols-2 ">
        <Input
          register={register}
          errors={errors}
          label="City / District / Town"
          name="city"
          required="Required"
        />
        <div className="space-y-2 flex flex-col">
          <label htmlFor="state" className=" font-bold text-xl">
            State
          </label>

          <select
            name="state"
            required
            placeholder="Select State"
            className="px-2 py-1 border rounded-sm focus:outline-none border-[#eee]"
            ref={stateRef}
            defaultValue={address?.state}
          >
            <optgroup>
              <option value="defalult">Select State</option>
              {STATES.map((st) => (
                <option key={st} value={st} label={st} />
              ))}
            </optgroup>
          </select>
        </div>
      </div>
      <Input
        register={register}
        errors={errors}
        label="Landmark"
        name="landmark"
        placeholder="Optional"
      />
      <div className="font-semibold space-x-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          className="px-6 py-1 disabled:bg-black/80"
        >
          {loading ? (
            <div className="flex items-center gap-x-1 justify-center">
              <Loader2 className="h-4 animate-spin" />
              <span className="font-semibold">Saving...</span>
            </div>
          ) : (
            "Save"
          )}
        </Button>
        <Button
          onClick={() => onClose(false)}
          className="bg-transparent text-black border hover:bg-gray-200/50 px-6 py-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
