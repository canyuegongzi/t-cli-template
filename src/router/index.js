import React, { Component, Suspense } from "react";
import { BrowserRouter, HashRouter, Redirect, Route,  Router, Link, Switch } from "react-router-dom";
import  views from "./config";
console.log(views);
export default function AppRouterView() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HashRouter>
                {
                    views.map(item => {
                        return (
                            <Route path={item.path} key={item.path} component={item.component} />
                        );
                    })
                }
                <Redirect to="/home" />
            </HashRouter>
        </Suspense>
    );
}
