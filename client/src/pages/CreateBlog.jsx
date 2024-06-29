import {useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const CreateBlog = () => {

  const navigate = useNavigate();


  const postData = async(e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const blog = { title, description };

    //below code is to send data to the backend server
    const response = await fetch("http://localhost:5000/post-blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(blog)
    });
    if(response.status === 200){
      toast.success("Blog posted successfully");
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => navigate("/"), 2000);
      
    }else{
      alert("Blog not posted");
    }
  }

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className="w-[90vw] lg:w-[60vw] mx-auto mt-10
    backdrop-blur-lg
    [ p-8 md:p-10 lg:p-10 ]
    [ bg-gradient-to-b from-white/60 to-white/30 ]
    [ border-[1px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ]

    ">
      <h1 className="text-2xl font-bold text-center">Create Bolgs</h1>
      <form className="flex flex-col gap-3" onSubmit={postData}>
        <label htmlFor="title" className="font-semibold text-lg">Title : </label>
        <input type="text" name="title" placeholder="Enter the blog title" 
        
        className="form-input 
        block w-full rounded-lg leading-none focus:outline-none placeholder-black/50
        
        [ transition-colors duration-200 ] 
        [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] 
        [ bg-black/20 focus:bg-black/25 ] 
        [ text-[#333] focus:text-black ]
         px-3 py-2 rounded-md outline-none border-2 border-gray-300 focus:bg-gray-200" />
        
        <label htmlFor="description" className="font-semibold text-lg">Descripption : </label>
        <textarea 
        className="block w-full rounded-lg leading-none focus:outline-none placeholder-black/50 
        [ transition-colors duration-200 ] 
        [ py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 pl-12 ] 
        [ bg-black/20 focus:bg-black/25 ] 
        [ text-[#333] focus:text-black ]" 
        
        id="" cols="30" rows="10"
        name="description">
        </textarea>
        <button type="submit" className="bg-purple-400 hover:bg-purple-500 py-3 rounded-md text-white text-xl font-bold">Post</button>
        
      </form>

    </div>
    </>
  )
}

export default CreateBlog
