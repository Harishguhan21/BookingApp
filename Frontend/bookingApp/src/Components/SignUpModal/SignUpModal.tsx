import { Dialog } from "primereact/dialog";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { setToken } from "../../Utils/auth";
import { failureNotify, sucessNotify } from "../Toast/ToastMessage";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup.string().required(),
  })
  .required();

const SignUpModal = ({
  signModal,
  hideSignModal,
}: {
  signModal: boolean | undefined;
  hideSignModal: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        data
      );

      if (response.status === 201) {
        hideSignModal();
        sucessNotify("User created successfully");
      }

    } catch (error: any) {
      console.log(error.response.data, "error");
      failureNotify(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-content-center">
        <Dialog
          header="Signup to your Account"
          visible={signModal}
          style={{ width: "90%", maxWidth: "400px" }}
          onHide={hideSignModal}
        >
          <div className="p-6 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your username"
                  {...register("username")}
                />
                <p className="text-red-500">{errors.username?.message}</p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your Email"
                  {...register("email")}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Signup
              </button>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default SignUpModal;
