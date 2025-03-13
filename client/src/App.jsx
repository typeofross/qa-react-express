import { BrowserRouter, Routes, Route } from "react-router";
import Home from '/src/components/Home.jsx'
import Layout from '/src/components/layouts/Layout.jsx';
import Search from '/src/components/Search.jsx';
import Login from '/src/components/Login.jsx';
import Register from '/src/components/Register.jsx';
import AuthLayout from '/src/components/layouts/AuthLayout.jsx';
import NotFound from '/src/components/NotFound.jsx';
import Category from '/src/components/Category.jsx';
import Post from '/src/components/Post.jsx';
import Create from '/src/components/Create.jsx';
import UserLayout from '/src/components/layouts/UserLayout.jsx';
import Logout from '/src/components/Logout.jsx';
import Update from '/src/components/Update.jsx';
import ProfileSettings from '/src/components/ProfileSettings.jsx';
import Activity from '/src/components/Activity.jsx';
import { AuthContext } from '/src/contexts/AuthContext.js';
import { useState } from "react";

export default function App() {
    const [auth, setAuth] = useState({ email: "", isLogged: false });

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Routes>

                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/post/:id' element={<Post />} />
                        <Route path='/category/:name/page/:number' element={<Category />} />
                        <Route path="/profile/activity/:type" element={<Activity />} />
                    </Route>

                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<UserLayout />}>
                        <Route path="/create" element={<Create />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/update/:id" element={<Update />} />
                        <Route path="/profile/settings" element={<ProfileSettings />} />
                    </Route>

                    <Route path='*' element={<NotFound />} />

                </Routes>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}