import { Link } from 'react-router-dom';

export default function NavigationBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
        </nav>
    );
}
