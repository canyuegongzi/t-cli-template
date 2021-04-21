import React, { Component, Suspense } from "react";
import { RouterItem } from "../types/RouterTypes";
export const views: RouterItem[] = [
    {
        path: '/home',
        component: React.lazy(() => import("../views/home/index"))
    },
    {
        path: '/about',
        component: React.lazy(() => import("../views/about/index"))
    }
];
