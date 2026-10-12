
import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from "react-router-dom";
import "./App.css";

const students = [
  { id: 1, name: "Navya", branch: "CSE", year: 2 },
  { id: 2, name: "Rahul", branch: "ECE", year: 2 },
  { id: 3, name: "Priya", branch: "IT", year: 3 }
];

function Home() {
  return <h2>Welcome to Home Page</h2>;
}

function About() {
  return <h2>About Us - Student Management System</h2>;
}

function Students() {
  return (
    <div>
      <h2>Students List</h2>
      {students.map((s) => (
        <p key={s.id}>
          <Link to={`/students/${s.id}`}>{s.name}</Link>
        </p>
      ))}
      <Outlet />
    </div>
  );
}

function StudentDetails() {
  const { id } = useParams();
  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return <h3>Student not found!</h3>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <p>Branch: {student.branch}</p>
      <p>Year: {student.year}</p>
    </div>
  );
}

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/students">Students</Link>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/students" element={<Students />}>
            <Route path=":id" element={<StudentDetails />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
