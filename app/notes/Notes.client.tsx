'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';
import type { fetchNotesProps } from '@/types/note';

interface NotesClientProps {
  initialData: fetchNotesProps;
  initialSearchQuery: string;
  initialPage: number;
}

export default function NotesClient({
  initialData,
  initialSearchQuery,
  initialPage,
}: NotesClientProps) {
  const router = useRouter();

  const [inputValue, setInputValue] = useState(initialSearchQuery);
  const [page, setPage] = useState(initialPage);
  const [searchQuery] = useDebounce(inputValue, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Скидаємо сторінку при зміні пошуку
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Оновлюємо URL при зміні пошуку або сторінки
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery);
    if (page !== 1) params.set('page', page.toString());

    const url = `/notes?${params.toString()}`;
    router.replace(url, { scroll: false });
  }, [searchQuery, page, router]);

  // 🆕 Викликається після створення нової нотатки
  const handleNoteCreated = () => {
    closeModal();
    router.refresh(); // або router.replace(...) щоб ініціювати SSR
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={setInputValue} />

        {initialData.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={initialData.totalPages}
            onChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>

      {initialData.notes.length > 0 && <NoteList notes={initialData.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onCloseModal={closeModal}
            onNoteCreated={handleNoteCreated} // ✅ новий проп
          />
        </Modal>
      )}
    </div>
  );
}
