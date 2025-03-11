"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

export default function InternshipLetter() {
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    fetch(`/api/templates/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Template Data:", data);
        
        const parsedPlaceholders = JSON.parse(data.placeholders || "{}");
        
        setTemplate({ ...data, placeholders: parsedPlaceholders });
        setFormData(parsedPlaceholders);
      })
      .catch((error) => console.error("Error fetching template:", error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!template) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
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
        <PDFDownloadLink document={<PDFDocument template={template} formData={formData} />} fileName="Internship_Letter.pdf">
          {({ loading }) => <button style={styles.button}>{loading ? "Generating PDF..." : "Download PDF"}</button>}
        </PDFDownloadLink>
      </div>

      <div style={styles.preview}>
        <div style={styles.header}>
          <img src="/logo.png" alt="Company Logo" style={styles.logo} />
          <div style={styles.companyDetails}>
            <p style={styles.companyName}>Einfratech Systems</p>
            <p>Hustlehub Tech Park,</p>
            <p>ITI Layout, Sector 2, HSR Layout,</p>
            <p>Bengaluru, India - 560102</p>
            <p>contact@einfratechsys.com</p>
          </div>
        </div>
        
        <h1 style={styles.title}>{template.name}</h1>
        <p style={styles.date}>Date: {new Date().toISOString().split("T")[0]}</p>
        <p style={styles.content}>
          {template.content.replace(/\[(.*?)\]/g, (_, key) => formData[key] || `[${key}]`)}
        </p>
        <img src="/sign.png" alt="Signature" style={styles.signature} />
        <p style={styles.hr}>HR Head</p>
        <a href="https://einfratechsys.com/" target="_blank" style={styles.link}>https://einfratechsys.com/</a>
      </div>
    </div>
  );
}

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
        <Text style={pdfStyles.date}>Date: {new Date().toISOString().split("T")[0]}</Text>
        <Text style={pdfStyles.content}>{template.content.replace(/\[(.*?)\]/g, (_, key) => formData[key] || `[${key}]`)}</Text>
        <Image src="/sign.png" style={pdfStyles.signature} />
        <Text style={pdfStyles.hr}>For  EINFRATECH  SYSTEMS</Text>
        <Text style={pdfStyles.hr}>HR Head</Text>

      </Page>
    </Document>
  );
}

const styles = {
  container: { display: "flex", gap: "20px", padding: "40px" },
  leftPanel: { width: "30%", padding: "20px", background: "#f8f8f8", borderRadius: "8px" },
  preview: { width: "70%", padding: "40px", background: "#fff", borderRadius: "8px", border: "1px solid #ddd" },
  heading: { fontSize: "20px", marginBottom: "10px" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
};

const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Times-Roman" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  logo: { width: 80, height: 80 },
  middleText: { textAlign: "center", flexGrow: 1 },
  companyTitle: { fontSize: 16, fontWeight: "bold", color: "#4A90E2" , marginLeft:20},
  tagline: { fontSize: 10, color: "#666" ,marginLeft:20},
  companyDetails: { textAlign: "right", fontSize: 12 },
  companyName: { fontSize: 14, fontWeight: "bold" },
  title: { fontSize: 18, textAlign: "center",textTransform:"uppercase",textDecoration:"underline", marginBottom: 30,marginTop: 20, fontWeight: "bold" }, // Title bold
  date: { fontSize: 12, textAlign: "left", marginBottom: 10,fontWeight: "bold" }, // Date moved left
  content: { 
    fontSize: 12, 
    lineHeight: 1.5, 
    marginBottom: 20 
  },
  placeholder: { fontWeight: "bold" }, // Make placeholders bold
  signature: { width: 100, height: 50, marginTop: 20 },
  hr: { 
    fontSize: 12, 
    fontWeight: "bold", 
    marginTop: 5, 
    textAlign: "left", // HR Head near the signature
    marginLeft: 20 
  },
});