"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

export default function LibraryPage() {
  const books = useQuery({
    queryKey: ["books"],
    queryFn: () => api<Record<string, unknown>[]>("/library/books"),
  });
  const issues = useQuery({
    queryKey: ["issues"],
    queryFn: () => api<Record<string, unknown>[]>("/library/issues"),
  });

  return (
    <AppShell>
      <PageHeader title="Library" subtitle="Catalog, issue/return, RFID tags, fines" />
      <h2 className="font-medium mb-2">Catalog</h2>
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "author", label: "Author" },
          { key: "category", label: "Category" },
          { key: "available", label: "Available" },
          { key: "rfid", label: "RFID" },
        ]}
        rows={(books.data || []).map((b) => ({
          title: String(b.title),
          author: String(b.author),
          category: String(b.category),
          available: `${b.available}/${b.copies}`,
          rfid: String(b.rfid_tag || "—"),
        }))}
      />
      <h2 className="font-medium mt-8 mb-2">Issues</h2>
      <DataTable
        columns={[
          { key: "book", label: "Book" },
          { key: "student", label: "Student" },
          { key: "issued", label: "Issued" },
          { key: "due", label: "Due" },
          { key: "fine", label: "Fine" },
          { key: "status", label: "Status" },
        ]}
        rows={(issues.data || []).map((i) => ({
          book: String(i.book),
          student: String(i.student),
          issued: String(i.issued_at),
          due: String(i.due_date),
          fine: `₹${i.fine}`,
          status: <StatusPill status={String(i.status)} />,
        }))}
      />
    </AppShell>
  );
}
