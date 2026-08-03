/** Static demo data for MIA Campus portfolio site — MIA Solutions Pvt. Ltd. */

export const COMPANY = "MIA Solutions Pvt. Ltd.";
export const APP_NAME = "MIA Campus";

export const DEMO_ACCOUNTS = [
  { email: "admin@miasolutions.test", password: "Test@1234", full_name: "Aisha Khan", role: "super_admin", campus: "All campuses" },
  { email: "principal.hyd@miasolutions.test", password: "Test@1234", full_name: "Priya Sharma", role: "principal", campus: "Hyderabad" },
  { email: "teacher.hyd@miasolutions.test", password: "Test@1234", full_name: "Rahul Mehta", role: "teacher", campus: "Hyderabad" },
  { email: "parent.demo@miasolutions.test", password: "Test@1234", full_name: "Ananya Reddy", role: "parent", campus: "Hyderabad" },
  { email: "student.demo@miasolutions.test", password: "Test@1234", full_name: "Arjun Reddy", role: "student", campus: "Hyderabad" },
  { email: "accounts.hyd@miasolutions.test", password: "Test@1234", full_name: "Suresh Iyer", role: "accountant", campus: "Hyderabad" },
  { email: "hr.hyd@miasolutions.test", password: "Test@1234", full_name: "Meera Nair", role: "hr", campus: "Hyderabad" },
] as const;

export type DemoUser = (typeof DEMO_ACCOUNTS)[number];

export const campuses = [
  { id: 1, code: "MIA-HYD", name: "MIA Campus — Hyderabad", city: "Hyderabad", state: "Telangana", curriculum: "CBSE", capacity: 2800, students: 2140, status: "active" },
  { id: 2, code: "MIA-BLR", name: "MIA Campus — Bengaluru", city: "Bengaluru", state: "Karnataka", curriculum: "ICSE", capacity: 2200, students: 1860, status: "active" },
  { id: 3, code: "MIA-CHN", name: "MIA Campus — Chennai", city: "Chennai", state: "Tamil Nadu", curriculum: "CBSE", capacity: 2000, students: 1620, status: "active" },
  { id: 4, code: "MIA-PUN", name: "MIA Campus — Pune", city: "Pune", state: "Maharashtra", curriculum: "IB", capacity: 1800, students: 1410, status: "active" },
  { id: 5, code: "MIA-DEL", name: "MIA Campus — Delhi", city: "Delhi", state: "Delhi", curriculum: "CBSE", capacity: 2500, students: 2010, status: "active" },
  { id: 6, code: "MIA-MUM", name: "MIA Campus — Mumbai", city: "Mumbai", state: "Maharashtra", curriculum: "ICSE", capacity: 2300, students: 1780, status: "active" },
];

export const summary = {
  campuses: campuses.length,
  students: 10820,
  employees: 842,
  admissions: 486,
  pendingFees: 312,
  feesCollected: 4.2e7,
  feesPending: 1.15e7,
  presentToday: 9680,
  absentToday: 214,
  openWorkflows: 18,
};

