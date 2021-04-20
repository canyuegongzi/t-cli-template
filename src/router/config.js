import React, { Component, Suspense } from "react";
export default [
    {
        path: '/home',
        component: React.lazy(() => import("../views/home"))
    },
    {
        path: '/about',
        component: React.lazy(() => import("../views/about"))
    }
];
