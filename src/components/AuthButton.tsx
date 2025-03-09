"use client";

import { supabase } from "@/utils/supabase/client";

export default function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google', 
    });

    if (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      window.location.reload(); // Recargar la página para actualizar el estado
    }
  };

  return (
    <div>
      {!isLoggedIn 
      ? <button onClick={handleLogin}>Iniciar sesión</button>
      : <button onClick={handleLogout}>Cerrar sesión</button>}
    </div>
  );
}