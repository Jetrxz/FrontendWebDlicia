import { INavbarData } from "./helper";

export const navbarData: INavbarData[]  = [
    // {
    //     routeLink: 'dashboard',
    //     icon: 'fa-solid fa-house',
    //     label: 'Dashboard'
    // },
    {
        routeLink: 'products',
        icon: 'fa-solid fa-box-open',
        label: 'Productos',
        items: [
            {
                routeLink: 'products/level1.1',
                label: 'Mantenimiento de Productos',
            },
            {
                routeLink: 'products/level1.2',
                label: 'Mantenimiento de Categorias'
            }
        ]
    },
    {
        routeLink: 'statistics',
        icon: 'fa-solid fa-truck-field',
        label: 'Insumos',
        items: [
            {
                routeLink: 'products/mantenimiento-insumos',
                label: 'Mantenimiento de Insumos',
            },
            {
                routeLink: 'products/mantenimiento-insumos',
                label: 'Listado de Insumos',
            },
        ]
    },
    {
        routeLink: 'coupens',
        icon: 'fa-solid fa-tags',
        label: 'Ventas',
        items: [
            {
                routeLink: 'coupens/list',
                label: 'Reporte de Ventas'
            },
            {
                routeLink: 'coupens/create',
                label: 'Reporte de Clientes'
            },
            {
                routeLink: 'coupens/create',
                label: 'Reporte de Pedidos'
            }
        ]
    },
    {
        routeLink: 'pages',
        icon: 'fa-solid fa-user',
        label: 'Empleados',
        items: [
            {
                routeLink: 'coupens/list',
                label: 'Asignar Empleados'
            }
        ]
    }
];