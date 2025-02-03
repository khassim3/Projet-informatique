import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const requireAuth = (allowedRoles) => {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/Accueil"); // Si l'utilisateur n'est pas connecté, redirection vers l'accueil
      return;
    }

    const user = JSON.parse(storedUser);
    
    // Vérifie si le rôle de l'utilisateur est autorisé sur cette page
    if (!allowedRoles.includes(user.role)) {
      if (user.role === "Admin") {
        router.push("/Administrateur");
      } else if (user.role === "Etudiant") {
        router.push("/EtudiantPage");
      } else if (user.role === "Mentor") {
        router.push("/MentorMenu");
      }
    }
  }, [router]);
};