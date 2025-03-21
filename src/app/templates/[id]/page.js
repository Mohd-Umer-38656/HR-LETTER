"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

export default function InternshipLetter() {
  const [template, setTemplate] = useState(null); // Stores template data fetched from API
  const [formData, setFormData] = useState({});  // Stores user input values for placeholders

  const params = useParams();  // Get the template ID from the URL params
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    fetch(`/api/templates/${id}`) // Fetch template details using the ID
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Template Data:", data);

        const parsedPlaceholders = JSON.parse(data.placeholders || "{}");  // Parse placeholders JSON

        setTemplate({ ...data, placeholders: parsedPlaceholders });
        setFormData(parsedPlaceholders);     // Initialize form data with placeholders
      })
      .catch((error) => console.error("Error fetching template:", error));
  }, [id]);



    // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!template) return <p>Loading...</p>;  // Show loading text if template is not yet fetched

  return (
    <div style={styles.container} className="contain">

        {/* Left panel for user input */}
      <div style={styles.leftPanel} className="left">
        <h2 style={styles.heading}>{template.formTitle || "Enter Details"}</h2>
        {Object.keys(template.placeholders).map((key) => (
          <input
            key={key}
            type={key.toLowerCase().includes("date") ? "date" : "text"}
            name={key}
            placeholder={key}
            value={formData[key] || ""}
            onChange={handleChange}
            style={styles.input}
          />
        ))}


          {/* PDF Download Button */}
        <PDFDownloadLink
          document={<PDFDocument template={template} formData={formData} />}
          fileName={`${template.name}.pdf`}
        >
          {({ loading }) => (
            <button style={styles.button}>
              {loading ? "Generating PDF..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>


 {/* Right panel for template preview */}
  
<div style={styles.preview} className="right">
  <PDFViewer width="100%" height="500px" >
    <PDFDocument template={template} formData={formData} />
  </PDFViewer>
</div>


    </div>
  );
}


// PDF Document Component main part
function PDFDocument({ template, formData }) {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Image src="/logo.png" style={pdfStyles.logo} />

          <View style={pdfStyles.middleText}>
            <Text style={pdfStyles.companyTitle}>EINFRATECH SYSTEMS INDIA</Text>
            <Text style={pdfStyles.tagline}>Make Better Work-Infra</Text>
          </View>

          <View style={pdfStyles.companyDetails}>
            <Text style={pdfStyles.companyName}>Einfratech Systems</Text>
            <Text>Hustlehub Tech Park,</Text>
            <Text>ITI Layout, Sector 2, HSR Layout,</Text>
            <Text>Bengaluru, India - 560102</Text>
            <Text>https://einfratechsys.com/</Text>
          </View>
        </View>
        <Text style={pdfStyles.title}>{template.name}</Text>
        <Text style={pdfStyles.date}>
          Date: {new Date().toISOString().split("T")[0]}
        </Text>


          {/* Replace placeholders with user input values in the PDF content */}
        <Text style={pdfStyles.content}>
  {template.content.split(/(\[.*?\])/g).map((part, index) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <Text key={index} style={pdfStyles.bold}>
        {formData[part.slice(1, -1)] || part}
      </Text>
    ) : (
      <Text key={index}>{part}</Text>
    )
  )}
</Text>

        <Image src="/sign.png" style={pdfStyles.signature} />
        <Text style={pdfStyles.hr}>For EINFRATECH SYSTEMS</Text>
        <Text style={pdfStyles.hr}>HR Head</Text>
      </Page>
    </Document>
  );
}

const styles = {
  container: { display: "flex", gap: "20px", padding: "40px" },
  leftPanel: {
    width: "30%",
    padding: "20px",
    background: "#f8f8f8",
    borderRadius: "8px",
  },
  preview: {
    width: "70%",
    padding: "40px",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  heading: { fontSize: "20px", marginBottom: "10px" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

};





const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman",
    backgroundImage: "url('/logo.png')",
    backgroundSize: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: { width: 80, height: 80 },
  middleText: { textAlign: "center", flexGrow: 1 },
  companyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
    marginLeft: 20,
  },
  tagline: { fontSize: 10, color: "#666", marginLeft: 20 },
  companyDetails: { textAlign: "right", fontSize: 12 },
  companyName: { fontSize: 14, fontWeight: "bold" },
  title: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    textDecoration: "underline",
    marginBottom: 30,
    marginTop: 20,
    fontWeight: "bold",
  }, // Title bold
  date: {
    fontSize: 12,
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "bold",
  }, // Date moved left
  content: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 20,
  },
  placeholder: { fontWeight: "bold" }, // Make placeholders bold
  signature: { width: 100, height: 50, marginTop: 20 },
  hr: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "left", // HR Head near the signature
    marginLeft: 20,
  },
  bold: {
    fontWeight: "bold", // Bold style for user inputs
  },
});
