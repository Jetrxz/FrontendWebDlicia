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
                routeLink: 'products/products-maintenance',
                label: 'Mantenimiento de Productos',
            },
            {
                routeLink: 'products/categories-maintenance',
                label: 'Mantenimiento de Categorias'
            }
        ]
    },
    {
        routeLink: 'supplies',
        icon: 'fa-solid fa-truck-field',
        label: 'Insumos',
        items: [
            {
                routeLink: 'supplies/supplies-maintenance',
                label: 'Mantenimiento de Insumos',
            },
            {
                routeLink: 'supplies/supplies-list',
                label: 'Listado de Insumos',
            },
        ]
    },
    {
        routeLink: 'sales',
        icon: 'fa-solid fa-tags',
        label: 'Ventas',
        items: [
            {
                routeLink: 'sales/sale-report',
                label: 'Reporte de Ventas'
            },
            {
                routeLink: 'sales/clients-report',
                label: 'Reporte de Clientes'
            },
            {
                routeLink: 'sales/orders-report',
                label: 'Reporte de Pedidos'
            }
        ]
    },
    {
        routeLink: 'employees',
        icon: 'fa-solid fa-user',
        label: 'Empleados',
        items: [
            {
                routeLink: 'employees/employees-assign',
                label: 'Asignar Empleados'
            }
        ]
    }
];