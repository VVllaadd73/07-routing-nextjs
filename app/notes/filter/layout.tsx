// app/notes/filter/layout.tsx

import css from './layout.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const SidebarNotes = ({ children, sidebar }: Props) => {
  return (
    <section className={css.notesLayout}>
      <aside className={css.notesSidebar}>
        {sidebar}
      </aside>
      <div className={css.notesContent}>
        {children}
      </div>
    </section>
  );
};

export default SidebarNotes;