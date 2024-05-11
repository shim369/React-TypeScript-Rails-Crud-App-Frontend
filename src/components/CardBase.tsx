import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Post } from "../../types/post";

interface CardProps {
  post: Post;
}

function CardBase({ post }: CardProps) {
  const defaultImageUrl = "logo512.png";

  return (
    <Card style={{ width: "30%" }}>
      <Card.Img
        variant="top"
        src={post.image_url ? post.image_url : defaultImageUrl}
        className="img-detail"
        alt={post.title}
      />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <Button variant="primary">Detail</Button>
      </Card.Body>
    </Card>
  );
}

export default CardBase;
