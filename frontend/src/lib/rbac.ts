import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, UserPlus, Users, CalendarCheck, GraduationCap,
  FileSpreadsheet, CalendarDays, Wallet, Bus, Building2, BookOpen,
  Package, Briefcase, BarChart3, Settings, ClipboardList, GitBranch, Bell,
} from "lucide-react";
import {
  type DemoUser,
  students,
  admissions,
  attendance,
  grades,
  feeInvoices,
  feeStructures,
  exams,
  homework,
  employees,
  payroll,
  libraryIssues,
  campuses,
  workflows,
  circulars,
  complaints,
  notifications,
  transport,
  summary,
  admissionByStatus,
  attendanceByStatus,
} from "@/data/mock";

export type Role = DemoUser["role"];

type NavItem = { href: string; label: string; icon: LucideIcon };
type NavGroup = { label: string; items: NavItem[] };

const ALL_NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/campuses", label: "Campuses", icon: Building2 },
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admissions", label: "Admissions", icon: UserPlus },
      { href: "/students", label: "Students", icon: Users },
      { href: "/hr", label: "HR & Payroll", icon: Briefcase },
    ],
  },
  {
    label: "Academics",
    items: [
      { href: "/attendance", label: "Attendance", icon: CalendarCheck },
      { href: "/grades", label: "Grading", icon: GraduationCap },
      { href: "/exams", label: "Examinations", icon: FileSpreadsheet },
      { href: "/timetable", label: "Timetable", icon: CalendarDays },
      { href: "/homework", label: "Homework", icon: ClipboardList },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/fees", label: "Fees", icon: Wallet },
      { href: "/transport", label: "Transport", icon: Bus },
      { href: "/hostel", label: "Hostel", icon: Building2 },
      { href: "/library", label: "Library", icon: BookOpen },
      { href: "/inventory", label: "Inventory", icon: Package },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/workflows", label: "Workflows", icon: GitBranch },
      { href: "/notifications", label: "Alerts", icon: Bell },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

/** Routes allowed per role (dashboard always included). */
const ROLE_ROUTES: Record<Role, string[]> = {
  super_admin: ["*"],
  principal: [
    "/dashboard", "/analytics", "/admissions", "/students", "/attendance", "/grades",
    "/exams", "/timetable", "/homework", "/fees", "/workflows", "/notifications", "/settings",
    "/library", "/transport", "/hostel",
  ],
  teacher: [
    "/dashboard", "/students", "/attendance", "/grades", "/exams", "/timetable",
    "/homework", "/notifications", "/settings",
  ],
  parent: [
    "/dashboard", "/students", "/attendance", "/grades", "/exams", "/timetable",
    "/homework", "/fees", "/library", "/transport", "/notifications", "/settings",
  ],
  student: [
    "/dashboard", "/attendance", "/grades", "/exams", "/timetable", "/homework",
    "/fees", "/library", "/notifications", "/settings",
  ],
  accountant: [
    "/dashboard", "/fees", "/students", "/analytics", "/workflows", "/notifications", "/settings",
  ],
  hr: [
    "/dashboard", "/hr", "/workflows", "/notifications", "/settings",
  ],
};

export function navForRole(role: Role): NavGroup[] {
  const allowed = ROLE_ROUTES[role];
  if (allowed.includes("*")) return ALL_NAV;
  return ALL_NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => allowed.includes(item.href)),
  })).filter((g) => g.items.length > 0);
}

export function canAccess(role: Role, path: string): boolean {
  const allowed = ROLE_ROUTES[role];
  if (allowed.includes("*")) return true;
  const base = "/" + path.split("/").filter(Boolean)[0];
  return allowed.includes(base) || allowed.includes(path);
}

/** Linked student for parent/student demos */
export function linkedStudent(user: DemoUser) {
  if (user.role === "student") {
    return (
      students.find((s) => s.email === user.email || s.full_name === user.full_name) ||
      students[0]
    );
  }
  if (user.role === "parent") {
    return students.find((s) => s.guardians.some((g) => g.email === user.email)) || students[0];
  }
  return null;
}

