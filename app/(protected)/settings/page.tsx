'use client';

import { useTransition } from 'react';

import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      settings({ name: 'new name2' });
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
