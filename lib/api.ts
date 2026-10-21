// app/api.ts

import axios from 'axios';
import type { Note, Notes, DataTag, CreateNotePayload } from '@/types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes( page: number, tag?: DataTag, onQuery?: string ) {
   const response = await axios.get<Notes>( `${baseURL}/notes`, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
      params: {
      page,
      ...(onQuery && { search: onQuery }),
      ...(tag && { tag }),
      perPage: 12
      },
   });
   return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
   const response = await axios.post<Note>(`${baseURL}/notes`, payload, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });

   return response.data;
}

export async function deleteNote(id: string) {
   const response = await axios.delete<Note>(`${baseURL}/notes/${id}`, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
   return response.data;
}

export async function fetchNoteId(id: string) {
   const response = await axios.get<Note>(`${baseURL}/notes/${id}`, {
      headers: {
         Authorization: `Bearer ${API_KEY}`,
      },
   });
   return response.data;
}

export const getCategories = () => {
  return ["Todo", "Work", "Personal", "Meeting", "Shopping"];
}