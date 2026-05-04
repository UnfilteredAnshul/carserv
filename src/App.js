import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';

import AdminToolbar from "./components/AdminToolbar";
import HTMLPage from "./components/HTMLBridge";

import WithAuth from './hoc/withAuth';
import WithAdminAuth from "./hoc/withAdminAuth";
import ErrorClearingRouteWrapper from "./hoc/clearErrorWrapper";

import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashBoardLayout";

import { checkUserSession } from "./redux/User/user.actions";

import Homepage from './pages/Homepage';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from './pages/Recovery';
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Cart from './pages/Cart';
import Payment from "./pages/Payment";
import Order from './pages/Order';

import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <AdminToolbar />
    <ErrorClearingRouteWrapper>
      <Routes>
        <Route
          path="/"
          element={
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        />
        <Route
          path="/search/:filterType"
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        <Route path="/payment" element={
          <WithAuth>
            <MainLayout>
              <Payment />
            </MainLayout>
          </WithAuth>
        } />
        <Route
          path="/product/:productID"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        <Route
          path="/registration"
          element={
            <MainLayout>
              <Registration />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/recovery"
          element={
            <MainLayout>
              <Recovery />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <WithAuth>
              <DashBoardLayout>
                <Dashboard />
              </DashBoardLayout>
            </WithAuth>
          }
        />
        <Route
          path="/order/:orderID"
          element={
            <WithAuth>
              <DashBoardLayout>
                <Order />
              </DashBoardLayout>
            </WithAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
        <Route
          path="/our-garage"
          element={
            <WithAuth>
              <HTMLPage pagePath="/index2.html" />
            </WithAuth>
          }
        />
      </Routes>
      </ErrorClearingRouteWrapper>
    </div>
  );
}


export default App;
