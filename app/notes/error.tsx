'use client';

type Props = {
  error: unknown;
};

function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export default function Error({ error }: Props) {
  console.error('Error object:', error);
  const errorMessage = isError(error) ? error.message : 'Unknown error';

  return (
    <div>
      <p>Could not fetch the list of notes. {errorMessage}</p>
    </div>
  );
}
