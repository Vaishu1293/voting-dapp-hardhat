import Navbar from "@/components/Navbar";
import ClientWrapper from "@/components/ClientWrapper";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Voting DApp</h1>
        <ClientWrapper /> {/* 👈 Move client-side stuff here */}
      </div>
    </div>
  );
}
