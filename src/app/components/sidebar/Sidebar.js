import { useEffect, useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [categories, setCategories] = useState({});
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    fetch("/api/templates") // Adjust the API route as per your setup
      .then((res) => res.json())
      .then((data) => {
        const groupedCategories = data.reduce((acc, template) => {
          if (!acc[template.category]) {
            acc[template.category] = [];
          }
          acc[template.category].push(template);
          return acc;
        }, {});
        setCategories(groupedCategories);
      })
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  return (
    <div className="w-60 h-screen bg-gray-100 p-5 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">Templates</h2>
      <ul className="space-y-3">
        {Object.keys(categories).map((category) => (
          <li key={category}>
            {/* Category Title (Dropdown Toggle) */}
            <button
              className="w-full flex justify-between items-center px-3 py-2 text-left font-semibold text-gray-700 hover:bg-gray-200 rounded-md"
              onClick={() => setOpenCategory(openCategory === category ? null : category)}
            >
              {category}
              <span>{openCategory === category ? "▼" : "▶"}</span>
            </button>

            {/* Template Titles (Dropdown Content) */}
            {openCategory === category && (
              <ul className="ml-5 mt-2 space-y-1">
                {categories[category].map((template) => (
                  <li key={template.id}>
                    <Link
                      href={`/templates/${template.id}`}
                      className="block px-3 py-1 bg-white rounded-md shadow-md hover:bg-gray-300 text-black"
                    >
                      {template.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
