import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-full max-w-[82rem] px-4 sm:px-6 lg:px-8">{children}</div>;
}
