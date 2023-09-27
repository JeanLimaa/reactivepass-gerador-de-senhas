"use client";
import AuthButton from "@/components/Buttons/AuthButton";
import Input from "@/components/Inputs/FormInput";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ToastSucess from "@/components/Toast/ToastSucess";

export default function Register() {
  const [error, setError] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const [openToast, setOpenToast] = useState(false)
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status !== "unauthenticated") {
    return null;
  }

  const initialValues = {
    name: "",
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
      await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      }).then(async (res) => {
        const result = await res.json();

        if (result.status === 201) {
          setOpenToast(true);
          setTimeout(() => {
            setOpenToast(false);
            router.push("/login");
          }, 1.5 * 1000)
        } else {
          renderError(result.message);
          resetForm();
        }
        setFormSubmitting(false);
      });
    } catch {
      setFormSubmitting(false);
      renderError("Erro ao criar conta, tente mais tarde!");
    }
  }

  function renderError(msg) {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            noValidate
            className="flex flex-col gap-2 p-4 border rounded border-zinc-300 min-w-[300px] bg-white"
          >
            <Input label="Nome" name="name" required />
            <Input name="email" type="email" required />
            <Input label="Senha" name="password" type="password" required autoComplete="off" />

            {!values.name && !values.email && !values.password && error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}
            <AuthButton text="Registrar-se" isFormSubmitting={isFormSubmitting}/>
            <span className="text-xs text-zinc-500">
              Já possui uma conta?
              <strong className="text-zinc-700">
                <Link href="/login"> Entre</Link>
              </strong>
            </span>
          </Form>
        )}
      </Formik>
      {openToast && <ToastSucess text='Registrado com sucesso!' isToastOpen={openToast} />}
    </main>
  );
}
