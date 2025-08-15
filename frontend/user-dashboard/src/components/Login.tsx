type Page = "login" | "register";
type Props = {
  onPageChange: (page: Page) => void;
};

const Login = ({ onPageChange }: Props) => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center custom-bg overflow-hidden">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center font-medium text-xl text-white">
            Dashboard webapp with{" "}
            <span className="text-purple-400">React.js</span>
          </div>
          <div className="text-3xl font-bold text-gray-200 mt-2 text-center">
            Access Your Dashboard
          </div>
        </div>
        <div className="max-w-md w-full mx-auto mt-5  bg-gray-800/30 border border-gray-300 p-8 shadow-xl/35 rounded-sm">
          <form action="" className="space-y-6">
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-100 block"
              >
                Username
              </label>
              <input
                type="text"
                name=""
                id=""
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:bg-gray-200/10 text-white"
              />
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
                name=""
                id=""
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:bg-gray-200/10 text-white"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
              >
                Sign In to Your Account
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="" className="text-sm text-gray-100 block">
                  New to our platform?
                </label>
              </div>
              <div>
                <button
                  onClick={() => onPageChange("register")}
                  className="py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white text-sm"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
