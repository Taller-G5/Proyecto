import NotFound from "@/pages/NotFound.vue"
import Deny from "@/pages/Deny.vue"
import ServerError from "@/pages/Error.vue"
import Login from "@/pages/Login.vue"
import Dashboard from "@/pages/Dashboard.vue"
import ComprasAdministrar from "@/components/Compras_administrar.vue"
import ComprasRegistro from "@/components/Compras_registro.vue"
import VentasRegistro from "@/components/Ventas_registrar.vue"
import VentasDia from "@/components/Ventas_dia.vue"
import VentasMes from "@/components/Ventas_mes.vue"
import VentasFecha from "@/components/Ventas_fecha.vue"
import ProductoRegistrar from "@/components/Producto_registrar.vue"
import ProductoAdministrar from "@/components/Producto_administrar.vue"
import UsuarioAdministrar from "@/components/Usuarios_administrar.vue"
import UsuarioRegistrar from "@/components/Usuarios_registrar.vue"
import UsuarioPerfil from "@/components/Usuario_perfil.vue"
import VentasHistorial from "@/components/Ventas_historial.vue"
export default [

  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component:NotFound
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: Deny
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: ServerError
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    meta: {
      public: true,
    },
    name: 'root',
    component: Login
  },
  {
    path: '/dashboard',
    meta: { 
      requiresAuth: true,
      is_admin: true
    },
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/compras/administrar',
    meta: {
      breadcrumb: true
    },
    name: 'components/Compras_administrar',
    component: ComprasAdministrar
  },
  {
    path: '/compras/registro',
    meta: {
      breadcrumb: true
    },
    name: 'components/Compras_registro',
    component: ComprasRegistro
  },
  {
    path: '/ventas/registrar',
    meta: {
      breadcrumb: true
    },
    name: 'Venta_nueva',
    component: VentasRegistro
  },
  {
    path:'/ventas/historial',
    meta:{
      breadcrumb:true
    },
    name:'Venta_Historial',
    component:VentasHistorial
  },
  {
    path: '/ventas/dia',
    meta: {
      breadcrumb: true
    },
    name: 'components/Ventas_dia',
    component: VentasDia
  },
  {
    path: '/ventas/mes',
    meta: {
      breadcrumb: true
    },
    name: 'components/Ventas_mes',
    component: VentasMes
  },
  {
    path: '/ventas/fecha',
    meta: {
      breadcrumb: true
    },
    name: 'components/Ventas_fecha',
    component: VentasFecha
  },
  {
    path: '/productos/administrar',
    meta: {
      breadcrumb: true
    },
    name: 'components/Producto_administrar',
    component: ProductoAdministrar
  },
  {
    path: '/productos/registrar',
    meta: {
      breadcrumb: true
    },
    name: 'components/Producto_registrar',
    component: ProductoRegistrar
  },
  {
    path: '/usuarios/administrar',
    meta: {
      breadcrumb: true
    },
    name: 'components/Usuario_administrar',
    component: UsuarioAdministrar
  },
  {
    path: '/usuarios/registrar',
    meta: {
      breadcrumb: true
    },
    name: 'components/Usuario_registrar',
    component: UsuarioRegistrar
  },
  {
    path:'/usuarios/perfil',
    meta:{
      breadcrumb:true
    },
    name:'perfil',
    component: UsuarioPerfil
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true },
    name: 'Dashboard',
    component:Dashboard 
  }];
