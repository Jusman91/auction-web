import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { DataTableType, ExportDataTable } from '@/types/table';

function filterData(
  data: DataTableType[] | undefined,
  columnsToExport: string[]
) {
  const filteredData = data?.map((item) => {
    const filteredItem: any = {};
    columnsToExport.forEach((col) => {
      if (Object.prototype.hasOwnProperty.call(item, col)) {
        filteredItem[col] = (item as Record<string, any>)[col];
      }
    });
    return filteredItem;
  });
  return filteredData;
}
export const exportToExcel = ({
  data,
  columnsToExport,
  fileName
}: ExportDataTable) => {
  const filteredData = filterData(data, columnsToExport);
  const worksheet = XLSX.utils.json_to_sheet(
    filteredData as DataTableType[]
  );
  const workbook = {
    Sheets: { data: worksheet },
    SheetNames: ['data']
  };
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });
  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream'
  });
  saveAs(blob, `${fileName}.xlsx`);
};

export const exportToCSV = ({
  data,
  columnsToExport,
  fileName
}: ExportDataTable) => {
  const filteredData = filterData(data, columnsToExport);
  const worksheet = XLSX.utils.json_to_sheet(
    filteredData as DataTableType[]
  );
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
};

export const exportToPDF = ({
  data,
  columnsToExport,
  fileName
}: ExportDataTable) => {
  const filteredData = data?.map(
    (item) =>
      columnsToExport.map(
        (col) => (item as Record<string, any>)[col] || '-'
      ) // Jika kolom tidak ada, gunakan placeholder '-'
  );
  // Tentukan kolom header untuk PDF
  const columns = columnsToExport.map(
    (col) => col.charAt(0).toUpperCase() + col.slice(1)
  );

  const doc = new jsPDF('landscape');
  const pageWidth = doc.internal.pageSize.getWidth();
  // Tambahkan title atau header di tengah
  const title = `LAPORAN ${fileName.toUpperCase()}`;
  doc.setFontSize(14); // Ukuran font untuk title
  const titleWidth = doc.getTextWidth(title); // Lebar teks title
  const titleX = (pageWidth - titleWidth) / 2; // Posisi X untuk menempatkan teks di tengah
  doc.text(title, titleX, 20); // Menambahkan title pada posisi (titleX, 20)

  // Tambahkan subheader atau keterangan di tengah
  const subheader = `Data berikut adalah daftar ${fileName} pada sistem.`;
  doc.setFontSize(10); // Ukuran font untuk subheader
  const subheaderWidth = doc.getTextWidth(subheader); // Lebar teks subheader
  const subheaderX = (pageWidth - subheaderWidth) / 2; // Posisi X untuk menempatkan teks di tengah
  doc.text(subheader, subheaderX, 28); // Menambahkan subheader di posisi tengah

  autoTable(doc, {
    startY: 35,
    head: [columns],
    body: filteredData,
    headStyles: {
      fillColor: [22, 160, 133], // Warna background header (opsional)
      textColor: [255, 255, 255], // Warna teks header (opsional)
      fontSize: 10, // Ukuran font header
      cellPadding: 4, // Padding untuk sel header
      halign: 'center', // Horizontal align header (bisa 'left', 'right', 'center')
      valign: 'middle', // Vertical align untuk header
      minCellWidth: 30 // Minimum lebar sel header
    },
    bodyStyles: {
      fontSize: 10, // UKuran font sel
      minCellHeight: 10, // Minimum tinggi sel
      halign: 'center', // Horizontal align sel
      valign: 'middle' // Vertical align sel
    },
    styles: {
      overflow: 'linebreak' // Membuat teks wrap jika terlalu panjang
    }
  });
  doc.save(`${fileName}.pdf`);
};
