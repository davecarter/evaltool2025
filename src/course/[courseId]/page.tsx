"use client";

import { useParams } from "next/navigation";

export default function CoursePage() {
  const params = useParams(); 
  const courseId = params.courseId;

  return (
    <div>
      <h1>Curso: {courseId}</h1>
      <p>Aquí puedes mostrar los detalles del curso.</p>
    </div>
  );
}