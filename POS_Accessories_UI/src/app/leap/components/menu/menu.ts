import { Menu } from './menu.model'; 

export const menuItems = [ 
    new Menu (10, 'LEAP_NAV.DASHBOARD', '/', null, 'dashboard', null, false, 0),
    new Menu (20, 'LEAP_NAV.CATEGORIES', '/category', null, 'category', null, false, 0),  
    new Menu (30, 'LEAP_NAV.THEME', '/admin', null, 'admin', null, false, 0),  
]