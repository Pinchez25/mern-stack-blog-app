import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import IndexPage from "./pages/indexpage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import DeletePostPage from "./pages/DeletePostPage.jsx";
import UpdatePostPage from "./pages/UpdatePostPage.jsx";
function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index={true} element={<IndexPage/>}></Route>
                <Route path={'/post/:id'} element={<PostPage/>}></Route>
                <Route path={'/login'} element={<LoginPage/>}></Route>
                <Route path={'/register'} element={<RegisterPage/>}></Route>
                <Route path={'/post/:id/edit'} element={<UpdatePostPage/>}></Route>
                <Route path={'/post/:id/delete'} element={<DeletePostPage/>}></Route>
                <Route path={'/create-post'} element={<CreatePost/>}></Route>
                <Route path={'*'} element={<div>Page Not Found</div>}></Route>
            </Route>
        </Routes>

    )
}

export default App
