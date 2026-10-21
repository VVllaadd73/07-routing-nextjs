// src/NoteList/NoteList.tsx

import Link from 'next/link';
import css from './NoteList.module.css';
import type { NoteListProps } from '@/types/note';

export default function NoteList({ notes, onDelete }: NoteListProps) {

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <div className={css.actions}>

              <Link
                href={`/notes/${note.id}`}
                className={css.viewButton} >
                View details
              </Link>

              <button
                className={css.deleteButton}
                onClick={() => onDelete(note.id)} >
                Delete
              </button>

            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}