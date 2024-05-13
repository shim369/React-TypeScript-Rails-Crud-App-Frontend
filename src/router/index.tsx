import { Routes, Route } from "react-router-dom";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";
import PostCreate from "../pages/PostCreate";
import PostEdit from "../pages/PostEdit";
import "bootstrap/dist/css/bootstrap.min.css";

function MyRouter() {
  return (
    <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/:id/edit" element={<PostEdit />} />
    </Routes>
  );
}

export default MyRouter;
