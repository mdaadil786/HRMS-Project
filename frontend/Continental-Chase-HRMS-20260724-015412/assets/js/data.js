window.CC_DATA = {
  company: {
    name: "Continental Chase",
    org: "People Operations",
    location: "New York, NY",
    payrollReadiness: 94,
    approvals: 6,
    interviewsToday: 3
  },
  profile: {

    initials: "SS",

    name: "Sarah Spencer",

    designation: "VP, People Operations",

    employeeId: "CC-1001",

    department: "People Operations",

    email: "sarah.spencer@continentalchase.com",

    phone: "+1 (555) 234-6789",

    location: "New York",

    dob: "14 Jan 1991",

    gender: "Female",

    bloodGroup: "B+",

    nationality: "American",

    maritalStatus: "Married",

    manager: "CEO",

    joiningDate: "2020-03-18",

    employmentType: "Full Time"

  },
  employees: [
    { id: "CC-1048", name: "Amelia Hart", initials: "AH", photo: "AH", department: "Engineering", designation: "Frontend Lead", manager: "Priya Nair", joiningDate: "2022-04-18", status: "Active", salaryBand: "Band 5", workMode: "Office", attendance: "Present", leaveBalance: 18 },
    { id: "CC-1132", name: "Marcus Lee", initials: "ML", photo: "ML", department: "Product", designation: "Product Manager", manager: "Sarah Spencer", joiningDate: "2023-08-07", status: "Active", salaryBand: "Band 6", workMode: "Remote", attendance: "Present", leaveBalance: 21 },
    { id: "CC-1186", name: "Priya Nair", initials: "PN", photo: "PN", department: "People", designation: "Talent Partner", manager: "Sarah Spencer", joiningDate: "2024-01-15", status: "Active", salaryBand: "Band 4", workMode: "Office", attendance: "Late", leaveBalance: 14 },
    { id: "CC-1221", name: "Noah Bennett", initials: "NB", photo: "NB", department: "Sales", designation: "Enterprise AE", manager: "Daniel Brooks", joiningDate: "2021-11-03", status: "Active", salaryBand: "Band 5", workMode: "Client Visit", attendance: "Field Visit", leaveBalance: 12 },
    { id: "CC-1240", name: "Olivia Chen", initials: "OC", photo: "OC", department: "Finance", designation: "Payroll Analyst", manager: "Ethan Rivera", joiningDate: "2023-05-22", status: "Active", salaryBand: "Band 4", workMode: "Office", attendance: "Present", leaveBalance: 16 },
    { id: "CC-1267", name: "Daniel Brooks", initials: "DB", photo: "DB", department: "Operations", designation: "Facilities Manager", manager: "Sarah Spencer", joiningDate: "2020-09-28", status: "Active", salaryBand: "Band 5", workMode: "Office", attendance: "Checked Out", leaveBalance: 9 },
    { id: "CC-1294", name: "Sophia Patel", initials: "SP", photo: "SP", department: "Marketing", designation: "Growth Specialist", manager: "Marcus Lee", joiningDate: "2024-10-11", status: "Active", salaryBand: "Band 3", workMode: "Remote", attendance: "On Leave", leaveBalance: 24 },
    { id: "CC-1328", name: "Ethan Rivera", initials: "ER", photo: "ER", department: "Engineering", designation: "QA Engineer", manager: "Amelia Hart", joiningDate: "2025-02-17", status: "Probation", salaryBand: "Band 3", workMode: "Hybrid", attendance: "Absent", leaveBalance: 10 },
    { id: "CC-1342", name: "Grace Turner", initials: "GT", photo: "GT", department: "Recruitment", designation: "Recruiter", manager: "Priya Nair", joiningDate: "2025-06-02", status: "Active", salaryBand: "Band 3", workMode: "Office", attendance: "Present", leaveBalance: 19 },
    { id: "CC-1370", name: "Arjun Mehta", initials: "AM", photo: "AM", department: "Security", designation: "Compliance Analyst", manager: "Daniel Brooks", joiningDate: "2026-03-09", status: "Active", salaryBand: "Band 4", workMode: "Remote", attendance: "Present", leaveBalance: 15 },
    { id: "CC-1384", name: "Mina Kapoor", initials: "MK", photo: "MK", department: "Finance", designation: "Accounts Lead", manager: "Olivia Chen", joiningDate: "2022-12-12", status: "Active", salaryBand: "Band 5", workMode: "Hybrid", attendance: "Present", leaveBalance: 11 },
    { id: "CC-1396", name: "Rafael Costa", initials: "RC", photo: "RC", department: "Support", designation: "Client Success Lead", manager: "Noah Bennett", joiningDate: "2023-03-20", status: "Active", salaryBand: "Band 4", workMode: "Remote", attendance: "On Leave", leaveBalance: 7 },
    { id: "CC-1405", name: "Hannah Wells", initials: "HW", photo: "HW", department: "Engineering", designation: "DevOps Engineer", manager: "Amelia Hart", joiningDate: "2024-07-08", status: "Active", salaryBand: "Band 5", workMode: "Office", attendance: "Late", leaveBalance: 13 },
    { id: "CC-1417", name: "Ibrahim Khan", initials: "IK", photo: "IK", department: "Legal", designation: "Employment Counsel", manager: "Sarah Spencer", joiningDate: "2021-06-14", status: "Notice", salaryBand: "Band 6", workMode: "Office", attendance: "Present", leaveBalance: 22 }
  ],
  metrics: [
    { label: "Total Employees", value: 428, delta: "+12 this month", tone: "blue", icon: "fa-users" },
    { label: "Present Today", value: 356, delta: "83% attendance", tone: "green", icon: "fa-user-check" },
    { label: "Remote Employees", value: 86, delta: "+9 this week", tone: "indigo", icon: "fa-house-laptop" },
    { label: "Working from Office", value: 238, delta: "56% of workforce", tone: "cyan", icon: "fa-building-user" },
    { label: "Employees on Leave", value: 29, delta: "-3 vs last week", tone: "amber", icon: "fa-plane-departure" },
    { label: "Absent Employees", value: 11, delta: "-2 today", tone: "red", icon: "fa-user-xmark" },
    { label: "Late Check-ins", value: 18, delta: "3 need review", tone: "orange", icon: "fa-clock" },
    { label: "Overtime Employees", value: 44, delta: "6 approvals", tone: "slate", icon: "fa-business-time" },
    { label: "New Joinees", value: 15, delta: "5 this week", tone: "green", icon: "fa-user-plus" },
    { label: "Upcoming Exits", value: 7, delta: "2 offboarding tasks", tone: "pink", icon: "fa-door-open" }
  ],
  workforce: [
    { label: "Working from Office", value: 238, total: 428, status: "On-site", tone: "blue" },
    { label: "Working Remotely", value: 86, total: 428, status: "Hybrid", tone: "green" },
    { label: "Client Visits", value: 32, total: 428, status: "Field", tone: "purple" },
    { label: "On Leave", value: 29, total: 428, status: "Approved", tone: "amber" },
    { label: "Checked Out", value: 21, total: 428, status: "Completed", tone: "slate" },
    { label: "Not Checked In", value: 22, total: 428, status: "Needs review", tone: "red" }
  ],
  attendance: {
    today: [
      { id: "CC-1048", name: "Amelia Hart", department: "Engineering", mode: "Office", checkIn: "09:01 AM", checkOut: "06:08 PM", status: "Present", hours: "9h 07m", regularizationsUsed: 0, regularizationsMax: 5 },
      { id: "CC-1132", name: "Marcus Lee", department: "Product", mode: "Remote", checkIn: "08:54 AM", checkOut: "05:42 PM", status: "Present", hours: "8h 48m", regularizationsUsed: 1, regularizationsMax: 5 },
      { id: "CC-1186", name: "Priya Nair", department: "People", mode: "Office", checkIn: "09:41 AM", checkOut: "06:11 PM", status: "Late", hours: "8h 30m", regularizationsUsed: 2, regularizationsMax: 5 },
      { id: "CC-1221", name: "Noah Bennett", department: "Sales", mode: "Field Visit", checkIn: "09:18 AM", checkOut: "06:20 PM", status: "Field Visit", hours: "9h 02m", regularizationsUsed: 0, regularizationsMax: 5 },
      { id: "CC-1294", name: "Sophia Patel", department: "Marketing", mode: "Remote", checkIn: "-", checkOut: "-", status: "On Leave", hours: "0h", regularizationsUsed: 0, regularizationsMax: 5 },
      { id: "CC-1328", name: "Ethan Rivera", department: "Engineering", mode: "Hybrid", checkIn: "-", checkOut: "-", status: "Absent", hours: "0h", regularizationsUsed: 3, regularizationsMax: 5 },
      { id: "CC-1342", name: "Grace Turner", department: "Recruitment", mode: "Office", checkIn: "-", checkOut: "06:03 PM", status: "Missing Check-In", hours: "0h", regularizationsUsed: 1, regularizationsMax: 5 },
      { id: "CC-1370", name: "Arjun Mehta", department: "Security", mode: "Remote", checkIn: "09:07 AM", checkOut: "-", status: "Missing Check-Out", hours: "7h 55m", regularizationsUsed: 5, regularizationsMax: 5 },
      { id: "CC-1384", name: "Mina Kapoor", department: "Finance", mode: "Office", checkIn: "08:36 AM", checkOut: "07:12 PM", status: "Overtime", hours: "10h 36m", regularizationsUsed: 2, regularizationsMax: 5 },
      { id: "CC-1396", name: "Rafael Costa", department: "Support", mode: "Remote", checkIn: "09:04 AM", checkOut: "05:58 PM", status: "Regularized", hours: "8h 54m", regularizationsUsed: 1, regularizationsMax: 5 },
      { id: "CC-1405", name: "Hannah Wells", department: "Engineering", mode: "Office", checkIn: "09:32 AM", checkOut: "06:04 PM", status: "Late", hours: "8h 32m", regularizationsUsed: 0, regularizationsMax: 5 },
      { id: "CC-1417", name: "Ibrahim Khan", department: "Legal", mode: "Office", checkIn: "08:58 AM", checkOut: "05:51 PM", status: "Present", hours: "8h 53m", regularizationsUsed: 4, regularizationsMax: 5 }
    ],
    summary: [
      { label: "Present", value: 356, tone: "green" },
      { label: "Absent", value: 11, tone: "red" },
      { label: "Late", value: 18, tone: "orange" },
      { label: "Remote", value: 86, tone: "blue" },
      { label: "Office", value: 238, tone: "indigo" }
    ],
    activity: ["Amelia Hart checked in from NYC HQ", "Three late check-ins routed to managers", "Remote IP verification completed for 81 employees", "Facilities marked 21 employees checked out"],
    weeklyTrend: [81, 84, 83, 86, 82, 61, 52],
    monthly: [92, 88, 91, 86, 89, 83, 87, 90, 85, 88, 91, 83],
    regularizations: [
      { employee: "Rafael Costa", by: "Sarah Spencer", reason: "Forgot to check out after office hours.", date: "Today", time: "02:45 PM", status: "Approved" },
      { employee: "Mina Kapoor", by: "Sarah Spencer", reason: "Manager approved corrected shift timing.", date: "Today", time: "12:20 PM", status: "Approved" },
      { employee: "Priya Nair", by: "Sarah Spencer", reason: "Biometric terminal was unavailable at reception.", date: "Yesterday", time: "05:18 PM", status: "Approved" }
    ]
  },
  leave: {
    balances: [
      { type: "Casual Leave", used: 35, total: 96 },
      { type: "Sick Leave", used: 25, total: 80 },
      { type: "Earned Leave", used: 62, total: 120 },
      { type: "Unpaid Leave", used: 15, total: 60 }
    ],
    requests: [
      { employee: "Sophia Patel", type: "Vacation Leave", dates: "Jul 24 - Jul 29", reason: "Family travel", manager: "Marcus Lee", initials: "SP" },
      { employee: "Rafael Costa", type: "Sick Leave", dates: "Jul 21 - Jul 22", reason: "Medical recovery", manager: "Noah Bennett", initials: "RC" },
      { employee: "Mina Kapoor", type: "Earned Leave", dates: "Aug 01 - Aug 05", reason: "Personal commitments", manager: "Olivia Chen", initials: "MK" }
    ],
    history: [
      { employee: "Grace Turner", type: "Casual Leave", date: "Jul 12", status: "Approved" },
      { employee: "Daniel Brooks", type: "Compensatory Leave", date: "Jul 15", status: "Approved" },
      { employee: "Ethan Rivera", type: "Sick Leave", date: "Jul 19", status: "Rejected" }
    ],
    stats: [35, 25, 62, 48, 18, 15]
  },
  payroll: {
    summary: [
      { label: "Monthly Payroll", value: 1394000, context: "July 2026 gross" },
      { label: "Bonuses", value: 128000, context: "Performance and referral" },
      { label: "Deductions", value: 82000, context: "Tax, benefits, retirement" },
      { label: "Upcoming Payroll", value: 7, context: "Days until processing" }
    ],
    monthly: [1180, 1214, 1238, 1296, 1322, 1360, 1394],
    distribution: [42, 110, 138, 91, 35, 12],
    payslips: [
      { period: "June 2026", processed: 428, exceptions: 4, status: "Completed" },
      { period: "May 2026", processed: 421, exceptions: 2, status: "Completed" },
      { period: "April 2026", processed: 409, exceptions: 6, status: "Completed" }
    ]
  },
  recruitment: {
    positions: [
      { title: "Senior Backend Engineer", department: "Engineering", location: "New York", stage: "Interviewing", candidates: 32 },
      { title: "People Systems Analyst", department: "People", location: "Remote", stage: "Screening", candidates: 18 },
      { title: "Enterprise Account Executive", department: "Sales", location: "Chicago", stage: "Offer", candidates: 21 },
      { title: "Payroll Specialist", department: "Finance", location: "New York", stage: "Open", candidates: 14 }
    ],
    candidates: [
      { name: "Elena Morris", role: "Senior Backend Engineer", source: "Referral", stage: "Technical Interview", score: 91 },
      { name: "Victor Singh", role: "Payroll Specialist", source: "LinkedIn", stage: "HR Screen", score: 84 },
      { name: "Aisha Robinson", role: "People Systems Analyst", source: "Careers Site", stage: "Panel", score: 88 },
      { name: "Luca Romano", role: "Enterprise AE", source: "Agency", stage: "Offer Sent", score: 93 }
    ],
    interviews: [
      { time: "10:00 AM", candidate: "Elena Morris", panel: "Engineering panel" },
      { time: "01:30 PM", candidate: "Aisha Robinson", panel: "People systems" },
      { time: "04:00 PM", candidate: "Luca Romano", panel: "Sales leadership" }
    ],
    pipeline: [245, 98, 45, 16, 7],
    offers: [7, 5, 3, 1]
  },
  performance: {
    departmentKpis: [
      { department: "Engineering", score: 88, goals: 94 },
      { department: "Sales", score: 82, goals: 87 },
      { department: "Marketing", score: 79, goals: 84 },
      { department: "People", score: 91, goals: 96 },
      { department: "Finance", score: 86, goals: 89 }
    ],
    distribution: [42, 126, 184, 61, 15],
    goals: [
      { owner: "Amelia Hart", goal: "Reduce frontend incident rate", progress: 76 },
      { owner: "Marcus Lee", goal: "Launch manager self-service", progress: 68 },
      { owner: "Priya Nair", goal: "Shorten onboarding cycle", progress: 84 }
    ],
    reviews: [
      { name: "Q3 Check-in", due: "Aug 15", status: "Open" },
      { name: "Engineering calibration", due: "Aug 22", status: "Scheduled" },
      { name: "Leadership succession review", due: "Sep 03", status: "Draft" }
    ],
    topPerformers: ["Priya Nair", "Amelia Hart", "Luca Santos", "Mina Kapoor"]
  },
  reports: [
    { name: "Attendance Report", owner: "People Operations", updated: "Jul 21, 2026", format: "CSV, PDF" },
    { name: "Payroll Report", owner: "Finance", updated: "Jul 20, 2026", format: "Excel, PDF" },
    { name: "Hiring Report", owner: "Recruitment", updated: "Jul 19, 2026", format: "CSV" },
    { name: "Department Report", owner: "Operations", updated: "Jul 18, 2026", format: "Excel" }
  ],
  notifications: [
    { label: "Employee checked in", meta: "Amelia Hart, 09:01 AM", tone: "green", icon: "fa-user-check" },
    { label: "Leave approved", meta: "Manager approved 2 requests", tone: "blue", icon: "fa-calendar-check" },
    { label: "New employee joined", meta: "Arjun Mehta starts today", tone: "purple", icon: "fa-user-plus" },
    { label: "Payroll completed", meta: "June payroll batch closed", tone: "amber", icon: "fa-money-check-dollar" },
    { label: "Birthday", meta: "Wish Grace Turner today", tone: "pink", icon: "fa-cake-candles" },
    { label: "Work anniversary", meta: "Noah Bennett, 5 years", tone: "teal", icon: "fa-award" }
  ],
  announcements: [
    { title: "Benefits enrollment opens July 28", date: "Jul 21, 2026" },
    { title: "Hybrid work policy refresh published", date: "Jul 18, 2026" },
    { title: "Office closed for maintenance on Aug 2", date: "Jul 17, 2026" }
  ],
  announcementFeed: [
    {
      id: "ann-101",
      author: "Sarah Spencer",
      department: "People Operations",
      date: "Jul 21, 2026",
      title: "Quarterly Town Hall Highlights",
      description: "Thank you to every team that joined today's town hall. Leadership shared Q3 priorities, people programs, and recognition moments from across Continental Chase.",
      tags: ["Town Hall", "Leadership", "Company News"],
      likes: 184,
      comments: 32,
      shares: 11,
      avatar: "SS",
      departmentLogo: "PO",
      companyLogo: "CC",
      images: [
        "assets/images/announcement-townhall.svg",
        "assets/images/announcement-collaboration.svg"
      ]
    },
    {
      id: "ann-102",
      author: "Grace Turner",
      department: "Recruitment",
      date: "Jul 18, 2026",
      title: "Welcome New Employees",
      description: "A warm welcome to our July cohort. New team members joined Engineering, Finance, People Operations, and Client Success this week.",
      tags: ["Onboarding", "New Joiners"],
      likes: 126,
      comments: 18,
      shares: 7,
      avatar: "GT",
      departmentLogo: "TA",
      companyLogo: "CC",
      images: [
        "assets/images/announcement-onboarding.svg"
      ]
    },
    {
      id: "ann-103",
      author: "Daniel Brooks",
      department: "Operations",
      date: "Jul 15, 2026",
      title: "Sports Day and CSR Week",
      description: "Facilities and People Operations have published the full schedule for Sports Day, volunteer activities, and CSR week celebrations.",
      tags: ["Events", "CSR", "Culture"],
      likes: 203,
      comments: 41,
      shares: 16,
      avatar: "DB",
      departmentLogo: "OP",
      companyLogo: "CC",
      images: [
        "assets/images/announcement-csr.svg",
        "assets/images/announcement-collaboration.svg"
      ]
    }
  ],
  events: [
    { date: "Jul 22", label: "Policy training", type: "Company Event" },
    { date: "Jul 25", label: "Payroll processing", type: "Payroll" },
    { date: "Jul 28", label: "New joinee orientation", type: "Onboarding" },
    { date: "Aug 01", label: "Performance review cycle", type: "Performance" }
  ],
  calendar: [
    { day: 4, type: "holiday", label: "Independence Day" },
    { day: 8, type: "event", label: "Town Hall" },
    { day: 14, type: "birthday", label: "Grace birthday" },
    { day: 18, type: "leave", label: "Approved Leave" },
    { day: 21, type: "meeting", label: "Leadership Sync" },
    { day: 29, type: "event", label: "Benefits Webinar" }
  ]
};
