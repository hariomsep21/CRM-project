// ComponentB.js
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropertyDetail from "./PropertyDetail";
import HiddenContainer from "./HiddenContainer";
import style from "./PdfGenerator.module.css";

const PdfGenerator = () => {
  const hiddenRef = useRef(null);

  const generatePDF = async () => {
    if (hiddenRef.current) {
      const element = hiddenRef.current;
      const pdf = new jsPDF("p", "mm", "a4");
      const canvas = await html2canvas(element, {
        scale: 2, // Increase scale for higher resolution
        useCORS: true, // For handling CORS issues
        logging: true, // Optional: for debugging
      });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("Property-Detail.pdf");
    }
  };

  return (
    <div>
      {/* Hidden ComponentA */}
      <HiddenContainer>
        <div ref={hiddenRef}>
          <PropertyDetail></PropertyDetail>
        </div>
      </HiddenContainer>

      {/* Button to generate PDF */}
      <button className={`btn ${style.brochureBtn}`} onClick={generatePDF}>
        Generate Brochure
      </button>
    </div>
  );
};

export default PdfGenerator;
