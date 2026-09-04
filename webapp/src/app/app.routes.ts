import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProductDetail } from './components/product-detail/product-detail';
import { ProductList } from './components/product-list/product-list';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { authGuard } from './core/auth-guard';
import { adminGuard } from './core/admin-guard';
import { CustomerProfile } from './components/customer-profile/customer-profile';
import { Wishlists } from './components/wishlists/wishlists';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';
import { CustomerOrders } from './components/customer-orders/customer-orders';
import { ContactUs } from './components/footer-extra/contact-us/contact-us';
import { Shipping } from './components/footer-extra/shipping/shipping';
import { Returns } from './components/footer-extra/returns/returns';
import { Faq } from './components/footer-extra/faq/faq';

export const routes: Routes = [
    {
        path:"",
        component:Home,
        canActivate:[authGuard],
    },
    {
        path:"admin/categories",
        loadComponent: () =>
            import('./components/manage/categories/categories').then((m) => m.Categories),
        canActivate:[adminGuard],
    },
    {
        path:"admin/categories/add",
        loadComponent: () =>
            import('./components/manage/category-form/category-form').then((m) => m.CategoryForm),
        canActivate:[adminGuard],
    },
    {
        path:"admin/categories/:id",
        loadComponent: () =>
            import('./components/manage/category-form/category-form').then((m) => m.CategoryForm),
        canActivate:[adminGuard],
    },
    {
        path:"admin/brands",
        loadComponent: () =>
            import('./components/manage/brands/brands').then((m) => m.Brands),
        canActivate:[adminGuard],
    },
    {
        path:"admin/brands/add",
        loadComponent: () =>
            import('./components/manage/brand-form/brand-form').then((m) => m.BrandForm),
        canActivate:[adminGuard],
    },
    {
        path:"admin/brands/:id",
        loadComponent: () =>
            import('./components/manage/brand-form/brand-form').then((m) => m.BrandForm),
        canActivate:[adminGuard],
    },
    {
        path:"admin/products",
        loadComponent: () =>
            import('./components/manage/products/products').then((m) => m.Products),
        canActivate:[adminGuard],
    },
    {
        path:"admin/products/add",
        loadComponent: () =>
            import('./components/manage/product-form/product-form').then((m) => m.ProductForm),
        canActivate:[adminGuard],
    },
    {
        path:"admin/products/:id",
        loadComponent: () =>
            import('./components/manage/product-form/product-form').then((m) => m.ProductForm),
        canActivate:[adminGuard],
    },
    {
        path:"products/:id",
        component:ProductDetail,
        canActivate:[authGuard],
    },
    {
        path:"products",
        component:ProductList,
        canActivate:[authGuard],
    },
    {
        path:"register",
        component:Register
    },
    {
        path:"login",
        component:Login,
    },
    {
        path:"admin",
        loadComponent: () =>
            import('./components/manage/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
        canActivate:[adminGuard],
    },
    {
        path:"profile",
        component:CustomerProfile,
        canActivate:[authGuard],
    },
    {
        path:"wishlists",
        component:Wishlists,
        canActivate:[authGuard],
    },
    {
        path:"cart",
        component:ShoppingCart,
        canActivate:[authGuard],
    },
    {
        path:"orders",
        component:CustomerOrders,
        canActivate:[authGuard],
    },
    {
        path:"admin/users",
        canActivate:[adminGuard],
        loadComponent: () =>
            import('./components/manage/users/users').then((m) => m.Users),
    },
    {
        path:"admin/orders",
        loadComponent: () =>
            import('./components/manage/orders/orders').then((m) => m.Orders),
        canActivate:[adminGuard],
    },
    { path: 'contact-us', component: ContactUs },
    { path: 'shipping', component: Shipping },
    { path: 'returns', component: Returns },
    { path: 'faq', component: Faq },

    /* Without a catch-all, an unknown URL throws NG04002 and leaves a blank app */
    { path: '**', redirectTo: '' },
];
