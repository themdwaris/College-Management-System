import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const url =
        role === "admin"
          ? "/auth/admin/login"
          : "/auth/teacher/login";

      const { data } = await api.post(url, {
        email,
        password,
      });

      if (role === "admin") {
        setUser(data.admin);
        navigate("/admin/dashboard");
      } else {
        setUser(data.teacher);
        navigate("/teacher/dashboard");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">

        {/* =========================
            LEFT SIDE
        ========================== */}

        <div className="hidden lg:block">

          <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full text-sm">
            Welcome to CollegeMS
          </span>

          <h1 className="text-5xl font-bold mt-6 leading-tight">
            Manage your
            <span className="text-blue-500">
              College
            </span>
            from one dashboard.
          </h1>

          <p className="text-slate-400 mt-6 text-lg leading-8">
            Manage departments, students, teachers,
            courses and attendance using one simple,
            secure and modern dashboard.
          </p>


          {/* Preview Card */}

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

            <div className="flex justify-between mb-8">

              <div>

                <p className="text-slate-400 text-sm">
                  Students
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  250+
                </h2>

              </div>

              <GraduationCap
                size={42}
                className="text-blue-500"
              />

            </div>


            <div className="grid grid-cols-2 gap-4">

              <div className="bg-slate-800 rounded-xl p-4">

                <p className="text-slate-400 text-sm">
                  Teachers
                </p>

                <h3 className="text-xl font-semibold mt-1">
                  25
                </h3>

              </div>


              <div className="bg-slate-800 rounded-xl p-4">

                <p className="text-slate-400 text-sm">
                  Departments
                </p>

                <h3 className="text-xl font-semibold mt-1">
                  6
                </h3>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            RIGHT SIDE
        ========================== */}

        <div className="w-full">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl max-w-md mx-auto">

            <h2 className="text-3xl font-bold">
              Login
            </h2>

            <p className="text-slate-400 mt-2">
              Welcome back! Please login to continue.
            </p>


            <form onSubmit={handleLogin}>


              {/* =========================
                  ROLE
              ========================== */}

              <div className="grid grid-cols-2 bg-slate-800 rounded-xl p-1 mt-8">

                <button
                  type="button"
                  onClick={() => {
                    setRole("admin");
                    setError("");
                  }}
                  className={`py-2 rounded-lg transition ${
                    role === "admin"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Admin
                </button>


                <button
                  type="button"
                  onClick={() => {
                    setRole("teacher");
                    setError("");
                  }}
                  className={`py-2 rounded-lg transition ${
                    role === "teacher"
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Teacher
                </button>

              </div>


              {/* =========================
                  EMAIL
              ========================== */}

              <div className="mt-6">

                <label className="text-sm text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white placeholder:text-slate-500"
                  required
                />

              </div>


              {/* =========================
                  PASSWORD
              ========================== */}

              <div className="mt-5">

                <label className="text-sm text-slate-300">
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue-500 text-white placeholder:text-slate-500"
                    required
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>


              {/* =========================
                  ERROR
              ========================== */}

              {error && (
                <p className="mt-4 text-red-400 text-sm">
                  {error}
                </p>
              )}


              {/* =========================
                  LOGIN BUTTON
              ========================== */}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Login;