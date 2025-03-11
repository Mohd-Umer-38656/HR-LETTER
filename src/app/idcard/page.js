"use client";
import { useState } from "react";
import html2canvas from "html2canvas";

export default function IDCardGenerator() {
  const [employee, setEmployee] = useState({
    name: "John Michael",
    designation: "Graphic Designer",
    department: "Graphic Team",
    position: "Sr. Executive",
    phone: "0123 456 7890",
    email: "john25@gmail.com",
    id: "125",
    company: "Einfratech Systems",
    logo: "https://via.placeholder.com/100", // Replace with company logo
    photo: "https://via.placeholder.com/100", // Replace with employee photo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const downloadIDCard = () => {
    const card = document.getElementById("id-card");

    // Ensure images are loaded before capturing
    const images = card.getElementsByTagName("img");
    let loadedImages = 0;

    for (let img of images) {
      if (img.complete) {
        loadedImages++;
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) captureCard();
        };
        img.onerror = () => console.warn("Image failed to load:", img.src);
      }
    }

    if (loadedImages === images.length) captureCard();

    function captureCard() {
      html2canvas(card, {
        backgroundColor: null,
        useCORS: true, // Handle cross-origin images
        scale: 2, // Higher resolution
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "employee-id-card.png";
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-gray-100 p-6">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter Employee Details</h2>
        <div className="space-y-3">
          <input type="text" name="name" placeholder="Full Name" value={employee.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="designation" placeholder="Designation" value={employee.designation} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="department" placeholder="Department" value={employee.department} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="position" placeholder="Position" value={employee.position} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="phone" placeholder="Phone Number" value={employee.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="id" placeholder="Employee ID" value={employee.id} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="logo" placeholder="Company Logo URL" value={employee.logo} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="photo" placeholder="Employee Photo URL" value={employee.photo} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Right Side - ID Card Preview */}
      <div className="w-full  md:w-1/2 flex flex-col items-center mt-6 md:mt-0 bg-cover bg-center"  >
        <h2 className="text-xl font-bold mb-4">ID Card Preview</h2>
        <div id="id-card" className="relative w-72 bg-white rounded-lg shadow-lg overflow-hidden  bg-cover bg-center"  style={{backgroundImage: "url('bglogo.png')"}}>
          {/* Header with Logo */}
          <div className=" p-3 flex justify-center"  style={{backgroundColor: "rgb(0, 85,100)"}}>
            <img src="/logo.png" alt="Company Logo" className="h-18" crossOrigin="anonymous" />
          </div>

          {/* Image Section */}
          <div className=" w-full h-17 rounded-t-lg" style={{backgroundColor: "rgb(0, 85, 255)"}}></div>
          <div className="flex justify-center -mt-12">
            <img src={employee.photo} alt="Employee" className="w-30 h-30 rounded-full border-1 border-white shadow-md" crossOrigin="anonymous" />
          </div>

          {/* Employee Details */}
          <div className="text-center p-4">
            <h3 className="text-xl font-bold">{employee.name}</h3>
            <p className=" font-semibold">{employee.designation}</p>

            <div className="mt-2 text-sm  space-y-1 text-left">
              <p><strong>ID No:</strong> {employee.id}</p>
              <p><strong>Dept:</strong> {employee.department}</p>
              <p><strong>Deg.:</strong> {employee.position}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>Email:</strong> {employee.email}</p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button onClick={downloadIDCard} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Download ID Card
        </button>
      </div>
    </div>
  );
}
