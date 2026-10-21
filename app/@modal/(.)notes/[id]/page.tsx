// app/@modal/(.)notes/[id]/page.tsx

import { fetchNoteId } from '@/lib/api';
import NotePreview from './NotePreviewClient';
import type { NotePreviewProps } from '@/types/note';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

const NotePreviewPage = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.query({
    queryKey: ['note', id],
    queryFn: () => fetchNoteId(id)
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview id={id} />
    </HydrationBoundary>
  )
};

export default NotePreviewPage;