// app/@modal/(.)notes/[id]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { fetchNoteId } from '@/lib/api';
import { useQuery } from "@tanstack/react-query";
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import type { NoteIdProps } from '@/types/note';

const NotePreview = ({ id }: NoteIdProps) => {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteId(id)
  });

  const handleCloseModal = () => {
    router.back();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching note.</div>;
  }

  return (
    <Modal onClose={handleCloseModal}>
      {note &&
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>note title: {note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>Note content: {note.content}</p>
            <p className={css.date}>Created date: {note.createdAt}</p>
            <button className={css.backBtn} onClick={handleCloseModal}>
              Back
            </button>
          </div>
        </div>}
    </Modal>
  );
};

export default NotePreview;
