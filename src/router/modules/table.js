/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const tableRouter = {
    path: '/table',
    component: Layout,
    redirect: '/table/CompanyListTable',
    name: 'Table',
    meta: {
        title: '系统管理',
        icon: 'table'
    },
    children: [
        // {
        //     path: 'dynamic-table',
        //     component: () => import('@/views/table/dynamicTable/index'),
        //     name: 'DynamicTable',
        //     meta: {title: 'dynamicTable'}
        // },
        // {
        //     path: 'drag-table',
        //     component: () => import('@/views/table/dragTable'),
        //     name: 'DragTable',
        //     meta: {title: 'dragTable'}
        // },
        // {
        //     path: 'inline-edit-table',
        //     component: () => import('@/views/table/inlineEditTable'),
        //     name: 'InlineEditTable',
        //     meta: {title: 'inlineEditTable'}
        // },
        // {
        //     path: 'tree-table',
        //     component: () => import('@/views/table/treeTable/treeTable'),
        //     name: 'TreeTableDemo',
        //     meta: {title: 'treeTable'}
        // },
        // {
        //     path: 'custom-tree-table',
        //     component: () => import('@/views/table/treeTable/customTreeTable'),
        //     name: 'CustomTreeTableDemo',
        //     meta: {title: 'customTreeTable'}
        // },
        // {
        //     path: 'complex-table',
        //     component: () => import('@/views/table/complexTable'),
        //     name: 'ComplexTable',
        //     meta: {title: 'complexTable'}
        // },
        {
            path: 'AppSys',
            component: () => import('@/views/table/AppSys'),
            name: 'CompanyListTable',
            meta: {title: '应用管理'}
        },
        // {
        //     path: 'CompanyListTable',
        //     component: () => import('@/views/table/CompanyListTable'),
        //     name: 'CompanyListTable',
        //     meta: {title: '客户管理'}
        // },
        // {
        //     path: 'log',
        //     component: () => import('@/views/table/OperationLog'),
        //     name: 'OperationLog',
        //     meta: {title: '操作记录'}
        // },
        //
        // {
        //     path: 'asset',
        //     component: () => import('@/views/table/AssetListTable'),
        //     name: 'AssetListTable',
        //     meta: {title: '资产管理'}
        // },
        // {
        //     path: 'notice',
        //     component: () => import('@/views/table/notice'),
        //     name: 'notice',
        //     meta: {title: '通知公告'}
        // }
        // {
        //     path: 'Statistics',
        //     component: () => import('@/views/table/Statistics'),
        //     name: 'Statistics',
        //     meta: {title: '统计报表'}
        // }
    ]
}

const statisticsRouter = {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/DepartmentStatistics',
    name: 'Statistics',
    meta: {
        title: '统计报表',
        icon: 'table'
    },
    children: [

        // {
        //     path: 'log',
        //     component: () => import('@/views/table/OperationLog'),
        //     name: 'OperationLog',
        //     meta: {title: '操作记录'}
        // },
        //
        // {
        //     path: 'asset',
        //     component: () => import('@/views/table/AssetListTable'),
        //     name: 'AssetListTable',
        //     meta: {title: '资产管理'}
        // },
        // {
        //     path: 'notice',
        //     component: () => import('@/views/table/notice'),
        //     name: 'notice',
        //     meta: {title: '通知公告'}
        // },
        //
        // {
        //     path: 'DepartmentStatistics',
        //     component: () => import('@/views/statistics/DepartmentStatistics'),
        //     name: 'DepartmentStatistics',
        //     meta: {title: '部门报表'}
        // },
        // {
        //     path: 'EmployeeStatistics',
        //     component: () => import('@/views/statistics/EmployeeStatistics'),
        //     name: 'EmployeeStatistics',
        //     meta: {title: '员工报表'}
        // }
        // ,
        // {
        //     path: 'AssetStatistics',
        //     component: () => import('@/views/statistics/AssetStatistics'),
        //     name: 'AssetStatistics',
        //     meta: {title: '资产报表'}
        // }
    ]
}
export {
    tableRouter,
    statisticsRouter
}
// export default tableRouter
// export default statisticsRouter
//
