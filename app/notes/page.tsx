// app/notes/page.tsx

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const search = typeof params.search === 'string' ? params.search : '';
  const page = typeof params.page === 'string' ? Number(params.page) : 1;

  const data = await fetchNotes(search, page);

  return (
    <NotesClient
      initialData={data}
      initialSearchQuery={search}
      initialPage={page}
    />
  );
}
