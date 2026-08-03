"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { libraryBooks, libraryIssues } from "@/data/mock";

export default function LibraryPage() {
  return (
    <AppShell title="Library" subtitle="Catalog and issues">
      <PageHeader eyebrow="Operations" title="Library" subtitle="Books, RFID, and fines" />
      <h3 className="mb-3 text-sm font-semibold text-slate-500">Catalog</h3>
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "author", label: "Author" },
          { key: "category", label: "Category" },
          { key: "available", label: "Available" },
          { key: "rfid", label: "RFID" },
        ]}
        rows={libraryBooks.map((b) => ({
          title: b.title,
          author: b.author,
          category: b.category,
          available: b.available,
          rfid: b.rfid,
        }))}
      />
      <h3 className="mb-3 mt-8 text-sm font-semibold text-slate-500">Issues</h3>
      <DataTable
        columns={[
          { key: "book", label: "Book" },
          { key: "student", label: "Student" },
          { key: "issued", label: "Issued" },
          { key: "due", label: "Due" },
          { key: "fine", label: "Fine" },
          { key: "status", label: "Status" },
        ]}
        rows={libraryIssues.map((i) => ({
          book: i.book,
          student: i.student,
          issued: i.issued,
          due: i.due,
          fine: `₹${i.fine}`,
          status: <StatusPill status={i.status} />,
        }))}
      />
    </AppShell>
  );
}
