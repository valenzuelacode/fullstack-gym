'use client'
import { loginAction } from "@/app/actions/auth";
import { AtSign,ArrowUpRight,LockKeyhole,LockKeyholeOpen } from "lucide-react";
import { LimeButton } from "@/components/ui/buttons/LimeButton";
import { TextInput } from "@/components/ui/form/TextInput";
import {PasswordInput} from "@/components/ui/form/PasswordInput";
import { useActionState, useState } from "react";

export default function Login() {

  const [formState,formAction,pending] = useActionState(loginAction,undefined)
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="w-full h-screen flex">
      <section className="flex-1 h-full flex items-center justify-center">
        <div className="max-w-[350px] w-full">
          <h1 className="text-5xl font-black -translate-y-30 text-center">GYM<span className="text-lime-400 italic">LAB</span></h1>
          <h2 className="text-3xl font-semibold">Bienvenido</h2>
          <small className="text-neutral-500">Inicia sesión para configurar tu centro</small>
          <form action={formAction} className="flex flex-col mt-5">
            <div className="mb-5">
              <label htmlFor="email" className="mb-1">Email</label>
              <TextInput type="email" name="email" id="email" placeholder="example@example.com">
                <TextInput.Icon><AtSign size={20}/></TextInput.Icon>
              </TextInput>
              {formState?.errors?.email && <p className="text-red-500 text-sm">{formState.errors.email[0]}</p> }
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="mb-1">Password</label>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
              >
                <PasswordInput.Icon className="cursor-pointer" onClick={handlePasswordVisibility}>
                  {showPassword ? <LockKeyholeOpen size={20}/> : <LockKeyhole size={20}/>}
                </PasswordInput.Icon>
              </PasswordInput>
              {formState?.errors?.password && <p className="text-red-500 text-sm">{formState.errors.password[0]}</p> }
            </div>

            <LimeButton className="font-semibold cursor-pointer" type="submit" disabled={pending}>
              <LimeButton.Text>{pending ? "Cargando..." : "Login"}</LimeButton.Text>
              <LimeButton.Icon><ArrowUpRight size={20}/></LimeButton.Icon>
            </LimeButton>

            {
              formState?.message && <p className="text-lime-400">{formState.message}</p>
            }
          </form>
        </div>
      </section>
      <section className="flex-1 h-full px-5 py-5">
        <div className="w-full h-full bg-lime-400 flex flex-col items-center justify-center rounded-2xl shadow py-5 px-5">
          <h2 className="text-black font-semibold text-4xl">Gestiona tu parque Fitness</h2>
        </div>
      </section>
    </main>
  )
}
