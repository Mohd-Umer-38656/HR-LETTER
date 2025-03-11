"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [templates, setTemplates] = useState([]);
  const router = useRouter();
console.log(templates);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error("Error fetching templates:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">HR Templates Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">{template.name}</h2>
            <p className="text-gray-600 mb-4">{template.category}</p>
            <button
              onClick={() => router.push(`/templates/${template.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Generate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
