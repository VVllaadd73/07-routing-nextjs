// app/notes/Notes.client.tsx

'use client';

import SearchBox from '@/components/SearchBox/SearchBox';
import Paginate from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import { deleteNote } from '@/lib/api';

import { fetchNotes } from '@/lib/api';

import type { TagProps } from '@/types/note';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData, useMutation, useQueryClient } from '@tanstack/react-query';

import type { Notes } from '@/types/note';

import css from './NotesPage.module.css';

export default function NotesClient({ tag }: TagProps) {
  const [onQuery, setOnQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const { data, isSuccess, isLoading, isError } = useQuery<Notes>({
    queryKey: ['notes', tag, onQuery, page ],
    queryFn: () => fetchNotes(page, tag, onQuery),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  const notes = Array.isArray(data?.notes) ? data!.notes : [];
  const totalPages = data?.totalPages ?? 0;

  const onFound = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOnQuery(e.target.value);
      setPage(1);
    },
    250
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={onFound} />

        {totalPages > 1 && (
          <Paginate
            totalPages={totalPages}
            currentPage={page}
            setPage={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <div className={css.statusBox}>Loading notes...</div>}

      {isError && (
        <div className={css.statusBoxError}>
          Помилка при завантаженні! Try again
        </div>
      )}

      {deleteMutation.isError && (
        <div className={css.statusBoxError} role="alert">
          Could not delete this note. It may no longer exist; please refresh and try again.
        </div>
      )}

      {isSuccess && notes.length > 0 && <NoteList notes={notes} onDelete={deleteMutation.mutate} />}

      {isSuccess && notes.length === 0 && (
        <div className={css.statusBox}>
          No notes yet. Create your first note ✨
        </div>
      )}

      {modalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
