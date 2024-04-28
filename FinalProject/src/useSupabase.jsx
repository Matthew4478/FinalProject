import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useSupabase() {
    
    const createPost = async (post) => {
        return await supabase
            .from('posts')
            .insert([post]);
    };

    
    const fetchPosts = async (sortField = 'created_at', ascending = true) => {
        return await supabase
            .from('posts')
            .select('*')
            .order(sortField, { ascending });
    };


    
    const fetchPost = async (id) => {
        return await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
    };

    
    const updatePost = async (id, updates) => {
        return await supabase
            .from('posts')
            .update(updates)
            .match({ id });
    };

    
    const deletePost = async (id) => {
        return await supabase
            .from('posts')
            .delete()
            .match({ id });
    };

    
    const fetchComments = async (post_id) => {
        return await supabase
            .from('comments')
            .select('*')
            .eq('post_id', post_id)
            .order('created_at', { ascending: false });
    };

    
    const createComment = async (comment) => {
        return await supabase
            .from('comments')
            .insert([comment]);
    };

    
    const upvotePost = async (id) => {
        return await supabase
            .rpc('increment_upvotes', { post_id: id });
    };

    return {
        createPost,
        fetchPosts,
        updatePost,
        deletePost,
        fetchPost,
        fetchComments,
        createComment,
        upvotePost
    };
}
