"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function AddCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCourse = async () => {
    const { data: { user } } = await supabase.auth.getUser();
  
    if (user) {
      const { error } = await supabase.from('courses').insert([
        {
          user_id: user.id,
          title,
          description,
        },
      ]);
  
      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Curso creado correctamente.');
        setTitle('');
        setDescription('');
      }
    }
  };

  return (
    <div>
      <h2>Crear nuevo curso</h2>
      <input
        type="text"
        placeholder="Título del curso"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción del curso"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddCourse}>Crear curso</button>
    </div>
  );
}