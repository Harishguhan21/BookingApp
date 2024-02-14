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
    password: yup.string().required(),
  })
  .required();

const LoginModal = ({
  visible,
  hidePopup,
}: {
  visible: boolean | undefined;
  hidePopup: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response: any = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/auth/login`,
        data
      );
      if (response.status === 200) {
        setToken(response.data.token);
        hidePopup();
        sucessNotify("Login Successfull!");
      }
    } catch (error: any) {
      failureNotify(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-content-center">
        <Dialog
          header="Login to your Account"
          visible={visible}
          style={{ width: "90%", maxWidth: "400px" }}
          onHide={hidePopup}
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
                Login
              </button>
            </form>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default LoginModal;
