import { useState } from "react";

export default function RegisterPage() {
  const [errors, setErrors] = useState({});
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formTarget = e.target;
    const username = formTarget.username.value;
    const password = formTarget.password.value;
    const confirmPassword = formTarget.confirmPassword.value;

    // reset errors
    let newErrors = {};
    setErrors(newErrors);

    // validations
    if (username.length < 3) {
      // username length
      newErrors = {
        ...newErrors,
        username: "⚠️ Username must be at least 3 characters",
      };
    }
    if (password.length < 6) {
      // pasword length
      newErrors = {
        ...newErrors,
        password: "⚠️ Password must be at least 6 characters",
      };
    }
    if (password != confirmPassword) {
      // matching passwords
      newErrors = {
        ...newErrors,
        confirmPassword: "⚠️ Password doesn't match!",
      };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const response = await fetch(`${api_url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const { message, error } = await response.json();

    if (response.ok) {
      setRegistrationCompleted(true);
    } else {
      setErrors({ server: `⚠️ Server Error: ${error}` });
    }
  };

  return (
    <div className="bg-light-gray min-h-screen">
      <div className="m-auto w-80 pt-20">
        <form
          onSubmit={onSubmit}
          className="border-gray flex size-full flex-col items-center gap-2 rounded-lg border-2 bg-white p-5 text-center text-gray-500 shadow-lg"
        >
          {/* Title */}
          <h2 className="text-3xl font-semibold">Registration</h2>
          {(errors.server && (
            <label className="w-full text-center text-xs text-red-700">
              {errors.server}
            </label>
          )) ||
            ""}
          <hr className="my-2 w-[50%] border-gray-500/30"></hr>

          {registrationCompleted ? (
            <>
              <label className="font-semibold text-green-500">
                Your account was successfully created!
              </label>
              <a className="text-blue-500" href="/login">
                Login
              </a>
            </>
          ) : (
            <>
              <div id="inputs" className="flex w-full flex-col gap-2 px-4">
                {/* Username */}
                <input
                  required
                  autoComplete="username"
                  name="username"
                  className={`${
                    errors.username ? "outline-1 !outline-red-700" : ""
                  } block w-full rounded-md bg-blue-100 p-2 shadow placeholder:text-gray-500 focus:outline-gray-400`}
                  placeholder="Username"
                ></input>
                {(errors.username && (
                  <label className="w-full text-left text-xs text-red-700">
                    {errors.username}
                  </label>
                )) ||
                  ""}
                {/* Password */}
                <input
                  required
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  className={`${
                    errors.password ? "outline-1 !outline-red-700" : ""
                  } block w-full rounded-md bg-blue-100 p-2 shadow placeholder:text-gray-500 focus:outline-gray-400`}
                  placeholder="Password"
                ></input>
                {(errors.password && (
                  <label className="w-full text-left text-xs text-red-700">
                    {errors.password}
                  </label>
                )) ||
                  ""}
                {/* Confirm Password */}
                <input
                  required
                  autoComplete="new-password"
                  type="password"
                  name="confirmPassword"
                  className={`${
                    errors.confirmPassword ? "outline-1 !outline-red-700" : ""
                  } block w-full rounded-md bg-blue-100 p-2 shadow placeholder:text-gray-500 focus:outline-gray-400`}
                  placeholder="Confirm Password"
                ></input>
                {(errors.confirmPassword && (
                  <label className="w-full text-left text-xs text-red-700">
                    {errors.confirmPassword}
                  </label>
                )) ||
                  ""}
              </div>

              <hr className="w-[50%] border-gray-500/30"></hr>
              {/* Submit button */}
              <button
                className="bg-gray w-full cursor-pointer rounded-lg p-2 font-bold text-white"
                type="submit"
              >
                Register
              </button>

              <div className="mt-2 text-sm">
                <span>Already have an account? </span>
                <a className="text-blue-500" href="/login">
                  Login
                </a>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
