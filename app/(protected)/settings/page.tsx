'use client';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="rounded-xl bg-white p-10">
      <Button onClick={onClick} type="submit">
        Sign Out
      </Button>
    </div>
  );
};

export default SettingsPage;
