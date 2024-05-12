import { Routes, Route } from "react-router-dom";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";
import PostCreate from "../pages/PostCreate";
import "bootstrap/dist/css/bootstrap.min.css";

function MyRouter() {
  return (
    <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/create" element={<PostCreate />} />
    </Routes>
  );
}

export default MyRouter;
