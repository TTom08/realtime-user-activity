import { useForm } from "react-hook-form";

interface RegisterFormData {
  fullName: string;
  userName: string;
  password: string;
}

type Page = "login" | "register";
type Props = {
  onPageChange: (page: Page) => void;
};

const Register = ({ onPageChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center custom-bg overflow-hidden">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center font-medium text-xl text-white">
            Dashboard webapp with{" "}
            <span className="text-purple-400">React.js</span>
          </div>
          <div className="text-3xl font-bold text-gray-200 mt-2 text-center">
            Create Your Account
          </div>
        </div>
        <div className="max-w-md w-full mx-auto mt-5  bg-gray-800/30 border border-gray-300 p-8 shadow-xl/35 rounded-sm">
          <form action="" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-100 block"
              >
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName", {
                  required: "Full name is required.",
                })}
                name="fullName"
                id=""
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:bg-gray-200/10 text-white"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-100 block"
              >
                Username
              </label>
              <input
                type="text"
                {...register("userName", { required: "Username is required." })}
                name="userName"
                id=""
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:bg-gray-200/10 text-white"
              />
              {errors.userName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-100 block"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
                name="password"
                id=""
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:bg-gray-200/10 text-white"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
              >
                Create Account
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="" className="text-sm text-gray-100 block">
                  Already have an account?
                </label>
              </div>
              <div>
                <button
                  onClick={() => onPageChange("login")}
                  className="py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white text-sm"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
