import { BookOpen, CreditCard, ShieldCheck, FileText, CheckCircle, Clock, Key, LucideIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

export interface DocSection {
  title: string;
  content: ReactNode;
}

export interface DocCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  sections: DocSection[];
}

export interface DocGroup {
  title: string;
  items: DocCategory[];
}

export const sections: DocGroup[] = [
  {
    title: "GETTING STARTED",
    items: [
      {
        id: "getting-started",
        label: "Getting Started",
        icon: BookOpen,
        sections: [
          {
            title: "Tools & Work Setup",
            content: (
              <div className="space-y-2">
                <p className="font-semibold text-primary">MUST HAVE:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Desktop/laptop with reliable specs</li>
                  <li>20 Mbps stable internet & backup connection</li>
                  <li>USB noise-cancelling headset with mic</li>
                  <li>Quiet, professional work environment</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Work Hours & Schedule",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Shifts typically run from 11 PM to 9 AM PH time, but can vary per client.</p>
                <p>Changes require mutual agreement and AVS approval.</p>
                <p>You may be assigned new clients - each change comes with a separate contract.</p>
              </div>
            ),
          },
          {
            title: "Attendance & Downtime",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Notify HR via WhatsApp (direct) for absences, lateness, or emergencies.</p>
                <p>All planned leaves must be requested at least 1 month in advance.</p>
                <p>Sick/personal leaves: Max of 2 consecutive days, up to 5 paid leaves per year (after 1 year).</p>
              </div>
            ),
          },
          {
            title: "Daily Operations & Reporting",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Login/Logout daily in the AVS WhatsApp group.</li>
                  <li>Submit daily EODs (End of Day reports) with completed tasks and work hours.</li>
                  <li>Use Team Logger unless the client opts out.</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Meetings & Check-ins",
            content: (
              <div className="space-y-2">
                <p className="font-semibold text-primary">ATTEND:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>1-2 Team Meetings per quarter</li>
                  <li>5-10 minute weekly Kumustahan with HR</li>
                  <li>2 Kumustahan sessions must be attended before bi-monthly compensation is released</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Communication Guidelines",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Respond within 1-2 hrs during your work schedule.</li>
                  <li>Notify HR if late or offline. Through WhatsApp.</li>
                  <li>Keep messages clear & professional.</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "policies",
        label: "Policies and Regulation",
        icon: ShieldCheck,
        sections: [
          {
            title: "Confidentiality",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>All client and company information is strictly confidential.</li>
                  <li>Do not disclose or use confidential info without written consent from AVS.</li>
                  <li>All files, documents, and records must be returned upon contract termination.</li>
                  <li><span className="font-medium text-destructive">Breaches can result in liquidated damages up to P500,000</span></li>
                </ul>
              </div>
            ),
          },
          {
            title: "Restrictions & Compliance",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Do NOT work for AVS clients outside the company.</li>
                  <li>Do NOT engage with AVS competitors during your contract.</li>
                  <li>Do NOT solicit or accept side jobs from clients or co-VAS.</li>
                  <li>Do NOT receive direct payments from clients.</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Termination Guidelines",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-foreground">Voluntary:</strong> Requires 14-day notice and fulfillment of duties - or payout will be forfeited.</li>
                  <li><strong className="text-foreground">Involuntary:</strong> Breach of contract or unethical behavior may lead to immediate termination.</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "payment",
        label: "Payment and Benefits",
        icon: CreditCard,
        sections: [
          {
            title: "Compensation & Bonuses",
            content: (
              <div className="space-y-4 text-muted-foreground p-4 bg-muted/30 rounded-lg border">
                <h3 className="text-lg font-medium text-foreground mb-2">General Terms</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-foreground">Rate:</strong> Depends on client agreement.</li>
                  <li><strong className="text-foreground">Schedule:</strong> Bi-monthly payouts. Any delays will be communicated 3 days prior.</li>
                  <li><strong className="text-foreground">Requirement:</strong> Invoice submission via email is required before each payout.</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Incentives After 1 Year",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Loyalty Bonus", value: "P10,000", desc: "Annual reward" },
                  { label: "Quarterly Bonus", value: "P2,000", desc: "Every 3 months" },
                  { label: "WiFi Allowance", value: "P1,000", desc: "Monthly subsidy" },
                  { label: "Medical Reimbursement", value: "P5,000", desc: "Health support" },
                  { label: "Year-End Bonus", value: "Bonus", desc: "Every December" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col p-4 bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                    <span className="text-2xl font-bold text-primary mt-1">{item.value}</span>
                    <span className="text-xs text-muted-foreground mt-2">{item.desc}</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            title: "Leave Entitlement",
            content: (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 border rounded-lg bg-primary/5 border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Annual Allowance</h4>
                  <p className="text-3xl font-bold">5 Days</p>
                  <p className="text-sm text-muted-foreground mt-1">Paid sick/personal leaves</p>
                </div>
                <div className="flex-1 p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Rules</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                    <li>Max 2 days consecutively</li>
                    <li>Must be filed 1 month in advance</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: "Conversion Rate Policy",
            content: (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-semibold">If Foreign Exchange Rate is</TableHead>
                      <TableHead className="font-semibold">Conversion Rate Used</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Below Php 56</TableCell>
                      <TableCell>Php 53</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Exactly Php 56</TableCell>
                      <TableCell>Php 54</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Exactly Php 57</TableCell>
                      <TableCell>Php 55</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "ONBOARDING",
    items: [
      {
        id: "onboarding-setup",
        label: "Onboarding Setup",
        icon: BookOpen,
        sections: [
          {
            title: "1. Create Company Email",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>
                  Create your company email, format is <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">yourname.avs@gmail.com</code> (example: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">juandelacruz.avs@gmail.com</code>).
                </p>
                <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
                  <p className="font-medium">This new email will be utilized for client and AVSPH communications. You are not allowed to use personal email.</p>
                </div>
              </div>
            )
          },
          {
            title: "2. Fill out Database",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Please fill out the AVSPH VA Database, the information gathered is solely for agency purposes.</p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSch8623fnUZMxeU3l1TU47Amxg70qnNbz_SmBYhc3jKssks-g/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Fill out Form
                </a>
              </div>
            )
          },
          {
            title: "3. Inform HR",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Inform HR of your new email by sending an email to <a href="mailto:admin@advancedvirtualstaff.com" className="text-primary hover:underline">admin@advancedvirtualstaff.com</a></p>

                <div className="bg-muted/50 p-4 rounded-lg border font-mono text-sm space-y-4 text-foreground relative">
                  <div>
                    <span className="font-semibold text-muted-foreground">Subject:</span> New VA Email
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">Body:</span>
                    <br /><br />
                    Good day,
                    <br /><br />
                    This is (yourname) and I am now using this email for company use. I was hired as (position). My client is (name of client) and I am working (# of hours).
                    <br /><br />
                    Thank you!
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between">
                  <p className="font-medium">Wait for HR response, your contract will then be sent to your company email.</p>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    Mark As Complete
                  </button>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "PLATFORM GUIDE",
    items: [
      {
        id: "dashboard-login",
        label: "Dashboard Login",
        icon: Key,
        sections: [
          {
            title: "Accessing the Platform",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>After your contract is confirmed, HR will send you an email containing your credentials for the Staff Dashboard. Keep an eye on your new company email for these details.</p>
                <div className="bg-muted/30 p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-2">How to Login:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Navigate to the AVS Dashboard Login Page.</li>
                    <li>Ensure the <strong className="text-foreground">Staff</strong> tab is selected at the top of the login form.</li>
                    <li>Enter the Email Address and temporary Password from the HR email.</li>
                    <li>Click <strong className="text-foreground">Sign In</strong>.</li>
                    <li><em>Note: Upon your first login, or as directed by HR, you may need to update your password for security purposes.</em></li>
                  </ol>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "daily-eods",
        label: "Daily EODs",
        icon: Clock,
        sections: [
          {
            title: "Submitting Your EOD (End of Day)",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Once you are logged in and start working, you are required to submit an End of Day (EOD) report daily through the Staff Dashboard to track your tasks and hours.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 border rounded-lg bg-primary/5">
                    <h4 className="font-semibold text-primary mb-1">EOD Page Overview</h4>
                    <p className="text-sm">On your EOD page, you can see your Estimated Pay, count of Approved/Pending EODs, and your Next Payout date at the top.</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-1">Managing EODs</h4>
                    <p className="text-sm">You can view your past submissions in the table, check their status, and filter them by date or status.</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border">
                  <h4 className="font-semibold text-foreground mb-3">EOD Submission Guide:</h4>
                  <ol className="list-decimal pl-5 space-y-3 mb-4">
                    <li>Go to the <strong className="text-foreground">Daily EODs</strong> section from your dashboard sidebar.</li>
                    <li>Click on the <strong className="text-foreground">Submit EOD</strong> button.</li>
                    <li>Fill out all the required fields in the submission form accurately.</li>
                  </ol>

                  <div className="mt-4 p-4 border border-primary/20 bg-background rounded-md space-y-2">
                    <p className="font-semibold text-primary underline mb-2">Form Fields Overview:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li><strong className="text-foreground">Date:</strong> The specific date the work was performed (defaults to today).</li>
                      <li><strong className="text-foreground">Total Hours Worked:</strong> Your total shift hours (e.g., 8).</li>
                      <li><strong className="text-foreground">Regular / Overtime / Night Diff Hours:</strong> Breakdown of your hours. <em>(If regular hours are left blank, the system treats your total hours as regular hours).</em></li>
                      <li><strong className="text-foreground">Tasks Completed:</strong> A detailed description of what you accomplished today. (Required)</li>
                      <li><strong className="text-foreground">Challenges:</strong> Any blockers or issues you encountered.</li>
                      <li><strong className="text-foreground">Next Day Plan:</strong> What you plan to work on during your next shift.</li>
                      <li><strong className="text-foreground">Additional Notes:</strong> Any other information you need to relay.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];
