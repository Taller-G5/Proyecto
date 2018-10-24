const Menu =  [
  { header: 'Principal' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
  },  
  { header: 'Gestion de Ventas' },
  {
    title: 'Historial de Ventas',
    icon: 'book',
    name: 'Venta_Historial',
  },
  {
    title: 'Registrar Venta',
    icon: 'note_add',
    name: 'Venta_nueva',
  },
  {
    title: 'Reporte de Ventas',
    icon: 'assignment',
    items: [
      { name: 'Dia', title: 'Ventas Diarias', component: 'components/Ventas_dia' },
      { name: 'Mes', title: 'Ventas Mensuales', badge: 'new', component: 'components/Ventas_mes' },
      { name: 'Año', title: 'Ventas Anuales', component: 'components/Ventas_fecha' }
      
    ]
  },
  { header: 'Gestion de Productos' },
  {
    title: 'Productos',
    icon: 'store',
    items: [
      { name: 'Registrar', title: 'Registrar Producto', component: 'components/Producto_registrar' },
      { name: 'Administrar', title: 'Administrar Productos', badge: 'new', component: 'components/Producto_administrar' }
    ]
  },
  { header: 'Gestion de Usuarios' },
  {
    title: 'Usuarios',
    icon: 'contacts',
    items: [
      { name: 'Registrar', title: 'Registrar Usuario', component: 'components/Usuario_registrar' },
      { name: 'Administrar', title: 'Administrar Usuario', badge: 'new', component: 'components/Usuario_administrar' }
    ]
  },
  { divider: true }
];
// reorder menu
/*Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});*/

export default Menu;
