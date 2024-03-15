import { useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { links } from '../composables/data';

interface SidebarProps {
  sidebarOpen: boolean;
  onSidebarClose: () => void;
  scrollToView: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

function Sidebar({ sidebarOpen, onSidebarClose, scrollToView }: SidebarProps) {
  const sidebar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSidebar = () => {
      const minWidth = 950;
      if (window.innerWidth < minWidth) return;
      if (window.innerWidth >= minWidth) {
        if (!sidebar.current || !sidebar.current.classList.contains('show')) return;
        sidebar.current.classList.remove('show');
        onSidebarClose();
      }
    };

    window.addEventListener('resize', checkSidebar);
    return () => {
      window.removeEventListener('resize', checkSidebar);
    };
  }, [onSidebarClose]);

  const clickSidebarLink = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    if (!sidebar.current) return;
    sidebar.current.classList.remove('show');
    onSidebarClose();
    scrollToView(e, link);
  };

  return (
    <div ref={sidebar} className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
      <div className='sidebar-center'>
        <button type="button" className='sidebar-close-btn' onClick={onSidebarClose} title="Close Sidebar">
          <FaXmark fontSize={32} />
        </button>

        <ul className='sidebar-links'>
          {links.map((link, id) => (
            <li key={id}>
              <a className={`sidebar-link`} href={`#${link.href}`} onClick={(e) => clickSidebarLink(e, link.href)}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
