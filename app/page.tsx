import Image from "next/image";
import { AtSign,ArrowUpRight,LockKeyhole,LockKeyholeOpen } from "lucide-react";
import { LimeButton } from "./components/ui/LimeButton";
import { Input } from "./components/ui/Input";
export default function Home() {
  return (
    <main className="w-full h-screen flex">
      <section className="flex-1 h-full flex items-center justify-center">
        <div className="max-w-[350px] w-full">
          <h1 className="text-4xl font-black -translate-y-30 text-center">GYM<span className="text-lime-400 italic">LAB</span></h1>
          <h2 className="text-3xl font-semibold">Bienvenido</h2>
          <small className="text-neutral-500">Inicia sesión para configurar tu centro</small>
          <form action="" className="flex flex-col mt-5">

            <label htmlFor="email" className="mb-1 ps-1">Email</label>
            <Input type="email" name="pruebas" id="pruebas" placeholder="example@example.com" className="mb-5">
              <Input.Icon><AtSign size={20}/></Input.Icon>
            </Input>

            <label htmlFor="password" className="mb-1 ps-1">Password</label>
            <Input type="password" name="password" id="password" className="mb-5">
              <Input.Icon className="cursor-pointer"><LockKeyhole size={20}/></Input.Icon>
            </Input>

            <LimeButton className="font-semibold">
              <LimeButton.Text>Login</LimeButton.Text>
              <LimeButton.Icon><ArrowUpRight size={20}/></LimeButton.Icon>
            </LimeButton>
            
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
