import { Navbar } from '@/app/(protected)/_components/navbar';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="mx-auto mt-10 w-full">
        <Navbar />
      </div>
      <div className="mb-10 mt-10 w-[60%] flex-grow items-center justify-center">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