export function linkedChildren(user: DemoUser) {
  if (user.role !== "parent") return [];
  return students.filter((s) => s.guardians.some((g) => g.email === user.email));
}

/** Teacher's class: Grade 10-A Hyderabad */
export function teacherClassStudents() {
  return students.filter((s) => s.campus === "Hyderabad" && s.grade === "10" && s.section === "A");
}

export function scopedStudents(user: DemoUser) {
  if (user.role === "super_admin") return students;
  if (user.role === "principal" || user.role === "accountant") {
    return students.filter((s) => s.campus === user.campus);
  }
  if (user.role === "teacher") return teacherClassStudents();
  if (user.role === "parent") return linkedChildren(user);
  if (user.role === "student") {
    const me = linkedStudent(user);
    return me ? [me] : [];
  }
  return [];
}

export function scopedAdmissions(user: DemoUser) {
  if (user.role === "super_admin") return admissions;
  if (user.role === "principal") return admissions.filter((a) => a.campus === "Hyderabad");
  return [];
}

export function scopedAttendance(user: DemoUser) {
  const names = new Set(scopedStudents(user).map((s) => s.full_name));
  if (user.role === "super_admin") return attendance;
  return attendance.filter((a) => names.has(a.student));
}

export function scopedGrades(user: DemoUser) {
  const names = new Set(scopedStudents(user).map((s) => s.full_name));
  if (user.role === "super_admin") return grades;
  if (user.role === "principal") {
    return grades.filter((g) => {
      const st = students.find((s) => s.full_name === g.student);
      return st?.campus === "Hyderabad";
    });
  }
  return grades.filter((g) => names.has(g.student));
}

export function scopedFees(user: DemoUser) {
  const names = new Set(scopedStudents(user).map((s) => s.full_name));
  if (user.role === "super_admin") return feeInvoices;
  if (user.role === "accountant" || user.role === "principal") {
    return feeInvoices.filter((f) => {
      const st = students.find((s) => s.full_name === f.student);
      return st?.campus === "Hyderabad" || names.has(f.student);
    });
  }
  return feeInvoices.filter((f) => names.has(f.student));
}

export function scopedExams(user: DemoUser) {
  if (user.role === "super_admin") return exams;
  if (user.role === "principal" || user.role === "teacher" || user.role === "parent" || user.role === "student") {
    return exams.filter((e) => e.name.includes("Hyderabad") || e.name.includes("Term 1"));
  }
  return [];
}

export function scopedHomework(user: DemoUser) {
  if (user.role === "super_admin" || user.role === "principal") return homework;
  if (user.role === "teacher") return homework.filter((h) => h.cls === "10-A" || h.subject === "Science" || h.subject === "Mathematics");
  if (user.role === "parent" || user.role === "student") {
    const child = linkedStudent(user);
    if (!child) return [];
    return homework.filter((h) => h.cls === `${child.grade}-${child.section}` || h.cls.startsWith(child.grade));
  }
  return [];
}

export function scopedEmployees(user: DemoUser) {
  if (user.role === "super_admin" || user.role === "hr" || user.role === "principal") return employees;
  if (user.role === "teacher") return employees.filter((e) => e.email === user.email);
  return [];
}

export function scopedPayroll(user: DemoUser) {
  if (user.role === "super_admin" || user.role === "hr") return payroll;
  if (user.role === "teacher" || user.role === "principal" || user.role === "accountant") {
    return payroll.filter((p) => p.employee === user.full_name);
  }
  return [];
}

export function scopedLibraryIssues(user: DemoUser) {
  const names = new Set(scopedStudents(user).map((s) => s.full_name));
  if (user.role === "super_admin" || user.role === "principal") return libraryIssues;
  return libraryIssues.filter((i) => names.has(i.student));
}

