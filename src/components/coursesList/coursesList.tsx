"use client";

import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"
import styles from "./coursesList.module.css"

interface Course {
  id: string;
  description: string;
  title: string;
}

interface CoursesListProps {
  coursesList: Course[];
}

const CoursesList = ({ coursesList }: CoursesListProps) => {
  const router = useRouter()
  const handleEnter = (courseId: string) => router.push(`/course/${courseId}`)

  return (
    <div className={styles.container}>
      <ul>
        {coursesList.map((course) => (
          <div key={course.id} className={styles.listContainer}>
            <div className={styles.metaContainer}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </div>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleEnter(course.id)}
            >
              ENTRAR
            </Button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export { CoursesList }
