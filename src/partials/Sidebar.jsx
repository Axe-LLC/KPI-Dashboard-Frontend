import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ordersImg from '../images/sidebar/orders.png';
import metricsImg from '../images/sidebar/metrics.png';
import teamImg from '../images/sidebar/team.png';
import logoImg from '../images/sidebar/caresuite_logo.svg';
import logoMobileImg from '../images/sidebar/responsive_icon.svg';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1023) {
        setIsMobile(false);
      }
      else {
        setIsMobile(true);
      }
      if (window.innerWidth > 1535) {
        setIsTablet(false);
      }
      else {
        setIsTablet(true);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-56 lg:w-20 lg:sidebar-expanded:!w-56 2xl:!w-56 shrink-0 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400 mt-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src={isMobile ? logoImg : (sidebarExpanded || !isTablet ? logoImg : logoMobileImg)} alt="" className='logo-img'/>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <li className={`px-3 py-2 rounded-md mb-2 last:mb-0 ${pathname === '/' && 'nav-selected-item'}`}>
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname === '/' ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={metricsImg} alt="" className='nav-icon' />
                    <span className={`text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === '/' && 'nav-selected-item-text'}`}>Office Metrics</span>
                  </div>
                </NavLink>
              </li>
              {/* Supply */}
              <li className={`px-3 py-2 rounded-md mb-2 last:mb-0 ${pathname.includes('supply') && 'nav-selected-item'}`}>
                <NavLink
                  end
                  to="/dashboard/supply"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('supply') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={ordersImg} alt="" className="nav-icon" />
                    <span className={`text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes('supply') && 'nav-selected-item-text'}`}>
                      Supply Spend
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Staff Analytics */}
              <li className={`px-3 py-2 rounded-md mb-2 last:mb-0 ${pathname.includes('staff') && 'nav-selected-item'}`}>
                <NavLink
                  end
                  to="/dashboard/staff"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('staff') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <img src={teamImg} alt="" className='nav-icon' />
                    <span className={`text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.includes('staff') && 'nav-selected-item-text'}`}>
                      Staff Count
                    </span>
                  </div>
                </NavLink>
              </li>
              {(isMobile || (sidebarExpanded || !isTablet)) && <li className={`px-3 py-2 rounded-md mb-2 sidebar-footer`}>
                <p className='text-sm text-white font-medium'>KPI Dashboard</p>
                <p className='text-sm text-white font-medium mb-2'>Built by Caresuite</p>
              </li>}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;