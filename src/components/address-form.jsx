import React from "react";
import { useForm } from "react-hook-form";
import Input from "../admin/components/input";
import {
  Select,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectContent,
} from "./ui/select";
import Button from "./ui/button";
import { STATES } from "../config";
const AddressForm = ({ onClose }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const onSubmit = () => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 py-2 space-y-4 border rounded-md"
    >
      <p className="text-xl font-bold text-cyan-600">Address</p>
      <div className="grid gap-4 grid-cols-2">
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
          type="number"
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
        name="address"
        required="Address is required"
      />
      <div className="grid gap-4 grid-cols-2 items-center">
        <Input
          register={register}
          errors={errors}
          label="City / District / Town"
          name="address"
          required="Required"
        />
        <div className="space-y-2">
          <label htmlFor={name} className=" font-bold text-xl">
            State
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup className="h-[10rem] overflow-auto">
                {STATES.map((st) => (
                  <SelectItem key={st} value={st}>
                    <SelectLabel>{st}</SelectLabel>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <Button type="submit" className="px-6 py-1">
          Save
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
