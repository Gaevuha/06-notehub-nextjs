'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';
import Loader from '@/app/loading';
import Error from './error';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    // refetchOnMount: false,
  });
  if (isLoading || isFetching) return <Loader />;
  if (isError || !note) return <Error error={error} />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
};
export default NoteDetailsClient;
