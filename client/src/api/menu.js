const Menu =  [
  { header: 'Principal' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
  },  
  { header: 'Gestion de Compras' },
  {
    title: 'Compras',
    icon: 'shopping_cart',
    items: [
      { name: 'Registro', title: 'Registro de Compras', component: 'components/Compras_registro' },
      { name: 'Administrar', title: 'Administrar Compras', component: 'components/Compras_administrar' },
    ]
  },
  { header: 'Gestion de Ventas' },
  {
    title: 'Registrar Venta',
    icon: 'note_add',
    name: 'Venta_nueva',
  },
  {
    title: 'Reporte de Ventas',
    icon: 'assignment',
    items: [
      { name: 'Fecha', title: 'Ventas por fecha', component: 'components/Ventas_fecha' },
      { name: 'Mes', title: 'Ventas mensuales', badge: 'new', component: 'components/Ventas_mes' },
      { name: 'Dia', title: 'Ventas diarias', component: 'components/Ventas_dia' }
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
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