export const students = [
  { id: 1, student_id: "STU-HYD-1001", full_name: "Arjun Reddy", grade: "10", section: "A", roll: "10A01", campus: "Hyderabad", status: "active", gender: "male", dob: "2010-04-12", blood: "O+", scholarship: "MERIT25", rfid: "RFID001001", address: "12 Jubilee Hills, Hyderabad", medical: null, phone: "+91 98765 10001",
    guardians: [{ name: "Ananya Reddy", relation: "Mother", phone: "+91 98765 20001", email: "parent.demo@miasolutions.test" }] },
  { id: 2, student_id: "STU-HYD-1002", full_name: "Sara Patel", grade: "10", section: "A", roll: "10A02", campus: "Hyderabad", status: "active", gender: "female", dob: "2010-08-03", blood: "A+", scholarship: null, rfid: "RFID001002", address: "Banjara Hills, Hyderabad", medical: "Allergy — peanuts", phone: "+91 98765 10002",
    guardians: [{ name: "Nikhil Patel", relation: "Father", phone: "+91 98765 20002", email: "nikhil@example.com" }] },
  { id: 3, student_id: "STU-HYD-1003", full_name: "Kabir Singh", grade: "9", section: "B", roll: "09B04", campus: "Hyderabad", status: "active", gender: "male", dob: "2011-01-22", blood: "B+", scholarship: "NEED15", rfid: "RFID001003", address: "Gachibowli, Hyderabad", medical: null, phone: "+91 98765 10003",
    guardians: [{ name: "Ritu Singh", relation: "Mother", phone: "+91 98765 20003", email: "ritu@example.com" }] },
  { id: 4, student_id: "STU-BLR-2044", full_name: "Meera Iyer", grade: "11", section: "C", roll: "11C08", campus: "Bengaluru", status: "active", gender: "female", dob: "2009-11-15", blood: "AB+", scholarship: null, rfid: "RFID002044", address: "Indiranagar, Bengaluru", medical: "Asthma", phone: "+91 98765 10004",
    guardians: [{ name: "Suresh Iyer", relation: "Father", phone: "+91 98765 20004", email: "suresh@example.com" }] },
  { id: 5, student_id: "STU-CHN-3112", full_name: "Dev Krishnan", grade: "8", section: "A", roll: "08A12", campus: "Chennai", status: "active", gender: "male", dob: "2012-06-09", blood: "O-", scholarship: null, rfid: "RFID003112", address: "Adyar, Chennai", medical: null, phone: "+91 98765 10005",
    guardians: [{ name: "Lakshmi Krishnan", relation: "Mother", phone: "+91 98765 20005", email: "lakshmi@example.com" }] },
  { id: 6, student_id: "STU-PUN-4018", full_name: "Anaya Deshmukh", grade: "12", section: "A", roll: "12A03", campus: "Pune", status: "active", gender: "female", dob: "2008-02-28", blood: "A-", scholarship: "MERIT25", rfid: "RFID004018", address: "Koregaon Park, Pune", medical: null, phone: "+91 98765 10006",
    guardians: [{ name: "Vikram Deshmukh", relation: "Father", phone: "+91 98765 20006", email: "vikram@example.com" }] },
  { id: 7, student_id: "STU-DEL-5099", full_name: "Ishaan Gupta", grade: "7", section: "D", roll: "07D09", campus: "Delhi", status: "active", gender: "male", dob: "2013-09-17", blood: "B-", scholarship: null, rfid: "RFID005099", address: "Saket, New Delhi", medical: null, phone: "+91 98765 10007",
    guardians: [{ name: "Pooja Gupta", relation: "Mother", phone: "+91 98765 20007", email: "pooja@example.com" }] },
  { id: 8, student_id: "STU-MUM-6120", full_name: "Zara Khan", grade: "10", section: "B", roll: "10B11", campus: "Mumbai", status: "active", gender: "female", dob: "2010-12-01", blood: "O+", scholarship: null, rfid: "RFID006120", address: "Bandra West, Mumbai", medical: null, phone: "+91 98765 10008",
    guardians: [{ name: "Imran Khan", relation: "Father", phone: "+91 98765 20008", email: "imran@example.com" }] },
];

export const admissions = [
  { id: 1, no: "APP-HYD-2026001", name: "Riya Sharma", grade: "6", parent: "Amit Sharma", phone: "+91 90000 11111", status: "interview", entrance: 88, merit: 12, campus: "Hyderabad" },
  { id: 2, no: "APP-HYD-2026002", name: "Vivaan Joshi", grade: "9", parent: "Neha Joshi", phone: "+91 90000 11112", status: "approved", entrance: 92, merit: 4, campus: "Hyderabad" },
  { id: 3, no: "APP-BLR-2026010", name: "Aanya Rao", grade: "1", parent: "Kiran Rao", phone: "+91 90000 11113", status: "submitted", entrance: null, merit: null, campus: "Bengaluru" },
  { id: 4, no: "APP-CHN-2026022", name: "Rohan Nair", grade: "11", parent: "Deepa Nair", phone: "+91 90000 11114", status: "enrolled", entrance: 95, merit: 2, campus: "Chennai" },
  { id: 5, no: "APP-DEL-2026031", name: "Myra Kapoor", grade: "4", parent: "Raj Kapoor", phone: "+91 90000 11115", status: "waitlisted", entrance: 76, merit: 48, campus: "Delhi" },
  { id: 6, no: "APP-PUN-2026015", name: "Advait Kulkarni", grade: "8", parent: "Sneha Kulkarni", phone: "+91 90000 11116", status: "assessment", entrance: 81, merit: null, campus: "Pune" },
  { id: 7, no: "APP-MUM-2026040", name: "Kiara Mehta", grade: "10", parent: "Pooja Mehta", phone: "+91 90000 11117", status: "verification", entrance: null, merit: null, campus: "Mumbai" },
  { id: 8, no: "APP-HYD-2026055", name: "Aarav Pillai", grade: "7", parent: "Sanjay Pillai", phone: "+91 90000 11118", status: "rejected", entrance: 54, merit: null, campus: "Hyderabad" },
];

