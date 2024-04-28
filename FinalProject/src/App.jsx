import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePostForm from './CreatePostForm';
import PostsFeed from './PostsFeed';
import PostPage from './PostPage';
import NavigationBar from './NavigationBar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<PostsFeed />} />
        <Route path="/create" element={<CreatePostForm />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
