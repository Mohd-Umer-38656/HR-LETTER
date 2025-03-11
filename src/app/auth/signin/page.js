// "use client";
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
// //
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     await signIn("credentials", { email, password, callbackUrl: "/admin" });
//   };

//   return (
//     <div className="flex h-screen justify-center items-center">
//       <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded w-96">
//         <h2 className="text-xl font-bold mb-4">Admin Login</h2>
//         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
//       </form>
//     </div>
//   );
// }