export const attendance = [
  { id: 1, date: "2026-08-03", student: "Arjun Reddy", status: "present", mode: "rfid", in: "08:12", out: "14:05" },
  { id: 2, date: "2026-08-03", student: "Sara Patel", status: "late", mode: "biometric", in: "08:41", out: "14:02" },
  { id: 3, date: "2026-08-03", student: "Kabir Singh", status: "absent", mode: "classroom", in: "—", out: "—" },
  { id: 4, date: "2026-08-03", student: "Meera Iyer", status: "present", mode: "qr", in: "08:05", out: "14:10" },
  { id: 5, date: "2026-08-02", student: "Arjun Reddy", status: "present", mode: "rfid", in: "08:09", out: "14:00" },
  { id: 6, date: "2026-08-02", student: "Dev Krishnan", status: "leave", mode: "mobile", in: "—", out: "—" },
  { id: 7, date: "2026-08-02", student: "Zara Khan", status: "present", mode: "bus", in: "07:55", out: "14:15" },
  { id: 8, date: "2026-08-01", student: "Anaya Deshmukh", status: "present", mode: "classroom", in: "08:18", out: "14:08" },
];

export const grades = [
  { student: "Arjun Reddy", subject: "Mathematics", assessment: "Unit Test 1", type: "continuous", marks: 92, max: 100, weight: "20%", letter: "A+" },
  { student: "Arjun Reddy", subject: "Mathematics", assessment: "Mid Term", type: "mid_term", marks: 88, max: 100, weight: "30%", letter: "A" },
  { student: "Arjun Reddy", subject: "Science", assessment: "Assignment", type: "assignment", marks: 95, max: 100, weight: "10%", letter: "A+" },
  { student: "Arjun Reddy", subject: "Science", assessment: "Final Exam", type: "final", marks: 90, max: 100, weight: "40%", letter: "A+" },
  { student: "Sara Patel", subject: "English", assessment: "Unit Test 1", type: "continuous", marks: 84, max: 100, weight: "20%", letter: "A" },
  { student: "Sara Patel", subject: "English", assessment: "Mid Term", type: "mid_term", marks: 79, max: 100, weight: "30%", letter: "B+" },
  { student: "Sara Patel", subject: "Mathematics", assessment: "Final Exam", type: "final", marks: 91, max: 100, weight: "40%", letter: "A+" },
  { student: "Kabir Singh", subject: "Science", assessment: "Mid Term", type: "mid_term", marks: 72, max: 100, weight: "30%", letter: "B" },
  { student: "Zara Khan", subject: "Hindi", assessment: "Unit Test 1", type: "continuous", marks: 86, max: 100, weight: "20%", letter: "A" },
  { student: "Meera Iyer", subject: "Physics", assessment: "Practical", type: "practical", marks: 94, max: 100, weight: "15%", letter: "A+" },
];

export const exams = [
  {
    id: 1,
    name: "Term 1 Examinations — Hyderabad",
    type: "mid_term",
    range: "24 Aug – 3 Sep 2026",
    status: "scheduled",
    schedules: [
      { date: "24 Aug", subject: "English", time: "09:00–12:00", room: "Hall-1", invigilator: "Rahul Mehta" },
      { date: "26 Aug", subject: "Mathematics", time: "09:00–12:00", room: "Hall-2", invigilator: "Priya Sharma" },
      { date: "28 Aug", subject: "Science", time: "09:00–12:00", room: "Hall-1", invigilator: "Suresh Iyer" },
    ],
  },
  {
    id: 2,
    name: "Unit Test 2 — Bengaluru",
    type: "unit",
    range: "12 Aug – 16 Aug 2026",
    status: "published",
    schedules: [
      { date: "12 Aug", subject: "Physics", time: "10:00–12:00", room: "Lab-A", invigilator: "Meera Nair" },
      { date: "14 Aug", subject: "Chemistry", time: "10:00–12:00", room: "Lab-B", invigilator: "Rahul Mehta" },
    ],
  },
];

