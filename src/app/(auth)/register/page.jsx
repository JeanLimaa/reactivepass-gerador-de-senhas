"use client";
import AuthButton from "@/components/Buttons/AuthButton";
import Input from "@/components/Inputs/FormInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ToastSucess from "@/components/Toast/ToastSucess";
import AuthPageLayout from "@/components/AuthPage/AuthPageLayout";

export default function Register() {
  const [error, setError] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const [openToast, setOpenToast] = useState(false)
  const [showPass, setShowPass] = useState(false);

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
    password: Yup.string()
    .required("O campo senha é obrigatório")
    .min(8, "A senha deve conter pelo menos 8 caracteres.")
    .matches(
      /^(?=.*[A-Z])/,
      "A senha deve conter ao menos uma letra maiúscula."
    )
    .matches(
      /(?=.*[a-z])/,
      "A senha deve conter ao menos uma letra minúscula."
    )
    .matches(
      /(?=.*\d)/,
      "A senha deve conter ao menos um número."
    )
    .matches(
      /(?=.*[@$!%*?&#+.])/,
      "A senha deve conter ao menos um símbolo."
    ),
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
    <AuthPageLayout>
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
            <Input label="Nome" name="name" required />
            <Input name="email" type="email" required />
            <div className="flex items-center relative">
              <Input label="Senha" name="password" type={!showPass ? "password" : "text"} required autoComplete="off" />
              <div className="absolute p-4 right-0">
                <img src={showPass ? "./show-black.svg" : "./hide-black.svg" } title="Visualizar senha" alt="Visualizar senha" className="w-7 cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              </div>
            </div>
            {!values.name && !values.email && !values.password && error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}
            <AuthButton text="Registrar-se" isFormSubmitting={isFormSubmitting} />
          </Form>
        )}
      </Formik>
      {openToast && <ToastSucess text='Registrado com sucesso!' isToastOpen={openToast} />}
    </AuthPageLayout>
  );
}
