import { Route, Routes } from "react-router-dom"
import React, {useState} from 'react'
import Navbar from "../components/Navbar/Navbar"
import CreateProduct from "../pages/CreateProduct"
import LandingPage from "../pages/LandingPage"
import Account from "../components/Account/Account"
import PrivateRoute from "../components/PrivateRoute/PrivateRoute"
import Login from "../pages/Login"
import Register from "../pages/Register"
import EditProduct from "../components/Table/EditProduct"
import DisplayPage from "../pages/DisplayPage"


const Layout = () => {

    return (   
            <div>
                < Navbar />
                <main>
                    <div>
                        <Routes>
                            <Route index element={<LandingPage />} />
                            <Route path="login" element={<Login />}/>
                            {/* <Route element={<PrivateRoute user={false}/>}> */}

                            <Route path="register" element={<Register />} />

                            <Route path="edit-product/:id" element={<EditProduct/>}/>

                            <Route path="*" element={<div>not found</div>}/>

                            <Route path="display" element={<DisplayPage/>}/>

                            <Route path="create" element={<CreateProduct/>} />
                            <Route path="account/:id" element={<Account/>} />
                        </Routes>
                    </div>
                </main>
            </div>
    )
}

export default Layout