export function scopedCampuses(user: DemoUser) {
  if (user.role === "super_admin") return campuses;
  return campuses.filter((c) => c.city === user.campus || c.city === "Hyderabad");
}

export function scopedWorkflows(user: DemoUser) {
  if (user.role === "super_admin") return workflows;
  if (user.role === "principal") return workflows.filter((w) => w.module === "Admissions" || w.module === "Leave");
  if (user.role === "accountant") return workflows.filter((w) => w.module === "Fees");
  if (user.role === "hr") return workflows.filter((w) => w.module === "Leave");
  if (user.role === "teacher") return workflows.filter((w) => w.module === "Leave");
  return [];
}

export function scopedCirculars(user: DemoUser) {
  if (user.role === "parent") return circulars.filter((c) => c.audience === "Parents" || c.audience === "all");
  if (user.role === "teacher") return circulars.filter((c) => c.audience === "Teachers" || c.audience === "Parents");
  return circulars;
}

export function scopedNotifications(user: DemoUser) {
  if (user.role === "parent") {
    return [
      { title: "Fee reminder", body: "Term installment for Arjun Reddy is pending.", time: "2h ago" },
      { title: "Homework due", body: "Science lab report due 7 Aug.", time: "Yesterday" },
      { title: "PTM scheduled", body: "Parent-Teacher Meeting this Saturday 9 AM–1 PM.", time: "2d ago" },
    ];
  }
  if (user.role === "student") {
    return [
      { title: "Homework", body: "Quadratic equations worksheet due 6 Aug.", time: "1h ago" },
      { title: "Exam schedule", body: "Term 1 English on 24 Aug — Hall-1.", time: "Yesterday" },
      { title: "Library", body: "Physics book due 5 Aug.", time: "2d ago" },
    ];
  }
  if (user.role === "teacher") {
    return [
      { title: "Class 10-A", body: "2 students marked late today.", time: "1h ago" },
      { title: "Marks entry", body: "Science Unit Test window closes Friday.", time: "Yesterday" },
      { title: "Invigilation", body: "You are assigned Hall-1 on 24 Aug.", time: "2d ago" },
    ];
  }
  if (user.role === "accountant") {
    return [
      { title: "Overdue fees", body: "Kabir Singh invoice overdue since 10 Jul.", time: "1h ago" },
      { title: "Collection", body: "₹1.8L collected this week (Hyderabad).", time: "Yesterday" },
    ];
  }
  if (user.role === "hr") {
    return [
      { title: "Payroll", body: "July payroll processed for 5 staff.", time: "2h ago" },
      { title: "Leave", body: "1 leave request pending teacher review.", time: "Yesterday" },
    ];
  }
  if (user.role === "principal") {
    return [
      { title: "Admission approval", body: "Seat confirmation waiting for Grade 9.", time: "1h ago" },
      { title: "Campus pulse", body: "Hyderabad: 2,140 students · 4 absent today.", time: "Today" },
    ];
  }
  return notifications;
}

export function roleLabel(role: Role) {
  return role.replaceAll("_", " ");
}

export function dashboardMeta(user: DemoUser) {
  switch (user.role) {
    case "super_admin":
      return {
        eyebrow: "Organization overview",
        title: "All campuses",
        subtitle: "Network-wide admissions, fees, attendance, and staffing.",
      };
    case "principal":
      return {
        eyebrow: "Principal desk",
        title: `${user.campus} campus`,
        subtitle: "Approvals, academics, and campus health for your branch.",
      };
    case "teacher":
      return {
        eyebrow: "Teacher desk",
        title: "Class 10-A",
        subtitle: "Your section roster, attendance, marks, and homework.",
      };
    case "parent":
      return {
        eyebrow: "Parent portal",
        title: linkedStudent(user)?.full_name || "My child",
        subtitle: "Attendance, fees, results, and homework for your child.",
      };
    case "student":
      return {
        eyebrow: "Student portal",
        title: `Hi, ${user.full_name.split(" ")[0]}`,
        subtitle: "Your timetable, grades, fees, and homework.",
      };
    case "accountant":
      return {
        eyebrow: "Accounts desk",
        title: "Fee collections",
        subtitle: "Invoices, dues, and receipts for Hyderabad campus.",
      };
    case "hr":
      return {
        eyebrow: "HR desk",
        title: "People & payroll",
        subtitle: "Staff records, leave, and monthly payroll runs.",
      };
  }
}

