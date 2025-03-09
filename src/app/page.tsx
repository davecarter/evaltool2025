"use client"; // Asegúrate de que sea un Client Component

import Image from "next/image";
import styles from "./styles/page.module.css";
import AuthButton from "@/components/AuthButton";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import AddCourse from "@/components/AddCourse";
import { CoursesList } from "@/components/coursesList/coursesList";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [coursesList, setCoursesList] = useState<any[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data: courses, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        console.error("Error recuperando cursos:", error);
      } else {
        setCoursesList(courses || []);
      }
    };

    fetchCourses();
  }, []);

  console.log({ coursesList, user });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Evaluations Tool 2025</h1>
          <AuthButton isLoggedIn={user?.id} />
        </div>

        {user ? (
          <><p>Hola {user.user_metadata.name}</p>
      <CoursesList coursesList={coursesList} />
      <AddCourse />
          </>
        ) : (
          <p>Por favor, inicia sesión para ver tus cursos.</p>
        )}
      </main>
    </div>
  );
}