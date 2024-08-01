import { currentUser } from '@/lib/currentUser-auth';
const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ServerPage;
