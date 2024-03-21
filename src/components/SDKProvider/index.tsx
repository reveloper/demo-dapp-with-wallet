import { PropsWithChildren } from 'react';
import {
  DisplayGate,
  SDKProvider as BaseSDKProvider,
} from '@tma.js/sdk-react';

type SDKProviderErrorProps = {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps) {
  return (
    <div>
      Oops. Something went wrong.
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

function SDKProviderLoading() {
  return <div>SDK is loading.</div>;
}

function SDKInitialState() {
  return <div>Waiting for initialization to start.</div>;
}

/**
 * Root component of the whole project.
 */
export const SDKProvider = ({ children }: PropsWithChildren) => {
  return (
    <BaseSDKProvider options={{ async: true, complete: true }}>
      {/* @ts-ignore */}
      <DisplayGate
        error={SDKProviderError}
        loading={SDKProviderLoading}
        initial={SDKInitialState}
      >
        {children}
      </DisplayGate>
    </BaseSDKProvider>
  );
}
