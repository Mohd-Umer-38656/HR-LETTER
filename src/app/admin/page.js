"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({ name: "", category: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    const res = await fetch("/api/templates");
    const data = await res.json();
    setTemplates(data);
  }

  async function saveTemplate() {
    const method = isEditing ? "PUT" : "POST";
    await fetch("/api/templates", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentTemplate),
    });
    setModalOpen(false);
    fetchTemplates();
  }
  

  async function deleteTemplate(id) {
    await fetch("/api/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTemplates();
  }
  

  function openModal(template = { name: "", category: "" }) {
    setCurrentTemplate(template);
    setIsEditing(!!template.id);
    setModalOpen(true);
  }


  //authentication  
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication..."); // Debug log
      const res = await fetch("/api/check-auth");
  
      if (res.status !== 200) {
        console.log("Not authenticated. Redirecting...");
        router.push("/signin"); // Redirect if not authenticated
      } else {
        console.log("Authenticated!");
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <button onClick={() => openModal()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Template</button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td className="border p-2">{template.name}</td>
              <td className="border p-2">{template.category}</td>
              <td className="border p-2">
                <button onClick={() => openModal(template)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button onClick={() => deleteTemplate(template.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit" : "Add"} Template</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-2 border rounded"
              value={currentTemplate.name}
              onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 mb-4 border rounded"
              value={currentTemplate.category}
              onChange={(e) => setCurrentTemplate({ ...currentTemplate, category: e.target.value })}
            />
            <div className="flex justify-end">
              <button onClick={() => setModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={saveTemplate} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
