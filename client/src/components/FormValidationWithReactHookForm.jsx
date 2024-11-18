import "./FormValidation.css";

import { useController, useForm } from "react-hook-form";
import { FormControl } from "./FormControl";
import ReactSelect from "react-select";

const OPTIONS = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export function FormValidationWithRef() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ defaultValues: { email: "etc@gmail.com" } });

  const { field: foodField } = useController({
    name: "food",
    control,
    rules: { required: { value: true, message: "Required" } },
  });

  function onSubmitHandle(data) {
    console.log(data);
    alert("success");
  }
  return (
    <form onSubmit={handleSubmit(onSubmitHandle)} className="form">
      <FormControl errorMessage={errors?.email?.message}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          {...register("email", {
            validate: (value) => {
              if (!value.endsWith("@webdevsimplified.com")) {
                return "Must end in `@webdevsimplified.com`";
              }
            },
            required: { value: true, message: "Required" },
          })}
        />
      </FormControl>
      <FormControl errorMessage={errors?.password?.message}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          {...register("password", {
            required: { value: true, message: "Required" },
            minLength: {
              value: 10,
              message: "Must Be 10 characters or longer",
            },
            validate: (value) => {
              if (!value.match(/[A-Z]/)) {
                return "Must include an uppercase letter";
              }
              if (!value.match(/[a-z]/)) {
                return "Must include a lowercase letter";
              }
              if (!value.match(/[0-9]/)) {
                return "Must include a number";
              }
            },
          })}
        />
      </FormControl>

      <FormControl errorMessage={errors?.food?.message}>
        <label className="label" htmlFor="food">
          Food
        </label>
        <ReactSelect
          isClearable
          id="food"
          classNamePrefix="react-select"
          options={OPTIONS}
          {...foodField}
        ></ReactSelect>
      </FormControl>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
