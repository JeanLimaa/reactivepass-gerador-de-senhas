'use client'
import Input from "@/components/Inputs/FormInput";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "@/components/Buttons/AuthButton";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { status } = useSession();
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status !== "unauthenticated") {
    return null;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O campo e-mail é obrigatório"),
    password: Yup.string().required("O campo senha é obrigatório"),
  });

  async function handleSubmit(values, { resetForm }) {
    setFormSubmitting(true);
    try {
      signIn("Credentials", { ...values, redirect: false }).then(
        ({ error }) => {
          if (!error) {
            router.push("/");
          } else {
            setError(error.replace("Error: ", ""));
            setTimeout(() => {
              setError("");
            }, 3000);
            resetForm();
          }
          setFormSubmitting(false);
        }
      );
    } catch {
      setFormSubmitting(false);
      rederError("Erro ao criar conta, tente mais tarde!");
    }
  }
  return (
    <main className="min-h-[75vh] flex items-center justify-evenly bg-gray-100 p-8 max-md:justify-center max-sm:p-0 max-md:flex-col-reverse">
      <div className="bg-gray-50 rounded-lg">
        <div className="p-3">
          <h2 className="text-3xl font-medium">Login</h2>
          <span className="text-sm text-zinc-500 text-center">
            Novo aqui?
            <Link href="/register" className="text-blue-600 text-md"> Cadastre-se</Link>
          </span>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form
              noValidate
              className="p-3 flex flex-col gap-3 min-w-[400px] max-md:min-w-[100vw]"
            >
              <Input label="Email" name="email" type="email" required />
              <Input label="Senha" name="password" type="password" required autoComplete="off" />
              <Link href="" className="text-center border-b-2 pb-2 mt-1">
                <span className="text-blue-600 text-md">Esqueceu a senha?</span>
              </Link>
              <AuthButton text="Entrar" isFormSubmitting={isFormSubmitting} />
              {!values.email && !values.password && error && (
                <span className="text-red-500 text-sm text-center">{error}</span>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <aside className="text-center">
        <div className="flex items-center ">
          <h1 className="text-6xl max-xl:text-5xl">ReactivePass</h1>
          <img src="/lock.svg" alt="cadeado logo" className="w-14" />
        </div>
        <h4 className="text-lg max-xl:text-md border-b-2 pb-4">Seja bem vindo! faça seu login.</h4>
      </aside>
    </main>
  );
}