export const timetable = [
  { day: "Mon", periods: ["English", "Math", "Science", "Break", "SST", "PE"] },
  { day: "Tue", periods: ["Math", "Hindi", "English", "Break", "Science", "Comp"] },
  { day: "Wed", periods: ["Science", "Math", "Art", "Break", "English", "Library"] },
  { day: "Thu", periods: ["SST", "English", "Math", "Break", "Hindi", "Science"] },
  { day: "Fri", periods: ["Math", "Science", "English", "Break", "Comp", "Club"] },
];

export const feeInvoices = [
  { no: "INV-1001-01", student: "Arjun Reddy", grade: "10", net: 18750, due: "2026-07-15", status: "paid" },
  { no: "INV-1002-01", student: "Sara Patel", grade: "10", net: 21250, due: "2026-07-15", status: "pending" },
  { no: "INV-1003-01", student: "Kabir Singh", grade: "9", net: 16250, due: "2026-07-10", status: "overdue" },
  { no: "INV-2044-01", student: "Meera Iyer", grade: "11", net: 23750, due: "2026-08-01", status: "partial" },
  { no: "INV-3112-01", student: "Dev Krishnan", grade: "8", net: 15000, due: "2026-07-20", status: "paid" },
  { no: "INV-4018-01", student: "Anaya Deshmukh", grade: "12", net: 25000, due: "2026-07-25", status: "pending" },
];

export const feeStructures = [
  { name: "Grade 10 Annual", grade: "10", total: 85000, installments: 4 },
  { name: "Grade 11 Annual", grade: "11", total: 95000, installments: 4 },
  { name: "Grade 12 Annual", grade: "12", total: 98000, installments: 4 },
  { name: "Grade 8 Annual", grade: "8", total: 65000, installments: 4 },
];

export const transport = [
  { code: "R1", name: "Jubilee Hills Loop", vehicle: "TS09 AB 2145", driver: "Ramesh", phone: "+91 98888 10001", capacity: 40, stops: 6 },
  { code: "R2", name: "Gachibowli Express", vehicle: "TS09 AB 3312", driver: "Suresh", phone: "+91 98888 10002", capacity: 45, stops: 8 },
  { code: "R3", name: "Secunderabad Line", vehicle: "TS09 AB 4410", driver: "Imran", phone: "+91 98888 10003", capacity: 40, stops: 7 },
];

export const hostel = [
  { name: "Boys Block A", gender: "male", warden: "Vikram Rao", rooms: [
    { no: "A01", occupied: 3, capacity: 4 }, { no: "A02", occupied: 4, capacity: 4 }, { no: "A03", occupied: 2, capacity: 4 }, { no: "A04", occupied: 4, capacity: 4 },
  ]},
  { name: "Girls Block B", gender: "female", warden: "Sunita Reddy", rooms: [
    { no: "B01", occupied: 4, capacity: 4 }, { no: "B02", occupied: 3, capacity: 4 }, { no: "B03", occupied: 1, capacity: 4 }, { no: "B04", occupied: 4, capacity: 4 },
  ]},
];

