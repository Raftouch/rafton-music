interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className='flex flex-col gap-5 items-center justify-center'>{children}</div>;
}
