import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setSession }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const formTarget = e.target;
    const username = formTarget.username.value;
    const password = formTarget.password.value;

    // reset errors
    let newErrors = {};
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // This is REQUIRED for cookies to work! I spent an hour debugging because i forgot to include this!
    });
    const data = await response.json();

    if (response.ok) {
      setSession(data.session);
      navigate("/");
    } else {
      setErrors({ server: `⚠️ Server Error: ${data.error}` });
    }
  };

  return (
    <div className="m-auto mt-20 w-80">
      <form
        onSubmit={onSubmit}
        className="border-bg-gray-500/30 flex size-full flex-col items-center gap-2 rounded-lg border-2 bg-gray-200 p-5 text-center text-gray-500 shadow-lg"
      >
        {/* Title */}
        <h2 className="text-3xl font-semibold">Login</h2>
        {(errors.server && (
          <label className="w-full text-center text-xs text-red-700">
            {errors.server}
          </label>
        )) ||
          ""}
        <hr className="my-2 w-[50%] border-gray-500/30"></hr>

        <div id="inputs" className="flex w-full flex-col gap-2 px-4">
          {/* Username */}
          <input
            required
            autoComplete="username"
            name="username"
            className={`${
              errors.username ? "outline-1 !outline-red-700" : ""
            } block w-full rounded-md bg-white p-2 shadow placeholder:text-gray-500 focus:outline-gray-400`}
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
            autoComplete="current-password"
            type="password"
            name="password"
            className={`${
              errors.password ? "outline-1 !outline-red-700" : ""
            } block w-full rounded-md bg-white p-2 shadow placeholder:text-gray-500 focus:outline-gray-400`}
            placeholder="Password"
          ></input>
          {(errors.password && (
            <label className="w-full text-left text-xs text-red-700">
              {errors.password}
            </label>
          )) ||
            ""}
        </div>

        <hr className="w-[50%] border-gray-500/30"></hr>
        {/* Submit button */}
        <button
          className="w-full cursor-pointer rounded-lg bg-blue-400 p-2 font-bold text-white"
          type="submit"
        >
          Login
        </button>

        <div className="mt-2 text-sm">
          <span>Don't have an account? </span>
          <a className="text-blue-500" href="/register">
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