export const libraryBooks = [
  { title: "Fundamentals of Physics", author: "Resnick", category: "Science", available: "3/5", rfid: "LIB0001" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", available: "2/4", rfid: "LIB0002" },
  { title: "Indian History Vol I", author: "Sharma", category: "History", available: "5/6", rfid: "LIB0003" },
  { title: "Discrete Mathematics", author: "Rosen", category: "Math", available: "1/3", rfid: "LIB0004" },
];

export const libraryIssues = [
  { book: "Fundamentals of Physics", student: "Arjun Reddy", issued: "2026-07-20", due: "2026-08-05", fine: 0, status: "issued" },
  { book: "To Kill a Mockingbird", student: "Sara Patel", issued: "2026-07-10", due: "2026-07-25", fine: 50, status: "overdue" },
  { book: "Discrete Mathematics", student: "Meera Iyer", issued: "2026-07-28", due: "2026-08-12", fine: 0, status: "issued" },
];

export const inventory = [
  { sku: "SKU-101", name: "Lab Microscope", category: "Lab", qty: 18, reorder: 10, low: false },
  { sku: "SKU-204", name: "Class 10 Uniform Set", category: "Uniforms", qty: 6, reorder: 20, low: true },
  { sku: "SKU-310", name: "A4 Notebook Pack", category: "Stationery", qty: 120, reorder: 40, low: false },
  { sku: "SKU-418", name: "Projector", category: "AV", qty: 4, reorder: 5, low: true },
];

export const employees = [
  { id: "EMP-001", name: "Rahul Mehta", designation: "Senior Teacher", dept: "Science", email: "teacher.hyd@miasolutions.test", status: "active" },
  { id: "EMP-002", name: "Priya Sharma", designation: "Principal", dept: "Admin", email: "principal.hyd@miasolutions.test", status: "active" },
  { id: "EMP-003", name: "Meera Nair", designation: "HR Manager", dept: "HR", email: "hr.hyd@miasolutions.test", status: "active" },
  { id: "EMP-004", name: "Suresh Iyer", designation: "Accountant", dept: "Finance", email: "accounts.hyd@miasolutions.test", status: "active" },
  { id: "EMP-005", name: "Anita Das", designation: "Teacher", dept: "English", email: "anita@miasolutions.test", status: "active" },
];

export const payroll = [
  { employee: "Rahul Mehta", month: "2026-07", gross: 72000, deductions: 8640, net: 63360, status: "processed" },
  { employee: "Priya Sharma", month: "2026-07", gross: 125000, deductions: 15000, net: 110000, status: "processed" },
  { employee: "Meera Nair", month: "2026-07", gross: 85000, deductions: 10200, net: 74800, status: "processed" },
  { employee: "Anita Das", month: "2026-07", gross: 58000, deductions: 6960, net: 51040, status: "processed" },
];

export const homework = [
  { title: "Quadratic equations worksheet", subject: "Mathematics", cls: "10-A", due: "2026-08-06", desc: "Complete exercises 1–12 from chapter 4." },
  { title: "Lab report — Optics", subject: "Science", cls: "10-A", due: "2026-08-07", desc: "Submit refraction experiment observations." },
  { title: "Essay: Climate action", subject: "English", cls: "10-B", due: "2026-08-08", desc: "350–400 words, typed on the portal." },
];

export const workflows = [
  { module: "Admissions", step: "Principal approval", status: "pending", comments: "Seat confirmation for Grade 9" },
  { module: "Fees", step: "Concession review", status: "approved", comments: "Sibling discount applied" },
  { module: "Leave", step: "Teacher review", status: "pending", comments: "Medical leave — 3 days" },
];

export const circulars = [
  { title: "PTM — Saturday 9 AM to 1 PM", audience: "Parents", date: "2026-08-01" },
  { title: "Term 2 fee reminder", audience: "Parents", date: "2026-07-28" },
  { title: "Sports day volunteers", audience: "Teachers", date: "2026-07-25" },
];

export const complaints = [
  { category: "Transport", subject: "Bus delay on Route 2", priority: "medium", status: "open" },
  { category: "Academics", subject: "Request for revaluation", priority: "high", status: "pending" },
];

export const notifications = [
  { title: "Welcome to MIA Campus", body: "This is a portfolio demo by MIA Solutions Pvt. Ltd. with sample data.", time: "Just now" },
  { title: "Fee reminder", body: "3 invoices are overdue across Hyderabad campus.", time: "2h ago" },
  { title: "Exam schedule published", body: "Term 1 hall tickets are ready for Grade 10.", time: "Yesterday" },
];

export const auditLogs = [
  { action: "login", entity: "user", detail: "admin@miasolutions.test", time: "2026-08-04 01:10" },
  { action: "view", entity: "students", detail: "Opened student master", time: "2026-08-04 01:12" },
  { action: "export", entity: "fees", detail: "Downloaded pending invoices CSV", time: "2026-08-03 18:40" },
];

export const admissionByStatus = [
  { name: "Submitted", value: 86 },
  { name: "Verification", value: 54 },
  { name: "Assessment", value: 72 },
  { name: "Approved", value: 110 },
  { name: "Enrolled", value: 98 },
  { name: "Waitlisted", value: 41 },
];

export const attendanceByStatus = [
  { name: "Present", value: 9680 },
  { name: "Absent", value: 214 },
  { name: "Late", value: 126 },
  { name: "Leave", value: 88 },
];
