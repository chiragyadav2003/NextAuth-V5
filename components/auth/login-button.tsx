"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "model" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild
}: LoginButtonProps) => {

  const router = useRouter();

  const onClick = () => {
    console.log("CLicked Login Button")
    router.push("/auth/login")
  }

  if (mode === 'model') {
    return (
      <span>
        TODO: implement model
      </span>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}