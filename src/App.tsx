import Navs from "./components/Navs";
import CardBase from "./components/CardBase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Post } from "../types/post";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);
  const firstPost = posts.length > 0 ? posts[0] : null;
  return (
    <>
      <header>
        <Navs />
      </header>
      <main>
        <div className="container mt-5">
          <div className="cards">
          {firstPost && <CardBase post={firstPost} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
