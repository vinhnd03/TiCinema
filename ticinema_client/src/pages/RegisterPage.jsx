import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import authService from "../services/authService";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const registerSchema = Yup.object({
    name: Yup.string()
      .required("Vui lòng nhập tên.")
      .min(2, "Tên quá ngắn")
      .max(50, "Tên quá dài"),
    email: Yup.string()
      .required("Vui lòng nhập email.")
      .email("Email không đúng định dạng."),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự.")
      .required("Vui lòng nhập mật khẩu.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa và 1 số."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp.")
      .required("Vui lòng xác nhận mật khẩu"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const result = await authService.register(userData);
      if (result.success) {
        toast.success("Tạo tài khoản thành công.");
        navigate("/login");
      } else {
        if (result.error === "EMAIL_EXISTED") {
          setFieldError("email", "Email này đã được sử dụng");
        } else {
          toast.error(result.error || "Đăng ký thất bại.");
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Đăng ký
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, erroes, values, handleChange, handleBlur }) => (
            <Form className="space-y-5">
              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Họ và tên
                </label>
                <Field
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Nhập họ tên"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <ErrorMessage
                  name="name"
                  component={"div"}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Nhập email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <ErrorMessage
                  name="email"
                  component={"div"}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component={"div"}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-white mr-2"></div>
                    Đang đăng ký...
                  </div>
                ) : (
                  "Đăng ký"
                )}
              </button>

              <p className="text-sm text-gray-400 text-center mt-3">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-orange-500 hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
