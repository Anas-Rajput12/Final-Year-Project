// components/PdfDownload.tsx
import { FiDownload } from "react-icons/fi"; // download icon

export default function Download() {
  const pdfs = [
    { name: "WIFI Form", file: "wifi-form.pdf" },
    { name: "ACR Officers 17+ 2024", file: "ACROfficers17above2024.pdf" },
    { name: "ACR Proforma B5 to 16", file: "ACRProformaB5to16.doc" },
    { name: "Complaint Form", file: "complaintform.pdf" },
    { name: "Alumni Form", file: "_alumniform.pdf" },
    { name: "Degree Bachelors", file: "degreeBachelors.pdf" },
    { name: "Degree Masters", file: "degreeMasters.pdf" },
    { name: "Employment Form HEC", file: "employmentformhec.pdf" },
    { name: "Registered Graduates Form", file: "registeredgraduatesform.pdf" },
    { name: "Semester Admission Form 2024", file: "SemesterAdmissionForm2024.docx" },
    { name: "Smart Uni Reg Form Staff", file: "SmartUniRegFormStaff.pdf" },
    { name: "Teachers ACR Modified 2024", file: "TeachersACRmodified2024.pdf" },
    { name: "Transcript Bachelors", file: "transcriptBachelors.pdf" },
    { name: "Transcript Masters", file: "transcriptMasters.pdf" },
    { name: "Verification of Academic Certificates", file: "VERIFICATIONISSUANCE OF ACADEMIC CERTIFICATES.pdf" },
    { name: "NIDA-11", file: "NIDA-11.pdf" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        Download Forms & PDFs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {pdfs.map((pdf, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-2xl transform hover:scale-105 hover:shadow-3xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full mb-4 shadow-lg">
                <FiDownload className="text-3xl text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{pdf.name}</h3>
            </div>
            <a
              href={`/files/${pdf.file}`}
              download={pdf.file}
              className="mt-6 inline-flex items-center justify-center gap-2 py-2 px-5 bg-white text-purple-600 font-semibold rounded-full shadow-md hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-200"
            >
              <FiDownload /> Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
