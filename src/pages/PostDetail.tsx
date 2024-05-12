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
    image: null
  });
  const defaultImageUrl = "../logo512.png";

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
        <div className="row">
          <div className="col-12 col-md-6 m-auto">
            <h2>{post.title}</h2>
            <div>
              <img
                src={post.image_url ? post.image_url : defaultImageUrl}
                alt={post.title}
                className="w-100"
              />
            </div>
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostDetail;
