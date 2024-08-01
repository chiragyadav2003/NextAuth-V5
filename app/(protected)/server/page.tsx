import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/lib/auth';

const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <UserInfo user={user} label="🖥️ Server Component" />
    </div>
  );
};

export default ServerPage;
