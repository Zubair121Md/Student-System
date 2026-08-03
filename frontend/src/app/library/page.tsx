"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { libraryBooks } from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { scopedLibraryIssues } from "@/lib/rbac";

export default function LibraryPage() {
  const { user } = useAuth();
  if (!user) return null;
  const issues = scopedLibraryIssues(user);
  const showCatalog = ["super_admin", "principal", "teacher"].includes(user.role);

  return (
    <AppShell title="Library" subtitle="Issues in your scope">
      <PageHeader eyebrow="Operations" title="Library" subtitle="Catalog and borrowed books" />
      {showCatalog && (
        <>
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
        </>
      )}
      <DataTable
        columns={[
          { key: "book", label: "Book" },
          { key: "student", label: "Student" },
          { key: "issued", label: "Issued" },
          { key: "due", label: "Due" },
          { key: "fine", label: "Fine" },
          { key: "status", label: "Status" },
        ]}
        rows={issues.map((i) => ({
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
