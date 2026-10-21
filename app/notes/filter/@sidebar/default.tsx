// app/notes/filter/@sidebar/default.tsx

import Link from 'next/link';
import { getCategories } from '@/lib/api';

const SidebarNotes = () => {
  const categories = getCategories();

  return (
    <ul>
      <li>
        <Link href={`/notes/filter/all`}>All notes</Link>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <Link href={`/notes/filter/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;