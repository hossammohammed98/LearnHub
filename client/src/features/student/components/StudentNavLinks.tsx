'use client'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ulData = [
  { href: '/', name: 'الرئيسية' },
  { href: '/BrowserCourses', name: 'تصفح المسارات' },
];

function StudentNavLinks() {
  const pathname = usePathname(); 

  const ulLinks = ulData.map((e) => {
    const isActive = pathname === e.href;
    
    return (
      <Link 
        href={e.href} 
        key={e.name} 
        className={`relative pb-2 font-medium cursor-pointer sm:text-base text-sm transition-colors duration-300 block
          after:content-[''] after:absolute after:bottom-0 after:h-0.5 after:bg-emerald-500
          after:right-0 after:transition-all after:duration-300 after:ease-in-out after:pointer-events-none
          ${isActive 
            ? 'text-emerald-500 after:w-full' 
            : 'text-gray-500 hover:text-emerald-600 after:w-0 hover:after:w-full'
          }
        `}
      >
        <li>{e.name}</li>
      </Link>
    );
  });

  return (
    <nav className="hidden sm:block w-full max-w-md sm:max-w-xl">
      <ul className="flex flex-row items-center gap-6 list-none w-full ">
        {ulLinks}
      </ul>
    </nav>
  );
}

export default StudentNavLinks;