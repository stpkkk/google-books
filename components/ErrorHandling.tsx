import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

type ErroHandlingProps = {
  error?: FetchBaseQueryError | SerializedError;
};

export const ErrorHandling: React.FC = ({ error }: ErroHandlingProps) => {
  if (error) {
    if ('status' in error) {
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);

      return (
        <div className="text-center my-16 text-lg font-bold">
          <div>An error has occurred 💥💥💥</div>
          <div>{JSON.parse(errMsg).error.message}</div>
          <div>Code: {JSON.parse(errMsg).error.code}</div>
        </div>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }
};
