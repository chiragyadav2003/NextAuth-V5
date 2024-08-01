import { Navbar } from '@/app/(protected)/_components/navbar';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="absolute top-20 mx-auto w-full max-w-7xl">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default ProtectedLayout;
