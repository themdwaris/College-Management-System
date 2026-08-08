// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
//       <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

//         <Link
//           to="/"
//           className="text-2xl font-bold text-blue-600"
//         >
//           CollegeMS
//         </Link>

//         <nav className="flex items-center gap-8">

//           <Link
//             to="/"
//             className="text-gray-700 hover:text-blue-600 transition"
//           >
//             Home
//           </Link>

//           <Link
//             to="/login"
//             className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg"
//           >
//             Login
//           </Link>

//         </nav>

//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

        <Link
          to="/"
          className="text-xl font-bold text-blue-500"
        >
          College<span className="text-white">MS</span>
        </Link>

        <nav className="flex items-center gap-8">

          

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-1.5 rounded-lg transition"
          >
            Login
          </Link>

        </nav>

      </div>
    </header>
  );
};

export default Navbar;