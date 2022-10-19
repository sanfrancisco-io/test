import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const dashBoardNavTree = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'sidenav.dashboard',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        title: 'sidenav.dashboard',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'catalog',
        path: `${APP_PREFIX_PATH}/catalog`,
        title: 'Catalog',
        icon: ShoppingCartOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'catalog-products',
            path: `${APP_PREFIX_PATH}/catalog/products`,
            title: 'products',
            icon: '',
            breadcrumb: true,
            submenu: [],
          },
          {
            key: 'catalog-categories',
            path: `${APP_PREFIX_PATH}/catalog/categories`,
            title: 'categories',
            icon: '',
            breadcrumb: false,
            submenu: [],
          },
          {
            key: 'catalog-сollections',
            path: `${APP_PREFIX_PATH}/catalog/сollections`,
            title: 'сollections',
            icon: '',
            breadcrumb: false,
            submenu: [],
          },
          {
            key: 'catalog-combo',
            path: `${APP_PREFIX_PATH}/catalog/combo`,
            title: 'combo',
            icon: '',
            breadcrumb: false,
            submenu: [],
          },
          {
            key: 'catalog-orders',
            path: `${APP_PREFIX_PATH}/catalog/orders`,
            title: 'orders',
            icon: ShoppingOutlined,
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: 'clients',
        path: `${APP_PREFIX_PATH}/clients`,
        title: 'Clients',
        icon: UserOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'clients-list',
            path: `${APP_PREFIX_PATH}/clients/list`,
            title: 'list of clients',
            icon: '',
            breadcrumb: true,
            submenu: [],
          },
          {
            key: 'clients-group',
            path: `${APP_PREFIX_PATH}/clients/group`,
            title: 'customer groups',
            icon: '',
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const schedulerNavTree = [
  {
    key: 'scheduler',
    path: `${APP_PREFIX_PATH}/schedule`,
    title: 'Scheduler',
    icon: CarryOutOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const navigationConfig = [...dashBoardNavTree, ...schedulerNavTree];

export default navigationConfig;
