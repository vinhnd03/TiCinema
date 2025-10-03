import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import authService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUser, user } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email.")
      .email("Email không hợp lệ."),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  });

  const initialValue = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await authService.login(values);
      if (result.success) {
        await fetchUser();

        toast.success("Đăng nhập thành công!");
      } else {
        toast.error(result.error || "Tài khoản hoặc mật khẩu không chính xác.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 mb-10">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Đăng nhập
        </h2>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  placeholder="Nhập email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-white mr-2"></div>
                    Đang đăng nhập...
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </button>

              <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                <Link to="/forgot-password" className="hover:text-orange-500">
                  Quên mật khẩu?
                </Link>
                <Link to="/register" className="hover:text-orange-500">
                  Đăng ký ngay
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
