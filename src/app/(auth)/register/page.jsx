import AuthLayout from "@/components/Auth/AuthLayout/AuthLayout";
import RegisterComponent from "@/components/Auth/Register/RegisterComponent";

 export const metadata = {
  title: "Cadastro - ReactivePass"
};  

export default function Register() {

  return (
    <AuthLayout>
      <RegisterComponent />
    </AuthLayout>
  );
}
