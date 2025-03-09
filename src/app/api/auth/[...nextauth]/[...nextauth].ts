import supabase from "@/utils/supabase/supabase";
import { v4 as uuidv4 } from "uuid";

export async function createUserIfNotExists(user: any) {
  const googleUserId = user.id;
  const userUuid = uuidv4();

  console.log("🔑 Google User ID:", googleUserId, "🔑 UUID:", userUuid);

  try {
    console.log("🔍 Verificando usuario en Supabase:", user);

    // Verifica si el usuario ya existe por email
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", user.email) // Busca por email
      .maybeSingle();

    if (error) {
      console.error("❌ Error buscando usuario:", error);
      return;
    }

    if (data) {
      console.log("✅ Usuario ya existe en Supabase:", data);
      return;
    }

    // Inserta el nuevo usuario
    console.log("🆕 Insertando nuevo usuario en Supabase...", {
      id: userUuid,
      name: user.name,
      email: user.email,
    });

    const { error: upsertError } = await supabase.from("users").upsert(
      {
        id: userUuid,
        name: user.name,
        email: user.email,
      },
      { onConflict: "email" } // Conflicto en la columna email
    );

    if (upsertError) {
      console.error("❌ Error en upsert:", upsertError);
    } else {
      console.log("✅ Usuario upserted correctamente.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}