export function roleStats(user: DemoUser) {
  const scoped = scopedStudents(user);
  const fees = scopedFees(user);
  const att = scopedAttendance(user);
  const adm = scopedAdmissions(user);
  const paid = fees.filter((f) => f.status === "paid").reduce((s, f) => s + f.net, 0);
  const pending = fees.filter((f) => f.status !== "paid").reduce((s, f) => s + f.net, 0);
  const present = att.filter((a) => a.status === "present").length;
  const absent = att.filter((a) => a.status === "absent" || a.status === "late").length;

  switch (user.role) {
    case "super_admin":
      return [
        { label: "Campuses", value: String(summary.campuses), hint: "Active branches" },
        { label: "Students", value: summary.students.toLocaleString("en-IN"), hint: "Network enrolled" },
        { label: "Staff", value: String(summary.employees), hint: "All campuses" },
        { label: "Admissions", value: String(summary.admissions), hint: "Open pipeline" },
        { label: "Fees collected", value: `₹${(summary.feesCollected / 1e7).toFixed(2)} Cr`, hint: "YTD" },
        { label: "Fees pending", value: `₹${(summary.feesPending / 1e7).toFixed(2)} Cr`, hint: "Outstanding" },
        { label: "Present today", value: summary.presentToday.toLocaleString("en-IN"), hint: `${summary.absentToday} absent` },
        { label: "Workflows", value: String(summary.openWorkflows), hint: "Awaiting approval" },
      ];
    case "principal": {
      const hyd = campuses.find((c) => c.city === "Hyderabad");
      return [
        { label: "Students", value: String(hyd?.students ?? scoped.length), hint: "Hyderabad enrolled" },
        { label: "Admissions", value: String(adm.length), hint: "Campus applications" },
        { label: "Pending approvals", value: String(scopedWorkflows(user).filter((w) => w.status === "pending").length), hint: "Your queue" },
        { label: "Fee dues", value: `₹${pending.toLocaleString("en-IN")}`, hint: "Open invoices" },
        { label: "Present (sample)", value: String(present), hint: `${absent} absent/late` },
        { label: "Staff on campus", value: String(employees.length), hint: "Hyderabad sample" },
      ];
    }
    case "teacher": {
      const cls = teacherClassStudents();
      return [
        { label: "Class strength", value: String(cls.length), hint: "Grade 10-A" },
        { label: "Present (records)", value: String(present), hint: "Recent marks" },
        { label: "Absent / late", value: String(absent), hint: "Needs follow-up" },
        { label: "Homework live", value: String(scopedHomework(user).length), hint: "Assigned by you" },
        { label: "Grade entries", value: String(scopedGrades(user).length), hint: "Class assessments" },
        { label: "Invigilations", value: "1", hint: "Term 1 Hall-1" },
      ];
    }
    case "parent": {
      const child = linkedStudent(user);
      const childFees = fees;
      return [
        { label: "Child", value: child?.full_name.split(" ")[0] || "—", hint: `${child?.grade}-${child?.section}` },
        { label: "Attendance", value: String(present), hint: `${absent} issues in sample` },
        { label: "Fee due", value: `₹${pending.toLocaleString("en-IN")}`, hint: childFees.find((f) => f.status !== "paid")?.status || "clear" },
        { label: "Homework", value: String(scopedHomework(user).length), hint: "Open tasks" },
        { label: "Avg grade", value: "A", hint: "Recent assessments" },
        { label: "Library", value: String(scopedLibraryIssues(user).length), hint: "Active issues" },
      ];
    }
    case "student": {
      const me = linkedStudent(user);
      return [
        { label: "Class", value: me ? `${me.grade}-${me.section}` : "—", hint: me?.roll },
        { label: "Attendance", value: String(present), hint: "Recent days present" },
        { label: "Fee status", value: fees[0]?.status || "—", hint: fees[0] ? `₹${fees[0].net}` : "" },
        { label: "Homework", value: String(scopedHomework(user).length), hint: "Due soon" },
        { label: "Subjects graded", value: String(new Set(scopedGrades(user).map((g) => g.subject)).size), hint: "This term" },
        { label: "Books out", value: String(scopedLibraryIssues(user).length), hint: "Library" },
      ];
    }
    case "accountant":
      return [
        { label: "Invoices", value: String(fees.length), hint: "Hyderabad sample" },
        { label: "Collected", value: `₹${paid.toLocaleString("en-IN")}`, hint: "Paid invoices" },
        { label: "Pending", value: `₹${pending.toLocaleString("en-IN")}`, hint: "Dues + overdue" },
        { label: "Overdue", value: String(fees.filter((f) => f.status === "overdue").length), hint: "Needs chase" },
        { label: "Students billed", value: String(new Set(fees.map((f) => f.student)).size), hint: "Unique" },
        { label: "Structures", value: String(feeStructures.length), hint: "Active plans" },
      ];
    case "hr":
      return [
        { label: "Employees", value: String(employees.length), hint: "Campus staff" },
        { label: "Payroll runs", value: String(payroll.length), hint: "July 2026" },
        { label: "Net paid", value: `₹${payroll.reduce((s, p) => s + p.net, 0).toLocaleString("en-IN")}`, hint: "Processed" },
        { label: "Leave queue", value: String(scopedWorkflows(user).filter((w) => w.status === "pending").length), hint: "Pending" },
        { label: "Departments", value: "5", hint: "Admin to Sports" },
        { label: "Active", value: String(employees.filter((e) => e.status === "active").length), hint: "On roll" },
      ];
  }
}

