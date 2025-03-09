"use client";

interface Course {
  id: string;
  title: string;
  description: string;
}

interface CoursesListProps {
  courses: Course[];
}

export const CoursesList = ({ courses }: CoursesListProps) => {
  console.log("Cursos en CoursesList:", courses); // Depuración

  return (
    <div>
      <h2>Cursos</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};