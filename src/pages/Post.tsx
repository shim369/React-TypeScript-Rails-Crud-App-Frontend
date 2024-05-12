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
  return (
    <>
      <main>
        <div className="container mt-5">
          <div className="cards d-flex flex-wrap justify-content-around">
            {posts.map((post) => (
              <CardBase key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Post;
