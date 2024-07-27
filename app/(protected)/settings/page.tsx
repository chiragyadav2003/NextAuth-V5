import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <pre className="p-4">{JSON.stringify(session, null, 2)}</pre>
      <form action={logout}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
