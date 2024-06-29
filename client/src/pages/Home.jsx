import {AiFillDelete} from "react-icons/ai"
import {MdOutlineEdit} from "react-icons/md"
import {useEffect, useState} from "react"
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blogs");
    const data = await response.json();
    setPosts(data.blogs);
  }

  const deletePost = async (id) => {
   const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
   });

   if(response.status === 200) {
     toast.success("Blog deleted successfully");
   }  else{
      toast.error("Blog not deleted");
   }
  }
  const updatePost = async (id) => {
    console.log(title, description,id);
    const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title, description}),
    });
    if(response.status === 200) {
      toast.success("Blog updated successfully");
    }  else{
       toast.error("Blog not updated");
    }
  }

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className="my-10">
    {
      posts.map((post) => {
        return(
          <div className='w-[40vw] mx-auto p-3 rounded-md shadow-md' key={posts._id}>
    <div className="flex justify-end text-lg gap-3 m-3">
      <AiFillDelete 
      className="text-gray-500 hover:text-red-500 cursor-pointer hover:scale-125 transition-all"
      onClick={() => deletePost(post._id)}
      />
      <MdOutlineEdit 
      className={`${selectedPost === post._id && editPost?"text-red-400 !important scale-125 !important":"text-gray-500 !important"}text-gray-500 !important hover:text-red-500  cursor-pointer hover:scale-125 transition-all`}
      onClick={() => {
        setEditPost(!editPost);
        setSelectedPost(post._id);
    }}

      />
    </div>
      <h2 
      className="font-bold text-lg my-2 outline-none focus:bg-gray-200" 
      contentEditable={editPost}
      onInput={(e) => setTitle(e.target.innerText)}
      >{post.title}
      </h2>
      <h3 
      className="text-gray-500 font-semibold selection:bg-green-200 outline-none focus:bg-gray-200" 
      contentEditable={editPost}
      onInput={(e) => setDescription(e.target.innerText)}
      >{post.description}
      </h3>
      <button 
      className={`${selectedPost === post._id && editPost?"block":"hidden"} bg-purple-400 hover:bg-purple-600 px-3 py-1 my-1 rounded-md text-white`}
       onClick={() => updatePost(post._id)}>
        Save
        </button>

</div>
        )
      })
    }

    
</div>

  </>
    )

  }
export default Home
