import LoginComponent from "@/components/Auth/Login/LoginComponent";
import AuthLayout from "@/components/Auth/AuthLayout/AuthLayout";

export const metadata = {
  title: "Login - ReactivePass"
};  


export default function Login() {
  return (
    <AuthLayout typeOfForm="login">
      <LoginComponent />
    </AuthLayout>
  );
}
