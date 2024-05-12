import { useState } from "react";
import { PostTypes } from "../../types/postTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostCreate() {
    // const navigate = useNavigate()
    const [errors, setErrors] = useState<string[]>([])
    const [post, setPost] = useState<PostTypes>({
        id: 0,
        title: '',
        content: '',
        image_url: '',
        image: null
    })

    const hadleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.persist();
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        if (e.target.files && e.target.files[0]) {
            setPost({ ...post, image: e.target.files[0] });
        }
    }

    const savePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('content', post.content);
        if (post.image) {
            formData.append('image', post.image);
        }


        let errors: string[] = [];

        if (!formData.get('title')) {
            errors.push("Post title is required!")
        }

        if (!formData.get('content')) {
            errors.push("Post content is required!")
        }

        setErrors(errors);

        try {
            await axios.post('http://127.0.0.1:5000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // navigate('/')
        } catch (error: any) {
            errors.push(error.response);
        }
    }
  return (
    <main>
      <div className="container mt-5">
    <form onSubmit={savePost}>
        <div className="mb-3">
            <label htmlFor="title">Post Title</label>
            <input type="text" id="title" name="title" value={post.title} onChange={hadleInput} className="form-control" />
        </div>
        <div className="mb-3">
            <label htmlFor="content">Post Content</label>
            <textarea id="content" name="content" value={post.content} onChange={hadleInput} className="form-control"></textarea>
        </div>
            <div className="mb-3">
                <label htmlFor="image_url">Post Image</label>
                <input type="file" id="image_url" name="image_url" onChange={handleImageUpload} className="form-control" />
            </div>
        <div>
            <ul className="text-danger">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
        <div className="mb-3">
            <button type="submit" className="btn btn-primary">Save Post</button>
        </div>
    </form>
      </div>
    </main>
  );
}
export default PostCreate;
