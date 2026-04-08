import { redirect } from "next/navigation";

export default function Home() {
  // Dès qu'on arrive sur localhost:3000, on est propulsé vers la page de login
  redirect("/login");
}