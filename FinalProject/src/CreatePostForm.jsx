import { useState } from 'react';
import { useSupabase } from './useSupabase';

export default function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const { createPost } = useSupabase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            alert("Title is required");
            return;
        }
        const post = { title, content, image_url: imageUrl, secret_key: secretKey };
        const { error } = await createPost(post);
        if (error) {
            alert('Error creating post');
        } else {
            setTitle('');
            setContent('');
            setImageUrl('');
            setSecretKey('');
            alert('Post created successfully');
        }
    };

    return (
        <div className="centered-container">
            <div className="content-box">
                <h2>Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Secret Key"
                        value={secretKey}
                        onChange={e => setSecretKey(e.target.value)}
                        required
                    />
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </div>
    );
}
