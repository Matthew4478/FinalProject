import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabase } from './useSupabase';

export default function PostPage() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchPost, updatePost, deletePost, createComment, fetchComments, upvotePost } = useSupabase();

    useEffect(() => {
        loadPost();
        loadComments();
    }, [id]);

    const loadPost = async () => {
        const { data, error } = await fetchPost(id);
        if (error) alert('Error fetching post');
        else setPost(data);
    };

    const loadComments = async () => {
        const { data, error } = await fetchComments(id);
        if (error) alert('Error fetching comments');
        else setComments(data);
    };

    const handleDelete = async () => {
        if (post.secret_key === secretKey) {
            const { error } = await deletePost(id);
            if (error) alert('Error deleting post');
            else navigate('/');
        } else {
            alert('Invalid secret key');
        }
    };

    const handleUpdate = async () => {
        if (post.secret_key === secretKey) {
            const updates = { title: editedTitle, content: editedContent };
            const { error } = await updatePost(id, updates);
            if (error) alert('Error updating post');
            else {
                setEditMode(false);
                loadPost();
            }
        } else {
            alert('Invalid secret key');
        }
    };

    const handleUpvote = async () => {
        const { error } = await upvotePost(id);
        if (error) alert('Error upvoting post');
        else loadPost();
    };

    const handleAddComment = async () => {
        if (!commentText) return;
        const { error } = await createComment({ post_id: id, content: commentText });
        if (error) alert('Error adding comment');
        else {
            setCommentText('');
            loadComments();
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="centered-container">
            <div className="content-box">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {post.image_url && <img src={post.image_url} alt="Post" />}
                <p>Upvotes: {post.upvotes}</p>
                <button onClick={handleUpvote}>Upvote</button>
                <div>
                    {editMode ? (
                        <>
                            <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
                            <textarea value={editedContent} onChange={e => setEditedContent(e.target.value)} />
                            <button onClick={handleUpdate}>Save Changes</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => { setEditedTitle(post.title); setEditedContent(post.content); setEditMode(true); }}>Edit Post</button>
                            <button onClick={handleDelete}>Delete Post</button>
                            <input type="text" placeholder="Enter secret key" value={secretKey} onChange={e => setSecretKey(e.target.value)} />
                        </>
                    )}
                </div>
                <h3>Comments:</h3>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <p>{comment.content}</p>
                    </div>
                ))}
                <div>
                    <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..."></textarea>
                    <button onClick={handleAddComment}>Comment</button>
                </div>
            </div>
        </div>
    );
}
