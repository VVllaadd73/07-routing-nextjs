// types/note.ts

export type DataTag =
  "Todo" |
  "Work" |
  "Personal" |
  "Meeting" |
  "Shopping";

export interface Note {
   id: string;
   title: string;
   content: string;
   tag: string;
   createdAt: string;
   updatedAt: string;
}

export interface Notes {
   notes: Note[];
   totalPages: number;
}

export interface CreateNotePayload {
   title: string;
   content: string;
   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export type TagProps = {
  tag?: DataTag;
};

export type Props = {
  params: Promise<{ slug: string[] }>;
};

export type NoteIdProps = {
  id: string;
};

export type NotePreviewProps = {
  params: Promise<NoteIdProps>;
};

export type NoteListProps = {
  notes: Note[],
  onDelete: (id: string) => void
}