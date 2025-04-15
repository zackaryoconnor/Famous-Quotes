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

    const response = await fetch("http://localhost:3000/auth/register", {
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
    <div className="m-auto mt-20 w-80">
      <form
        onSubmit={onSubmit}
        className="border-2 border-bg-gray-500/30 bg-gray-200 text-gray-500 gap-2 size-full text-center rounded-lg p-5 shadow-lg flex flex-col items-center"
      >
        {/* Title */}
        <h2 className="text-3xl font-semibold">Registration</h2>
        {(errors.server && (
          <label className="text-center w-full text-red-700 text-xs">
            {errors.server}
          </label>
        )) ||
          ""}
        <hr className="my-2 border-gray-500/30 w-[50%]"></hr>

        {registrationCompleted ? (
          <>
            <label className="text-green-500 font-semibold">
              Your account was successfully created!
            </label>
            <a className="text-blue-500" href="/login">
              Login
            </a>
          </>
        ) : (
          <>
            <div id="inputs" className="flex flex-col gap-2 w-full px-4">
              {/* Username */}
              <input
                required
                autoComplete="username"
                name="username"
                className={`${
                  errors.username ? " outline-1 !outline-red-700" : ""
                } focus:outline-gray-400 w-full block bg-white shadow  p-2 rounded-md placeholder:text-gray-500`}
                placeholder="Username"
              ></input>
              {(errors.username && (
                <label className="w-full text-left text-red-700 text-xs">
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
                  errors.password ? " outline-1 !outline-red-700" : ""
                } block bg-white shadow p-2 rounded-md placeholder:text-gray-500 focus:outline-gray-400 w-full`}
                placeholder="Password"
              ></input>
              {(errors.password && (
                <label className="w-full text-left text-red-700 text-xs">
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
                  errors.confirmPassword ? " outline-1 !outline-red-700" : ""
                } block bg-white shadow p-2 rounded-md placeholder:text-gray-500 focus:outline-gray-400 w-full`}
                placeholder="Confirm Password"
              ></input>
              {(errors.confirmPassword && (
                <label className="w-full text-left text-red-700 text-xs">
                  {errors.confirmPassword}
                </label>
              )) ||
                ""}
            </div>

            <hr className="border-gray-500/30 w-[50%]"></hr>
            {/* Submit button */}
            <button
              className="p-2 rounded-lg bg-blue-400 cursor-pointer text-white font-bold w-full"
              type="submit"
            >
              Register
            </button>

            <div className="text-sm mt-2">
              <span>Already have an account? </span>
              <a className="text-blue-500" href="/login">
                Login
              </a>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
