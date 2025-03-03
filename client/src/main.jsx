import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home.jsx'
import Layout from './components/layouts/Layout.jsx';
import Search from './components/Search.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthLayout from './components/layouts/AuthLayout.jsx';
import NotFound from './components/NotFound.jsx';
import Category from './components/Category.jsx';
import Post from './components/Post.jsx';
import Create from './components/Create.jsx';
import UserLayout from './components/layouts/UserLayout.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/category/:name/page/:number' element={<Category />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/create" element={<Create />} />
      </Route>

      <Route path='*' element={<NotFound />} />

    </Routes>
  </BrowserRouter>
)