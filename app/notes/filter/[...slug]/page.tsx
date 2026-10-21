// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import type { DataTag } from '@/types/note';
import type { Props } from '@/types/note';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag: DataTag | undefined =
    slug[0] === 'all' ? undefined : (slug[0] as DataTag);
  
  const queryClient = new QueryClient();
  await queryClient.query({
    queryKey: ['notes', tag, 1],
    queryFn: () => fetchNotes(1, tag)
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;