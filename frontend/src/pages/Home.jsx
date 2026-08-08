import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Departments",
    desc: "Manage departments with ease.",
  },
  {
    icon: Users,
    title: "Students",
    desc: "Track and organize student records.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance",
    desc: "Mark attendance in just one click.",
  },
];

const stats = [
  {
    title: "Students",
    value: "250+",
  },
  {
    title: "Teachers",
    value: "25+",
  },
  {
    title: "Courses",
    value: "15+",
  },
  {
    title: "Departments",
    value: "6",
  },
];

const Home = () => {
  return (
    <div className="bg-slate-950 text-white">

      {/* Hero */}

      <section className="relative overflow-hidden">

        <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full top-10 left-20"></div>

        <div className="absolute w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full bottom-10 right-20"></div>

        <div className="max-w-7xl mx-auto px-5 py-28 text-center relative">

          <span className="inline-block px-4 py-2 rounded-full border border-slate-700 bg-slate-900 text-blue-400 text-sm">
            College Management System
          </span>

          <h1 className="text-6xl font-bold mt-8 leading-tight">
            Manage Your
            <span className="text-blue-500"> College </span>
            Smarter
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-slate-400 text-lg">
            A modern platform to manage departments,
            students, teachers, courses and attendance
            from one place.
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-medium transition"
            >
              Get Started
            </Link>

            <button className="border border-slate-700 hover:border-blue-500 px-7 py-3 rounded-lg transition">
              Learn More
            </button>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-5 py-20">

        <h2 className="text-4xl font-bold text-center">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 transition"
            >
              <item.icon
                className="text-blue-500 mb-5"
                size={40}
              />

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-3">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-5 pb-20">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl text-center p-8"
            >
              <h2 className="text-4xl font-bold text-blue-500">
                {item.value}
              </h2>

              <p className="text-slate-400 mt-2">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="border-t border-slate-800">

        <div className="max-w-5xl mx-auto px-5 py-24 text-center">

          <BookOpen
            size={55}
            className="mx-auto text-blue-500"
          />

          <h2 className="text-4xl font-bold mt-6">
            Ready to Manage Your College?
          </h2>

          <p className="text-slate-400 mt-4">
            Login and start managing students,
            teachers and attendance efficiently.
          </p>

          <Link
            to="/login"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg transition"
          >
            Login Now
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Home;