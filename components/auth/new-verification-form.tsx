'use client';

import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { NewVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!');
      return;
    }

    NewVerification(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login!"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        {!error && !success && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
