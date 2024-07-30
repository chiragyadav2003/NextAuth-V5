'use client';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
  const session = useSession();
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
