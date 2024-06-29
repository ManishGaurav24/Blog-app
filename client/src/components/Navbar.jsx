import {Link} from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex justify-center items-center gap-10 font-bold text-lg shadow-md py-3">
      <Link to="/" className="hover:scale-125 transition-all">Home</Link>
      <Link to="/create" className="hover:scale-125 transition-all">Create</Link>
    </nav>
  )
}

export default Navbar
