import { useEffect, useState } from "react";
import axios from "axios";
import CardBase from "../components/CardBase";
import { PostTypes } from "../../types/postTypes";

function Post() {
  const [posts, setPosts] = useState<PostTypes[]>([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);
  const firstPost = posts.length > 0 ? posts[0] : null;
  return (
    <>
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

export default Post;
