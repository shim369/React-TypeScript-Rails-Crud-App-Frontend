import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostTypes } from "../../types/postTypes";

function PostDetail() {
  let { id } = useParams();
  const [post, setPost] = useState<PostTypes>({
    id: 0,
    title: "",
    content: "",
    image_url: "",
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="container mt-5">
        <h2>{post.title}</h2>
        <div>{post.image_url}</div>
        <p>{post.content}</p>
      </div>
    </main>
  );
}

export default PostDetail;