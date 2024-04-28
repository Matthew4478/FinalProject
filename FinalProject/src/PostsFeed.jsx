import { useState, useEffect } from 'react';
import { useSupabase } from './useSupabase';
import { Link } from 'react-router-dom';

export default function PostsFeed() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('created_at');
    const [ascending, setAscending] = useState(true);
    const { fetchPosts } = useSupabase();

    useEffect(() => {
        loadPosts();
    }, [sortKey, ascending]);

    const loadPosts = async () => {
        const { data, error } = await fetchPosts(sortKey, ascending);
        if (error) alert('Error fetching posts');
        else setPosts(data);
    };

    const handleSortChange = (e) => {
        const [key, order] = e.target.value.split(',');
        setSortKey(key);
        setAscending(order === 'asc');
    };

    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="centered-container">
            <div className="content-box">
                <h2>Posts Feed</h2>
                <input type="text" placeholder="Search by title" onChange={e => setSearch(e.target.value)} />
                <select onChange={handleSortChange} value={`${sortKey},${ascending ? 'asc' : 'desc'}`}>
                    <option value="created_at,asc">Sort by Date (Oldest First)</option>
                    <option value="created_at,desc">Sort by Date (Newest First)</option>
                    <option value="upvotes,desc">Sort by Upvotes (Most First)</option>
                    <option value="upvotes,asc">Sort by Upvotes (Least First)</option>
                </select>
                <div>
                    {filteredPosts.map(post => (
                        <div key={post.id}>
                            <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                            <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
                            <p>Upvotes: {post.upvotes}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