export function roleQuickLinks(user: DemoUser): { href: string; label: string }[] {
  switch (user.role) {
    case "super_admin":
      return [
        { href: "/campuses", label: "Campuses" },
        { href: "/admissions", label: "Admissions" },
        { href: "/fees", label: "Fees" },
        { href: "/analytics", label: "Analytics" },
      ];
    case "principal":
      return [
        { href: "/workflows", label: "Approvals" },
        { href: "/admissions", label: "Admissions" },
        { href: "/students", label: "Students" },
        { href: "/attendance", label: "Attendance" },
      ];
    case "teacher":
      return [
        { href: "/attendance", label: "Mark attendance" },
        { href: "/grades", label: "Enter grades" },
        { href: "/homework", label: "Homework" },
        { href: "/students", label: "Class roster" },
      ];
    case "parent":
      return [
        { href: "/fees", label: "Fee dues" },
        { href: "/attendance", label: "Attendance" },
        { href: "/grades", label: "Results" },
        { href: "/homework", label: "Homework" },
      ];
    case "student":
      return [
        { href: "/timetable", label: "Timetable" },
        { href: "/homework", label: "Homework" },
        { href: "/grades", label: "My grades" },
        { href: "/exams", label: "Exams" },
      ];
    case "accountant":
      return [
        { href: "/fees", label: "Invoices" },
        { href: "/students", label: "Students" },
        { href: "/workflows", label: "Concessions" },
        { href: "/analytics", label: "Collections" },
      ];
    case "hr":
      return [
        { href: "/hr", label: "Employees" },
        { href: "/workflows", label: "Leave queue" },
        { href: "/settings", label: "Settings" },
        { href: "/notifications", label: "Alerts" },
      ];
  }
}

export {
  admissionByStatus,
  attendanceByStatus,
  transport,
  feeStructures,
  complaints,
  scopedCirculars as circularsFor,
};
