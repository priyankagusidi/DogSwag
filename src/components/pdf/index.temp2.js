
// import { PDFViewer } from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
const PDFViewer = dynamic(() => import("@react-pdf/renderer").then((m) => m.PDFViewer), {
    ssr: false,
});

const Document = dynamic(() => import("./document"), {
    ssr: false,
  });
const App = () => (
  <PDFViewer>
    <Document />
  </PDFViewer>
);

export default App