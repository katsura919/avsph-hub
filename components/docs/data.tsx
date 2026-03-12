import { BookOpen, CreditCard, ShieldCheck, FileText, CheckCircle, Clock, Key, LucideIcon, List, Users, Calendar, Mic, Plane, Mail, MessageSquare, ShoppingBag, Target, Shield, Heart, Zap, Coffee, Phone, PlaneTakeoff, Globe, Home, Pencil, Send, AlertTriangle, CreditCard as CardIcon, Thermometer, Wind, Wrench, AlertCircle, Info, Sparkles, Droplets, Star, Bug, Waves, Plug, Leaf } from "lucide-react";
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

export const onboardingSections: DocGroup[] = [
  {
    title: "ONBOARDING",
    items: [
      {
        id: "onboarding-vision",
        label: "Vision & Mission",
        icon: Globe,
        sections: [
          {
            title: "Our Vision",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg italic font-serif leading-relaxed text-foreground/80">
                  "We imagine a world where running a business feels easier, so owners can focus on what they love and grow with confidence."
                </p>
                <p>What drives us every single day at TalentMucho is the commitment to simplify operations for business owners.</p>
              </div>
            )
          },
          {
            title: "Our Mission",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg italic font-serif leading-relaxed text-foreground/80">
                  "Our mission is to make business owners' lives easier by providing support that simplifies operations and supports growth."
                </p>
              </div>
            )
          }
        ]
      },
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
                  Create your company email, format is <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">yourname.tm@gmail.com</code> (example: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">juandelacruz.tm@gmail.com</code>).
                </p>
                <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
                  <p className="font-medium">This new email will be utilized for client and TalentMucho communications. You are not allowed to use personal email.</p>
                </div>
              </div>
            )
          },
          {
            title: "2. Fill out Database",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Please fill out the TalentMucho VA Database, the information gathered is solely for agency purposes.</p>
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
                <p>Inform HR of your new email by sending an email to <a href="mailto:admin@talentmucho.com" className="text-primary hover:underline">admin@talentmucho.com</a></p>

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
              </div>
            )
          },
          {
            title: "4. Client Kick-off & Hand-off",
            content: (
              <div className="space-y-4 text-muted-foreground mt-4 p-4 border border-dashed rounded-lg bg-muted/20">
                <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                  <li><strong>Introduction:</strong> How to initiate the first communication with your client.</li>
                  <li><strong>Scheduling:</strong> Arranging the initial kick-off call.</li>
                  <li><strong>First Week Expectations:</strong> What to prepare for in your first 5 days.</li>
                </ul>
              </div>
            )
          }
        ]
      }
    ]
  },
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-primary/5">
                    <p className="font-semibold text-primary mb-2 flex items-center gap-2">
                       <Home className="w-4 h-4" /> Hardware
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Desktop or laptop with reliable specifications</li>
                      <li>USB noise-cancelling headset with microphone</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-primary/5">
                    <p className="font-semibold text-primary mb-2 flex items-center gap-2">
                       <Zap className="w-4 h-4" /> Internet
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Minimum 20 Mbps stable connection</li>
                      <li>Always have a backup internet ready</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-primary/5">
                  <p className="font-semibold text-primary mb-2 flex items-center gap-2">
                     <Coffee className="w-4 h-4" /> Workspace
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Quiet, professional work environment</li>
                    <li>Free from background noise and distractions</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 border border-dashed rounded-lg bg-muted/20 text-muted-foreground">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Team Logger Setup
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Download application as instructed by HR</li>
                    <li>Log in using TalentMucho credentials</li>
                    <li>Configure idle time and screenshot settings</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: "Work Hours & Schedule",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 text-center border rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-primary italic">11PM-9AM</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Typical Shift (PH)</div>
                  </div>
                  <div className="p-4 text-center border rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-primary italic">8 hrs</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Full-Time Daily</div>
                  </div>
                  <div className="p-4 text-center border rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-primary italic">5 days</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Per Week</div>
                  </div>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Shift hours vary per client — confirm exact schedule.</li>
                    <li>Changes require mutual agreement and management approval.</li>
                    <li>New client = new updated contract.</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: "Daily Operations & Reporting",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                       <Phone className="w-4 h-4 text-primary" /> Login / Logout
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Log IN in the WhatsApp group</li>
                      <li>Log OUT at end of shift</li>
                      <li>Use Team Logger for time tracking</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                       <Mail className="w-4 h-4 text-primary" /> EOD Submission
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Send to: <code className="text-foreground">eod@talentmucho.com</code></li>
                      <li>Subject: [Date] in client timezone</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-xl border border-border">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">EOD Report Template</h4>
                  <div className="space-y-4 font-mono text-xs text-foreground leading-relaxed">
                    <div className="text-primary/60 font-sans italic border-b pb-2 mb-2">// Subject Line</div>
                    <div className="flex gap-2"><span className="text-muted-foreground w-16 shrink-0 underline decoration-muted/40">Subject:</span> [Date] — [Client TZ]</div>
                    <br />
                    <div className="flex gap-2"><span className="text-muted-foreground w-16 shrink-0 underline decoration-muted/40">Logout:</span> [Date]</div>
                    <div className="flex gap-2"><span className="text-muted-foreground w-16 shrink-0 underline decoration-muted/40">Name:</span> [Your Name]</div>
                    <div className="flex gap-2"><span className="text-muted-foreground w-16 shrink-0 underline decoration-muted/40">Break:</span> [Duration]</div>
                    <div className="flex gap-2"><span className="text-muted-foreground w-16 shrink-0 underline decoration-muted/40">Appt:</span> [Yes/No]</div>
                    <div className="flex gap-2"><span className="text-muted-foreground w-16 shrink-0 underline decoration-muted/40">Hours:</span> [Rendered]</div>
                    <br />
                    <div>
                      <div className="text-muted-foreground underline mb-1">Tasks Completed:</div>
                      <div className="text-primary italic pl-4">- [Task 1]</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Emergency Contact Flow",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <MessageSquare className="w-4 h-4 text-primary" /> WhatsApp
                    </div>
                    <div className="space-y-4 border-l-2 border-primary/20 pl-4 py-1">
                      <div>
                        <div className="text-sm font-medium">Step 1 — DM HR</div>
                        <p className="text-xs text-muted-foreground">Direct message HR (not in group).</p>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Step 2 — "Emergency" tag</div>
                        <p className="text-xs text-muted-foreground">Start with "Emergency" for urgent items.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <Target className="w-4 h-4 text-primary" /> Escalation
                    </div>
                    <div className="space-y-2 border-l-2 border-primary/20 pl-4 py-1 text-sm text-muted-foreground">
                      <p>1. Immediate Supervisor</p>
                      <p>2. HR via WhatsApp</p>
                      <p>3. Operations Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            )
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
            title: "Communication & Support",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Respond within 1-2 hrs during your work schedule.</li>
                  <li>Notify HR if late or offline. Through WhatsApp.</li>
                  <li>Keep messages clear & professional.</li>
                </ul>

                <div className="p-4 border border-dashed rounded-lg bg-muted/20">
                  <h4 className="font-semibold text-foreground mb-2">Escalation & Support Contacts</h4>
                  <p className="italic mb-2">Note: Placeholder for specific contact information.</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong className="text-foreground">Payroll Issues:</strong> [Payroll Email/Contact]</li>
                    <li><strong className="text-foreground">Client Disputes/Issues:</strong> [Account Manager Contact]</li>
                    <li><strong className="text-foreground">Technical Support:</strong> [IT Contact]</li>
                  </ul>
                </div>
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
            title: "Confidentiality & NDA",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p className="text-sm">Protecting client and company information is a core legal obligation. This includes client data, business strategies, and internal documents.</p>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-start gap-3">
                  <Shield className="w-5 h-5 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <strong>Legal Penalty:</strong> Breach of confidentiality can result in liquidated damages of up to <strong>₱500,000</strong>.
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Return all files/documents upon contract termination.</li>
                  <li>Do not use info for personal gain or for a third party.</li>
                  <li>Exception: Info that becomes public through no fault of yours.</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Non-Compete & Non-Solicitation",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                       <Target className="w-4 h-4" /> Non-Compete
                    </h4>
                    <p className="text-xs italic mb-2">During contract + 2 years after</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>No similar businesses to TalentMucho</li>
                      <li>Applies to current/former client businesses</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                       <Users className="w-4 h-4" /> Non-Solicitation
                    </h4>
                    <p className="text-xs italic mb-2">2 years after contract ends</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>Do not recruit any TalentMucho staff/agents</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-muted/40 text-xs rounded-lg border border-dashed">
                  <strong>Financial Penalties:</strong> TalentMucho staff hired through you → ₱500,000 damages. Client solicited away → reimburse 2 years of lost profits.
                </div>
              </div>
            ),
          },
          {
            title: "Restrictions (The Four Absolutes)",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Do NOT work for clients outside TalentMucho",
                    "Do NOT engage with competitors",
                    "Do NOT solicit or accept side jobs",
                    "Do NOT receive direct client payments"
                  ].map((text, i) => (
                    <div key={i} className="p-3 border rounded-lg bg-destructive/[0.03] text-destructive flex items-center gap-2 text-xs font-medium">
                      <CheckCircle className="w-4 h-4 shrink-0 opacity-50" />
                      {text}
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-xs text-muted-foreground italic">"When you follow these guidelines, you protect yourself, your clients, and the entire team."</p>
                </div>
              </div>
            ),
          },
          {
            title: "Termination Guidelines",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-lg bg-background shadow-sm">
                    <div className="text-sm font-semibold text-foreground">Voluntary Notice</div>
                    <div className="text-sm font-bold text-primary italic">14 Days Required</div>
                  </div>
                  <p className="text-xs pl-1">Failure to complete notice = final payout forfeited. AWOL is grounds for immediate termination without pay.</p>
                </div>
                <div className="p-4 border border-dashed rounded-lg bg-muted/20">
                  <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-tighter italic">Involuntary (Immediate)</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Inducing employees or clients to leave</li>
                    <li>Acts of disloyalty or fraud</li>
                    <li>Disclosing confidential information</li>
                  </ul>
                </div>
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

                <div className="mt-4 p-4 border border-dashed rounded-lg bg-background">
                  <h4 className="font-semibold text-foreground mb-2">Invoice Submission Instructions</h4>
                  <p className="italic mb-2 text-sm">Note: Placeholder for invoicing procedure.</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong className="text-foreground">Where to send:</strong> billing@talentmucho.com</li>
                    <li><strong className="text-foreground">Subject Line Format:</strong> Invoice - [Your Name] - [Cut-off Date]</li>
                    <li><strong className="text-foreground">Cut-off Dates:</strong> 15th and 30th of the month.</li>
                    <li><strong className="text-foreground">Template:</strong> Link to approved invoice template.</li>
                  </ul>
                </div>
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { val: "5", unit: "days", lbl: "Paid Leaves/Year" },
                    { val: "2", unit: "days", lbl: "Max Consecutive" },
                    { val: "1", unit: "mo", lbl: "Notice Required" },
                    { val: "1", unit: "yr", lbl: "Service Required" },
                  ].map((s, i) => (
                    <div key={i} className="p-3 text-center border rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-primary">{s.val}<span className="text-sm font-normal ml-1 text-muted-foreground">{s.unit}</span></div>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Eligibility</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-4">
                      <li>Full-time contractor: 8 hrs/day, 5 days/week</li>
                      <li>Completed 1 full year of continuous active service</li>
                      <li>File request at least 1 month in advance (except emergencies)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">How to File</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-4">
                      <li>Direct WhatsApp to HR (not the group chat)</li>
                      <li>Format: <strong className="text-foreground">[Your Name] – Leave Request</strong> with dates and reason</li>
                      <li>Attach proof if sick or emergency (supporting docs help approval)</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-amber-700 dark:text-amber-400 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div><strong>Year of Stay Reset:</strong> Periods where you were "On Pause" do NOT count toward your Year of Stay and cause your count to reset upon return.</div>
                </div>
              </div>
            ),
          },
          {
            title: "Conversion Rate Policy",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold">If Foreign Exchange Rate is</TableHead>
                        <TableHead className="font-semibold text-right">Conversion Rate Used</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Lower than ₱56</TableCell>
                        <TableCell className="text-right font-bold text-primary">₱53</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>₱56</TableCell>
                        <TableCell className="text-right font-bold text-primary">₱54</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>₱57</TableCell>
                        <TableCell className="text-right font-bold text-primary">₱55</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-50" />
                  Rates are reviewed periodically based on market stability.
                </div>
              </div>
            ),
          },
          {
            title: "Cash Advance Policy",
            content: (
              <div className="space-y-6 text-muted-foreground">
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl text-amber-700 dark:text-amber-400">
                  <div className="flex gap-2">
                    <Zap className="w-5 h-5 shrink-0" />
                    <div className="text-sm"><strong>Emergency only:</strong> Requests without proof will NOT be processed.</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Eligibility</h4>
                    <ul className="list-disc pl-5 text-xs space-y-1">
                      <li>Min. 6 months tenure</li>
                      <li>Max. 50% of upcoming payment</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">Regulations</h4>
                    <ul className="list-disc pl-5 text-xs space-y-1">
                      <li>Genuine emergencies only</li>
                      <li>Supporting documents required</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-[10px] uppercase font-bold text-destructive">Misuse may result in termination.</p>
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
                    <li>Navigate to the TalentMucho Dashboard Login Page.</li>
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
  },
];

export const homeSections: DocGroup[] = [
  {
    title: "GETTING STARTED",
    items: [
      {
        id: "home-welcome",
        label: "Welcome",
        icon: Home,
        sections: [
          {
            title: "Welcome to TalentMucho Documentation",
            content: (
              <div className="space-y-8 py-4">
                <div className="space-y-4 text-center">
                  <h2 className="text-4xl font-extrabold tracking-tight text-primary">TalentMucho Command Center</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your complete guide to roles, responsibilities, and operating procedures within the TalentMucho ecosystem.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border rounded-2xl bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/30 transition-colors group">
                    <BookOpen className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold mb-2">Onboarding</h3>
                    <p className="text-sm text-muted-foreground mb-4">Master the foundational expectations and core responsibilities of a Virtual Assistant.</p>
                    <div className="text-xs font-bold text-primary flex items-center gap-1">GO TO ONBOARDING <Zap className="h-3 w-3" /></div>
                  </div>
                  
                  <div className="p-6 border rounded-2xl bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/30 transition-colors group">
                    <ShieldCheck className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold mb-2">Executive Assistance</h3>
                    <p className="text-sm text-muted-foreground mb-4">Deep dive into the EA Playbook for managing high-level executives efficiently.</p>
                    <div className="text-xs font-bold text-primary flex items-center gap-1">GO TO EA PLAYBOOK <Zap className="h-3 w-3" /></div>
                  </div>

                  <div className="p-6 border rounded-2xl bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/30 transition-colors group">
                    <Key className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold mb-2">Systems & Tools</h3>
                    <p className="text-sm text-muted-foreground mb-4">Learn about the platforms and tools used to keep the operations running smoothly.</p>
                    <div className="text-xs font-bold text-primary flex items-center gap-1">COMING SOON <Clock className="h-3 w-3" /></div>
                  </div>
                </div>

                <div className="bg-muted/30 p-8 rounded-2xl border border-dashed text-center">
                   <p className="text-muted-foreground italic">"Simplicity is the ultimate sophistication. Use these docs to master your craft."</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "SOP PLAYBOOK",
    items: [
      {
        id: "sop-intro",
        label: "What is an SOP?",
        icon: FileText,
        sections: [
          {
            title: "Definition & Purpose",
            content: (
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg italic font-serif leading-relaxed text-foreground/80">
                  &quot;An SOP is a documented, step-by-step guide that explains exactly how to perform a specific task or process — consistently, correctly, and without needing to ask questions.&quot;
                </p>
                <p className="text-sm">Think of it as a manual for your role. If you were suddenly unavailable, a new VA should be able to pick up your SOP and do your job without missing a beat.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-xl bg-card">
                    <h4 className="font-bold text-foreground mb-2">🎯 Purpose</h4>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>Tasks done the same way every time</li>
                      <li>Reduce errors and miscommunication</li>
                      <li>Faster new VA training</li>
                      <li>Protect client business processes</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-xl bg-card">
                    <h4 className="font-bold text-foreground mb-2">🏆 Benefits to You</h4>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>Shows professionalism & ownership</li>
                      <li>Protects you (&quot;I followed the SOP&quot;)</li>
                      <li>Builds credibility with the client</li>
                      <li>Demonstrates initiative & growth</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-xl bg-card">
                    <h4 className="font-bold text-foreground mb-2">⚡ When to Write One</h4>
                    <ul className="text-xs space-y-1 list-disc pl-4">
                      <li>When you start a recurring task</li>
                      <li>When client requests documentation</li>
                      <li>When a process has multiple steps</li>
                      <li>When onboarding a new team member</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary text-sm">
                  <strong className="text-foreground">Your SOP = Your Work Standard.</strong> A well-written SOP protects you, helps your replacement understand your work, and shows your client you are organized and professional.
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "sop-writing",
        label: "How to Write an SOP",
        icon: Pencil,
        sections: [
          {
            title: "The 5-Phase Writing Process",
            content: (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-0 mb-4 overflow-x-auto pb-2">
                  {[
                    { n: "1", label: "Identify the Process", desc: "Pick one task to document" },
                    { n: "2", label: "Do It First", desc: "Perform the task & take notes" },
                    { n: "3", label: "Write the Steps", desc: "Use the Master Template" },
                    { n: "4", label: "Test It", desc: "Follow your own SOP cold" },
                    { n: "5", label: "Submit", desc: "Fill form & send for review" },
                  ].map((step, i, arr) => (
                    <div key={i} className="flex items-center">
                      <div className="text-center min-w-[100px] px-2">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-2">{step.n}</div>
                        <div className="text-xs font-semibold text-foreground">{step.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{step.desc}</div>
                      </div>
                      {i < arr.length - 1 && <div className="text-primary font-bold text-lg mx-1">→</div>}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { n: 1, title: "Identify the Process to Document", sub: "Scope your SOP before writing", body: [
                      "Choose one specific process — not a broad job description. (Good: 'How to upload leads to Mojo Dialer' — Bad: 'How I do my job')",
                      "Make sure you fully understand the process before documenting it.",
                      "Clarify the start and end point of the process.",
                      "Identify all tools needed before writing."
                    ], tip: "One SOP = One Process. If it gets too long, split it into two separate SOPs." },
                    { n: 2, title: "Perform the Task & Capture Notes", sub: "Document as you work, not after", body: [
                      "Do the task while writing down every action you take, no matter how small.",
                      "Take screenshots at every major step — these go in Section 9 (Attachments).",
                      "Note any common errors or issues you encounter — they go in Section 7.",
                      "Record the time it takes. This helps define your KPI in Section 5."
                    ] },
                    { n: 3, title: "Write the SOP Using the Master Template", sub: "Open Google Docs, copy the Master Template", body: [
                      "Fill in the header: SOP Title, Client Name, VA Name, Role, Date Created.",
                      "Write the Purpose (Section 1) in 2–3 sentences. Answer: what and why.",
                      "List all Tools Required (Section 2) — be specific (e.g., 'Mojo Dialer v3', not just 'dialer').",
                      "Write numbered steps in Section 3. Each step = one action. Detailed enough that a new VA can follow without guidance.",
                      "Include Scripts or Templates (Section 4) if any messages or emails are part of the process.",
                      "Define your KPIs (Section 5) — e.g., '100 leads uploaded per shift'.",
                      "Set Quality Standards (Section 6) — what does 'done correctly' look like?",
                      "Fill out Common Issues & Solutions (Section 7) as a table.",
                      "Add Improvement Notes (Section 8) — ideas to make the process better.",
                      "Attach Screenshots and files (Section 9)."
                    ] },
                    { n: 4, title: "Test Your SOP", sub: "Follow your own instructions as if you've never done the task", body: [
                      "Close your SOP, then reopen it fresh. Follow only what's written.",
                      "If you find yourself guessing or needing to fill in gaps — go back and rewrite.",
                      "Ideally, have a teammate test it too (peer review).",
                      "Verify all screenshots match the current state of the tools."
                    ], warn: "The Test is Required. Your Submission Form has a checkbox — 'I have tested this process.' Do not check it unless you actually have." },
                    { n: 5, title: "Submit via the SOP Submission Form", sub: "Complete the form and send the Google Docs link", body: [
                      "Fill out all 5 Sections of the SOP Submission Form completely.",
                      "Paste your Google Docs link — make sure sharing is set to 'Anyone with the link can view.'",
                      "Complete the confirmation checklist (all 5 boxes).",
                      "Submit to HR or your designated AVS email address."
                    ], success: "Once submitted, your SOP will be reviewed by management. You may be asked to revise — this is normal and expected." }
                  ].map((step, i) => (
                    <div key={i} className="border rounded-xl overflow-hidden">
                      <div className="flex items-center gap-4 p-4 bg-muted/20">
                        <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center flex-shrink-0">{step.n}</div>
                        <div>
                          <div className="font-semibold text-foreground">{step.title}</div>
                          <div className="text-xs text-muted-foreground">{step.sub}</div>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                          {step.body.map((b, bi) => <li key={bi}>{b}</li>)}
                        </ul>
                        {'tip' in step && step.tip && (
                          <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs text-primary">💡 {step.tip}</div>
                        )}
                        {'warn' in step && step.warn && (
                          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-xs text-amber-700 dark:text-amber-400">⚠️ {step.warn}</div>
                        )}
                        {'success' in step && step.success && (
                          <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg text-xs text-green-700 dark:text-green-400">✅ {step.success}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "sop-template",
        label: "Template Walkthrough",
        icon: BookOpen,
        sections: [
          {
            title: "Document Header Fields",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Fill these fields at the very top of your SOP Google Doc.</p>
                <div className="divide-y border rounded-lg overflow-hidden">
                  {[
                    { label: "SOP Title", desc: "The name of the specific process. Be specific. (e.g., 'Lead Extraction & Upload to Mojo Dialer')" },
                    { label: "Client Name", desc: "The full name of your assigned client." },
                    { label: "VA Name", desc: "Your full name as it appears in your contract." },
                    { label: "Role", desc: "Your job title (e.g., Data Entry Specialist, Appointment Setter)." },
                    { label: "Date Created", desc: "The date you first wrote this SOP." },
                    { label: "Last Updated", desc: "Update this every time you revise the SOP." },
                  ].map((f, i) => (
                    <div key={i} className="flex gap-4 px-4 py-3 bg-background hover:bg-muted/20 transition-colors">
                      <div className="w-32 shrink-0 text-sm font-semibold text-foreground">{f.label}</div>
                      <div className="text-sm text-muted-foreground">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          },
          {
            title: "The 9 Template Sections at a Glance",
            content: (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-foreground text-background">
                    <TableRow>
                      <TableHead className="text-background font-bold w-8">#</TableHead>
                      <TableHead className="text-background font-bold">Section Name</TableHead>
                      <TableHead className="text-background font-bold">What Goes Here</TableHead>
                      <TableHead className="text-background font-bold text-right">Required?</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { n: 1, name: "Purpose", what: "What the process is and why it matters", req: "Required", reqColor: "text-green-600 dark:text-green-400" },
                      { n: 2, name: "Tools Required", what: "All software, platforms, and accounts used", req: "Required", reqColor: "text-green-600 dark:text-green-400" },
                      { n: 3, name: "Step-by-Step Process", what: "Numbered actions from start to finish", req: "Required", reqColor: "text-green-600 dark:text-green-400" },
                      { n: 4, name: "Scripts / Templates Used", what: "Full message scripts, email templates", req: "If applicable", reqColor: "text-amber-600 dark:text-amber-400" },
                      { n: 5, name: "KPIs Connected", what: "Measurable performance indicators", req: "Required", reqColor: "text-green-600 dark:text-green-400" },
                      { n: 6, name: "Quality Standards", what: "What 'done right' looks like", req: "Required", reqColor: "text-green-600 dark:text-green-400" },
                      { n: 7, name: "Common Issues & Solutions", what: "Issue-solution table", req: "Required", reqColor: "text-green-600 dark:text-green-400" },
                      { n: 8, name: "Improvement Notes", what: "Ideas to make the process better", req: "Recommended", reqColor: "text-amber-600 dark:text-amber-400" },
                      { n: 9, name: "Attachments", what: "Screenshots, screen recordings, files", req: "Required", reqColor: "text-green-600 dark:text-green-400" },
                    ].map((row) => (
                      <TableRow key={row.n}>
                        <TableCell><span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-bold">{row.n}</span></TableCell>
                        <TableCell className="font-semibold">{row.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{row.what}</TableCell>
                        <TableCell className={`text-right text-xs font-bold ${row.reqColor}`}>{row.req}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "sop-sections",
        label: "All 9 Sections Explained",
        icon: List,
        sections: [
          {
            title: "Deep Dive — Each Section Explained",
            content: (
              <div className="space-y-3">
                {[
                  { emoji: "📌", n: 1, title: "Purpose", color: "border-l-primary bg-primary/5", body: "Write 2–4 sentences explaining (1) what process this SOP covers and (2) why it is important to the client's business. Avoid vague language. Be specific: 'This ensures leads are entered without duplicates, allowing the client to make calls efficiently.'" },
                  { emoji: "🔧", n: 2, title: "Tools Required", color: "border-l-primary bg-primary/5", body: "List every tool, platform, account, or software used. Be specific — don't write 'spreadsheet', write 'Microsoft Excel / Google Sheets'. Consider: CRM, Email Platform, Dialer, Cloud Storage, and client-specific tools." },
                  { emoji: "⚡", n: 3, title: "Step-by-Step Process (Most Important)", color: "border-l-amber-400 bg-amber-50 dark:bg-amber-950/20", body: "Use numbered steps. Each step = ONE action. Start each step with a verb. Be detailed enough that a brand-new VA who has never done this job can follow it without asking anything. Good: '1. Open Mojo Dialer and log in. 2. Click Lists in the top nav. 3. Select Import New List.' Bad: '1. Log in and upload the leads.'" },
                  { emoji: "📝", n: 4, title: "Scripts / Templates Used", color: "border-l-primary bg-primary/5", body: "If your process involves sending emails, messages, or call scripts — paste the full script or template here. This makes the SOP self-contained. If no scripts are used, write 'N/A'." },
                  { emoji: "📊", n: 5, title: "KPIs Connected", color: "border-l-green-500 bg-green-50 dark:bg-green-950/20", body: "Define measurable outcomes. Examples: Calls per day: 100 minimum. Lead upload accuracy: 100% (no duplicates). Response time: within 2 hours. Booking rate: 5 appointments per 100 calls." },
                  { emoji: "🏅", n: 6, title: "Quality Standards", color: "border-l-primary bg-primary/5", body: "Define what 'done correctly' means. Examples: No grammar or spelling errors in client-facing messages. CRM updated within 5 minutes of each call. All leads formatted in correct column order before upload." },
                  { emoji: "⚠️", n: 7, title: "Common Issues & Solutions", color: "border-l-destructive bg-destructive/5", body: "Fill out a table with at least 2–3 rows. Format — Issue: 'Mojo Dialer shows upload failed.' Solution: 'Check that the CSV file has no empty rows in column A. Re-save as .csv UTF-8 format and retry.' This section separates a good SOP from a great one." },
                  { emoji: "💡", n: 8, title: "Improvement Notes", color: "border-l-primary bg-primary/5", body: "Document ideas for making the process faster, more accurate, or more automated. Examples: 'Could automate duplicate checking using Excel COUNTIF function.' 'Mojo has an API — consider bulk import integration in the future.' This shows initiative to the client." },
                  { emoji: "📎", n: 9, title: "Attachments", color: "border-l-primary bg-primary/5", body: "Include screenshots of every key step, screen recordings if helpful, and any supporting files. Insert screenshots directly into the Google Doc below the relevant step. Naming convention: [SOPTitle]_Step[#]_Screenshot.png" },
                ].map((s) => (
                  <div key={s.n} className={`border-l-4 ${s.color} rounded-r-lg p-4`}>
                    <div className="font-semibold text-foreground mb-1">{s.emoji} Section {s.n} — {s.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{s.body}</div>
                  </div>
                ))}
              </div>
            )
          }
        ]
      },
      {
        id: "sop-submission",
        label: "Submission Form Guide",
        icon: Send,
        sections: [
          {
            title: "Section 1 — VA Information",
            content: (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Identifying details — fill accurately.</p>
                <div className="divide-y border rounded-lg overflow-hidden">
                  {[
                    { n: 1, label: "VA Name", desc: "Your full name as in your contract." },
                    { n: 2, label: "Client Name", desc: "The name of your assigned client." },
                    { n: 3, label: "Role", desc: "Your job title under this client." },
                    { n: 4, label: "SOP Title", desc: "Match this exactly to the title at the top of your Google Doc SOP." },
                    { n: 5, label: "Date Completed", desc: "The date you finished writing and testing the SOP (MM/DD/YYYY)." },
                  ].map((f) => (
                    <div key={f.n} className="flex gap-3 p-3 bg-background hover:bg-muted/20 transition-colors">
                      <div className="w-6 h-6 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{f.n}</div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{f.label}</div>
                        <div className="text-xs text-muted-foreground">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          },
          {
            title: "Section 2 — Process Summary",
            content: (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Give reviewers context before they open the doc.</p>
                <div className="divide-y border rounded-lg overflow-hidden">
                  {[
                    { n: 6, label: "What process does this SOP cover?", desc: "Write 2–3 sentences describing the process from start to finish. Be specific." },
                    { n: 7, label: "Why is this process important?", desc: "Explain the business value — what breaks if this isn't done correctly?" },
                    { n: 8, label: "What tools are used?", desc: "List each tool on its own bullet point. Same as Section 2 of your SOP Template." },
                  ].map((f) => (
                    <div key={f.n} className="flex gap-3 p-3 bg-background hover:bg-muted/20 transition-colors">
                      <div className="w-6 h-6 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{f.n}</div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{f.label}</div>
                        <div className="text-xs text-muted-foreground">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          },
          {
            title: "Section 3 — Confirmation Checklist",
            content: (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-medium">Do NOT submit until all 5 are true.</p>
                <div className="space-y-2">
                  {[
                    { label: "I have tested this process", desc: "You followed your own SOP from step 1 to the end and confirmed it works." },
                    { label: "Screenshots are included", desc: "Each major step has a screenshot embedded or attached." },
                    { label: "Scripts are attached", desc: "If the process involves any messages, emails, or call scripts, they are included in Section 4." },
                    { label: "KPI is clearly defined", desc: "Section 5 of your SOP has specific, measurable performance indicators." },
                    { label: "This SOP is ready for review", desc: "You are confident the SOP is complete, accurate, and professional." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-muted/20 border rounded-lg">
                      <div className="w-4 h-4 rounded border-2 border-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          },
          {
            title: "Section 4 — SOP Link Sharing",
            content: (
              <div className="space-y-4">
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  <li>Open your SOP Google Doc.</li>
                  <li>Click <strong className="text-foreground">Share</strong> (top right) → Change access to <strong className="text-foreground">&quot;Anyone with the link&quot;</strong> → Set to <strong className="text-foreground">Viewer</strong>.</li>
                  <li>Copy the link and paste it in Field 9 of the Submission Form.</li>
                </ul>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-amber-700 dark:text-amber-400 text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span><strong>Broken links will be rejected.</strong> Always test your link in an incognito browser before submitting.</span>
                </div>
              </div>
            )
          },
          {
            title: "Section 5 — Additional Notes",
            content: (
              <div className="p-4 border rounded-lg bg-muted/20 text-sm text-muted-foreground">
                Use this field to share anything the reviewer should know — limitations of the current process, areas where you need guidance, or suggestions for improvement. This is your voice. Use it.
              </div>
            )
          }
        ]
      },
      {
        id: "sop-sample",
        label: "Sample Submission",
        icon: FileText,
        sections: [
          {
            title: "Real Completed Submission Example",
            content: (
              <div className="space-y-6">
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg text-green-700 dark:text-green-400 text-sm flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span><strong>This is a real completed submission example.</strong> Use it as your benchmark for what a good SOP submission looks like.</span>
                </div>
                <div className="bg-foreground text-background rounded-xl p-6 font-mono text-xs leading-loose space-y-1">
                  <div className="text-primary/60 font-sans italic border-b border-background/10 pb-2 mb-3 text-[10px] uppercase tracking-widest">Section 1 — VA Information</div>
                  <div><span className="text-muted-foreground">VA Name:</span> <span className="text-blue-300">Honey Faith</span></div>
                  <div><span className="text-muted-foreground">Client Name:</span> <span className="text-blue-300">Sadek</span></div>
                  <div><span className="text-muted-foreground">Role:</span> <span className="text-blue-300">Data Entry Specialist</span></div>
                  <div><span className="text-muted-foreground">SOP Title:</span> <span className="text-blue-300">Lead Extraction & Upload to Mojo Dialer</span></div>
                  <div><span className="text-muted-foreground">Date Completed:</span> <span className="text-blue-300">02/25/2026</span></div>

                  <div className="text-primary/60 font-sans italic border-b border-background/10 pb-2 mb-3 mt-5 text-[10px] uppercase tracking-widest">Section 2 — Process Summary</div>
                  <div className="text-muted-foreground">What does this cover?</div>
                  <div className="pl-4 text-blue-300">Extracting leads from the client&apos;s Excel sheet, uploading them into Mojo Dialer, and updating the client&apos;s feedback sheet for follow-up.</div>
                  <div className="text-muted-foreground mt-2">Why is it important?</div>
                  <div className="pl-4 text-blue-300">Ensures all leads are entered accurately and organized so the client can call them efficiently. Prevents errors, duplicates, and miscommunication.</div>
                  <div className="text-muted-foreground mt-2">Tools used:</div>
                  <div className="pl-4 text-blue-300">Microsoft Excel / Google Sheets · Mojo Dialer · Google Drive · Gmail</div>

                  <div className="text-primary/60 font-sans italic border-b border-background/10 pb-2 mb-3 mt-5 text-[10px] uppercase tracking-widest">Section 3 — Checklist</div>
                  <div className="text-blue-300">✓ I have tested this process</div>
                  <div className="text-blue-300">✓ Screenshots are included</div>
                  <div className="text-blue-300">✓ Scripts are attached (email template)</div>
                  <div className="text-blue-300">✓ KPI is clearly defined</div>
                  <div className="text-blue-300">✓ This SOP is ready for review</div>

                  <div className="text-primary/60 font-sans italic border-b border-background/10 pb-2 mb-3 mt-5 text-[10px] uppercase tracking-widest">Section 5 — Additional Notes</div>
                  <div className="text-blue-300 italic">The process is fully tested and ready. Possible improvement: automate duplicate checking or consider Mojo API integration for faster uploads.</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">🔍 What Makes This a Good Submission</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                    <li><strong className="text-foreground">Specific SOP Title</strong> — &quot;Lead Extraction & Upload to Mojo Dialer&quot; tells you exactly what the process is.</li>
                    <li><strong className="text-foreground">Clear process summary</strong> — Explains what happens and in what order without being vague.</li>
                    <li><strong className="text-foreground">Strong importance statement</strong> — Connects accuracy to a business outcome (efficient calls, no duplicates).</li>
                    <li><strong className="text-foreground">All tools listed</strong> — Even optional tools like Gmail are noted.</li>
                    <li><strong className="text-foreground">All 5 checkboxes confirmed</strong> — No shortcuts taken.</li>
                    <li><strong className="text-foreground">Value-adding improvement note</strong> — Proposes automation as a future enhancement. This shows initiative.</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "sop-checklist",
        label: "Pre-Submit Checklist",
        icon: CheckCircle,
        sections: [
          {
            title: "SOP Document Checklist",
            content: (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-3">Inside your Google Doc — every box must be true.</p>
                {[
                  "Header is complete — SOP Title, Client, VA Name, Role, Date Created, Last Updated all filled in.",
                  "Section 1 (Purpose) is written in at least 2 clear sentences covering WHAT and WHY.",
                  "Section 2 (Tools) lists every tool with full names — no vague entries like 'spreadsheet'.",
                  "Section 3 (Steps) uses numbered, verb-first steps. Detailed enough for a new VA to follow alone.",
                  "Section 4 (Scripts) contains full scripts, or 'N/A' if none apply.",
                  "Section 5 (KPIs) has at least 2 measurable performance indicators with numbers.",
                  "Section 6 (Quality Standards) defines what 'done correctly' looks like — not vague.",
                  "Section 7 (Issues & Solutions) table has at least 2 rows filled in.",
                  "Section 8 (Improvement Notes) has at least one idea documented.",
                  "Section 9 (Attachments) has screenshots or a note explaining where they are.",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-muted/20 border rounded-lg text-sm">
                    <div className="w-4 h-4 rounded border-2 border-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            )
          },
          {
            title: "Submission Form Checklist",
            content: (
              <div className="space-y-4">
                <div className="space-y-2">
                  {[
                    "All 5 VA Information fields are filled in accurately.",
                    "Process Summary (Fields 6–8) is complete with specific, detailed answers.",
                    "All 5 confirmation checkboxes are genuinely true — not just ticked to pass.",
                    "Google Docs link is pasted and tested in incognito mode — it works without login.",
                    "Additional Notes field has been used to share any relevant context or suggestions.",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-muted/20 border rounded-lg text-sm">
                      <div className="w-4 h-4 rounded border-2 border-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg text-green-700 dark:text-green-400 text-sm flex items-start gap-2">
                  <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                  <span><strong>Ready to submit?</strong> If every box above is true, your SOP is ready. Submit to your designated HR or AVS email address with the subject: <strong>[Your Name] — SOP Submission — [SOP Title]</strong></span>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "sop-tips",
        label: "Tips & Common Mistakes",
        icon: Zap,
        sections: [
          {
            title: "Best Practices",
            content: (
              <div className="space-y-2">
                {[
                  { tip: "Write as you work, not after.", desc: "Capture steps live to avoid forgetting details." },
                  { tip: "One process, one SOP.", desc: "Don't combine multiple processes into one document." },
                  { tip: "Use simple language.", desc: "Write for someone who has never done this job before." },
                  { tip: "Start every step with a verb.", desc: "'Click', 'Open', 'Select', 'Type', 'Verify'." },
                  { tip: "Number every step.", desc: "Makes it easy to reference ('See Step 4')." },
                  { tip: "Take screenshots as you go.", desc: "Don't rely on memory or recreating them later." },
                  { tip: "Update your SOP when the process changes.", desc: "An outdated SOP is worse than none." },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg bg-primary/5 text-sm">
                    <span className="font-semibold text-foreground">{item.tip}</span>{" "}
                    <span className="text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            )
          },
          {
            title: "Common Mistakes to Avoid",
            content: (
              <div className="space-y-3">
                <div className="space-y-2">
                  {[
                    { mistake: "Too vague.", desc: "'Log in and do the task' is not a step. Be specific." },
                    { mistake: "No screenshots.", desc: "Every SOP that involves a software tool needs visual proof." },
                    { mistake: "Missing KPIs.", desc: "Vague quality expectations like 'do it well' are not acceptable." },
                    { mistake: "Not tested.", desc: "Submitting an SOP you haven't followed yourself." },
                    { mistake: "Wrong sharing settings.", desc: "Google Doc is restricted — reviewers can't open it." },
                    { mistake: "Incomplete submission form.", desc: "Skipping fields or leaving answers blank." },
                    { mistake: "Combining multiple processes.", desc: "Keep each SOP focused on exactly one process." },
                  ].map((item, i) => (
                    <div key={i} className="p-3 border border-destructive/20 rounded-lg bg-destructive/5 text-sm flex gap-2">
                      <span className="text-destructive">✗</span>
                      <span><strong className="text-destructive">{item.mistake}</strong>{" "}<span className="text-muted-foreground">{item.desc}</span></span>
                    </div>
                  ))}
                </div>
                <div className="p-6 border rounded-xl bg-muted/20 text-center">
                  <p className="text-lg font-serif italic text-foreground/80 leading-relaxed">&quot;If I handed this SOP to a brand-new VA who has never heard of this process, could they complete the task without asking me a single question?&quot;</p>
                  <p className="text-sm text-muted-foreground mt-3">If the answer is yes — your SOP is ready. If the answer is no — go back and fill in the gaps.</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg text-green-700 dark:text-green-400 text-sm flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span><strong>Your SOP is your professional signature.</strong> It shows you take ownership of your role, you care about quality, and you are invested in the client's success. Do it right — every time.</span>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const assistanceSections: DocGroup[] = [
  {
    title: "OPERATING GUIDE",
    items: [
      {
        id: "ea-objective",
        label: "Core Objective",
        icon: Target,
        sections: [
          {
            title: "EXECUTIVE ASSISTANT PLAYBOOK",
            content: (
              <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl text-center">
                  <h2 className="text-3xl font-bold text-primary mb-2">EXECUTIVE ASSISTANT PLAYBOOK</h2>
                  <p className="text-lg text-muted-foreground font-medium">Role Overview & Operating Guide</p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    1. THE EA’S CORE OBJECTIVE
                  </h3>
                  <p className="text-lg leading-relaxed">Your job is to protect the CEO’s time, energy, and focus so they can prioritize revenue, leadership, and high-impact decisions.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 border rounded-lg bg-card shadow-sm">
                      <h4 className="font-bold text-primary mb-2">Protect the CEO’s Time</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Filter requests.</li>
                        <li>Prioritize what truly matters.</li>
                        <li>Say no (kindly) when needed.</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg bg-card shadow-sm">
                      <h4 className="font-bold text-primary mb-2">Calendar Efficiency</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Clear, detailed, and organized.</li>
                        <li>No missing information.</li>
                        <li>No surprises.</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg bg-card shadow-sm">
                      <h4 className="font-bold text-primary mb-2">Clear Communication</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Every email gets a response.</li>
                        <li>Clear “Yes” or respectful “Not at this time.”</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg bg-card shadow-sm">
                      <h4 className="font-bold text-primary mb-2">Be Proactive</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Anticipate needs.</li>
                        <li>Think ahead (hour → day → week → quarter).</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-dashed">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      Prioritize Revenue
                    </h4>
                    <p className="text-sm">Health first. Client commitments next. Revenue-producing activities always take priority.</p>
                  </div>

                  <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Capture Preferences
                    </h4>
                    <p className="text-sm italic">Ask once. Save it. Reference it. Never repeat unnecessary questions.</p>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-responsibilities",
        label: "Responsibilities",
        icon: List,
        sections: [
          {
            title: "Key Responsibilities",
            content: (
              <div className="space-y-6">
                <p className="text-lg">You are the buffer between chaos and clarity. You are responsible for:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Email & Communication Filtering",
                    "Calendar & Meeting Management",
                    "Travel Planning",
                    "Event & Speaking Coordination",
                    "Inbox Processing",
                    "Personal Appointments",
                    "Networking Coordination",
                    "Project Tracking",
                    "Financial Monitoring",
                    "Confidentiality",
                    "Team Liaison Communication",
                    "Problem Prevention"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 border rounded-md bg-background text-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-cadence",
        label: "Task Cadence",
        icon: Clock,
        sections: [
          {
            title: "3. TASK CADENCE (Daily / Weekly / Monthly)",
            content: (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary border-b pb-2">DAILY RESPONSIBILITIES</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <Coffee className="h-4 w-4" /> Morning (Start of Day)
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                        <li><strong>Review today’s calendar</strong> (every event). Ensure: Title, Location, Agenda, Contact info, Confirmed attendees.</li>
                        <li><strong>Process CEO inbox</strong>. Goal: Inbox at 0 by 10 AM (and again by 5 PM).</li>
                        <li>Process your inbox & review SMS (10 AM).</li>
                        <li>Add all requests to your to-do list.</li>
                        <li>Update Admin Meeting agenda & prepare for meetings.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4" /> During the Day
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Schedule requested meetings & confirm engagements.</li>
                        <li>Book travel & handle document signatures.</li>
                        <li>Complete Slack/Voxer/SMS requests.</li>
                        <li>Briefly review the calendar 6 weeks ahead.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4" /> End of Day (Sign Off)
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Inbox back to zero & address all open threads.</li>
                        <li>Write notes on unfinished items.</li>
                        <li>Prepare tomorrow’s to-do list & review SMS (4 PM).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 border rounded-xl bg-muted/10">
                    <h3 className="font-bold text-primary mb-3">WEEKLY RESPONSIBILITIES</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Audit CEO calendar 6 weeks ahead.</li>
                      <li>Review client programs & upcoming travel.</li>
                      <li>Weekly meetings with CEO's spouse (calendar review).</li>
                      <li><strong>On Fridays:</strong> Audit next week’s meetings thoroughly.</li>
                    </ul>
                  </div>
                  <div className="p-5 border rounded-xl bg-muted/10">
                    <h3 className="font-bold text-primary mb-3">MONTHLY / QUARTERLY</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li><strong>Monthly:</strong> Review travel 2 months ahead & suspense reports.</li>
                      <li><strong>Quarterly:</strong> Schedule Family Boardroom Meeting & spouse retreats.</li>
                      <li><strong>Annual:</strong> Dentist appointments & recurring personal obligations.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-meetings",
        label: "Admin Meetings",
        icon: Users,
        sections: [
          {
            title: "Admin Meeting Structure",
            content: (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                    <h4 className="font-bold text-primary mb-1">Frequency</h4>
                    <p className="text-sm">4-6 weeks: Daily</p>
                    <p className="text-sm">After 6 weeks: 3x/week</p>
                    <p className="text-sm">After 3 months: Weekly</p>
                  </div>
                  <div className="flex-1 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                    <h4 className="font-bold text-primary mb-1">Title Format</h4>
                    <code className="text-xs bg-background p-1 block border rounded mt-1">
                      Admin Meeting – [Your Name] & CEO – [Date]
                    </code>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-foreground">Agenda Structure (In Order):</h4>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li className="text-sm"><strong>Meeting Action Items</strong> (from prior meetings)</li>
                    <li className="text-sm"><strong>Calendar Review</strong> (screen shared)</li>
                    <li className="text-sm"><strong>Follow-ups</strong> from Previous Meetings</li>
                    <li className="text-sm"><strong>CEO Agenda</strong> (his priorities)</li>
                    <li className="text-sm"><strong>Closing the Loop</strong> (completed tasks)</li>
                    <li className="text-sm"><strong>Assistant Review</strong> (emails/opportunities)</li>
                    <li className="text-sm"><strong>Projects</strong> (top priority first – 3 solution options)</li>
                    <li className="text-sm"><strong>Questions for CEO</strong></li>
                  </ol>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border">
                  <h4 className="font-bold mb-2">How to Run the Meeting:</h4>
                  <p className="text-sm text-muted-foreground italic mb-3">Screen share. Be concise. Summarize clearly. Take notes live. Ask questions.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-calendar",
        label: "Calendar Rules",
        icon: Calendar,
        sections: [
          {
            title: "Calendar Management",
            content: (
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-primary border-b pb-2 mb-4">CEO’s Ideal Week</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-bold mb-2">Monday – Friday</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li><strong>Mornings:</strong> Creative work + workouts</li>
                        <li><strong>Lunch:</strong> 12:00 – 12:30</li>
                        <li><strong>Afternoons:</strong> Meetings</li>
                        <li><strong>Evenings:</strong> Family time</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30">
                      <h5 className="font-bold text-red-600 dark:text-red-400 mb-2">Weekends</h5>
                      <p className="text-sm italic">No business scheduled. Family time is non-negotiable.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground">Scheduling Rules & Priority</h4>
                    <div className="space-y-2">
                       <p className="text-xs font-bold uppercase text-muted-foreground">Default Lengths:</p>
                       <ul className="text-sm space-y-1">
                          <li>15 min → Quick contact</li>
                          <li>20 min → <strong>Standard/Default</strong></li>
                          <li>55 min → Podcast/interview</li>
                          <li>60 min → Masterclass</li>
                       </ul>
                    </div>
                    <div className="space-y-2">
                       <p className="text-xs font-bold uppercase text-muted-foreground">Priority Order:</p>
                       <ol className="list-decimal pl-5 text-sm space-y-1">
                          <li>Health (non-negotiable)</li>
                          <li>Client commitments</li>
                          <li>CEO requested meetings</li>
                          <li>Team requests</li>
                          <li>Outside requests</li>
                       </ol>
                    </div>
                  </div>

                  <div className="p-5 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
                    <h4 className="font-bold text-primary">Invite Requirements:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Clear subject/title</li>
                      <li>Start/end time + correct timezone</li>
                      <li>Precise Location & Phone number</li>
                      <li><strong>Agenda (mandatory)</strong></li>
                      <li>Guests added & correct color category</li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900/30">
                      <p className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center gap-1">
                        <Zap className="h-3 w-3" /> SAME-DAY CHANGES
                      </p>
                      <p className="text-xs mt-1 italic">Must SMS CEO immediately.</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-podcasts",
        label: "Podcasts & Speaking",
        icon: Mic,
        sections: [
          {
            title: "Podcasts & Speaking Engagements",
            content: (
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <h4 className="font-bold mb-3">Vetting Checklist:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Reach", "Reviews", "Social Following", "Past Guests", "Prior Connection", "In-person available"].map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-background border rounded-full text-xs font-medium">{item}</span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold">Required Calendar Info:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Phone number</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Apple Podcast link</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Instagram + LinkedIn</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Connection context</li>
                  </ul>
                </div>

                <div className="mt-6 p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-bold text-primary mb-2 italic">After Podcast:</h4>
                  <p className="text-sm">Send thank-you email, request raw video, and CC videographer.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-travel",
        label: "Travel Management",
        icon: Plane,
        sections: [
          {
            title: "Travel Planning & Management",
            content: (
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-12 p-6 bg-muted/20 rounded-xl border-dashed border-2">
                   <div className="text-center">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Domestic</p>
                      <p className="text-2xl font-bold">3-4 Weeks</p>
                   </div>
                   <div className="h-10 w-px bg-border"></div>
                   <div className="text-center">
                      <p className="text-xs font-bold text-muted-foreground uppercase">International</p>
                      <p className="text-2xl font-bold">6+ Weeks</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold border-b pb-2">Booking Essentials (Immediate)</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2"><PlaneTakeoff className="h-4 w-4 mt-0.5 text-primary" /> Block travel dates + day before/after</li>
                      <li className="flex items-start gap-2"><Shield className="h-4 w-4 mt-0.5 text-primary" /> Create Google Drive "TRIP" file</li>
                      <li className="flex items-start gap-2"><Calendar className="h-4 w-4 mt-0.5 text-primary" /> Add extended all-day events</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold border-b pb-2">Trip File must include:</h4>
                    <ul className="text-sm grid grid-cols-2 gap-2">
                      <li>Flights / Hotel</li>
                      <li>Itinerary</li>
                      <li>Contacts</li>
                      <li>Documents</li>
                      <li>Gym options</li>
                      <li>Reservations</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-red-600/5 border border-red-600/20 rounded-lg">
                   <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" /> Emergency: Delayed or Canceled Flights
                   </h4>
                   <p className="text-sm leading-relaxed">
                     Call airline immediately. Request refund to card (not credit). Cancel hotel/transport. Notify spouse. Update calendar fully.
                   </p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-inbox",
        label: "Inbox Management",
        icon: Mail,
        sections: [
          {
            title: "Processing CEO Inbox",
            content: (
              <div className="space-y-6">
                <p className="text-lg italic font-medium">Goal: Inbox at zero twice daily. The CEO sees only what requires his attention.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-bold text-primary mb-3">Email Labels</h4>
                    <div className="flex flex-col gap-1 text-sm">
                       {["To Respond", "Responded", "To Review", "Waiting On", "Financials", "Investment", "Receipts", "Newsletters", "Archive"].map((l, i) => (
                         <div key={i} className="px-2 py-1 bg-muted/50 rounded">{l}</div>
                       ))}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-bold text-primary mb-3">What Goes to "Review"</h4>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Speaking invites</li>
                      <li>Investment opportunities</li>
                      <li>Travel requests</li>
                      <li>Unclear personal emails</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-bold text-primary mb-3">Handle yourself</h4>
                    <ul className="text-sm space-y-1 list-disc pl-4 text-green-600 dark:text-green-400">
                      <li>Scheduling</li>
                      <li>Declining opportunities</li>
                      <li>Confirmations</li>
                      <li>Basic replies</li>
                      <li>Unsubscribing</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-primary/5 border-2 border-dashed border-primary/20 rounded-xl space-y-3">
                  <h4 className="font-bold text-primary">Response Template</h4>
                  <p className="text-sm italic p-4 bg-background border rounded-lg">
                    "This is [Your Name], [CEO]’s assistant. I got to your email before he did and thought you’d appreciate a speedy reply..."
                  </p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-sms-house",
        label: "SMS & House Coord.",
        icon: MessageSquare,
        sections: [
          {
            title: "SMS Processing & House Manager",
            content: (
              <div className="space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-lg font-bold border-l-4 border-primary pl-4">SMS Processing (10 AM & 4 PM)</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-sm">
                      <li>Read all messages.</li>
                      <li>Add tasks to the to-do list.</li>
                      <li>Respond with action taken & close the loop.</li>
                    </ol>
                 </div>

                 <div className="p-6 border rounded-xl bg-muted/10 space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                       <Home className="h-5 w-5 text-primary" /> Coordinating with House Manager
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>Work with the House Manager to handle:</p>
                      <ul className="list-disc pl-5">
                        <li>Deliveries & Returns</li>
                        <li>Picking up children</li>
                        <li>House events</li>
                      </ul>
                      <p className="mt-4 font-bold text-primary">Pro Tip:</p>
                      <p className="italic">Add her as “Optional” to home events. Confirm availability outside normal hours 2 weeks ahead.</p>
                    </div>
                 </div>
              </div>
            )
          }
        ]
      },
      {
        id: "ea-purchasing-mindset",
        label: "Purchasing & Mindset",
        icon: ShoppingBag,
        sections: [
          {
            title: "Purchasing, Gifting & EA Mindset",
            content: (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary">Large Purchases / Wire</h4>
                    <p className="text-sm text-muted-foreground">If over a certain amount:</p>
                    <ul className="list-decimal pl-5 text-sm space-y-1">
                      <li>Confirm with CEO</li>
                      <li>Gather banking details</li>
                      <li>Plan 2-3 days ahead</li>
                      <li>Confirm completion</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary">Gift Checklist</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Research recipient</li>
                      <li>Get CEO approval</li>
                      <li>Purchase & Track shipment</li>
                      <li>Update CEO</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl relative overflow-hidden">
                   <div className="relative z-10 space-y-4">
                      <h4 className="text-2xl font-bold flex items-center gap-2">
                         <ShieldCheck className="h-6 w-6" /> FINAL EA MINDSET
                      </h4>
                      <p className="text-lg opacity-90 leading-relaxed font-medium">You are a filter, a protector of time, a strategist, a systems thinker, and a problem preventer.</p>
                      <div className="h-px bg-primary-foreground/20 w-full my-4"></div>
                      <p className="text-xl font-bold italic">"If the CEO never experiences friction, you’re doing your job correctly."</p>
                   </div>
                   <Shield className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10" />
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const promptEngineeringSections: DocGroup[] = [
  {
    title: "PROMPT ENGINEERING",
    items: [
      {
        id: "pe-intro",
        label: "What is Prompt Engineering?",
        icon: Globe,
        sections: [
          {
            title: "Overview",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Prompt engineering is the practice of designing and optimizing prompts to efficiently interact with large language models (LLMs). It involves much more than simply asking a question—it's about providing the right context, instructions, and structure.</p>
                <div className="p-4 bg-muted/30 border border-primary/20 rounded-lg">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" /> Why it matters
                  </h4>
                  <ul className="text-sm space-y-2 list-disc pl-4">
                    <li>Maximizes the quality and relevance of AI-generated responses.</li>
                    <li>Reduces hallucinations and factual errors.</li>
                    <li>Saves time by minimizing back-and-forth prompt iterations.</li>
                  </ul>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pe-best-practices",
        label: "Best Practices",
        icon: Target,
        sections: [
          {
            title: "Core Framework",
            content: (
              <div className="space-y-6 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl">
                    <h4 className="font-bold text-foreground mb-2">1. Be Specific & Clear</h4>
                    <p className="text-sm">Avoid vague instructions. Clearly define the task, format, and tone expected in the output.</p>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <h4 className="font-bold text-foreground mb-2">2. Provide Context</h4>
                    <p className="text-sm">Give the model the necessary background info. The more context, the more accurate the response.</p>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <h4 className="font-bold text-foreground mb-2">3. Define the Persona</h4>
                    <p className="text-sm">Ask the model to act as an expert (e.g., "Act as a senior copywriter...").</p>
                  </div>
                  <div className="p-4 border rounded-xl">
                    <h4 className="font-bold text-foreground mb-2">4. Use Examples</h4>
                    <p className="text-sm">Show, don't just tell. Providing clear formatting examples sets a strong pattern for the model to follow.</p>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pe-techniques",
        label: "Prompting Techniques",
        icon: Zap,
        sections: [
          {
            title: "Common Strategies",
            content: (
              <div className="space-y-6 text-muted-foreground">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-foreground border-l-4 border-primary pl-4">Zero-Shot Prompting</h4>
                  <p className="text-sm">Asking a model to perform a task without providing any examples. Best for simple, straightforward tasks.</p>
                  <p className="p-4 bg-muted/40 font-mono text-xs rounded-lg border text-foreground">Extract the dates from this text: "The meeting is on June 12th and the launch is July 1st."</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-foreground border-l-4 border-primary pl-4">Few-Shot Prompting</h4>
                  <p className="text-sm">Providing a few examples within the prompt to guide the model's output formatting and logic.</p>
                  <div className="p-4 bg-muted/40 font-mono text-xs rounded-lg border space-y-2 text-foreground">
                    <p>Great product ={">"} Positive</p>
                    <p>Terrible support ={">"} Negative</p>
                    <p>Okay experience ={">"} Neutral</p>
                    <p>I loved the app ={">"} [Model evaluates this]</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-foreground border-l-4 border-primary pl-4">Chain of Thought</h4>
                  <p className="text-sm">Prompting the model to explain its reasoning step-by-step before outputting the final answer. E.g., adding "Let's think step by step".</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pe-strategies",
        label: "Prompt Strategies",
        icon: List,
        sections: [
          {
            title: "1. Set Clear Goals and Objectives",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold text-foreground">Tactic</TableHead>
                        <TableHead className="font-semibold text-foreground">Prompt Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Use action verbs to specify the desired action</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Write a bulleted list that summarizes the key findings of the attached research paper"</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Define the desired length and format of the output</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Compose a 500-word essay discussing the impact of climate change on coastal communities."</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Specify the target audience</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Write a product description for a new line of organic skincare products, targeting young adults concerned with sustainability."</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          },
          {
            title: "2. Provide Context and Background",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold text-foreground">Tactic</TableHead>
                        <TableHead className="font-semibold text-foreground">Prompt Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Include relevant facts and data</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Given that global temperatures have risen by 1 degree Celsius since the pre-industrial era, discuss the potential consequences for sea level rise."</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Reference specific sources or documents</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Based on the attached financial report, analyze the company's profitability over the past five years."</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Define key terms and concepts</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Explain the concept of quantum computing in simple terms, suitable for a non-technical audience."</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          },
          {
            title: "3. Use Few-Shot Prompting",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold text-foreground">Tactic</TableHead>
                        <TableHead className="font-semibold text-foreground">Prompt Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Provide a few examples of desired input-output pairs</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">Input: "Cat" Output: "A small furry mammal with whiskers." Input: "Dog" Output: "A domesticated canine known for its loyalty." Prompt: "Elephant"</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Demonstrate the desired style or tone</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">Example 1 (humorous): "The politician's speech was so dull, it could cure insomnia." Example 2 (formal): "The dignitary delivered an address..." Prompt: "Write a sentence describing the comedian's stand-up routine."</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Show the desired level of detail</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">Example 1 (brief): "The movie was about a young boy..." Example 2 (detailed): "The science fiction film follows the story of Elliot..." Prompt: "Summarize the plot of the novel you just finished reading."</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          },
          {
            title: "4. Be Specific",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold text-foreground">Tactic</TableHead>
                        <TableHead className="font-semibold text-foreground">Prompt Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Use precise language and avoid ambiguity</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">Instead of: "Write something about climate change," use: "Write a persuasive essay arguing for the implementation of stricter carbon emission regulations."</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Quantify your requests whenever possible</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">Instead of: "Write a long poem," use: "Write a sonnet with 14 lines that explores themes of love and loss."</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Break down complex tasks into smaller steps</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">Instead of: "Create a marketing plan," use: "1. Identify target audience. 2. Develop key messages. 3. Choose channels."</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          },
          {
            title: "5. Iterate and Experiment",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold text-foreground">Tactic</TableHead>
                        <TableHead className="font-semibold text-foreground">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Try different phrasings and keywords</TableCell>
                        <TableCell className="text-muted-foreground text-sm">Rephrase your prompt using synonyms or alternative sentence structures.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Adjust the level of detail and specificity</TableCell>
                        <TableCell className="text-muted-foreground text-sm">Add or remove information to fine-tune the output.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Test different prompt lengths</TableCell>
                        <TableCell className="text-muted-foreground text-sm">Experiment with both shorter and longer prompts to find the optimal balance.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          },
          {
            title: "6. Leverage Chain of Thought",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold text-foreground">Tactic</TableHead>
                        <TableHead className="font-semibold text-foreground">Prompt Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Encourage step-by-step reasoning</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Solve this problem step-by-step: John has 5 apples, he eats 2... Step 1: John starts with 5 apples. Step 2: eats 2..."</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Ask the model to explain its reasoning</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"Explain your thought process in determining the sentiment of this movie review: 'The acting was superb...'"</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-foreground">Guide through a logical sequence</TableCell>
                        <TableCell className="text-muted-foreground italic text-sm">"To classify this email as spam... consider: 1. Is sender known? 2. Subject keywords? 3. Offer too good to be true?"</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary">
                  <p><strong>Google Cloud Tip:</strong> For further guidance, explore the <a href="https://cloud.google.com/blog/products/ai-machine-learning/five-best-practices-for-prompt-engineering" target="_blank" rel="noopener noreferrer" className="underline font-bold">Five Best Practices for Prompt Engineering</a> on Google Cloud.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pe-use-cases",
        label: "Use Cases & Examples",
        icon: FileText,
        sections: [
          {
            title: "Language & Text Generation",
            content: (
              <div className="space-y-6 text-muted-foreground">
                <p>Prompt engineering helps produce customized and relevant output. Here are specific examples:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl bg-muted/10 space-y-2">
                    <h4 className="font-bold text-foreground">Creative Writing</h4>
                    <p className="text-xs">Specify genre, tone, style, and plot points to guide the narrative.</p>
                    <div className="p-3 bg-background border rounded-lg font-mono text-xs text-primary/80">"Write a short story about a young woman who discovers a magical portal in her attic."</div>
                  </div>
                  <div className="p-4 border rounded-xl bg-muted/10 space-y-2">
                    <h4 className="font-bold text-foreground">Summarization</h4>
                    <p className="text-xs">Provide text and instruct the AI to generate concise summaries.</p>
                    <div className="p-3 bg-background border rounded-lg font-mono text-xs text-primary/80">"Summarize the main points of the following news article on climate change."</div>
                  </div>
                  <div className="p-4 border rounded-xl bg-muted/10 space-y-2">
                    <h4 className="font-bold text-foreground">Translation</h4>
                    <p className="text-xs">Specify source and target languages to preserve meaning.</p>
                    <div className="p-3 bg-background border rounded-lg font-mono text-xs text-primary/80">"Translate the following text from English to Spanish: 'The quick brown fox...'"</div>
                  </div>
                  <div className="p-4 border rounded-xl bg-muted/10 space-y-2">
                    <h4 className="font-bold text-foreground">Dialogue</h4>
                    <p className="text-xs">Simulate conversations for chatbots or roleplay.</p>
                    <div className="p-3 bg-background border rounded-lg font-mono text-xs text-primary/80">"You are a friendly chatbot helping users troubleshoot... Respond to: 'My computer won't turn on.'"</div>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Question Answering",
            content: (
               <div className="space-y-4 text-muted-foreground">
                  <div className="space-y-3">
                    <div className="p-4 border-l-4 border-primary bg-muted/10 rounded-r-xl">
                      <h4 className="font-bold text-foreground">Open-Ended & Specific Questions</h4>
                      <p className="text-sm mt-1 mb-2">Target comprehensive answers or precise information retrieval.</p>
                      <ul className="space-y-2 font-mono text-xs">
                        <li className="p-2 bg-background border rounded text-primary/80">"Explain the concept of quantum computing and its impact..."</li>
                        <li className="p-2 bg-background border rounded text-primary/80">"According to the provided text, what are the main causes..."</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border-l-4 border-primary bg-muted/10 rounded-r-xl">
                      <h4 className="font-bold text-foreground">Hypothetical & Opinion-Based</h4>
                      <p className="text-sm mt-1 mb-2">Explore situations requiring reasoning and justification.</p>
                      <ul className="space-y-2 font-mono text-xs">
                        <li className="p-2 bg-background border rounded text-primary/80">"What would happen if humans could travel at the speed of light?"</li>
                        <li className="p-2 bg-background border rounded text-primary/80">"Do you believe AI will surpass human intelligence? Why?"</li>
                      </ul>
                    </div>
                  </div>
               </div>
            )
          },
          {
            title: "Code Generation",
            content: (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
                  <div className="p-4 border rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                     <h4 className="font-bold text-foreground">Code Completion</h4>
                     <p className="text-xs">"Write a Python function to calculate the factorial of a given number."</p>
                  </div>
                  <div className="p-4 border rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                     <h4 className="font-bold text-foreground">Code Translation</h4>
                     <p className="text-xs">"Translate the following Python code to JavaScript: def greet(name)..."</p>
                  </div>
                  <div className="p-4 border rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                     <h4 className="font-bold text-foreground">Code Optimization</h4>
                     <p className="text-xs">"Optimize the following Python code to reduce its execution time."</p>
                  </div>
                  <div className="p-4 border rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                     <h4 className="font-bold text-foreground">Code Debugging</h4>
                     <p className="text-xs">"Debug the following Java code and explain why it is throwing a NullPointerException."</p>
                  </div>
               </div>
            )
          },
          {
             title: "Image Generation",
             content: (
                <div className="space-y-4 text-muted-foreground">
                   <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <dt className="font-bold text-foreground flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary/80"></div>Photorealistic</dt>
                       <dd className="text-xs">Images describing lighting, scenery, and subjects: <br/><code className="text-primary mt-1 block bg-primary/5 p-2 rounded">"A photorealistic image of a sunset over the ocean with palm trees silhouetted..."</code></dd>
                     </div>
                     <div className="space-y-2">
                       <dt className="font-bold text-foreground flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary/80"></div>Artistic & Abstract</dt>
                       <dd className="text-xs">Specify techniques or emotional concepts: <br/><code className="text-primary mt-1 block bg-primary/5 p-2 rounded">"An impressionist painting of a bustling city street..."</code></dd>
                     </div>
                     <div className="space-y-2 md:col-span-2">
                       <dt className="font-bold text-foreground flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary/80"></div>Image Editing</dt>
                       <dd className="text-xs">Provide an image and specify modification instructions: <br/><code className="text-primary mt-1 block bg-primary/5 p-2 rounded">"Change the background of this photo to a starry night sky and add a full moon."</code></dd>
                     </div>
                   </dl>
                </div>
             )
          }
        ]
      }
    ]
  }
];


export const hvacSections: DocGroup[] = [
  {
    title: "HVAC FUNDAMENTALS",
    items: [
      {
        id: "hvac-introduction",
        label: "Introduction to HVAC",
        icon: Thermometer,
        sections: [
          {
            title: "What Does HVAC Stand For?",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>HVAC stands for <strong className="text-foreground">Heating, Ventilation, and Air Conditioning</strong>. It is the technology and systems used to control the temperature, humidity, and air quality of indoor environments.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-primary/5">
                    <p className="font-semibold text-primary mb-1">H – Heating</p>
                    <p className="text-sm">Systems that generate and distribute warmth during cold months, such as furnaces, boilers, and heat pumps.</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-primary/5">
                    <p className="font-semibold text-primary mb-1">V – Ventilation</p>
                    <p className="text-sm">Processes that bring fresh air in and push stale air out, improving indoor air quality and removing pollutants.</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-primary/5">
                    <p className="font-semibold text-primary mb-1">A – Air Conditioning</p>
                    <p className="text-sm">Equipment that cools and dehumidifies indoor air during hot months, using refrigerant and compressor-based systems.</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Key Takeaway</p>
                  <p>HVAC is not just about keeping a space comfortable — it is a critical system that supports health, safety, and building functionality every day of the year.</p>
                </div>
              </div>
            )
          },
          {
            title: "Purpose of HVAC Systems",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>HVAC systems serve multiple essential roles in residential and commercial buildings:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Maintain comfortable indoor temperatures year-round.</li>
                  <li>Control humidity to prevent mold growth and protect building materials.</li>
                  <li>Filter out dust, allergens, bacteria, and airborne pollutants.</li>
                  <li>Ensure proper ventilation so occupants receive adequate fresh air.</li>
                  <li>Comply with building codes and health regulations.</li>
                  <li>Improve energy efficiency, reducing utility costs for homeowners and businesses.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Overview of the HVAC Industry",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The HVAC industry is one of the largest segments of the construction and home services market. Key industry facts include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>HVAC technicians are among the most in-demand skilled trades workers in the United States.</li>
                  <li>The industry services both <strong className="text-foreground">residential</strong> (homes, apartments) and <strong className="text-foreground">commercial</strong> (offices, retail, hospitals, schools) clients.</li>
                  <li>HVAC businesses typically operate year-round, with demand peaking in summer (air conditioning) and winter (heating).</li>
                  <li>Licensing, certifications, and compliance with environmental regulations are required to operate legally.</li>
                  <li>Modern HVAC now incorporates smart technology, energy-efficient equipment, and environmentally friendly refrigerants.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "hvac-systems",
        label: "Common HVAC Systems",
        icon: Wind,
        sections: [
          {
            title: "Central Air Conditioning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The most common cooling system in larger homes and commercial buildings. It uses a central unit (typically located outside or in a mechanical room) to cool air and distribute it throughout the building via a duct system. A blower pushes the cooled air through supply ducts and returns warm air through return ducts.</p>
              </div>
            )
          },
          {
            title: "Split Systems",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A split system is the traditional pairing of an <strong className="text-foreground">outdoor unit</strong> (the condenser/compressor) with an <strong className="text-foreground">indoor unit</strong> (the air handler or furnace/coil). The two units are connected by refrigerant lines. Split systems handle both heating (via a furnace) and cooling (via an air conditioner) and are the most popular HVAC configuration for residential use.</p>
              </div>
            )
          },
          {
            title: "Ductless Mini-Split Systems",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Ductless mini-split systems work like traditional split systems but <strong className="text-foreground">without ductwork</strong>. They are ideal for homes without ducts, room additions, or spaces requiring individual temperature control. Each room or zone has its own indoor air handler connected to an outdoor unit. Mini-splits are energy-efficient and easy to install.</p>
              </div>
            )
          },
          {
            title: "Heat Pumps",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Heat pumps are versatile systems that can provide both heating and cooling by <strong className="text-foreground">transferring heat</strong> rather than generating it. In summer, they function like an air conditioner, moving heat out of the building. In winter, they extract heat from the outdoor air (even in cold temperatures) and bring it inside. Heat pumps are highly energy-efficient and are increasingly popular in moderate climates.</p>
              </div>
            )
          },
          {
            title: "Furnaces",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Furnaces are heating-only systems that burn fuel (natural gas, propane, or oil) or use electricity to generate heat. The heat is then distributed through ducts using a blower. Gas furnaces are the most common heating system in colder regions of the United States due to their reliability and cost-effectiveness.</p>
              </div>
            )
          },
          {
            title: "Boilers",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Boilers heat water and distribute steam or hot water through pipes to radiators, baseboard heaters, or radiant floor systems. Unlike forced-air systems, boilers do not use ductwork and are often praised for providing even, comfortable heat. They are common in older homes and commercial buildings.</p>
              </div>
            )
          },
          {
            title: "Ventilation Systems",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Ventilation systems control the exchange of indoor and outdoor air. They include exhaust fans, energy recovery ventilators (ERVs), and heat recovery ventilators (HRVs). Proper ventilation removes pollutants, controls moisture, and ensures a healthy indoor environment. Ventilation is especially important in tightly sealed, energy-efficient buildings.</p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "SERVICES & OPERATIONS",
    items: [
      {
        id: "hvac-services",
        label: "Core Services",
        icon: Wrench,
        sections: [
          {
            title: "Installation",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Installation services involve setting up new HVAC equipment in a building. This includes installing new systems in newly constructed homes, replacing old equipment with modern units, and adding new zones or ductwork.</p>
                <div className="p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm">
                  <strong>Important:</strong> Installation projects require proper <strong>load calculations</strong> to ensure the equipment is the right capacity for the space. An undersized or oversized system will perform poorly and break down faster.
                </div>
              </div>
            )
          },
          {
            title: "Maintenance",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Preventive maintenance is a scheduled service performed to keep HVAC systems running efficiently and prevent breakdowns. Typical maintenance tasks include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cleaning or replacing air filters.</li>
                  <li>Inspecting and cleaning coils (evaporator and condenser).</li>
                  <li>Checking refrigerant levels.</li>
                  <li>Lubricating moving parts.</li>
                  <li>Inspecting electrical connections and controls.</li>
                  <li>Testing thermostat calibration.</li>
                  <li>Inspecting and cleaning the condensate drain.</li>
                </ul>
                <p className="text-sm">Many HVAC companies offer <strong className="text-foreground">maintenance agreements or service plans</strong>, where customers pay an annual fee for one or two scheduled tune-ups per year.</p>
              </div>
            )
          },
          {
            title: "Repairs",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Repair services address specific problems with existing HVAC systems. Common repairs include fixing refrigerant leaks, replacing compressors, repairing ductwork, fixing electrical issues, and replacing worn components. Repairs may be scheduled in advance or requested as emergency calls.</p>
              </div>
            )
          },
          {
            title: "System Replacement",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>When an HVAC system is too old, too inefficient, or too costly to repair, the company will recommend a full system replacement. This involves removing the old equipment and installing a new system. Sales representatives often assist with this process, presenting equipment options and financing plans.</p>
              </div>
            )
          },
          {
            title: "Inspections",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>HVAC inspections are detailed evaluations of a system's condition, performance, and safety. They are commonly requested during real estate transactions, after extreme weather events, or as part of energy audits. Inspections produce a written report documenting findings and recommendations.</p>
              </div>
            )
          },
          {
            title: "Emergency HVAC Services",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Many HVAC companies offer <strong className="text-foreground">24/7 emergency service</strong> for situations that cannot wait for a scheduled appointment — such as a furnace failing in winter or an air conditioner breaking down during a heat wave.</p>
                <div className="p-3 bg-muted/50 border rounded-lg text-sm">
                  Emergency calls typically carry a higher service fee. Fast response time and clear communication are critical for customer satisfaction during emergencies.
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "hvac-operations",
        label: "How the Business Operates",
        icon: Info,
        sections: [
          {
            title: "The Typical Service Workflow",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ol className="space-y-4">
                  {[
                    { step: "1. Customer Inquiry", desc: "A customer contacts the company by phone, website form, or email with a question, complaint, or service request." },
                    { step: "2. Scheduling Appointments", desc: "The CSR or dispatcher collects: name, address, phone number, system type, and description of the issue. They then schedule an appointment that works for the customer and available technicians." },
                    { step: "3. Technician Dispatch", desc: "The dispatcher assigns the job to the most appropriate available technician based on skill level, location, and availability. The technician receives job details via a mobile app, work order, or phone call." },
                    { step: "4. Diagnosis and Quotation", desc: "The technician arrives on-site, inspects the system, identifies the problem, and explains the findings to the customer. A quote is provided before any work begins. Customers must approve the quote before the technician proceeds." },
                    { step: "5. Service or Repair", desc: "With the customer's approval, the technician performs the repair, maintenance, or installation. Parts used and work performed are documented in real time." },
                    { step: "6. Payment and Documentation", desc: "Upon completion, the technician collects payment (cash, check, card, or financing). A digital or paper invoice is generated and provided to the customer. All documentation is saved in the company's service management software." },
                    { step: "7. Follow-Up or Maintenance Scheduling", desc: "A follow-up call or email may be sent to confirm satisfaction. Customers are offered maintenance plans or a reminder for their next service. Reviews are often requested to help the company's online reputation." },
                  ].map(({ step, desc }) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-fit">{step}:</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Pro Tip for CSRs & VAs</p>
                  <p>Always confirm the customer's full address, best contact number, and a clear description of the problem during the intake call. This allows the dispatcher to assign the right technician and reduces delays on the day of service.</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "REFERENCE & COMPLIANCE",
    items: [
      {
        id: "hvac-terminology",
        label: "HVAC Terminology",
        icon: BookOpen,
        sections: [
          {
            title: "Common HVAC Terms Glossary",
            content: (
              <div className="text-muted-foreground">
                <p className="mb-4 text-sm">Familiarity with these terms will help you communicate confidently with customers, technicians, and colleagues.</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-40">Term</TableHead>
                      <TableHead className="font-bold">Definition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { term: "BTU", def: "British Thermal Unit. A measurement of heat energy. HVAC equipment capacity is rated in BTUs per hour. Higher BTUs = more heating or cooling power." },
                      { term: "Thermostat", def: "A device that monitors and controls the temperature of a space. Modern thermostats can be programmable or smart (Wi-Fi enabled)." },
                      { term: "Refrigerant", def: "A chemical compound that absorbs and releases heat as it circulates through the HVAC system. Common types include R-22 (now phased out) and R-410A. Refrigerant handling requires EPA certification." },
                      { term: "Ductwork", def: "A network of metal, fiberglass, or flexible tubes that distribute conditioned air throughout a building. Leaky or poorly designed ducts waste energy and reduce system efficiency." },
                      { term: "Compressor", def: "The heart of an air conditioning or heat pump system. It compresses refrigerant gas, increasing its pressure and temperature to enable the heat transfer process." },
                      { term: "Air Handler", def: "The indoor component of a split system that circulates air across the coil and through the ductwork. It typically houses the blower motor and filter." },
                      { term: "Condenser", def: "The outdoor unit of an air conditioner or heat pump that releases heat from the refrigerant to the outside air. Contains the compressor and condenser coil." },
                      { term: "Evaporator Coil", def: "Located indoors, this coil absorbs heat from indoor air as refrigerant evaporates inside it, cooling the air before it is circulated back into the space." },
                      { term: "SEER Rating", def: "Seasonal Energy Efficiency Ratio. Measures the cooling efficiency of an air conditioner over an entire season. Higher SEER = more efficient = lower energy bills." },
                      { term: "AFUE", def: "Annual Fuel Utilization Efficiency. Measures heating efficiency for furnaces and boilers. An AFUE of 95% means 95 cents of every dollar spent on fuel becomes heat." },
                      { term: "Load Calculation", def: "An engineering calculation (often using Manual J software) that determines the correct equipment size needed for a specific building based on square footage, insulation, windows, and climate." },
                      { term: "Refrigerant Charge", def: "The correct amount of refrigerant in a system. An improperly charged system runs inefficiently and can cause component failure." },
                      { term: "Blower Motor", def: "The motor inside the air handler or furnace that drives the fan to circulate air through the duct system." },
                      { term: "Condensate Drain", def: "A drain line that removes the moisture (condensate) that collects on the evaporator coil during the cooling process. Clogs can cause water damage." },
                      { term: "Zoning System", def: "A setup using multiple thermostats and dampers to control temperature independently in different areas (zones) of a building." },
                    ].map(({ term, def }) => (
                      <TableRow key={term}>
                        <TableCell className="font-semibold text-foreground align-top">{term}</TableCell>
                        <TableCell className="text-sm">{def}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "hvac-roles",
        label: "Roles in an HVAC Company",
        icon: Users,
        sections: [
          {
            title: "Team Roles & Responsibilities",
            content: (
              <div className="text-muted-foreground">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-52">Role</TableHead>
                      <TableHead className="font-bold">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { role: "HVAC Technician", resp: "Licensed professionals who diagnose, repair, and maintain HVAC systems. They are the primary field workers and must hold appropriate state licenses and EPA 608 certification for refrigerant handling." },
                      { role: "Installer", resp: "Technicians or helpers who specialize in installing new HVAC equipment. Installers work on new construction and replacement projects, often under the supervision of a lead technician or foreman." },
                      { role: "Customer Service Representative (CSR)", resp: "The first point of contact for customers. CSRs answer incoming calls and messages, gather job information, schedule appointments, handle complaints, and communicate with dispatchers." },
                      { role: "Dispatcher", resp: "Responsible for coordinating technician schedules and routing. Dispatchers match service calls with the right technician, monitor job progress throughout the day, and handle urgent schedule changes." },
                      { role: "Sales Representative", resp: "Focuses on selling new HVAC systems, replacement equipment, and maintenance agreements. Sales reps visit customers' homes or businesses, perform assessments, and present quotes." },
                      { role: "Operations Manager", resp: "Oversees day-to-day business operations, including scheduling, staffing, quality control, and company policies. Ensures technicians have the tools and parts they need, and monitors key performance indicators." },
                      { role: "Office Manager / Admin", resp: "Manages administrative tasks such as invoicing, accounts receivable, payroll support, and office organization. Often uses field service management software daily." },
                      { role: "Virtual Assistant (VA)", resp: "Remotely supports customer service, scheduling, follow-up calls, review management, and administrative tasks. Must be well-versed in HVAC terminology and company processes." },
                    ].map(({ role, resp }) => (
                      <TableRow key={role}>
                        <TableCell className="font-semibold text-foreground align-top">{role}</TableCell>
                        <TableCell className="text-sm">{resp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "hvac-tools",
        label: "Tools & Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Common HVAC Tools",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p className="text-sm">HVAC technicians rely on specialized tools to diagnose, repair, and maintain systems safely and accurately.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Manifold Gauge Set", desc: "Used to measure refrigerant pressure on both the high (discharge) and low (suction) sides of the system. Helps diagnose compressor and expansion valve issues." },
                    { name: "Refrigerant Recovery Machine", desc: "EPA regulations require that refrigerant be recovered from the system into a certified recovery cylinder rather than released into the atmosphere before any refrigerant work is performed." },
                    { name: "Vacuum Pump", desc: "Used to remove moisture and air from the refrigerant lines after repairs or when installing a new system. This process — called evacuation — is critical to prevent damage and maintain efficiency." },
                    { name: "Leak Detectors", desc: "Electronic leak detectors or UV dye kits used to locate refrigerant leaks. An undetected leak leads to poor system performance, higher energy bills, and environmental harm." },
                    { name: "Multimeter", desc: "An essential electrical diagnostic tool. Technicians use it to measure voltage, current, and resistance in components such as capacitors, contactors, motors, and control boards." },
                    { name: "Thermometer / Temperature Probes", desc: "Measure supply and return air temperatures, allowing technicians to calculate the temperature differential to confirm whether the system is performing correctly." },
                    { name: "Torch and Brazing Equipment", desc: "Used to solder or braze copper refrigerant lines and fittings during installation or repair. Requires skill and proper safety precautions, including the use of nitrogen to prevent oxidation." },
                    { name: "Nitrogen Tank", desc: "Nitrogen is used to pressurize refrigerant lines for leak testing and to protect the interior of lines from oxidation during brazing." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{name}</p>
                      <p className="text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "hvac-safety",
        label: "Safety & Compliance",
        icon: ShieldCheck,
        sections: [
          {
            title: "EPA Section 608 Certification",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Any technician who works with refrigerants is <strong className="text-foreground">required by federal law</strong> to hold an EPA Section 608 certification. This certification covers safe refrigerant handling, recovery, and disposal. There are four certification types (Type I, II, III, and Universal), based on the type of equipment serviced.</p>
              </div>
            )
          },
          {
            title: "State Licensing",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Most states require HVAC contractors and technicians to hold a state license to perform HVAC work. License requirements vary by state but typically include passing an exam, meeting experience requirements, and maintaining continuing education. Operating without a license can result in fines, legal liability, and loss of business.</p>
              </div>
            )
          },
          {
            title: "OSHA Safety Standards",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>OSHA sets workplace safety standards that HVAC companies must follow, including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Proper use of personal protective equipment (PPE) such as gloves, safety glasses, and respirators.</li>
                  <li>Safe ladder and fall protection practices.</li>
                  <li>Electrical safety when working with live panels or equipment.</li>
                  <li>Safe handling of refrigerants and other chemicals.</li>
                  <li>Confined space entry procedures for work in attics, crawl spaces, and mechanical rooms.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Building Codes and Permits",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Installation and replacement work typically requires a permit from the local municipality. Permitted work is inspected by a building official to ensure compliance with local building codes and safety standards. Unpermitted HVAC work can void equipment warranties and create liability issues.</p>
              </div>
            )
          },
          {
            title: "Refrigerant Regulations",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The EPA regulates the types of refrigerants that can be used and how they must be handled.</p>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  <strong>Important Reminder:</strong> Always verify that technicians dispatched for refrigerant work hold current EPA 608 certification. This is a legal requirement, not just a best practice.
                </div>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong className="text-foreground">R-22 (Freon)</strong> — Phased out due to environmental impact; no longer manufactured in the US.</li>
                  <li><strong className="text-foreground">R-410A</strong> — The current standard refrigerant.</li>
                  <li><strong className="text-foreground">R-32 and R-454B</strong> — Newer, lower-global-warming-potential refrigerants entering the market.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "hvac-issues",
        label: "Common Customer Issues",
        icon: AlertCircle,
        sections: [
          {
            title: "AC Not Cooling",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>One of the most common summer complaints. Possible causes include low refrigerant (due to a leak), a dirty condenser coil, a malfunctioning compressor, a tripped circuit breaker, or a clogged air filter.</p>
                <p className="text-sm italic">CSRs should ask: How long has the problem existed? Is the unit running at all?</p>
              </div>
            )
          },
          {
            title: "Weak Airflow",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Common causes include a clogged air filter, a failing blower motor, leaky or disconnected ductwork, closed or blocked vents, or ice buildup on the evaporator coil.</p>
                <p className="text-sm italic">CSRs should ask: When did you last change your filter?</p>
              </div>
            )
          },
          {
            title: "Strange Noises",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Unusual sounds are often the first sign of a developing problem. Common sounds and their likely causes:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong className="text-foreground">Banging or clanking</strong> — Loose or broken component inside the unit (e.g., blower fan blade).</li>
                  <li><strong className="text-foreground">Squealing</strong> — Worn belt or motor bearing.</li>
                  <li><strong className="text-foreground">Clicking</strong> — Relay or control board issue, or a failing capacitor.</li>
                  <li><strong className="text-foreground">Hissing</strong> — Refrigerant leak or air escaping from ductwork.</li>
                  <li><strong className="text-foreground">Rumbling</strong> — Dirty burners on a furnace or debris in the outdoor unit.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Thermostat Issues",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A malfunctioning thermostat can cause the system to short cycle (turn on and off frequently), fail to reach the set temperature, or not turn on at all. Common causes include dead batteries, incorrect settings, wiring issues, or a faulty thermostat that needs replacement.</p>
              </div>
            )
          },
          {
            title: "Refrigerant Leaks",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A refrigerant leak causes gradual loss of cooling capacity, ice buildup on the coil, and higher energy bills.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  Refrigerant cannot simply be "topped off" — the leak must be found, repaired, and the system recharged. This requires a certified technician.
                </div>
              </div>
            )
          },
          {
            title: "Water Leaks or Pooling",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Water around an indoor unit is usually caused by a clogged condensate drain line or a cracked condensate pan. If left unaddressed, this can lead to water damage, mold growth, and system shutdowns (many systems have a safety float switch that shuts off the unit when water is detected).</p>
              </div>
            )
          },
          {
            title: "Uneven Heating or Cooling",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Some rooms are too hot while others are too cold. This can result from improperly designed ductwork, unbalanced airflow, blocked vents, duct leaks, or the need for a zoning system. This is a common complaint in larger homes or multi-story buildings.</p>
              </div>
            )
          },
          {
            title: "System Won't Turn On",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Common causes include a tripped circuit breaker, blown fuse, disconnected power switch, dead thermostat batteries, a safety switch that has triggered, or a failed control board.</p>
                <p className="text-sm italic">CSRs should walk customers through basic troubleshooting (check breaker, replace thermostat batteries) before dispatching a technician.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "hvac-importance",
        label: "Why HVAC Services Matter",
        icon: Heart,
        sections: [
          {
            title: "Why HVAC Services Are Important",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Comfort and Quality of Life", body: "At the most fundamental level, HVAC systems keep people comfortable. Extreme temperatures are not just uncomfortable but can be dangerous, particularly for children, the elderly, and individuals with health conditions." },
                    { title: "Indoor Air Quality (IAQ)", body: "The EPA estimates that indoor air can be 2–5× more polluted than outdoor air. HVAC systems filter out dust, pollen, pet dander, mold spores, and bacteria. Poor IAQ is linked to allergies, asthma, headaches, and reduced cognitive performance." },
                    { title: "Energy Efficiency & Cost Savings", body: "HVAC systems account for approximately 40–50% of total energy consumption in a typical building. A well-maintained, properly sized, high-efficiency system can dramatically reduce utility bills." },
                    { title: "Health and Safety", body: "Poorly maintained furnaces can develop cracks that allow carbon monoxide — a colorless, odorless, and deadly gas — to enter living spaces. Mold thrives in humid, poorly ventilated environments and can cause serious respiratory issues." },
                    { title: "Property Protection", body: "Extreme temperatures and humidity can damage building materials, electronics, wooden furniture, and stored items. HVAC systems regulate moisture levels, preventing warping, cracking, rust, and mold damage." },
                    { title: "Business Continuity", body: "For commercial clients — restaurants, medical offices, retail stores, data centers — HVAC failure is a business emergency. Fast, reliable HVAC service keeps businesses operational and helps them serve their own customers without interruption." },
                  ].map(({ title, body }) => (
                    <div key={title} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{title}</p>
                      <p className="text-sm">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Final Note for New Team Members</p>
                  <p>HVAC may seem like a technical field, but great customer service, clear communication, and attention to detail are just as important as technical knowledge. When in doubt, ask questions, use this guide as a reference, and always prioritize the customer's safety and comfort. Welcome to the team!</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const carpetCleaningSections: DocGroup[] = [
  {
    title: "CARPET CLEANING BASICS",
    items: [
      {
        id: "carpet-introduction",
        label: "Introduction to Carpet Cleaning",
        icon: Sparkles,
        sections: [
          {
            title: "What Is Carpet Cleaning?",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Carpet cleaning is the professional process of removing dirt, stains, allergens, bacteria, and odors from carpet fibers using specialized equipment and cleaning solutions. Unlike regular vacuuming, professional carpet cleaning reaches deep into the carpet pile to extract embedded debris that household tools simply cannot remove.</p>
                <p>Carpet cleaning services are provided for both <strong className="text-foreground">residential clients</strong> (homeowners, renters, and property managers) and <strong className="text-foreground">commercial clients</strong> (offices, hotels, restaurants, schools, and healthcare facilities). The methods and equipment used vary depending on the type of carpet, the level of soiling, and the specific needs of the customer.</p>
              </div>
            )
          },
          {
            title: "Why Carpet Cleaning Services Are Important",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Carpets act like a giant filter, trapping dust, dirt, pet dander, bacteria, mold spores, and other pollutants. Professional carpet cleaning addresses all of these issues:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-foreground">Health and hygiene:</strong> Deep cleaning removes bacteria, allergens, and dust mites that can trigger respiratory issues and allergies.</li>
                  <li><strong className="text-foreground">Appearance:</strong> Clean carpets look fresh, smell good, and improve the overall appearance of a home or business.</li>
                  <li><strong className="text-foreground">Longevity:</strong> Regular professional cleaning extends the life of carpet by removing abrasive particles that break down fibers over time.</li>
                  <li><strong className="text-foreground">Odor control:</strong> Pets, spills, and general use create persistent odors that only professional treatment can fully eliminate.</li>
                  <li><strong className="text-foreground">Compliance:</strong> Commercial properties in food service and healthcare often have cleanliness standards that require regular professional cleaning.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Overview of the Carpet Cleaning Industry",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The carpet cleaning industry is a well-established segment of the broader cleaning services market. Key facts about the industry:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Carpet cleaning is in demand year-round, with busy periods in spring (spring cleaning) and fall (pre-holiday preparation).</li>
                  <li>The industry serves both residential and commercial markets, with commercial accounts often providing higher and more consistent revenue.</li>
                  <li>Technicians must be knowledgeable about fiber types, cleaning chemistry, and equipment to deliver safe, effective results.</li>
                  <li>Many companies expand their offerings to include upholstery, tile and grout, area rugs, and water damage restoration.</li>
                  <li>Customer trust and referrals are the lifeblood of carpet cleaning businesses; a reputation for quality and reliability drives long-term growth.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "carpet-methods",
        label: "Cleaning Methods",
        icon: Droplets,
        sections: [
          {
            title: "Hot Water Extraction (Steam Cleaning)",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Hot water extraction (HWE) is the most widely used and recommended professional carpet cleaning method. Hot water mixed with a cleaning solution is injected deep into the carpet pile under high pressure, then immediately extracted along with dissolved dirt and debris using a powerful vacuum system.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm">
                    <p className="font-semibold text-foreground mb-1">Best For</p>
                    <p>Heavily soiled carpets, deep cleaning, residential use</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm">
                    <p className="font-semibold text-foreground mb-1">Drying Time</p>
                    <p>4 to 12 hours depending on airflow, humidity, and carpet thickness</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-primary/5 text-sm">
                    <p className="font-semibold text-primary mb-1">Industry Tip</p>
                    <p>The IICRC recommends hot water extraction as the preferred method for most residential carpet cleaning.</p>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Dry Carpet Cleaning",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Dry carpet cleaning uses a very low-moisture compound or powder that is worked into the carpet fibers. The compound absorbs dirt and debris, and is then vacuumed out, leaving it clean and dry almost immediately.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Best For</p><p>Commercial settings that cannot afford long dry times, maintenance cleaning between deep cleans</p></div>
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Drying Time</p><p>Near-instant — carpets are dry and ready to use right away</p></div>
                </div>
              </div>
            )
          },
          {
            title: "Shampoo Cleaning",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>An older method involving a foamy cleaning solution applied to the carpet and scrubbed in with a rotary brush machine. The foam encapsulates dirt, and once dry, it is vacuumed up. Can leave residue that attracts dirt more quickly if not rinsed properly.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Best For</p><p>Heavy-traffic commercial areas as a maintenance cleaning method</p></div>
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Drying Time</p><p>Several hours; residue must be thoroughly vacuumed once dry</p></div>
                </div>
              </div>
            )
          },
          {
            title: "Bonnet Cleaning",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>A surface-level cleaning method popular in hotels and commercial facilities for quick results. A rotary machine with an absorbent pad (bonnet) buffs the carpet surface, pulling up dirt from the top layer of fibers. It does not clean deep into the pile.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Best For</p><p>Interim or maintenance cleaning in commercial environments where speed is prioritized</p></div>
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Drying Time</p><p>1 to 2 hours</p></div>
                </div>
              </div>
            )
          },
          {
            title: "Encapsulation Cleaning",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>A modern, low-moisture method that uses synthetic detergents that crystallize into a powder as they dry. Dirt particles are encapsulated in this crystal structure and vacuumed away. Leaves minimal residue, dries quickly, and is more environmentally friendly than traditional shampooing.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Best For</p><p>Commercial maintenance cleaning, low-moisture requirements, carpets in good overall condition</p></div>
                  <div className="p-3 border rounded-lg bg-muted/30 text-sm"><p className="font-semibold text-foreground mb-1">Drying Time</p><p>20 minutes to 1 hour</p></div>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "SERVICES & OPERATIONS",
    items: [
      {
        id: "carpet-services",
        label: "Core Services",
        icon: Wrench,
        sections: [
          {
            title: "Residential Carpet Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The foundation service for most carpet cleaning businesses. Residential clients include homeowners, renters, and property managers preparing units for new tenants. Services are typically priced by room, by square footage, or as a whole-home package. The technician cleans carpets in living areas, bedrooms, hallways, and stairs.</p>
              </div>
            )
          },
          {
            title: "Commercial Carpet Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Commercial clients include offices, retail stores, restaurants, hotels, schools, medical facilities, and apartment complexes. Commercial jobs are often larger in scale, performed during off-hours (evenings or weekends), and may be recurring contracts. Commercial cleaning requires more durable equipment and a faster turnaround to minimize business disruption.</p>
              </div>
            )
          },
          {
            title: "Upholstery Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Upholstery cleaning involves cleaning fabric-covered furniture such as sofas, armchairs, dining chairs, and ottomans. Smaller, specialized tools and gentler cleaning agents are used. This is a high-value add-on service that pairs well with carpet cleaning visits.</p>
              </div>
            )
          },
          {
            title: "Area Rug Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Area rugs — especially fine wool, silk, or handwoven rugs — often require special care. Some are cleaned on-site while others are taken to a facility for a more thorough wash, rinse, and controlled drying process. Technicians must identify fiber type and construction before selecting a cleaning method to avoid damage.</p>
              </div>
            )
          },
          {
            title: "Stain Removal",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Professional stain removal targets specific spots such as wine, coffee, ink, paint, and grease. Technicians use targeted spotting agents, heat tools, and specialized techniques. Not all stains are removable, and technicians must set realistic expectations with customers.</p>
              </div>
            )
          },
          {
            title: "Pet Odor and Stain Treatment",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Pet accidents are one of the most common reasons customers call for professional cleaning. Urine penetrates deep into the carpet backing and even the subfloor beneath it.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  <strong>Important:</strong> Effective pet treatment requires enzyme-based deodorizers that break down the organic waste at the molecular level, not just mask the odor. In severe cases, the padding and subfloor may need treatment as well.
                </div>
              </div>
            )
          },
          {
            title: "Tile and Grout Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Many carpet cleaning companies also offer tile and grout cleaning using high-pressure hot water extraction tools designed for hard surfaces. Grout lines are porous and trap dirt, bacteria, and mold that mops cannot effectively remove. Popular for kitchens, bathrooms, entryways, and commercial floors.</p>
              </div>
            )
          },
          {
            title: "Mattress Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Mattress cleaning uses upholstery extraction tools to remove dust mites, skin cells, sweat residue, and allergens from mattress surfaces. Growing in popularity as awareness of mattress hygiene increases, particularly among families with young children or allergy sufferers.</p>
              </div>
            )
          },
          {
            title: "Carpet Protection Treatments",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>After cleaning, technicians may offer the application of a carpet protector such as Scotchgard or a similar product. These treatments coat carpet fibers with a protective barrier that repels liquid spills, making them easier to clean before they set into stains. A popular upsell that extends the time between professional cleanings.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "carpet-operations",
        label: "How the Business Operates",
        icon: Info,
        sections: [
          {
            title: "The Typical Service Workflow",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ol className="space-y-4">
                  {[
                    { step: "1. Customer Inquiry or Booking", desc: "A customer contacts the company by phone, email, website chat, or online booking form. They describe the areas they need cleaned, mention any special concerns (pet stains, heavy traffic, upcoming event), and ask about pricing. The first impression made during this step is critical for converting the inquiry into a booked job." },
                    { step: "2. Quoting and Pricing", desc: "The CSR or VA provides a price estimate based on the number of rooms, square footage, or specific services requested. Many companies use standard pricing charts. For larger or more complex jobs, a technician may be sent to give an on-site quote. It is important to be transparent about pricing to avoid surprises at the time of service." },
                    { step: "3. Appointment Scheduling", desc: "Once the customer agrees to the quote, an appointment is scheduled at a mutually convenient time. Customers are given a service window and receive a confirmation via text, email, or phone call. Reminder messages are typically sent the day before the appointment." },
                    { step: "4. Technician Dispatch", desc: "The dispatcher assigns the job to the appropriate technician based on their schedule, location, and skill set. The technician receives the job details, customer address, and any notes about special requirements. Equipment is loaded, and the technician heads to the job site." },
                    { step: "5. Inspection of Carpet Condition", desc: "Upon arrival, the technician walks through the areas to be cleaned. They identify fiber type, assess the level of soiling, note stains, and check for any areas of concern such as water damage, delicate materials, or furniture that needs moving." },
                    { step: "6. Pre-Treatment of Stains", desc: "Before beginning the main cleaning process, the technician applies a pre-treatment solution to heavily soiled areas or stubborn stains. This solution is allowed to dwell for a few minutes to break down and loosen embedded soils, making the main cleaning step more effective." },
                    { step: "7. Cleaning Process", desc: "The technician performs the main cleaning using the selected method (typically hot water extraction for residential jobs). They work systematically through each area, making overlapping passes to ensure complete coverage." },
                    { step: "8. Drying Process", desc: "After cleaning, the technician uses air movers (fans) to accelerate drying. Furniture is placed on protective blocks or tabs to prevent rust or dye transfer onto the damp carpet. Customers are advised to keep foot traffic to a minimum during drying." },
                    { step: "9. Final Inspection", desc: "The technician does a final walkthrough with the customer to review the results, point out any areas where stains could not be fully removed, and answer any questions. Upsell services (such as carpet protection) may be offered at this stage." },
                    { step: "10. Payment and Follow-Up", desc: "Payment is collected on-site via cash, check, or card. An invoice or receipt is provided. After the job, a follow-up message may be sent to thank the customer, request a review, and remind them about future maintenance cleaning schedules or upcoming promotions." },
                  ].map(({ step, desc }) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-fit">{step}:</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">CSR & VA Reminder</p>
                  <p>Always ask the customer during booking whether they have pets, any sensitive areas, or upcoming events. This information helps the technician prepare the right solutions and sets accurate expectations for results and drying time.</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "REFERENCE & BEST PRACTICES",
    items: [
      {
        id: "carpet-terminology",
        label: "Carpet Cleaning Terminology",
        icon: BookOpen,
        sections: [
          {
            title: "Common Carpet Cleaning Terms Glossary",
            content: (
              <div className="text-muted-foreground">
                <p className="mb-4 text-sm">Familiarity with these terms is essential for everyone on the team to communicate confidently with customers, technicians, and colleagues.</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-44">Term</TableHead>
                      <TableHead className="font-bold">Definition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { term: "Pre-Treatment", def: "A cleaning solution applied to carpet before the main cleaning process to loosen and break down soils, stains, and grease. Pre-treatment significantly improves cleaning results." },
                      { term: "Extraction", def: "The process of removing water, cleaning solution, and dissolved dirt from carpet fibers using suction. Hot water extraction is the most common extraction method." },
                      { term: "Agitation", def: "The physical action of scrubbing or brushing the carpet to work cleaning solution deeper into the fibers and loosen embedded dirt. Can be done manually or with a machine." },
                      { term: "Deodorizing", def: "The application of a product designed to neutralize or eliminate unpleasant odors from carpet. Enzyme-based deodorizers work by breaking down odor-causing organic matter." },
                      { term: "Fiber Types", def: "The material from which carpet is made. Common types include nylon (most durable), polyester, olefin/polypropylene, and wool (most delicate). Fiber type determines which cleaning method and chemicals are safe to use." },
                      { term: "pH Balance", def: "A measure of the acidity or alkalinity of a cleaning solution. Different soils and fibers require different pH levels. Most carpet cleaning solutions are slightly alkaline (pH 8–10) to cut through dirt and grease." },
                      { term: "Soil Suspension", def: "The process by which cleaning agents surround and lift soil particles, suspending them in the cleaning solution so they can be extracted from the carpet." },
                      { term: "Encapsulation", def: "A cleaning technique where a crystallizing polymer surrounds dirt particles and encapsulates them as it dries. The crystals can then be vacuumed away, leaving no sticky residue." },
                      { term: "Dwell Time", def: "The amount of time a cleaning solution is left on the carpet before extraction. Sufficient dwell time allows the solution to break down soils effectively." },
                      { term: "Wicking", def: "A phenomenon where stains or soil buried deep in the carpet pad or backing are drawn back up to the surface as the carpet dries after cleaning. Wicking can cause stains to reappear even after successful cleaning." },
                      { term: "Pile", def: "The upright fibers that form the surface of a carpet. Pile direction, density, and height affect how the carpet feels and how it should be cleaned." },
                      { term: "Carpet Protector", def: "A chemical treatment applied after cleaning to create a protective barrier on carpet fibers that repels spills and soil, making future cleaning easier." },
                      { term: "Outgassing", def: "The release of volatile organic compounds (VOCs) from cleaning chemicals, new carpets, or adhesives. Proper ventilation during and after cleaning minimizes exposure." },
                      { term: "IICRC", def: "Institute of Inspection, Cleaning and Restoration Certification. The leading certification body for carpet cleaning and restoration professionals. IICRC-certified technicians follow industry-standard best practices." },
                      { term: "CRI", def: "Carpet and Rug Institute. An industry organization that tests and certifies carpet cleaning equipment and solutions as safe and effective for use on carpets." },
                    ].map(({ term, def }) => (
                      <TableRow key={term}>
                        <TableCell className="font-semibold text-foreground align-top">{term}</TableCell>
                        <TableCell className="text-sm">{def}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "carpet-roles",
        label: "Roles in a Carpet Cleaning Business",
        icon: Users,
        sections: [
          {
            title: "Team Roles & Responsibilities",
            content: (
              <div className="text-muted-foreground">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-52">Role</TableHead>
                      <TableHead className="font-bold">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { role: "Carpet Cleaning Technician", resp: "The core field worker who performs all cleaning services. Technicians operate equipment, apply chemicals, treat stains, interact with customers on-site, and are responsible for delivering quality results. Ideally IICRC-certified." },
                      { role: "Lead Technician / Crew Leader", resp: "An experienced technician who manages a two-person crew, handles complex jobs, performs quality checks, and mentors junior technicians. Often responsible for upselling additional services on-site." },
                      { role: "Customer Service Representative (CSR)", resp: "Handles incoming customer calls, texts, and emails. Collects job information, provides quotes, schedules appointments, and answers questions. The CSR is the voice of the company and plays a major role in customer satisfaction." },
                      { role: "Dispatcher", resp: "Coordinates the daily schedule for technicians, assigns jobs based on location and skill level, monitors job progress throughout the day, and adjusts the schedule as needed for delays or emergency calls." },
                      { role: "Sales Representative", resp: "Focuses on acquiring commercial accounts, maintenance contracts, and large residential clients. May conduct walk-throughs of facilities to assess scope and present customized proposals." },
                      { role: "Operations Manager", resp: "Oversees daily business operations, including scheduling, equipment maintenance, inventory of cleaning supplies, technician performance, and customer satisfaction metrics." },
                      { role: "Business Owner", resp: "Sets company strategy, manages finances, oversees hiring, and makes decisions about pricing, services, and growth. In small businesses, the owner often also works in the field." },
                    ].map(({ role, resp }) => (
                      <TableRow key={role}>
                        <TableCell className="font-semibold text-foreground align-top">{role}</TableCell>
                        <TableCell className="text-sm">{resp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "carpet-tools",
        label: "Tools & Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Common Carpet Cleaning Equipment",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p className="text-sm">Professional carpet cleaning requires a range of specialized tools. Familiarity with this equipment helps support staff understand the scope of work involved in each job.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Carpet Extractors", desc: "The primary piece of equipment for hot water extraction. Truck-mounted extractors offer the most powerful suction and highest water temperatures. Portable extractors are ideal for high-rise apartments or areas where a truck cannot reach." },
                    { name: "Steam Cleaning Machines", desc: "True steam machines generate steam using a boiler and apply it to carpet or upholstery surfaces. Effective for sanitizing and treating allergens and bacteria." },
                    { name: "Rotary Machines", desc: "Use a spinning brush or pad to agitate carpet fibers or hard surfaces. Used for shampoo cleaning, bonnet cleaning, and working pre-treatment solutions into heavily soiled carpets before extraction." },
                    { name: "Air Movers and Dryers", desc: "Placed on the carpet after cleaning to accelerate evaporation and reduce drying times. Using air movers prevents mold and mildew growth and minimizes inconvenience for the customer." },
                    { name: "Vacuum Cleaners", desc: "Professional-grade vacuums used before and after cleaning to remove loose surface debris. A thorough pre-vacuum is an important first step, as it removes dry soil before it can turn to mud when wet." },
                    { name: "Spot Cleaning Tools", desc: "Hand-held extraction wands, spotting syringes, and soft-bristle brushes used to treat and extract specific stain areas. Spotting kits contain a variety of targeted chemical solutions for different stain types." },
                    { name: "Cleaning Chemicals & Detergents", desc: "Professional solutions formulated for specific carpet types and soil conditions: pre-sprays, enzyme-based pet treatments, deodorizers, carpet protectors, acid rinses, and pH-neutral upholstery cleaners." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{name}</p>
                      <p className="text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "carpet-safety",
        label: "Safety & Best Practices",
        icon: ShieldCheck,
        sections: [
          {
            title: "Proper Chemical Handling",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Always read product labels and Safety Data Sheets (SDS) before using any chemical.</li>
                  <li>Use appropriate PPE such as gloves and eye protection when mixing or applying concentrated chemicals.</li>
                  <li>Never mix chemicals unless directed by the product manufacturer, as some combinations can produce toxic fumes.</li>
                  <li>Store chemicals in labeled containers in a well-ventilated area away from heat sources and out of reach of children.</li>
                  <li>Follow dilution ratios precisely — more concentrated does not always mean better results and can damage carpet fibers.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Protecting Furniture and Flooring",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Place furniture tabs, foam blocks, or plastic guards under furniture legs before cleaning to prevent rust or dye transfer onto damp carpet.</li>
                  <li>Protect hardwood floors, tile, and baseboards from overspray and moisture during cleaning.</li>
                  <li>Inform customers before moving heavy furniture and use sliders to avoid scratching hard floors.</li>
                  <li>Document any pre-existing damage (stains, tears, furniture scratches) with photos before beginning work.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Preventing Mold and Over-Wetting",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Do not over-saturate carpet — this is one of the most common causes of mold, mildew, and wicking.</li>
                  <li>Always use air movers after hot water extraction to speed drying and keep drying time under 12 hours.</li>
                  <li>Advise customers to keep windows open (weather permitting) and to run their HVAC system to aid drying.</li>
                  <li>In humid conditions or on thick carpets, use additional air movers and allow extra drying time.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Safe Equipment Usage",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Inspect all equipment before each use for damaged cords, hoses, or fittings.</li>
                  <li>Keep hoses and cords organized and secured to prevent trip hazards for customers and technicians.</li>
                  <li>Lift heavy equipment using proper technique — bend at the knees, not the waist — to prevent back injuries.</li>
                  <li>Never leave running equipment unattended, especially around children or pets.</li>
                </ul>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Safety Reminder</p>
                  <p>Technicians should complete a brief walkthrough with the customer before any work begins to confirm expectations, document existing damage, and identify any hazards in the work area. A signed pre-inspection form protects both the technician and the company.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "carpet-problems",
        label: "Common Customer Problems",
        icon: AlertCircle,
        sections: [
          {
            title: "Stains from Food or Drinks",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Coffee, red wine, juice, sauces, and cooking grease are among the most common stain complaints. The older a stain, the more difficult it is to remove — heat from regular cleaning can permanently set some stains if not pre-treated properly.</p>
                <p className="text-sm italic">Advise customers: never rub a fresh spill — blot it and call a professional promptly.</p>
              </div>
            )
          },
          {
            title: "Pet Accidents",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Dog and cat urine are particularly damaging to carpets. Urine soaks through the carpet, backing, and pad, and into the subfloor. As it dries, it leaves uric acid crystals and bacteria that create persistent, strong odors. Enzyme-based treatments are necessary to break down these compounds. In severe cases, full carpet removal and subfloor treatment may be the only effective solution.</p>
              </div>
            )
          },
          {
            title: "Dirt Buildup",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>High-traffic areas — hallways, entryways, stairs, and living rooms — accumulate dirt rapidly. When dirt becomes embedded in carpet fibers, it acts like sandpaper, cutting and degrading the fibers with every footstep. Regular professional cleaning removes this embedded grit and significantly extends carpet life.</p>
              </div>
            )
          },
          {
            title: "Odors",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Musty, pet, smoke, and food odors penetrate carpet fibers and padding and are very difficult to eliminate with surface-only treatments. Professional deodorizers and enzyme treatments reach deeper into the carpet structure to neutralize odor at the source rather than simply masking it.</p>
              </div>
            )
          },
          {
            title: "Allergens and Dust",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Carpets trap dust mites, pollen, pet dander, mold spores, and other allergens that are stirred back into the air with foot traffic. This is a significant concern for households with allergy sufferers or asthma patients. Regular professional extraction removes these trapped particles, contributing to better indoor air quality.</p>
              </div>
            )
          },
          {
            title: "Water Damage",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Flooding, plumbing leaks, and roof leaks can saturate carpet and padding, creating an ideal environment for mold growth within 24 to 48 hours.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  Water damage jobs require rapid extraction of moisture using powerful equipment and industrial air movers and dehumidifiers. This is often a separate specialty service and may involve restoration certifications.
                </div>
              </div>
            )
          },
          {
            title: "Discoloration and Fading",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Some discoloration is caused by improper cleaning products used by the homeowner, bleach splatter, or sun fading. Technicians can sometimes correct uneven discoloration using specialized color repair products, but customers should be advised upfront if a full correction is not possible.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "carpet-importance",
        label: "Why Carpet Cleaning Matters",
        icon: Heart,
        sections: [
          {
            title: "The Importance of Professional Carpet Cleaning",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Professional carpet cleaning is not a luxury — it is a practical investment in health, property value, and quality of life.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Hygiene and Sanitation", body: "Carpets harbor thousands of bacteria per square inch — far more than most hard surfaces. Professional hot water extraction using heated water and professional-grade detergents kills and removes harmful microorganisms at a level that household cleaning cannot achieve. For commercial clients in food service, healthcare, and hospitality, clean floors are often required for licensing, insurance, and regulatory compliance." },
                    { title: "Indoor Air Quality", body: "The EPA identifies indoor air pollution as one of the top environmental health risks. Carpets loaded with trapped pollutants release those particles back into the breathing zone every time someone walks on them. Professional cleaning dramatically reduces the concentration of allergens, bacteria, mold spores, and VOCs. For families with young children who spend time on the floor, this is especially important." },
                    { title: "Extending Carpet Lifespan", body: "Replacing carpet is expensive. A professional cleaning regimen can more than double the usable life of a carpet. Abrasive soil particles act like tiny blades, cutting and fraying fibers with every footstep. Most carpet manufacturers recommend professional cleaning every 12 to 18 months to maintain the validity of carpet warranties." },
                    { title: "Appearance and Maintenance", body: "In a business setting, dirty or dingy carpet projects a negative image. In a home, clean carpets contribute to a sense of order and pride. Professional cleaning restores the color, texture, and fresh appearance of carpet fibers in a way that consumer-grade rental equipment simply cannot match." },
                  ].map(({ title, body }) => (
                    <div key={title} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{title}</p>
                      <p className="text-sm">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Final Note for New Team Members</p>
                  <p>Understanding why carpet cleaning matters helps every member of the team — from CSRs to technicians to virtual assistants — speak with genuine enthusiasm and confidence when talking to customers. When customers understand the real value of the service, they are more likely to book, to accept additional services, and to become loyal, recurring clients. Welcome to the team!</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const cleaningBusinessSections: DocGroup[] = [
  {
    title: "CLEANING BUSINESS BASICS",
    items: [
      {
        id: "cleaning-introduction",
        label: "Introduction to the Cleaning Industry",
        icon: Star,
        sections: [
          {
            title: "What Is a Cleaning Business?",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>A cleaning business is a professional service company that provides systematic, thorough cleaning of residential and commercial spaces for a fee. Cleaning businesses employ trained staff equipped with the right tools, chemicals, and knowledge to deliver consistent, high-quality results that go far beyond everyday household cleaning.</p>
                <p>Cleaning companies range in size from sole-proprietor operations to large regional or national franchises. Regardless of size, all cleaning businesses share the same core mission: to provide clients with clean, healthy, and well-maintained spaces so they can focus on everything else in their lives and work.</p>
                <div className="p-4 bg-muted/50 border rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Key Insight</p>
                  <p className="text-sm">The cleaning industry is driven by trust. Clients invite cleaners into their homes and businesses, often without supervision. Building a reputation for reliability, honesty, and consistent quality is the most important competitive advantage any cleaning company can have.</p>
                </div>
              </div>
            )
          },
          {
            title: "Why Professional Cleaning Services Are Important",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Professional cleaning services play a critical role in both residential and commercial environments. Clean spaces are not simply about appearance — they directly impact health, productivity, and the long-term value of a property.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-foreground">Health protection:</strong> Regular professional cleaning removes bacteria, allergens, mold spores, and viruses from surfaces and the air, reducing the risk of illness.</li>
                  <li><strong className="text-foreground">Productivity:</strong> Studies consistently show that clean, organized workplaces improve employee focus, morale, and overall productivity.</li>
                  <li><strong className="text-foreground">First impressions:</strong> For businesses, a clean facility conveys professionalism and builds customer confidence and trust.</li>
                  <li><strong className="text-foreground">Property preservation:</strong> Routine cleaning prevents the buildup of grime, mold, and wear that can cause costly long-term damage to flooring, surfaces, and fixtures.</li>
                  <li><strong className="text-foreground">Compliance:</strong> Many industries — including healthcare, food service, childcare, and hospitality — are legally required to maintain specific cleanliness standards.</li>
                  <li><strong className="text-foreground">Time savings:</strong> Outsourcing cleaning frees clients to spend their time on more valuable personal and professional priorities.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Overview of the Cleaning Service Industry",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The cleaning services industry is one of the largest and most resilient sectors of the broader service economy. Key characteristics include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The industry serves virtually every type of property, including homes, offices, retail spaces, schools, hospitals, restaurants, and industrial facilities.</li>
                  <li>Demand is consistent year-round, with seasonal peaks for move-out cleaning, holiday preparation, and post-construction cleaning.</li>
                  <li>Recurring service contracts — weekly, biweekly, or monthly cleanings — provide stable, predictable revenue.</li>
                  <li>Growing consumer awareness around hygiene and indoor air quality is driving strong demand for professional and eco-friendly cleaning services.</li>
                  <li>Technology is transforming the industry through online booking systems, scheduling software, GPS tracking, and digital payment platforms.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "cleaning-types",
        label: "Types of Cleaning Services",
        icon: List,
        sections: [
          {
            title: "Residential Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Routine cleaning of private homes, apartments, and condominiums. Typically a recurring service booked weekly, biweekly, or monthly. Tasks include vacuuming, mopping, dusting, bathroom cleaning, kitchen wipe-downs, and trash removal. Residential clients value reliability, trustworthiness, and attention to detail above all else.</p>
              </div>
            )
          },
          {
            title: "Commercial Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Cleaning services provided to businesses, organizations, and institutions — offices, retail stores, medical clinics, schools, gyms, and more. Often performed after business hours or on weekends to avoid disrupting operations. Jobs tend to be larger in scale and may involve specialized equipment. Commercial contracts are typically the most profitable and stable revenue source for cleaning companies.</p>
              </div>
            )
          },
          {
            title: "Deep Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A comprehensive, top-to-bottom cleaning that goes far beyond routine maintenance. It addresses areas typically skipped during regular visits — inside appliances, behind furniture, baseboards, grout lines, light fixtures, and window tracks. Often performed as a one-time service for new clients before a recurring schedule begins, or periodically (quarterly or semi-annually) for existing clients. Deep cleans take significantly more time and cost more than standard visits.</p>
              </div>
            )
          },
          {
            title: "Move-In / Move-Out Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Performed when a tenant or homeowner is vacating or occupying a property. The goal is to leave the space in pristine condition — spotless for incoming occupants or to meet the landlord's expectations for the return of a security deposit. These cleans include inside cabinets, drawers, appliances, closets, walls, baseboards, and windows. One of the most requested one-time service types.</p>
              </div>
            )
          },
          {
            title: "Post-Construction Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A specialized service performed after construction, renovation, or remodeling work. Spaces are left covered in fine dust, paint overspray, adhesive residue, debris, and construction materials. Requires knowledge of how to safely remove these materials from a variety of surfaces without causing damage. Typically performed in multiple phases using HEPA-filter vacuums, microfiber systems, and specialized cleaning agents.</p>
              </div>
            )
          },
          {
            title: "Office Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A subcategory of commercial cleaning focused specifically on workplace environments. Regular tasks include vacuuming or mopping floors, emptying trash bins, wiping down desks and workstations, cleaning kitchen and break room areas, sanitizing restrooms, and cleaning glass surfaces and entryways. Maintaining a clean office environment is important for employee health, visitor impressions, and professional culture.</p>
              </div>
            )
          },
          {
            title: "Airbnb / Short-Term Rental Cleaning",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Also called <strong className="text-foreground">turnover cleaning</strong> — performed between guest stays at vacation rentals, Airbnb properties, and similar accommodations. Must be completed quickly within a tight window between checkout and the next check-in, and must meet hotel-like standards.</p>
                <p className="text-sm">Linens are changed, bathrooms thoroughly sanitized, kitchens reset, and the entire property inspected and restocked. One of the fastest-growing segments in the residential cleaning market.</p>
              </div>
            )
          },
          {
            title: "Specialized Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Many cleaning companies expand their offerings to include specialized services such as window cleaning (interior and exterior), carpet cleaning, upholstery cleaning, pressure washing, floor stripping and waxing, tile and grout cleaning, and chandelier cleaning. Specialized services require additional training, equipment, and sometimes certification, but they command premium pricing and help companies differentiate themselves from competitors.</p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "SERVICES & OPERATIONS",
    items: [
      {
        id: "cleaning-core-services",
        label: "Core Service Tasks",
        icon: CheckCircle,
        sections: [
          {
            title: "Dusting Surfaces",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Removing dust, debris, and allergens from horizontal and vertical surfaces including furniture tops, shelves, countertops, window sills, blinds, ceiling fans, baseboards, light fixtures, and wall art. Professionals use microfiber cloths and extendable dusters rather than feather dusters, which simply redistribute dust back into the air.</p>
                <p className="text-sm italic">Always dust before vacuuming or mopping to capture any particles that fall to the floor.</p>
              </div>
            )
          },
          {
            title: "Vacuuming Carpets and Rugs",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Vacuuming removes loose dirt, dust, pet hair, and debris from carpet fibers and area rugs. Professional cleaners use commercial-grade vacuums with strong suction and HEPA filtration. All carpeted areas are vacuumed including edges and corners using attachment tools. High-traffic areas may receive extra passes. Vacuuming is also performed on upholstered furniture during a thorough cleaning visit.</p>
              </div>
            )
          },
          {
            title: "Mopping Floors",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Hard flooring such as tile, hardwood, laminate, and vinyl requires mopping after sweeping or vacuuming. Professionals use the correct cleaning solution for each floor type — improper products can damage hardwood, dull tile, or leave streaks on vinyl. Microfiber mop heads are preferred because they are highly effective at trapping dirt and bacteria and can be laundered and reused.</p>
              </div>
            )
          },
          {
            title: "Cleaning Kitchens and Appliances",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The kitchen is often the most labor-intensive room. Standard tasks include wiping down countertops, cabinet fronts, backsplash, and stovetop; cleaning the exterior of major appliances; cleaning the interior of the microwave; scrubbing the sink and fixtures; and degreasing surfaces around the cooktop.</p>
                <p className="text-sm italic">Deep cleaning tasks include cleaning inside the oven, refrigerator, and dishwasher.</p>
              </div>
            )
          },
          {
            title: "Bathroom Sanitation",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Bathroom cleaning is one of the most health-critical tasks. Professional tasks include scrubbing and disinfecting the toilet (base, seat, lid, and under the rim), cleaning and disinfecting the sink and fixtures, scrubbing the shower or tub, cleaning mirrors, wiping down surfaces, mopping the floor, emptying the trash, and restocking supplies. Disinfectants with proven efficacy against bacteria and viruses must be used on all high-touch surfaces.</p>
              </div>
            )
          },
          {
            title: "Trash Removal",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Emptying trash bins throughout the property is a standard task included in virtually every cleaning service. Cleaners remove trash from all bins, tie off and remove bags, reline bins with fresh bags, and transport all waste to the client's designated outdoor disposal area. In commercial settings, proper waste segregation and recycling may also be required.</p>
              </div>
            )
          },
          {
            title: "Disinfecting High-Touch Surfaces",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>High-touch surfaces — door handles, light switches, remote controls, countertop edges, faucet handles, stair railings, elevator buttons, and keyboards — are disinfected with EPA-approved disinfectants to kill pathogens that cause illness. Especially important in commercial environments, childcare settings, and healthcare facilities.</p>
              </div>
            )
          },
          {
            title: "Window and Glass Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Interior glass surfaces including windows, sliding glass doors, mirrors, and glass furniture tops are cleaned using streak-free glass cleaner and lint-free microfiber cloths or squeegees. Clean windows and mirrors significantly improve the appearance and brightness of a space. Exterior window cleaning is typically a separate specialized service requiring ladders or water-fed pole systems.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "cleaning-operations",
        label: "How the Business Operates",
        icon: Info,
        sections: [
          {
            title: "The Typical Service Workflow",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ol className="space-y-4">
                  {[
                    { step: "1. Customer Inquiry or Booking", desc: "A potential customer contacts the company by phone, email, website form, text, or online booking platform. They describe the type of service needed, the size of the space, their location, and any special requirements. This is the moment to make a great first impression by being responsive, friendly, and knowledgeable." },
                    { step: "2. Service Consultation and Quotation", desc: "The CSR or VA provides a price estimate based on the size of the home or office, the type of service (standard, deep, move-out), the frequency (one-time vs. recurring), and any add-ons. For large or complex jobs, a technician may conduct an in-person or virtual walkthrough before a final quote is issued." },
                    { step: "3. Scheduling the Appointment", desc: "Once the customer agrees to proceed, an appointment is scheduled at a mutually convenient date and time. A confirmation is sent via text and/or email, along with any pre-service instructions (such as picking up clutter or ensuring access to the property). An automated reminder is sent the day before." },
                    { step: "4. Assigning Cleaners or Teams", desc: "The dispatcher or operations manager assigns the job to the appropriate cleaner or cleaning team based on their availability, proximity to the job site, experience level, and familiarity with the client." },
                    { step: "5. Preparing Supplies and Equipment", desc: "Before heading to the job, the cleaner ensures they have all required supplies and equipment. Cleaning kits are stocked, chemical solutions are properly diluted, microfiber cloths are clean and sorted by color code, and any specialized equipment is loaded." },
                    { step: "6. Performing the Cleaning Service", desc: "The cleaner arrives on time, introduces themselves to the client if present, and confirms the scope of work. They follow the cleaning checklist systematically, working room by room and from top to bottom (dusting before vacuuming, etc.)." },
                    { step: "7. Quality Inspection", desc: "Upon completing the cleaning, the cleaner or team leader conducts a final walkthrough of the entire space to verify that all checklist items have been completed to the required standard. Any missed areas are addressed before the team leaves the property." },
                    { step: "8. Payment Processing", desc: "Payment is collected on the day of service or billed after the job, depending on the company's policy. Payment methods typically include cash, check, credit card, or online payment platforms. For recurring clients, autopay or invoicing systems are common. An electronic receipt or invoice is issued." },
                    { step: "9. Customer Feedback and Follow-Up", desc: "After the service, a follow-up message is sent to thank the customer and confirm their satisfaction. Customers are invited to share feedback or raise any concerns. Positive experiences are an opportunity to request online reviews, which are critical for reputation and new customer acquisition." },
                  ].map(({ step, desc }) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-fit">{step}:</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">CSR & VA Pro Tip</p>
                  <p>Always confirm the exact address, access method (key, lockbox, doorbell code), the number of rooms, and whether pets are present when taking a new booking. Missing this information causes delays, miscommunication, and negative customer experiences.</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "REFERENCE & BEST PRACTICES",
    items: [
      {
        id: "cleaning-terminology",
        label: "Cleaning Industry Terminology",
        icon: BookOpen,
        sections: [
          {
            title: "Common Cleaning Terms Glossary",
            content: (
              <div className="text-muted-foreground">
                <p className="mb-4 text-sm">Knowing these terms will help you communicate confidently with customers and colleagues.</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-44">Term</TableHead>
                      <TableHead className="font-bold">Definition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { term: "Deep Cleaning", def: "A comprehensive, top-to-bottom cleaning that addresses areas typically skipped in routine maintenance cleans, such as inside appliances, behind furniture, grout lines, and baseboards. Often performed as an initial service for new clients." },
                      { term: "Sanitizing", def: "The process of reducing the number of germs and bacteria on a surface to a safe level as defined by public health standards. Sanitizing lowers but does not necessarily eliminate all microorganisms." },
                      { term: "Disinfecting", def: "A more intensive process than sanitizing. Uses EPA-registered chemical agents to kill or inactivate nearly all bacteria, viruses, and fungi on a surface. Required in healthcare, food service, and high-risk environments." },
                      { term: "Cross-Contamination", def: "The unintentional transfer of bacteria, allergens, or dirt from one surface to another. Prevented by using color-coded microfiber cloths, separate mop heads for different areas, and single-use materials in critical environments." },
                      { term: "Eco-Friendly Cleaning", def: "The use of cleaning products and methods that minimize environmental impact. Eco-friendly products are typically biodegradable, free of harsh chemicals, and safe for children and pets." },
                      { term: "High-Touch Surfaces", def: "Surfaces frequently contacted by multiple people throughout the day, such as door handles, light switches, faucets, countertops, and keyboards. These surfaces harbor the highest concentrations of pathogens and must be disinfected regularly." },
                      { term: "Cleaning Checklist", def: "A standardized list of tasks to be completed during a cleaning service. Checklists ensure consistency across different cleaners and visits, set clear customer expectations, and serve as a quality control tool." },
                      { term: "Recurring Service", def: "A regularly scheduled cleaning appointment — typically weekly, biweekly, or monthly. Recurring clients represent the most valuable and stable segment of a cleaning company's revenue." },
                      { term: "Turnover Cleaning", def: "A fast, thorough cleaning performed between guest stays in a short-term rental property. Requires hotel-level standards with a quick turnaround. Common in Airbnb and vacation rental management." },
                      { term: "Color-Coded System", def: "A professional best practice where different colored microfiber cloths are assigned to different areas (e.g., red for toilets, blue for sinks, yellow for general surfaces, green for kitchens). Prevents cross-contamination between rooms and surfaces." },
                      { term: "Dwell Time", def: "The amount of time a cleaning or disinfecting product must remain on a surface to be effective. Many disinfectants require 3 to 10 minutes of contact time to kill pathogens. Wiping off too early reduces efficacy." },
                      { term: "HEPA Filter", def: "High-Efficiency Particulate Air filter. HEPA-equipped vacuums trap 99.97% of particles as small as 0.3 microns, including dust mites, pollen, and mold spores. Recommended for clients with allergies or respiratory conditions." },
                      { term: "Post-Construction Cleaning", def: "Specialized cleaning performed after construction, renovation, or remodeling work. Involves removing fine construction dust, adhesive residue, paint overspray, and debris from all surfaces." },
                      { term: "Green Cleaning", def: "A comprehensive approach to cleaning that considers the environmental, health, and safety impact of all products and procedures used. Includes product selection, water conservation, and waste reduction." },
                    ].map(({ term, def }) => (
                      <TableRow key={term}>
                        <TableCell className="font-semibold text-foreground align-top">{term}</TableCell>
                        <TableCell className="text-sm">{def}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "cleaning-roles",
        label: "Roles in a Cleaning Business",
        icon: Users,
        sections: [
          {
            title: "Team Roles & Responsibilities",
            content: (
              <div className="text-muted-foreground">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-52">Role</TableHead>
                      <TableHead className="font-bold">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { role: "Cleaning Technician / Cleaner", resp: "The primary field worker who performs all cleaning tasks at client properties. Cleaners follow service checklists, use equipment and chemicals correctly, handle client belongings with care, and represent the company's brand through their professionalism and quality of work." },
                      { role: "Team Leader / Supervisor", resp: "An experienced cleaner who leads a crew of two or more technicians on larger jobs. Responsible for delegating tasks, maintaining quality standards, completing the final inspection before leaving a property, and communicating with the office about job progress or issues." },
                      { role: "Customer Service Representative (CSR)", resp: "Handles all inbound customer inquiries, provides quotes, schedules appointments, answers questions about services, resolves complaints, and manages customer relationships. The CSR is the voice of the company and plays a vital role in client retention and satisfaction." },
                      { role: "Dispatcher / Scheduler", resp: "Manages the day-to-day schedule for all cleaning teams. Assigns jobs based on cleaner availability, location, and skill level. Monitors job progress throughout the day, handles last-minute changes or cancellations, and communicates schedule updates to cleaners and clients." },
                      { role: "Sales / Account Manager", resp: "Focuses on acquiring new commercial clients, managing existing commercial accounts, conducting facility walkthroughs, preparing proposals, and negotiating service contracts. Key to growing the commercial side of the business." },
                      { role: "Operations Manager", resp: "Oversees all day-to-day business operations including staff management, quality control, supply inventory, vehicle maintenance, compliance with safety standards, and client satisfaction monitoring." },
                      { role: "Business Owner", resp: "Sets the strategic direction of the company, manages finances, oversees hiring and culture, makes pricing and service decisions, and drives business growth. In smaller operations, the owner often also performs cleaning work or customer service tasks." },
                      { role: "Virtual Assistant (VA)", resp: "Provides remote administrative and customer service support. May handle online bookings, follow-up messages, review management, scheduling assistance, email responses, and social media. Must have a solid understanding of the company's services, pricing, and processes." },
                    ].map(({ role, resp }) => (
                      <TableRow key={role}>
                        <TableCell className="font-semibold text-foreground align-top">{role}</TableCell>
                        <TableCell className="text-sm">{resp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "cleaning-tools",
        label: "Tools & Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Common Cleaning Tools & Equipment",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p className="text-sm">Professional cleaners use a range of tools specifically selected for efficiency, effectiveness, and safety.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Vacuum Cleaners", desc: "Commercial-grade vacuums are significantly more powerful than household models. Upright vacuums for large carpeted areas; canister vacuums for stairs and upholstery; backpack vacuums for large commercial settings. HEPA-filtered vacuums are required in homes with allergy sufferers or healthcare environments." },
                    { name: "Mops and Buckets", desc: "Flat microfiber mops are ideal for most hard floors — highly absorbent and hygienic when laundered between uses. Spin mop systems with separate clean and dirty water chambers help prevent re-depositing dirty water. Color-coded buckets may be used in commercial and healthcare settings." },
                    { name: "Microfiber Cloths", desc: "The gold standard in professional cleaning. Microfiber cloths physically trap and hold dust, bacteria, and dirt rather than pushing it around. A professional kit includes multiple cloths in a color-coded system (red for toilets, blue for sinks, yellow for general use, green for kitchens) to prevent cross-contamination." },
                    { name: "Scrub Brushes", desc: "Used for agitating stubborn soils on hard surfaces including grout lines, toilet bowls, sinks, stovetops, and tile. Professional kits include a variety of brush sizes and stiffness levels. Dedicated brushes are used only for specific areas and are replaced regularly." },
                    { name: "Disinfectants & Cleaning Chemicals", desc: "Professional solutions formulated for specific surfaces and soil types: all-purpose cleaners, bathroom and toilet bowl cleaners, glass cleaner, kitchen degreasers, EPA-registered disinfectants, and floor cleaning solutions. All chemicals must be stored, diluted, and used according to their Safety Data Sheets (SDS)." },
                    { name: "Floor Polishers and Buffers", desc: "Used in commercial settings to maintain the shine on hard floors such as VCT tile, marble, and hardwood. Also used to apply and buff floor wax or sealant. These machines require training to operate safely and are not typically used in residential cleaning." },
                    { name: "Pressure Washers", desc: "Use high-pressure water to remove dirt, mold, mildew, and grime from exterior surfaces such as driveways, patios, walkways, and building exteriors. A specialized service requiring proper training to avoid surface damage." },
                    { name: "Trash Bags and Liners", desc: "Cleaners carry a range of trash bag sizes to reline all bins after emptying. Heavy-duty bags for kitchen waste; standard bags for bathroom and office bins. Color-coded bags may be used in commercial settings to separate general waste, recycling, and hazardous materials." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{name}</p>
                      <p className="text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Equipment Care Note</p>
                  <p>Well-maintained equipment is essential for professional results and workplace safety. Cleaners should inspect, clean, and report any damaged equipment before and after each job. Malfunctioning equipment should be removed from service immediately and reported to the operations team.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "cleaning-safety",
        label: "Safety & Best Practices",
        icon: ShieldCheck,
        sections: [
          {
            title: "Proper Use of Cleaning Chemicals",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Always read and follow the manufacturer's instructions and Safety Data Sheets (SDS) for every product.</li>
                  <li>Dilute concentrated chemicals to the correct ratio — stronger is not always better and can damage surfaces or cause harm.</li>
                  <li>Never mix cleaning chemicals. Mixing bleach with ammonia produces toxic chloramine gas. Mixing bleach with acidic cleaners produces chlorine gas.</li>
                  <li>Label all spray bottles clearly with the product name, dilution ratio, and hazard warnings.</li>
                  <li>Use chemicals in well-ventilated spaces and inform clients if strong-smelling products are being used.</li>
                  <li>Store chemicals safely — away from direct sunlight, heat sources, and out of reach of children and pets.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Preventing Cross-Contamination",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use a color-coded microfiber cloth system and never use the same cloth for different areas (e.g., never use a bathroom cloth in the kitchen).</li>
                  <li>Change gloves between rooms, especially after cleaning bathrooms before moving to kitchen or food preparation areas.</li>
                  <li>Use separate mop heads or thoroughly sanitize mop heads between different floor areas.</li>
                  <li>Never rinse dirty cloths or tools in a sink that is also used for food preparation.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Use of PPE (Personal Protective Equipment)",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Always wear nitrile or rubber gloves when handling cleaning chemicals, disinfectants, and when cleaning bathrooms and kitchens.</li>
                  <li>Wear non-slip footwear to prevent slipping on wet floors.</li>
                  <li>Use eye protection when applying spray chemicals to avoid splashback.</li>
                  <li>Consider wearing a face mask when cleaning heavily dusty environments or when using products with strong fumes.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Safe Equipment Handling & Waste Disposal",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Inspect vacuum cords, mop handles, and other equipment for damage before each use.</li>
                  <li>Never run electrical cords under doors or across high-traffic walkways where they create a trip hazard.</li>
                  <li>When using ladders for dusting ceiling fans or high shelving, always ensure the ladder is on a stable, level surface.</li>
                  <li>Report any broken or malfunctioning equipment to the supervisor immediately.</li>
                  <li>Dispose of trash according to the client's and local municipality's waste separation guidelines.</li>
                  <li>Wear gloves when handling trash to protect against sharp objects, broken glass, and biohazardous materials.</li>
                  <li>Report any hazardous waste findings (needles, chemical containers, biohazards) to a supervisor rather than attempting to handle them without proper training and equipment.</li>
                </ul>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  <strong>Safety Reminder:</strong> When in doubt about a chemical, a surface material, or an unexpected situation in a client's home, stop and ask your supervisor. It is always better to pause and confirm than to cause damage, injury, or a complaint.
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "cleaning-problems",
        label: "Common Customer Problems",
        icon: AlertCircle,
        sections: [
          {
            title: "Dirty Kitchens or Bathrooms",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Kitchens and bathrooms are the two most frequently cited problem areas when clients call for cleaning services. Grease buildup on stovetops and range hoods, mineral deposits in sinks and toilet bowls, soap scum in showers, and grime on tile are among the most common complaints.</p>
                <p className="text-sm italic">CSRs should ask: How long has it been since the last professional clean? This affects the time, effort, and therefore the pricing.</p>
              </div>
            )
          },
          {
            title: "Dust Buildup",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Clients often contact cleaning services because of excessive dust accumulation on furniture, blinds, ceiling fans, and electronics. Dust buildup is especially problematic for allergy and asthma sufferers. A deep cleaning followed by a regular recurring service is the most effective long-term solution to dust management.</p>
              </div>
            )
          },
          {
            title: "Pet Hair and Odors",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Homes with cats, dogs, and other pets require additional attention to remove pet hair from furniture, carpets, and hard-to-reach corners, as well as to neutralize pet odors. Pet hair clings stubbornly to fabrics and upholstery. Specialized enzyme-based deodorizers may be required for lingering odors.</p>
                <p className="text-sm italic">CSRs should always ask about pets during the booking process so the right tools and products are brought to the job.</p>
              </div>
            )
          },
          {
            title: "Stains on Surfaces",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Coffee rings, food stains, scuff marks, water stains, and hard water deposits are commonly reported by clients. It is important for CSRs and cleaners to set realistic expectations — some stains (particularly those left untreated for a long time) may not be fully removable with standard cleaning. Persistent stains on carpet, grout, or marble may require specialized services.</p>
              </div>
            )
          },
          {
            title: "Cluttered Spaces",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Clutter is one of the most common challenges cleaners face. Professional cleaning does not typically include tidying or organizing — cleaners are trained to clean surfaces, not to sort personal belongings.</p>
                <div className="p-3 bg-muted/50 border rounded-lg text-sm">
                  CSRs should advise clients to declutter before the cleaning visit to ensure cleaners can access all surfaces. If organization services are offered, they should be quoted separately.
                </div>
              </div>
            )
          },
          {
            title: "Preparing Homes for Guests or Tenants",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Clients frequently book cleaning services before hosting guests, family visits, holiday gatherings, open houses, or before new tenants move in. These bookings often require a higher level of cleaning than a standard maintenance visit and may be booked on short notice. Having a clearly defined premium or deep cleaning package that can be booked quickly is essential for capturing this high-value segment.</p>
              </div>
            )
          },
          {
            title: "Post-Party or Post-Event Cleaning",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>After parties, gatherings, or events, clients may need prompt cleaning of spills, trash, dishes, and general disorder. These jobs can vary widely in scope and condition and are typically charged as deep cleans or by the hour. Response time and flexibility are particularly valued by clients booking post-event cleaning.</p>
              </div>
            )
          },
          {
            title: "Water Damage or Mold",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Clients may discover water damage, mold growth, or mildew in bathrooms, basements, or other areas. While standard cleaning companies can address surface mold and mildew, significant water damage or mold infestations may fall outside the scope of routine cleaning and may require a specialist.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  CSRs should clearly communicate the boundaries of what the company can and cannot address before the appointment is booked.
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "cleaning-importance",
        label: "Why Cleaning Services Matter",
        icon: Heart,
        sections: [
          {
            title: "The Importance of Professional Cleaning Services",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Professional cleaning services deliver value that goes far beyond a tidy appearance.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Health and Sanitation", body: "High-touch surfaces harbor thousands of bacteria and viruses. Professional cleaners use EPA-registered disinfectants applied with proper technique and dwell time to kill harmful microorganisms that household cleaners cannot address. For commercial clients in regulated industries — food service, healthcare, childcare, and hospitality — professional cleaning is often legally mandated." },
                    { title: "Improved Indoor Air Quality", body: "Indoor air can be 2–5× more polluted than outdoor air. Dust, mold spores, pet dander, pollen, and VOCs accumulate in carpet fibers and on soft furnishings. Professional cleaning using HEPA-filtered vacuums, microfiber systems, and low-VOC products significantly reduces airborne pollutants — especially important for children, the elderly, and those with respiratory conditions." },
                    { title: "Time-Saving for Clients", body: "A typical whole-home cleaning takes an individual 3 to 8 hours to complete to a professional standard. By outsourcing to professionals, clients reclaim that time for their careers, families, and personal interests. For business owners, outsourcing cleaning is nearly always more cost-effective than employing in-house janitorial staff when hiring, training, equipment, and supply costs are factored in." },
                    { title: "Maintaining Property Value", body: "A property's value and longevity are directly tied to how well it is maintained. Grime, mold, hard water deposits, and neglected grout cause gradual, cumulative damage to flooring, fixtures, and structural elements. Regular professional cleaning prevents this deterioration. For rental properties, a clean and well-presented space attracts quality tenants and supports higher rental rates." },
                    { title: "Creating a Comfortable Environment", body: "Research consistently links clean environments to reduced stress and anxiety, improved focus and cognitive performance, better sleep quality, and a greater sense of pride and well-being. For businesses, clean, welcoming facilities create positive first impressions, communicate professionalism and attention to detail, and contribute to a positive company culture." },
                  ].map(({ title, body }) => (
                    <div key={title} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{title}</p>
                      <p className="text-sm">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Final Note for New Team Members</p>
                  <p>Every person on this team — whether you answer phones, manage schedules, or clean homes and offices — plays a direct role in delivering value to our clients. Take pride in the work, communicate with care, and remember that what might seem like a small cleaning job can make an enormous difference in a client's day, health, and quality of life. Welcome to the team!</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const pestControlSections: DocGroup[] = [
  {
    title: "PEST CONTROL BASICS",
    items: [
      {
        id: "pest-introduction",
        label: "Introduction to Pest Control",
        icon: Bug,
        sections: [
          {
            title: "What Is Pest Control?",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Pest control is the professional management, suppression, and elimination of unwanted organisms — commonly referred to as pests — that negatively affect human health, property, agriculture, or the natural environment. These pests include insects such as ants, cockroaches, termites, and bed bugs; arthropods such as spiders, fleas, and ticks; and vertebrates such as rats and mice.</p>
                <p>Professional pest control involves a structured process of <strong className="text-foreground">inspection, accurate pest identification, targeted treatment</strong>, and ongoing monitoring to prevent reinfestation. Pest control technicians are trained scientists and problem-solvers who understand pest biology, behavior, and the safest and most effective ways to manage each species.</p>
                <div className="p-4 bg-muted/50 border rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Key Industry Fact</p>
                  <p className="text-sm">Pest control is considered an essential service. Even during public health emergencies, pest control operations continue because the risks associated with pest infestations — disease transmission, structural damage, and food contamination — are too serious to pause.</p>
                </div>
              </div>
            )
          },
          {
            title: "Why Pest Control Services Are Important",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The presence of pests in homes and businesses is far more than an inconvenience. Pests pose serious threats to human health, structural integrity, food safety, and mental well-being.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-foreground">Public health protection:</strong> Many pests are vectors for serious diseases. Mosquitoes transmit West Nile Virus, malaria, and dengue fever. Rodents carry hantavirus and salmonella. Cockroaches spread E. coli. Ticks transmit Lyme disease and Rocky Mountain Spotted Fever.</li>
                  <li><strong className="text-foreground">Property protection:</strong> Termites cause an estimated $5 billion in structural damage annually in the U.S. alone. Rodents gnaw through electrical wiring, creating fire hazards, and cause significant damage to insulation, drywall, and stored goods.</li>
                  <li><strong className="text-foreground">Food safety:</strong> In commercial food preparation and storage environments, pest infestations can contaminate food supplies, result in failed health inspections, regulatory fines, and temporary or permanent closure.</li>
                  <li><strong className="text-foreground">Mental health and quality of life:</strong> Living or working in a pest-infested environment causes significant psychological distress, sleep disruption, and anxiety.</li>
                  <li><strong className="text-foreground">Regulatory compliance:</strong> Many commercial industries — including food service, healthcare, hospitality, and childcare — are legally required to maintain pest-free environments as a condition of their operating licenses.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Overview of the Pest Control Industry",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The pest control industry is a large, growing, and essential segment of the broader home and commercial services market.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Services are in demand year-round, with seasonal peaks driven by pest activity cycles. Mosquito, ant, and bee activity peaks in spring and summer; rodent pressure intensifies in fall and winter.</li>
                  <li>The industry serves both residential clients (homeowners and renters) and commercial clients (restaurants, hotels, hospitals, warehouses, schools, and property managers).</li>
                  <li>Recurring service agreements — monthly, bimonthly, or quarterly — provide stable, predictable revenue.</li>
                  <li>Pest control is a heavily regulated industry. Technicians must be licensed by their state and certified to handle restricted-use pesticides.</li>
                  <li>The industry is evolving toward more sustainable, science-based approaches through Integrated Pest Management (IPM), which emphasizes using the least toxic, most targeted solutions available.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-types",
        label: "Common Types of Pests",
        icon: List,
        sections: [
          {
            title: "Ants",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>One of the most frequently reported pest problems in both residential and commercial settings. While most ant species are nuisance pests, certain species present more serious concerns:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong className="text-foreground">Carpenter ants</strong> excavate wood to build their nests, causing structural damage similar to termites.</li>
                  <li><strong className="text-foreground">Fire ants</strong> deliver painful stings that can trigger severe allergic reactions.</li>
                </ul>
                <p className="text-sm">Ant colonies can number in the hundreds of thousands — the visible ants inside a structure represent only a small fraction of the total colony, making professional treatment far more effective than household sprays.</p>
              </div>
            )
          },
          {
            title: "Termites",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Among the most destructive pests on Earth. <strong className="text-foreground">Subterranean termites</strong> live in underground colonies and travel through mud tubes to feed on cellulose in wood, paper, and insulation. <strong className="text-foreground">Drywood termites</strong> infest wood directly without soil contact.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  Termite infestations can go undetected for years while causing catastrophic structural damage. Termite damage is typically <strong>not covered by homeowners insurance</strong>.
                </div>
              </div>
            )
          },
          {
            title: "Cockroaches",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Among the most resilient and difficult pests to eliminate without professional intervention. Common species include the <strong className="text-foreground">German cockroach</strong> (most common indoors), American cockroach, and Oriental cockroach. Cockroaches spread bacteria, trigger asthma attacks, and contaminate food preparation surfaces. Over-the-counter sprays push cockroaches deeper into walls rather than eliminating the problem — professional baiting programs are far more effective.</p>
              </div>
            )
          },
          {
            title: "Rodents (Rats and Mice)",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Significant pest threats in urban, suburban, and rural environments alike. Rodents contaminate food and surfaces with their urine, droppings, and hair. They gnaw continuously, damaging structures, electrical wiring (a serious fire hazard), plumbing, and insulation. A pair of mice can produce up to 200 offspring in a single year. Professional exclusion (sealing entry points) combined with baiting and trapping programs is required for effective long-term control.</p>
              </div>
            )
          },
          {
            title: "Bed Bugs",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Small, blood-feeding insects that hide in mattresses, furniture, wall cracks, and electrical outlets during the day and emerge at night to feed. Their bites cause itchy welts and significant sleep disruption. Bed bugs are exceptional hitchhikers — they spread easily through luggage, second-hand furniture, and clothing. They are highly resistant to most over-the-counter pesticides and can survive for months without feeding.</p>
                <p className="text-sm italic">Professional treatment — typically heat treatment or a combination of methods — is required to eliminate an infestation completely.</p>
              </div>
            )
          },
          {
            title: "Mosquitoes",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The deadliest animals on Earth, responsible for more human deaths annually than any other organism through the diseases they transmit — malaria, dengue fever, Zika virus, West Nile Virus, and chikungunya. Even in regions where these diseases are less prevalent, mosquitoes make outdoor spaces uncomfortable. Professional programs target both adult populations and larval stages in standing water.</p>
              </div>
            )
          },
          {
            title: "Spiders",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>While most spider species are harmless and ecologically beneficial, certain species pose genuine medical threats. The <strong className="text-foreground">black widow</strong> and <strong className="text-foreground">brown recluse</strong> are the most medically significant species in the U.S. — their bites can cause severe pain, tissue necrosis, and serious systemic reactions. Spider control typically involves treating the interior and exterior perimeter to eliminate both spiders and the insects they feed on.</p>
              </div>
            )
          },
          {
            title: "Fleas and Ticks",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Parasitic pests that feed on the blood of animals and humans. <strong className="text-foreground">Fleas</strong> infest homes primarily through pets — a single adult flea can lay up to 50 eggs per day. <strong className="text-foreground">Ticks</strong> attach to their hosts outdoors and can transmit serious diseases including Lyme disease, babesiosis, and anaplasmosis. Professional treatment for fleas involves both indoor and outdoor treatments as well as guidance on treating affected pets. Tick control focuses on treating yard perimeters and habitat modification.</p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "SERVICES & OPERATIONS",
    items: [
      {
        id: "pest-services",
        label: "Core Services",
        icon: CheckCircle,
        sections: [
          {
            title: "Pest Inspection",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A thorough examination of a property to identify signs of current or potential pest activity. Technicians examine the interior and exterior of the structure, including the foundation, crawl spaces, attic, plumbing areas, landscaping, and other entry-point risk zones. Inspections are the essential first step before any treatment can be recommended.</p>
                <p className="text-sm italic">Many real estate transactions require a formal Wood Destroying Organism (WDO) inspection report conducted by a licensed pest control professional.</p>
              </div>
            )
          },
          {
            title: "Pest Identification",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Accurate pest identification is critical because treatment methods vary significantly between species. A misidentification can result in ineffective treatment, wasted money, and continued infestation. Professional technicians are trained to identify pests from live specimens, droppings, damage patterns, nesting materials, and other evidence.</p>
              </div>
            )
          },
          {
            title: "Pest Treatment and Extermination",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Targeted application of pesticides, baits, traps, or other control methods to eliminate an active infestation. Treatment plans are customized based on the pest species, severity of infestation, size of the property, presence of children and pets, and customer preferences. Responsible pest control companies always explain the treatment plan, products to be used, and safety precautions before beginning any treatment.</p>
              </div>
            )
          },
          {
            title: "Preventive Pest Control Programs",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Regularly scheduled treatments designed to create a protective barrier around a property before pest problems develop. Most programs include quarterly, bimonthly, or monthly service visits that treat the exterior perimeter, address conducive conditions, and provide interior treatment as needed. Preventive programs are the most cost-effective way for homeowners and businesses to maintain year-round pest protection.</p>
              </div>
            )
          },
          {
            title: "Termite Control and Treatment",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>One of the most specialized and highest-value services in the industry. Includes termite inspections, installation of liquid soil treatment barriers (termiticides), installation and ongoing monitoring of termite baiting station systems, spot treatments, and fumigation for drywood termite infestations.</p>
                <div className="p-3 bg-primary/5 border rounded-lg text-sm">
                  Many companies offer annual termite warranty programs that guarantee re-treatment at no additional cost if termite activity is found within the treatment area.
                </div>
              </div>
            )
          },
          {
            title: "Rodent Control",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Rodent control programs address both the immediate infestation (through trapping and baiting) and long-term prevention through <strong className="text-foreground">exclusion</strong> — identifying and sealing all potential entry points. A comprehensive program includes thorough inspection, a customized treatment plan, installation of bait stations or traps, follow-up monitoring visits, and detailed exclusion work.</p>
              </div>
            )
          },
          {
            title: "Bed Bug Treatment",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A multi-step process requiring significant expertise and specialized equipment. Options include thermal heat treatments (raising the room to temperatures lethal to bed bugs at all life stages), chemical treatment programs using a rotation of products to prevent resistance, and combination approaches. Multiple follow-up inspections are typically required to confirm complete elimination.</p>
                <p className="text-sm italic">CSRs should be prepared to guide customers through preparation steps required before treatment.</p>
              </div>
            )
          },
          {
            title: "Mosquito Control",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Includes perimeter barrier spray treatments applied to foliage and shrubs where adult mosquitoes rest during the day, and larviciding treatments applied to standing water sources (ponds, birdbaths, gutters) to prevent larvae from developing into adults. Many companies offer recurring monthly or bimonthly programs during the active season, as well as one-time treatments for events and special occasions.</p>
              </div>
            )
          },
          {
            title: "Commercial Pest Management",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Requires a higher level of expertise, documentation, and regulatory compliance than residential service. Commercial clients — restaurants, hotels, food processing facilities, hospitals, schools, and warehouses — have stringent pest-free standards. Services include regular scheduled inspections and treatments, detailed service documentation and reports (required for health inspections and audits), employee education, and IPM programs tailored to each facility type.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-methods",
        label: "Pest Control Methods",
        icon: Droplets,
        sections: [
          {
            title: "Chemical Treatments",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Application of pesticides in liquid, granular, dust, or aerosol form to control or eliminate pests. When applied by a licensed professional, modern pesticides are effective while posing minimal risk when label instructions are followed.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong className="text-foreground">Liquid residual sprays</strong> — applied to exterior perimeters and interior crack-and-crevice areas.</li>
                  <li><strong className="text-foreground">Dust formulations</strong> — used in wall voids, attics, and electrical outlets.</li>
                  <li><strong className="text-foreground">Granular treatments</strong> — applied to lawns and soil.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Baiting Systems",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Baiting systems attract pests to a targeted food or pheromone lure containing a slow-acting pesticide. After consuming the bait, the pest returns to the colony and transfers the active ingredient to other individuals, resulting in colony-wide elimination. Particularly effective for cockroaches, ants, and rodents.</p>
                <div className="p-3 bg-muted/50 border rounded-lg text-sm">
                  Because baits are slow-acting by design, customers should be advised that results may take days to weeks to fully manifest. Bait stations are tamper-resistant, making them safe for use in homes with children and pets.
                </div>
              </div>
            )
          },
          {
            title: "Trapping",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A non-chemical method used primarily for rodent control and some wildlife management applications. Live traps capture rodents without harm for relocation; snap traps provide immediate kill; glue boards are used in sensitive environments where rodenticides cannot be used. Trapping programs require regular monitoring and servicing — typically every one to three days — to be effective and humane.</p>
              </div>
            )
          },
          {
            title: "Heat Treatments",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The most effective non-chemical method for eliminating bed bugs, also used for drywood termites. Specialized heating equipment raises the temperature of the treated space to approximately <strong className="text-foreground">120–135°F</strong> — lethal to all life stages including eggs. Heat penetrates into furniture, mattresses, and wall cavities that chemicals cannot easily reach. Can achieve complete elimination in a single treatment session with no chemical residue.</p>
              </div>
            )
          },
          {
            title: "Fumigation",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The most intensive pest control treatment available, used primarily for whole-structure drywood termite infestations. The entire structure is enclosed under a tent and a gaseous fumigant (typically sulfuryl fluoride) is introduced at a lethal concentration. All occupants, including pets and plants, must vacate the property for two to three days.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  Fumigation requires a separate fumigation license and is tightly regulated. It eliminates all stages of the target pest throughout the entire structure, including inaccessible areas.
                </div>
              </div>
            )
          },
          {
            title: "Integrated Pest Management (IPM)",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The modern, science-based philosophy of pest control that prioritizes long-term prevention through a combination of biological, cultural, physical, and chemical strategies. IPM uses the <strong className="text-foreground">least-risk methods first</strong> — such as habitat modification, exclusion, and mechanical traps — before resorting to chemical treatments. IPM is the gold standard approach and is required by many commercial clients and government contracts.</p>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">IPM in Practice</p>
                  <p>An IPM approach to a cockroach problem in a restaurant does not start with spraying. It starts with a thorough inspection to identify harborage areas and food/water sources, followed by sanitation recommendations, placement of gel baits, and monitoring with sticky monitors to track population reduction.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-operations",
        label: "How the Business Operates",
        icon: Info,
        sections: [
          {
            title: "The Typical Service Workflow",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ol className="space-y-4">
                  {[
                    { step: "1. Customer Inquiry or Booking", desc: "A potential customer contacts the company by phone, email, website form, live chat, or online booking platform. They describe the pest problem, property type and size, location, and any urgent concerns. CSRs and VAs play a critical role by gathering all relevant information, demonstrating empathy and professionalism, and beginning to qualify the type and complexity of service required." },
                    { step: "2. Pest Problem Assessment", desc: "Based on the customer's description, the CSR conducts an initial assessment. Key questions: How long have they been seeing pests? Where are they being seen? How many? Have they noticed any damage or droppings? Has any previous treatment been performed? This determines whether a standard service quote can be provided or whether an on-site inspection is required first." },
                    { step: "3. Scheduling an Inspection", desc: "An appointment is scheduled for an inspection or initial service visit. A confirmation message is sent with appointment details, preparation instructions (if applicable), and what to expect. A reminder is sent the day prior. For urgent situations such as active bed bug or rodent infestations, same-day or next-day scheduling may be appropriate." },
                    { step: "4. On-Site Inspection by Technician", desc: "A licensed pest control technician conducts a thorough interior and exterior inspection. The technician examines all areas of concern, identifies conducive conditions, checks for entry points, and documents all findings. A professional inspection typically takes 30 to 90 minutes depending on the size and complexity of the property." },
                    { step: "5. Identifying the Pest and Severity", desc: "Based on the inspection findings, the technician makes a definitive identification of the pest species and assesses the severity of the infestation (light, moderate, or severe). This assessment directly determines the treatment method, the products required, the number of service visits needed, and the cost." },
                    { step: "6. Treatment Recommendation and Quotation", desc: "The technician or sales representative presents the customer with a clear treatment recommendation and a written quotation explaining the proposed treatment method, products to be used, expected results and timeline, preparation requirements, and the cost. For larger jobs (termite treatment, fumigation, major rodent exclusion), this may be a separate consultation before any work begins." },
                    { step: "7. Performing the Treatment", desc: "With the customer's written or verbal authorization, the technician performs the treatment according to the plan. All pesticide applications are made in strict accordance with the product label, which is federal law. The technician documents all products used, application rates, and areas treated on the service ticket. Customers are advised of re-entry intervals, ventilation requirements, and post-treatment precautions." },
                    { step: "8. Follow-Up Visits and Monitoring", desc: "Pest control is rarely a one-and-done service. Most treatments require follow-up visits to monitor efficacy, address any remaining pest activity, service bait stations, and check traps. Follow-up visits are especially critical for termite programs, rodent control programs, bed bug treatments, and commercial accounts." },
                    { step: "9. Payment and Documentation", desc: "Payment is collected at the time of service or invoiced after completion, depending on the account type. Residential clients typically pay at service; commercial accounts may receive net-30 invoices. Service records, treatment reports, and warranty documentation are provided to the customer. Commercial clients receive formal service reports for their regulatory compliance files." },
                  ].map(({ step, desc }) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-fit">{step}:</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">CSR & VA Tip</p>
                  <p>Always ask these key questions when a customer calls: What pest are they seeing? Where exactly are they seeing it (inside, outside, specific rooms)? How long has this been happening? Do they have children or pets at home? This information allows the dispatcher to assign the right technician and ensures the technician arrives prepared with the correct equipment and products.</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "REFERENCE & COMPLIANCE",
    items: [
      {
        id: "pest-terminology",
        label: "Pest Control Terminology",
        icon: BookOpen,
        sections: [
          {
            title: "Common Pest Control Terms Glossary",
            content: (
              <div className="text-muted-foreground">
                <p className="mb-4 text-sm">Familiarity with these terms is essential for communicating confidently with customers, technicians, and colleagues.</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-44">Term</TableHead>
                      <TableHead className="font-bold">Definition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { term: "Infestation", def: "The presence of a pest in numbers large enough to be harmful, threatening, or cause economic damage. A few ants in the kitchen may be a nuisance; thousands of ants with an active nest inside the structure constitute an infestation." },
                      { term: "Extermination", def: "The complete elimination of a pest population from a defined area. While commonly used by customers, pest control professionals prefer terms like 'treatment' or 'control' because complete eradication is not always achievable — prevention of reinfestation is equally important." },
                      { term: "Bait Stations", def: "Protective containers that hold a pesticide bait matrix. Bait stations are placed in pest activity areas and are designed to be accessible to the target pest but tamper-resistant to children, pets, and non-target wildlife." },
                      { term: "Residual Treatment", def: "A pesticide application that remains active (continues to kill pests on contact) for a period of days to weeks after application. Applied to surfaces where pests travel, providing ongoing control after the initial visit." },
                      { term: "Fumigation", def: "A pest control method using toxic gases introduced into a sealed structure to eliminate all stages of the target pest throughout the entire structure. Requires complete evacuation and is most commonly used for drywood termite infestations." },
                      { term: "Integrated Pest Management (IPM)", def: "A science-based approach to pest management that uses a combination of biological, cultural, physical, and chemical methods with an emphasis on prevention and the use of least-risk treatments. The industry gold standard." },
                      { term: "Pest Entry Points", def: "Gaps, cracks, holes, or other openings in a structure through which pests can gain access. Common entry points include gaps around pipes and utilities, cracks in the foundation, damaged door seals, and unscreened vents." },
                      { term: "Exclusion", def: "The process of physically preventing pests from entering a structure by sealing all potential entry points. The most durable, long-term solution to rodent and wildlife pest problems." },
                      { term: "Conducive Conditions", def: "Environmental factors that attract pests or allow them to establish and thrive. Examples include moisture (leaking pipes, poor drainage), food availability (improperly stored food), clutter, and wood-to-soil contact (termite risk)." },
                      { term: "Re-Entry Interval (REI)", def: "The minimum amount of time that must elapse after a pesticide application before people and pets can safely re-enter the treated area. REIs are specified on the pesticide label and must be communicated clearly to customers." },
                      { term: "Colony", def: "A social group of insects that lives together and functions cooperatively. Ants, termites, bees, wasps, and cockroaches live in colonies. Effective treatment must reach the colony — not just the visible individuals — to achieve lasting control." },
                      { term: "Pheromone", def: "A chemical signal produced by insects to communicate with others of their species. Pest control uses synthetic pheromones in traps and monitoring devices to attract target pests." },
                      { term: "Larvicide", def: "A pesticide specifically formulated to kill insect larvae. Used in mosquito control programs to treat standing water and prevent larvae from developing into adult mosquitoes." },
                      { term: "Wood Destroying Organisms (WDO)", def: "Organisms that damage wood in structures, including termites, carpenter ants, carpenter bees, and wood-decay fungi. WDO inspections are commonly required during real estate transactions." },
                      { term: "Pesticide Label", def: "The legal document printed on or attached to a pesticide container that describes how the product must be used. Following the label is required by federal law under FIFRA. It specifies application rates, target pests, approved use sites, safety precautions, and re-entry intervals." },
                    ].map(({ term, def }) => (
                      <TableRow key={term}>
                        <TableCell className="font-semibold text-foreground align-top">{term}</TableCell>
                        <TableCell className="text-sm">{def}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-roles",
        label: "Roles in a Pest Control Business",
        icon: Users,
        sections: [
          {
            title: "Team Roles & Responsibilities",
            content: (
              <div className="text-muted-foreground">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-52">Role</TableHead>
                      <TableHead className="font-bold">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { role: "Pest Control Technician", resp: "Licensed field professional who performs all pest inspections, treatments, and follow-up monitoring. Must hold a valid state pest control license and applicable certifications (including EPA 7A certification for fumigation). They are the technical experts and the primary face of the company to customers." },
                      { role: "Inspector", resp: "In larger companies, dedicated inspectors conduct all property inspections and prepare detailed written reports and treatment proposals. Especially common in the termite control and real estate inspection segments. May also handle commercial account assessments." },
                      { role: "Customer Service Representative (CSR)", resp: "Manages all incoming customer inquiries, provides general information and pricing, schedules appointments, sends confirmations and reminders, handles complaints, and manages customer relationships. The critical link between the customer and the service team." },
                      { role: "Dispatcher / Scheduler", resp: "Manages the daily schedule for all technicians, assigns jobs based on location, expertise, and availability, monitors real-time job progress, and adjusts the schedule to accommodate urgent calls, cancellations, and delays." },
                      { role: "Sales Representative", resp: "Focuses on acquiring new residential and commercial accounts, conducting property assessments, preparing and presenting service proposals, and closing service agreements. Especially important for growing the commercial pest management side of the business." },
                      { role: "Operations Manager", resp: "Oversees all field and office operations including technician scheduling, quality control, customer satisfaction, regulatory compliance, supply inventory, vehicle management, and staff performance." },
                      { role: "Business Owner", resp: "Sets strategic direction, manages company finances, oversees hiring and culture, makes decisions on service offerings and pricing, and drives business growth. In smaller companies, the owner often also performs technical services and customer-facing roles." },
                      { role: "Virtual Assistant (VA)", resp: "Provides remote support for customer service, scheduling, follow-up communications, review management, data entry, and administrative tasks. VAs must be thoroughly familiar with the company's services, pricing, preparation requirements, and key pest control terminology." },
                    ].map(({ role, resp }) => (
                      <TableRow key={role}>
                        <TableCell className="font-semibold text-foreground align-top">{role}</TableCell>
                        <TableCell className="text-sm">{resp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-tools",
        label: "Tools & Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Common Pest Control Equipment",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Sprayers", desc: "The most fundamental tool in a technician's arsenal. Types include hand-pump compressed-air sprayers (for interior crack-and-crevice and spot treatments), backpack motorized sprayers (for large outdoor areas and mosquito barrier treatments), and power sprayers mounted on service vehicles (for high-volume exterior perimeter treatments and termite soil applications)." },
                    { name: "Foggers and Misters", desc: "Break liquid pesticide or disinfectant into extremely fine droplets that remain suspended in the air, contacting surfaces and pests throughout a space. ULV mosquito misters are used for large-scale outdoor mosquito control. Thermal foggers use heat to create a visible fog." },
                    { name: "Bait Stations", desc: "Durable, tamper-resistant plastic enclosures that hold rodenticide bait blocks or insect bait matrices. Rodent bait stations are placed along walls, in crawl spaces, and near entry points. Termite monitoring and baiting stations are installed in the soil around the perimeter of a structure." },
                    { name: "Traps", desc: "Snap traps for immediate rodent control; live-catch traps for wildlife management; glue boards for sensitive environments; pheromone traps for monitoring moth and stored-product pest populations; fly light traps (UV light) for capturing flying insects in commercial food facilities." },
                    { name: "Protective Equipment (PPE)", desc: "Required when handling pesticides and performing treatments. Standard PPE includes nitrile or chemical-resistant gloves, safety glasses or goggles, closed-toe footwear, and long-sleeved clothing. Respirators or N95 masks are required when applying pesticide dusts, working in confined spaces, or performing fumigation." },
                    { name: "Inspection Tools", desc: "Flashlights and headlamps for dark crawl spaces and attics; telescoping mirrors for behind appliances; moisture meters to detect elevated moisture in wood; borescope cameras for inaccessible wall areas; termite detection tools including microwave sensors and acoustic emission devices; magnifying glasses and specimen containers for pest identification." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{name}</p>
                      <p className="text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Equipment Safety Note</p>
                  <p>All pesticide application equipment must be inspected before each use for leaks, blockages, and damage. Technicians should never use damaged equipment or improvised repairs in the field. Equipment maintenance is both a safety and a regulatory compliance requirement.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-safety",
        label: "Safety & Regulations",
        icon: ShieldCheck,
        sections: [
          {
            title: "Safe Chemical Handling",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>All pesticide applications must be performed strictly according to the product label, which is a legally binding document under the <strong className="text-foreground">Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA)</strong>.</li>
                  <li>Technicians must read the Safety Data Sheet (SDS) for every product they use and understand the health hazards, first-aid measures, and spill response procedures.</li>
                  <li>Pesticides must never be transferred into unlabeled containers.</li>
                  <li>Technicians must always wear the PPE specified on the product label for the application being performed.</li>
                  <li>Skin or eye contact with pesticides must be treated immediately per the SDS first-aid instructions.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Environmental Protection",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Pesticides must never be applied near water sources, drainage ditches, or in ways that could cause runoff into storm drains or natural water bodies.</li>
                  <li>Pollinators such as bees must be protected. Treatments should not be applied to flowering plants while pollinators are active. Outdoor treatments should ideally be performed in early morning or evening.</li>
                  <li>Non-target animals, including birds and beneficial insects, must be considered when selecting treatment methods and application sites.</li>
                  <li>Proper disposal of empty pesticide containers must comply with label instructions and local regulations — never in regular household trash or recycling.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Proper Storage of Pesticides",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>All pesticides must be stored in their original, labeled containers in a locked, ventilated storage area away from food, water, and other chemicals.</li>
                  <li>Pesticides must be stored away from heat sources and out of direct sunlight to maintain efficacy and prevent container degradation.</li>
                  <li>Technicians' service vehicles are considered pesticide storage locations and are subject to inspection by state regulatory agencies.</li>
                  <li>An up-to-date inventory of all pesticides stored in vehicles and at the company facility must be maintained.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Licensing and Certification Requirements",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>In every U.S. state, pest control technicians must hold a valid state-issued pesticide applicator license. Requirements typically include passing a written examination, completing minimum training hours, and maintaining continuing education for license renewal.</li>
                  <li>Certain services require additional certifications. Fumigation requires a separate fumigation license. WDO inspections may require a separate certification for real estate reporting.</li>
                  <li>Companies must maintain liability insurance and, in most states, a company-level pesticide business license in addition to individual technician licenses.</li>
                  <li>Pesticide use records must be maintained for all commercial applications for a minimum of two years and must be available for inspection by state regulatory authorities.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Protecting Customers, Pets, and Property",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Customers must be clearly informed of re-entry intervals, ventilation requirements, and any items that should be removed or covered before treatment.</li>
                  <li>Pets must be removed from treatment areas for the duration specified on the product label. Fish tanks must be covered and their filtration systems turned off during any aerosol or fumigant applications.</li>
                  <li>Technicians must take care to protect customers' personal belongings, plants, and surfaces from pesticide contact where not intended.</li>
                  <li>A written record of all products applied, application areas, rates, and the customer's acknowledgment of safety instructions must be maintained for every service visit.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-concerns",
        label: "Common Customer Concerns",
        icon: AlertCircle,
        sections: [
          {
            title: "Seeing Insects or Rodents Inside the Home",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The most immediate trigger for a customer call is the visual sighting of a pest inside the home. Customers often describe the pest in general terms ('a big brown bug,' 'a tiny ant,' 'something ran across the kitchen floor').</p>
                <p className="text-sm italic">CSRs should ask: size, color, number of legs, where it was seen, and time of day. This helps determine whether an inspection is needed before treatment or whether a standard service can be booked directly.</p>
              </div>
            )
          },
          {
            title: "Pest Droppings or Nests",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Customers may discover pest droppings, nesting materials, chewed food packaging, or structural damage without seeing a live pest. Rodent droppings are among the most alarming discoveries.</p>
                <p className="text-sm italic">CSRs should ask customers to describe the size and shape of the droppings (which helps narrow down the species) and where they were found. Wasp or hornet nests on the property exterior are a common urgent request, especially in late summer and fall.</p>
              </div>
            )
          },
          {
            title: "Damage Caused by Termites or Rodents",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Termite damage discovered during a renovation is a frequent urgent call trigger. Customers may describe soft, hollow-sounding wood, mud tubes along the foundation, or discarded wings from termite swarmers. Rodent damage — gnawed wires, shredded insulation, holes in walls — is typically discovered during cleaning or organization efforts.</p>
                <p className="text-sm italic">Both situations require a prompt inspection response.</p>
              </div>
            )
          },
          {
            title: "Bites from Bed Bugs or Fleas",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Waking up with unexplained bite marks is an extremely distressing experience. Customers experiencing possible bed bug or flea bites should be treated with particular empathy and urgency.</p>
                <p className="text-sm italic">CSRs should ask: the bite pattern (bed bug bites often appear in a line or cluster), whether pets are present (suggests fleas), whether any travel or second-hand furniture was involved recently (suggests bed bugs), and which rooms are most affected. These calls should be prioritized for rapid scheduling.</p>
              </div>
            )
          },
          {
            title: "Mosquito Infestations Around Properties",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Customers may call about excessive mosquito pressure in their yard, particularly in spring and summer.</p>
                <p className="text-sm italic">Ask about standing water sources on the property (birdbaths, clogged gutters, flower pot trays, kiddie pools) that may be serving as mosquito breeding sites. Customers with upcoming outdoor events frequently seek one-time mosquito treatments.</p>
              </div>
            )
          },
          {
            title: "Stinging Insects (Wasps, Hornets, Bees)",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Stinging insect calls are often urgent because the nests are discovered when someone is stung. Accurate identification matters: <strong className="text-foreground">honeybee swarms or established hives are typically referred to a beekeeper</strong> rather than exterminated, whereas yellow jacket, paper wasp, and hornet nests are treated by the pest control company.</p>
                <p className="text-sm italic">CSRs should ask about the location of the nest, its approximate size, and whether anyone has been stung to assess urgency.</p>
              </div>
            )
          },
          {
            title: "Cockroach Sightings in Kitchen or Bathroom",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Cockroach sightings are extremely common, especially in apartment buildings and restaurant environments.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  A single cockroach seen during the daytime is often an indicator of a significant infestation — cockroaches are nocturnal and only emerge in daylight when the population is large enough to compete for resources.
                </div>
                <p className="text-sm">Customers should be informed that a thorough inspection is required before treatment and that preparation steps will be required for effective treatment.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "pest-importance",
        label: "Why Pest Control Matters",
        icon: Heart,
        sections: [
          {
            title: "The Importance of Professional Pest Control",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Professional pest control services are a fundamental investment in health, safety, property, and quality of life.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Protecting Health and Safety", body: "Rodents contaminate food with urine and droppings harboring salmonella, listeria, and hantavirus. Cockroaches spread more than 33 types of bacteria and trigger asthma attacks in children. Mosquitoes are responsible for more human deaths than any other animal on the planet. For families with young children, elderly residents, or immunocompromised individuals, professional pest management is not optional — it is essential preventive healthcare." },
                    { title: "Preventing Property Damage", body: "Termites cause approximately $5 billion in property damage annually in the U.S. Rodents are responsible for an estimated 20 to 25 percent of all undetermined house and structure fires through their habit of gnawing on electrical wiring. Carpenter ants excavate wood for nesting, causing structural weakening that results in very costly repairs. Professional pest control provides a financial safeguard that no amount of DIY treatment can replicate." },
                    { title: "Maintaining Sanitation Standards", body: "For commercial clients, maintaining a pest-free environment is a regulatory and legal requirement. Food service establishments, healthcare facilities, schools, and childcare centers are subject to regular health inspections that can result in fines, temporary closure, or loss of operating licenses if pest activity is detected. A proactive professional pest management program with detailed service documentation is the most effective way to maintain sanitation compliance." },
                    { title: "Long-Term Pest Prevention", body: "The most significant advantage of professional pest control over DIY approaches is the long-term, systemic nature of professional programs. A homeowner using a store-bought spray may kill the visible pests but will leave the colony, the entry points, and the conducive conditions intact — guaranteeing a rapid return. A professional program addresses all three elements: eliminating the current population, correcting the conditions that attracted pests, and creating ongoing barriers that prevent future colonization." },
                  ].map(({ title, body }) => (
                    <div key={title} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{title}</p>
                      <p className="text-sm">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Final Note for New Team Members</p>
                  <p>Every role in this company — from the technician in the field to the virtual assistant on the phone — plays a critical part in protecting our customers' health, homes, and businesses. Pest control is not just a service industry; it is a public health profession. Take pride in the expertise behind every service call, communicate with care and confidence, and know that the work this team does makes a genuine difference in people's lives every single day. Welcome to the team!</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const poolCleaningSections: DocGroup[] = [
  {
    title: "POOL CLEANING BASICS",
    items: [
      {
        id: "pool-introduction",
        label: "Introduction to Pool Cleaning",
        icon: Waves,
        sections: [
          {
            title: "What Is a Pool Cleaning Business?",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>A pool cleaning business is a professional service company that provides scheduled maintenance, chemical balancing, equipment care, and repair services for residential and commercial swimming pools, spas, and hot tubs. Pool service technicians are trained in water chemistry, filtration systems, pool equipment, and the physical cleaning tasks required to keep pools safe, sanitary, and visually appealing.</p>
                <p>Pool cleaning companies range from solo owner-operators servicing a neighborhood route to large regional companies with dozens of technicians and fleet vehicles. All share the same core mission: to ensure that every pool in their care is clean, chemically balanced, safe to swim in, and mechanically sound — so their clients can simply enjoy the water without worry.</p>
                <div className="p-4 bg-muted/50 border rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Industry Insight</p>
                  <p className="text-sm">The pool service industry is largely recession-resistant. Pool owners who have invested significantly in their outdoor living space continue to maintain their pools regardless of economic conditions. This makes pool service one of the more stable home service businesses available.</p>
                </div>
              </div>
            )
          },
          {
            title: "Why Regular Pool Maintenance Is Important",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Without consistent, knowledgeable maintenance, pools deteriorate rapidly — both as sanitary environments and as mechanical systems.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-foreground">Health hazards:</strong> Improperly balanced water allows bacteria, viruses, and parasites to thrive. Recreational Water Illnesses (RWIs) — including E. coli, Giardia, and Cryptosporidium — are directly linked to poorly maintained pool water.</li>
                  <li><strong className="text-foreground">Equipment damage:</strong> Corrosive or scaling water attacks metal fittings, pump seals, heater elements, and pool surfaces. Neglected filters and pumps fail prematurely.</li>
                  <li><strong className="text-foreground">Structural deterioration:</strong> Low pH etches plaster, fiberglass, and grout, requiring costly resurfacing. High pH causes unsightly calcium scaling on tiles and surfaces.</li>
                  <li><strong className="text-foreground">Algae growth:</strong> Without adequate sanitizer levels and circulation, algae can establish in as little as 24 to 48 hours, turning a clear pool green or black.</li>
                  <li><strong className="text-foreground">Safety risks:</strong> Cloudy or green pool water reduces visibility, creating a drowning risk. Malfunctioning electrical equipment poses electrocution hazards.</li>
                  <li><strong className="text-foreground">Regulatory compliance:</strong> Commercial pools are subject to regular health department inspections. Failure to maintain compliant standards can result in mandatory pool closure.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Overview of the Pool Service Industry",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The pool service industry is a strong and growing segment of the outdoor living and home services market.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Demand is concentrated in warmer climates (Florida, Texas, Arizona, California) where outdoor pools are used year-round. In cooler climates, there is a strong seasonal demand pattern with winter pool closing and opening services.</li>
                  <li>Recurring weekly service routes are the backbone of most pool service businesses, providing predictable, stable revenue and strong customer relationships.</li>
                  <li>The industry serves both residential clients (private homeowners) and commercial clients (hotels, resorts, HOA community pools, fitness centers, and apartment complexes).</li>
                  <li>Growing consumer interest in outdoor living spaces and backyard renovations is driving consistent growth in pool installations and demand for professional pool service.</li>
                  <li>Pool service businesses frequently expand into adjacent services including equipment repair, pool remodeling, water feature maintenance, and retail chemical sales.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-types",
        label: "Types of Pools Serviced",
        icon: List,
        sections: [
          {
            title: "Residential Swimming Pools",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Privately owned pools located on single-family home properties. They are the most common type of pool serviced. Residential pools range from small above-ground units to large custom in-ground pools with waterfalls, heating systems, and advanced automation. Weekly or biweekly service visits are standard. The homeowner relationship is highly personal — trust and reliability are the most valued qualities in a pool service provider.</p>
              </div>
            )
          },
          {
            title: "Commercial Pools",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Commercial pools serve multiple users simultaneously and are subject to far higher bather loads than residential pools. Chemical demand is higher, filtration requirements are more stringent, and the consequences of water quality failures are more serious. Commercial pools are inspected by local health departments and must maintain detailed chemical log books. Service visits are typically more frequent (sometimes daily) and require thorough documentation. Commercial accounts are high-value contracts that often require specialized certification in commercial pool operations.</p>
              </div>
            )
          },
          {
            title: "In-Ground Pools",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Permanent structures built into the ground, constructed of gunite/shotcrete (concrete), fiberglass, or vinyl liner. The most common type of permanent residential and commercial pool. Maintenance requires regular brushing of walls and floors, chemical balancing, filter care, and equipment monitoring. The surface material significantly affects the chemical balance required — plaster pools need particularly careful pH management to prevent etching or scaling.</p>
              </div>
            )
          },
          {
            title: "Above-Ground Pools",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Less expensive, easier to install, and typically smaller than in-ground pools. They use cartridge or sand filter systems and are generally serviced less frequently. Because above-ground pools hold less water volume, chemical changes happen more rapidly and require careful monitoring. Technicians must take care not to damage the vinyl liner during cleaning and vacuuming.</p>
              </div>
            )
          },
          {
            title: "Saltwater Pools",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Saltwater pools use a <strong className="text-foreground">salt chlorine generator (SWG)</strong> to convert dissolved salt in the water into chlorine through electrolysis. They do not use chlorine tablets or liquid chlorine as the primary sanitizer. The water has a softer feel and is gentler on the eyes and skin. Maintenance involves monitoring and adjusting salt levels, inspecting and cleaning the salt cell (which can scale with calcium deposits), and balancing standard chemistry parameters.</p>
              </div>
            )
          },
          {
            title: "Chlorine Pools",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Traditional chlorine pools use chlorine tablets (trichlor or dichlor), liquid chlorine (sodium hypochlorite), or granular chlorine as the primary sanitizer. The most common pool type. Maintaining proper free chlorine levels (typically <strong className="text-foreground">1 to 3 ppm</strong> for residential pools) is the most critical chemistry task. Stabilizer (cyanuric acid) levels must also be managed — too low allows UV to rapidly degrade chlorine; too high (over-stabilization) prevents chlorine from effectively sanitizing.</p>
              </div>
            )
          },
          {
            title: "Spas and Hot Tubs",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Spas and hot tubs operate at significantly higher water temperatures (typically <strong className="text-foreground">100 to 104°F</strong>), which dramatically accelerates chemical consumption and bacterial growth. Chemistry must be checked and adjusted much more frequently. Spas require regular draining and refilling (typically every 3 to 4 months) because high temperatures cause rapid buildup of total dissolved solids (TDS). Spa service is a premium-priced add-on that pairs naturally with pool maintenance accounts.</p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "SERVICES & OPERATIONS",
    items: [
      {
        id: "pool-services",
        label: "Core Services",
        icon: CheckCircle,
        sections: [
          {
            title: "Regular Pool Cleaning and Maintenance",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The foundation service of any pool business. A standard weekly service visit includes all routine tasks: skimming the surface, emptying baskets, vacuuming, brushing surfaces, testing and adjusting chemicals, and inspecting equipment. This recurring service is offered on a weekly, biweekly, or monthly schedule and typically represents the core of a pool company's revenue. Consistent service builds strong customer relationships and creates opportunities to identify and address problems before they become costly repairs.</p>
              </div>
            )
          },
          {
            title: "Pool Vacuuming",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Removes debris, dirt, and sediment that has settled on the pool floor. Performed using a manual vacuum head connected to a telescopic pole and the pool's circulation system, or with an automatic pool cleaner. Manual vacuuming provides more thorough results, particularly in pools with heavy debris or algae. For pools with severe contamination, the technician may <strong className="text-foreground">vacuum to waste</strong> — bypassing the filter entirely to prevent it from becoming overwhelmed.</p>
              </div>
            )
          },
          {
            title: "Skimming Debris from the Water Surface",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Surface skimming removes floating debris including leaves, insects, pollen, and organic matter before it sinks and consumes chlorine as it decomposes. Performed at the beginning of every service visit using a flat leaf skimmer net on a telescopic pole. Skimmer baskets are also emptied at every visit. Heavy leaf debris can rapidly deplete sanitizer levels and cloud the water, making timely skimming a critical first step.</p>
              </div>
            )
          },
          {
            title: "Brushing Pool Walls and Tiles",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Brushing dislodges algae, biofilm, and calcium deposits from pool walls, steps, benches, and the waterline tile before they become visible problems. Plaster and concrete pools benefit from regular brushing because their porous surfaces are susceptible to algae colonization. Tile lines at the waterline accumulate calcium scaling and sunscreen residue. Regular brushing prevents the development of black algae, which is the most difficult algae species to eliminate.</p>
              </div>
            )
          },
          {
            title: "Chemical Testing and Balancing",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The most technically demanding and critical task in pool service. Technicians test for multiple parameters at every service visit: <strong className="text-foreground">free chlorine, pH, total alkalinity, calcium hardness, cyanuric acid,</strong> and salt (for saltwater pools). Chemical adjustments must be made in the correct sequence to avoid inadvertently correcting one parameter while worsening another.</p>
                <p className="text-sm italic">Imbalanced water is either corrosive (at low pH) or scaling (at high pH), both of which damage pool surfaces and equipment.</p>
              </div>
            )
          },
          {
            title: "Filter Cleaning and Maintenance",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The pool's filtration system continuously removes suspended particles from the water to maintain clarity. Sand filters are backwashed to flush trapped debris out of the filter media. Cartridge filters are removed, rinsed, and periodically soaked in a chemical cleaner. Diatomaceous earth (DE) filters are backwashed and recharged with fresh DE powder. Filter cartridges have a finite lifespan and must be replaced periodically.</p>
              </div>
            )
          },
          {
            title: "Pool Equipment Inspection",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Every service visit should include a visual inspection of all pool equipment: the pump motor, pump basket, filter pressure gauge, heater, automated chemical systems, salt cell, automation controllers, lights, and any water features. Early identification of abnormal pump noise, elevated filter pressure, equipment leaks, or unusual readings allows the technician to alert the customer and recommend repairs before a minor issue becomes a major equipment failure.</p>
              </div>
            )
          },
          {
            title: "Algae Treatment",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>A reactive service performed when algae colonizes a pool. Green algae (most common) can typically be resolved with a shock treatment and algaecide application. Yellow/mustard algae is more resistant. Black algae (technically a cyanobacterium) is the most difficult — it roots into plaster surfaces and has a protective outer layer requiring repeated brushing and concentrated chlorine treatment.</p>
                <div className="p-3 bg-primary/5 border rounded-lg text-sm">Algae treatment services command a premium price above the standard service fee.</div>
              </div>
            )
          },
          {
            title: "Pool Opening and Closing Services",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>In climates with freezing winters, seasonal pool opening (spring) and closing (winterization/fall) services are essential and highly profitable.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 border rounded-lg bg-muted/30">
                    <p className="font-semibold text-foreground mb-1">Pool Opening</p>
                    <p>Remove/store winter cover, inspect equipment after winter storage, reassemble plumbing, fill pool to proper level, start circulation, perform initial chemical startup.</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-muted/30">
                    <p className="font-semibold text-foreground mb-1">Pool Closing</p>
                    <p>Clean pool, balance chemistry to winter specifications, lower water level, blow out plumbing lines with compressed air, add antifreeze where appropriate, install winter cover.</p>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-maintenance-tasks",
        label: "Routine Maintenance Tasks",
        icon: Wrench,
        sections: [
          {
            title: "Water Testing and Chemical Balancing",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Performed at every service visit using test strips, drop test kits (DPD), or digital photometric testers. Once readings are obtained, the technician calculates the required chemical additions and adds the correct amounts directly to the pool. Chemical adjustments must be made in the correct sequence — alkalinity before pH, for example — to avoid inadvertently worsening another parameter.</p>
              </div>
            )
          },
          {
            title: "Removing Debris and Leaves",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Includes skimming the water surface with a leaf net, emptying the built-in skimmer basket(s), emptying the pump basket, and vacuuming or netting any debris that has settled on the pool floor. In wooded or high-debris environments, this can be the most time-consuming part of the visit. Failing to remove organic debris promptly leads to accelerated chlorine consumption, water discoloration, and algae growth.</p>
              </div>
            )
          },
          {
            title: "Cleaning Skimmer Baskets",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The skimmer basket is a removable collection basket located in the skimmer housing built into the pool wall at the waterline. Its purpose is to trap large debris before it enters the pump and filter system. A clogged skimmer basket restricts water flow, reducing the efficiency of the entire circulation system and placing additional strain on the pump motor. Technicians remove, empty, and inspect the skimmer basket at every visit.</p>
              </div>
            )
          },
          {
            title: "Vacuuming Pool Floors",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Even with a functional automatic pool cleaner, manual vacuuming is recommended at each service visit to address areas the automatic cleaner misses — corners, steps, benches, and areas near return jets. Technique matters: moving too quickly stirs up sediment rather than vacuuming it. For pools with DE or cartridge filters, pre-cleaning the filter before vacuuming helps maintain suction.</p>
              </div>
            )
          },
          {
            title: "Brushing Pool Surfaces",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Performed using a curved pool brush suited to the surface type — nylon bristles for fiberglass and vinyl, and steel-bristle or combination brushes for plaster and concrete. The technician brushes all walls, steps, benches, and the floor perimeter in overlapping, downward strokes toward the main drain. Regular brushing (at minimum every two weeks) is critical for plaster pools, which are the most susceptible to algae attachment.</p>
              </div>
            )
          },
          {
            title: "Backwashing Filters",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The process of reversing the flow of water through a sand or DE filter to flush captured debris out through the waste line. A filter should be backwashed when the filter pressure gauge reads <strong className="text-foreground">8 to 10 psi above the clean operating pressure</strong>. After backwashing, the rinse setting is run briefly to re-settle the filter media before returning to normal filtration.</p>
              </div>
            )
          },
          {
            title: "Monitoring Water Levels",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Pool water levels naturally drop due to evaporation, splashing, and backwashing. The correct water level is the middle of the skimmer opening — too low and the skimmer draws air, potentially running the pump dry and causing catastrophic pump motor failure; too high and the skimmer cannot function effectively. Technicians check and adjust water levels at each visit. Unusually rapid water level drops should prompt an inspection for leaks.</p>
              </div>
            )
          },
          {
            title: "Service Visit Sequence (Quick Reference)",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p className="text-sm">A properly structured service visit follows this order:</p>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Arrive and assess pool condition</li>
                  <li>Empty skimmer and pump baskets</li>
                  <li>Skim water surface and remove debris</li>
                  <li>Brush walls, tiles, and steps</li>
                  <li>Vacuum pool floor</li>
                  <li>Test water chemistry</li>
                  <li>Add chemicals and balance water</li>
                  <li>Check and adjust water level</li>
                  <li>Inspect equipment</li>
                  <li>Document service and notify customer of any issues</li>
                </ol>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-operations",
        label: "How the Business Operates",
        icon: Info,
        sections: [
          {
            title: "The Typical Service Workflow",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ol className="space-y-4">
                  {[
                    { step: "1. Customer Inquiry or Booking", desc: "A potential customer contacts the company by phone, email, website form, or online booking platform. They describe their pool type, size, location, current condition, and the service they are looking for. The CSR or VA collects all relevant information, including pool type, sanitizer type, approximate gallonage, and any specific concerns." },
                    { step: "2. Service Consultation and Pricing", desc: "Based on the information gathered, the CSR provides a service quote. Pool service pricing is typically based on pool size, service frequency (weekly vs. biweekly), the type of service (maintenance only vs. full service including chemicals), and geographic location. For new customers, a one-time initial clean-up fee is often charged if the pool has not been professionally maintained recently." },
                    { step: "3. Scheduling Routine Maintenance Visits", desc: "A recurring service schedule is established. Weekly service days are assigned based on the technician's route in the customer's neighborhood. The customer receives a welcome communication including their assigned service day, technician contact information, and what to expect from the service." },
                    { step: "4. Technician Arrival and Inspection", desc: "The technician arrives during the scheduled service window and conducts a brief initial assessment before beginning work. They check the overall pool appearance, confirm equipment is running properly, and note anything unusual compared to the previous visit. For new customers, the first visit includes a full assessment of pool condition, equipment age and function, and chemical baseline readings." },
                    { step: "5. Performing Cleaning and Maintenance Tasks", desc: "The technician performs all required cleaning tasks in the correct sequence: emptying baskets, skimming, brushing, and vacuuming. All areas of the pool are addressed — walls, floor, steps, benches, waterline tiles, and all equipment baskets." },
                    { step: "6. Testing and Adjusting Chemicals", desc: "After physical cleaning is complete, the technician tests the water, records results, and calculates required chemical adjustments. Chemicals are added in the correct order and in the correct amounts — never guessed. For customers on a full-service program (chemicals included), the technician adds all required chemicals from their service vehicle." },
                    { step: "7. Reporting Pool Condition to the Customer", desc: "Many pool companies use field service software to automatically generate a service report at the end of each visit. The report includes chemistry readings before and after treatment, chemicals added, observations about equipment or pool condition, photos if applicable, and any recommended repairs. This report is automatically emailed or pushed to the customer through a client portal." },
                    { step: "8. Payment and Service Documentation", desc: "For recurring service accounts, payment is typically handled automatically through credit card on file, ACH transfer, or monthly invoicing. One-time services (pool openings, closings, algae treatments, repairs) are invoiced separately. All service records, chemical logs, and invoices are stored in the company's service management system." },
                  ].map(({ step, desc }) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-fit">{step}:</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">CSR & VA Pro Tip</p>
                  <p>When a new customer calls, always ask: What type of pool (in-ground/above-ground, plaster/fiberglass/vinyl, chlorine/saltwater)? Approximate size? Is it currently running? When was it last professionally serviced? Are there any visible problems right now? This allows for accurate quoting and ensures the technician arrives prepared for the first visit.</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "REFERENCE & BEST PRACTICES",
    items: [
      {
        id: "pool-terminology",
        label: "Pool Maintenance Terminology",
        icon: BookOpen,
        sections: [
          {
            title: "Common Pool Service Terms Glossary",
            content: (
              <div className="text-muted-foreground">
                <p className="mb-4 text-sm">Familiarity with these terms is essential for confident communication with customers, technicians, and colleagues.</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-44">Term</TableHead>
                      <TableHead className="font-bold">Definition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { term: "pH Balance", def: "A measure of the acidity or alkalinity of pool water on a scale of 0 to 14. The ideal range for pool water is 7.4 to 7.6. Low pH (acidic) corrodes equipment and irritates swimmers; high pH (alkaline) reduces chlorine effectiveness and causes scaling." },
                      { term: "Free Chlorine", def: "The active, available chlorine in pool water that provides sanitization. Ideal range is 1 to 3 ppm for residential pools, 2 to 4 ppm for commercial pools. Free chlorine is consumed by sunlight, organic matter, and bather load and must be replenished regularly." },
                      { term: "Total Alkalinity", def: "A measure of the water's ability to resist changes in pH. Ideal range is 80 to 120 ppm. Proper alkalinity acts as a buffer that stabilizes pH and prevents it from fluctuating rapidly." },
                      { term: "Calcium Hardness", def: "The measure of dissolved calcium in pool water. Ideal range is 200 to 400 ppm. Low calcium hardness causes water to leach calcium from pool surfaces (etching); high levels cause cloudy water and calcium scaling on surfaces and equipment." },
                      { term: "Cyanuric Acid (Stabilizer)", def: "A chemical that protects chlorine from rapid degradation by UV sunlight. Ideal range is 30 to 50 ppm for outdoor pools. Over-stabilization (above 80 to 100 ppm) significantly reduces chlorine effectiveness and requires dilution by draining and refilling." },
                      { term: "Pool Circulation", def: "The continuous movement of water through the pump, filter, and return jets. Proper circulation ensures even chemical distribution, prevents dead spots where algae can establish, and moves debris toward the skimmer and main drain." },
                      { term: "Skimmer", def: "A collection basin built into the pool wall at the waterline that draws surface water and floating debris into the filtration system. The skimmer contains a weir door that regulates water flow and a removable basket that captures debris before it enters the pump." },
                      { term: "Pool Pump", def: "The mechanical heart of the pool's circulation system. Creates suction that draws water from the pool through the skimmer and main drain, pushes it through the filter, and returns it to the pool through the return jets. Pump failure is the most common and consequential pool equipment failure." },
                      { term: "Filter System", def: "The component responsible for removing suspended particles from the water. The three types are sand filters (most common and lowest maintenance), cartridge filters (high flow, easy to clean), and diatomaceous earth (DE) filters (finest filtration, most thorough)." },
                      { term: "Backwashing", def: "The process of reversing water flow through a sand or DE filter to flush captured debris out through the waste line. Should be performed when filter pressure rises 8 to 10 psi above normal operating pressure." },
                      { term: "Algae Bloom", def: "A rapid proliferation of algae in pool water caused by inadequate sanitizer levels, poor circulation, or warm temperatures. Algae blooms can turn pool water green, yellow, or black depending on the species and require shock treatment and algaecide to resolve." },
                      { term: "Shocking", def: "The process of adding a high dose of chlorine (or non-chlorine shock) to break down combined chlorine (chloramines), kill algae, and restore water clarity. Should be performed at dusk or night to maximize effectiveness, as sunlight rapidly degrades chlorine." },
                      { term: "Chloramines (Combined Chlorine)", def: "Chemical compounds formed when chlorine reacts with nitrogen-containing compounds (sweat, urine, body oils) from swimmers. Responsible for the strong 'chlorine smell' often associated with poorly maintained pools and cause eye and skin irritation. Eliminated by shocking." },
                      { term: "Total Dissolved Solids (TDS)", def: "The cumulative amount of all substances dissolved in pool water. As TDS rises above 1,500 to 2,000 ppm, water becomes increasingly resistant to chemical adjustment and cloudier in appearance. Remediated by partially draining and refilling the pool." },
                      { term: "Salt Chlorine Generator (SCG)", def: "A device that converts dissolved salt in pool water into chlorine through electrolysis. The cell must be inspected and cleaned regularly to remove calcium scale buildup that reduces efficiency." },
                      { term: "Parts Per Million (ppm)", def: "The unit of measurement used for pool chemical concentrations. Most chemical targets are expressed in ppm. For reference, 1 ppm equals 1 milligram per liter of water." },
                    ].map(({ term, def }) => (
                      <TableRow key={term}>
                        <TableCell className="font-semibold text-foreground align-top">{term}</TableCell>
                        <TableCell className="text-sm">{def}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-roles",
        label: "Roles in a Pool Cleaning Business",
        icon: Users,
        sections: [
          {
            title: "Team Roles & Responsibilities",
            content: (
              <div className="text-muted-foreground">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-52">Role</TableHead>
                      <TableHead className="font-bold">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { role: "Pool Service Technician", resp: "The primary field professional who performs all weekly service visits. Handles all physical cleaning tasks, water testing, chemical addition, and routine equipment inspection. They are the face of the company to residential customers and must combine technical knowledge with excellent interpersonal skills." },
                      { role: "Pool Maintenance Specialist", resp: "A more experienced technician who handles complex service situations, algae treatments, equipment troubleshooting, seasonal openings and closings, and customer consultations. Specialists may also mentor junior technicians and handle the most valuable commercial accounts." },
                      { role: "Customer Service Representative (CSR)", resp: "Manages all incoming customer inquiries, provides pricing information, schedules new and existing accounts, handles service change requests, addresses customer concerns, and processes payments. CSRs are the primary contact for customers between service visits." },
                      { role: "Dispatcher / Scheduler", resp: "Manages the daily and weekly technician schedules, organizing routes for maximum efficiency. Assigns new accounts to the appropriate route, handles last-minute schedule changes, monitors technician progress throughout the day, and communicates urgent issues between the field and the office." },
                      { role: "Sales Representative", resp: "Focuses on acquiring new residential and commercial accounts, conducting on-site assessments and demonstrations, preparing service proposals, and closing service agreements. Particularly important for growing the commercial account base." },
                      { role: "Operations Manager", resp: "Oversees all field and office operations including route efficiency, service quality, technician training and performance, chemical inventory, vehicle maintenance, and customer satisfaction. Responsible for ensuring that service standards are consistently met across all accounts." },
                      { role: "Business Owner", resp: "Sets the strategic direction of the company, manages finances, drives business growth, oversees hiring and company culture, and makes key decisions about pricing, services, and expansion. In smaller operations, the owner typically also performs service technician work." },
                      { role: "Virtual Assistant (VA)", resp: "Provides remote administrative and customer service support including managing online booking requests, sending service confirmations and reminders, following up after service visits, managing online reviews, data entry, and customer communication. Must be familiar with pool service terminology, service types, and pricing." },
                    ].map(({ role, resp }) => (
                      <TableRow key={role}>
                        <TableCell className="font-semibold text-foreground align-top">{role}</TableCell>
                        <TableCell className="text-sm">{resp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-tools",
        label: "Tools & Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Common Pool Cleaning Equipment",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Pool Skimmers and Leaf Nets", desc: "A flat or deep-bag net mounted on a telescopic pole. Flat skimmer nets for light surface debris; deep-bag leaf rakes for heavy leaves. The first tool used at every service visit — essential for removing organic material from the surface before it sinks and consumes sanitizer." },
                    { name: "Pool Vacuum Systems", desc: "Manual vacuums consist of a vacuum head, a vacuum hose, and a telescopic pole. Automatic pool cleaners include suction-side cleaners, pressure-side cleaners, and robotic cleaners (self-powered, independent units). Robotic cleaners are the most effective automatic option and increasingly common on premium residential accounts." },
                    { name: "Pool Brushes", desc: "Nylon bristle brushes for fiberglass and vinyl liner pools (prevent surface damage); stainless steel or combination brushes for plaster and concrete pools. A curved brush designed to fit pool walls and corners provides more efficient coverage." },
                    { name: "Water Testing Kits", desc: "Options include test strips (fast but less accurate), DPD drop test kits (highly accurate colorimetric tests for chlorine and pH), and electronic/digital photometric testers (the most accurate and consistent, recommended for professional use). Professional technicians record all test results for documentation." },
                    { name: "Chemical Feeders and Dispensers", desc: "Chlorine tablet feeders (inline or offline devices that slowly dissolve trichlor tablets), salt chlorine generators (electrolytic chlorine production), and liquid chemical dosing pumps (for commercial pools that precisely dispense liquid chlorine and acid in response to automated water chemistry monitoring)." },
                    { name: "Pool Pumps and Filters", desc: "Variable-speed pumps must be programmed for correct run times and speeds. Filter pressure gauges are checked at every visit to determine if backwashing or cleaning is needed. Technicians carry replacement O-rings, gaskets, and pump baskets on their service vehicles to address minor equipment issues on the spot." },
                    { name: "Telescopic Poles", desc: "The universal handle for all pool cleaning tools — attaches to skimmer nets, brushes, vacuum heads, and algae brushes. Quality poles are made from fiberglass or aluminum, extend to lengths of 8 to 16 feet, and have secure cam-lock or flip-lock systems that prevent the pole from collapsing during use." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{name}</p>
                      <p className="text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Equipment Maintenance Note</p>
                  <p>Technicians should rinse all pool tools with fresh water after each use to prevent chemical deposits from degrading nets, brushes, and hoses. Vacuum hoses and brushes should be inspected regularly for cracks and wear. Well-maintained equipment performs better and lasts significantly longer.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-safety",
        label: "Safety & Best Practices",
        icon: ShieldCheck,
        sections: [
          {
            title: "Proper Handling of Pool Chemicals",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Always read the product label and Safety Data Sheet (SDS) before using any pool chemical.</li>
                  <li>Never mix pool chemicals together, either in their containers or when adding to the pool. Adding chlorine and acid together produces toxic chlorine gas. Always add one chemical at a time and wait between additions.</li>
                  <li><strong className="text-foreground">Always add chemicals to water</strong> — never add water to chemicals. Adding water to concentrated pool chemicals can cause violent splashing or spattering reactions.</li>
                  <li>Use dedicated measuring tools for each chemical to prevent cross-contamination.</li>
                  <li>Wear nitrile or chemical-resistant gloves and safety glasses when handling concentrated pool chemicals, particularly acids (pH decreaser) and liquid chlorine.</li>
                  <li>When adding chemicals to the pool, stand upwind to avoid inhaling fumes or vapors.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Preventing Chemical Imbalances",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Never over-dose chemicals. More is not better in pool chemistry — adding excess chemicals causes the opposite imbalance and wastes money.</li>
                  <li>Add chemicals to the pool with the circulation system running to ensure rapid dispersion throughout the water.</li>
                  <li>Shock treatments (high-dose chlorine) should be added at dusk or at night to prevent rapid degradation by UV sunlight.</li>
                  <li>Advise customers not to swim for a minimum of 4 hours after shock treatment, or until free chlorine levels return to the safe swimming range of 1 to 4 ppm.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Protecting Pool Equipment",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Never allow pool chemicals to contact equipment directly — always pre-dissolve granular chemicals in a bucket of pool water before adding near equipment intakes.</li>
                  <li>Do not run the pool pump dry (without water flowing). A pump run dry will overheat and fail within minutes.</li>
                  <li>Monitor filter pressure regularly. A filter that is significantly over-pressure can rupture the filter tank or damage the pump.</li>
                  <li>Inspect pump motor capacitors and seals regularly — catching a failing capacitor or worn seal early prevents a complete motor failure.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Ensuring Safe Swimming Conditions",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Confirm that chlorine levels are within the safe swimming range (1 to 4 ppm free chlorine) and pH is between 7.2 and 7.8 before leaving a service visit.</li>
                  <li>Advise customers of any elevated chemical levels that require a delay before swimming and document this recommendation in the service report.</li>
                  <li>Report any damaged or malfunctioning pool safety equipment — including drain covers, diving boards, handrails, and lighting — to the customer immediately. Faulty drain covers are a drowning risk.</li>
                  <li>Pool fencing, gate latches, and alarms should be in good working order. While not within the technician's scope to repair, they should be flagged to the customer if deficiencies are observed.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Proper Storage of Chemicals",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Pool chemicals must be stored in their original, labeled containers in a cool, dry, ventilated area away from direct sunlight, heat sources, and moisture.</li>
                  <li><strong className="text-foreground">Oxidizers (chlorine) and acids (pH decreasers) must always be stored separately</strong> — they react violently if combined and can cause a fire or release toxic gases.</li>
                  <li>Service vehicle chemical storage must comply with DOT regulations for transporting hazardous materials. Chemicals should be secured in properly ventilated, spill-containment bins.</li>
                  <li>Maintain an up-to-date chemical inventory and SDS file for all products carried in service vehicles, accessible in case of emergency.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-issues",
        label: "Common Customer Issues",
        icon: AlertCircle,
        sections: [
          {
            title: "Cloudy or Hazy Pool Water",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>The most common pool complaint. Most frequent causes include: low free chlorine, high pH, high calcium hardness, a dirty or undersized filter, or elevated total dissolved solids.</p>
                <p className="text-sm italic">CSRs should ask: How long has the water been cloudy? Is the filter running? When were chemicals last added? Never downplay cloudy water — it reduces visibility in the pool and is a safety concern.</p>
              </div>
            )
          },
          {
            title: "Algae Growth",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Green algae turns the entire pool a shade of green (most common and easiest to treat). Yellow (mustard) algae appears as brushable patches on shaded wall areas and is more resistant. Black algae appears as dark spots on plaster surfaces and is the most difficult to eliminate.</p>
                <p className="text-sm italic">CSRs should schedule algae treatment visits as priority calls and advise customers to keep the circulation system running continuously until the technician arrives.</p>
              </div>
            )
          },
          {
            title: "Strong Chlorine Smell",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Contrary to popular belief, a strong chlorine odor does not mean there is too much chlorine — it typically means there is not enough. The smell is caused by <strong className="text-foreground">chloramines (combined chlorine)</strong>, which form when chlorine reacts with organic matter introduced by swimmers.</p>
                <div className="p-3 bg-primary/5 border rounded-lg text-sm">This is an excellent opportunity to educate customers on proper pool chemistry. The solution is a shock treatment to break down chloramines and restore the free chlorine reserve.</div>
              </div>
            )
          },
          {
            title: "Clogged or Dirty Filters",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Clogged filters restrict water flow, reduce filtration effectiveness, and put extra strain on the pump motor. Customers may notice this as reduced return jet flow, cloudy water despite adequate chemical levels, or a tripped pump circuit breaker.</p>
                <p className="text-sm italic">CSRs should ask when the filter was last cleaned and what type of filter the customer has. Sand filters need backwashing; cartridge filters need to be removed and cleaned; DE filters need backwashing and recharging. Severely fouled cartridges may need replacement.</p>
              </div>
            )
          },
          {
            title: "Debris Accumulation",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Excessive leaves, twigs, pollen, and organic matter in the pool between service visits is a common complaint, especially in the fall or in yards with large trees. This rapidly depletes sanitizer, can clog the pump basket and skimmer, and leads to water chemistry problems. Customers can be advised to run their automatic pool cleaner more frequently and to skim the pool manually between visits. In extreme cases, more frequent service visits may be recommended.</p>
              </div>
            )
          },
          {
            title: "Poor Water Circulation",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Poor circulation manifests as dead spots where algae grows, uneven chemical distribution, and reduced filtration. Causes include: a partially blocked skimmer or pump basket, incorrect pump run time, a failing pump motor, or improper return jet positioning.</p>
                <p className="text-sm italic">CSRs should ask whether the pump appears to be running normally and whether the return jets are producing strong flow. Weak or absent flow from return jets indicates a pump, filter, or plumbing issue requiring a technician visit for diagnosis.</p>
              </div>
            )
          },
          {
            title: "Equipment Malfunction",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Common malfunction reports include: the pump not turning on or making unusual noise, the heater failing to heat, pool lights not functioning, and the automatic cleaner not operating. Equipment repair is a separate service from routine maintenance and is typically quoted separately.</p>
                <p className="text-sm italic">CSRs should collect as much information as possible about the symptom and age of the equipment before scheduling a repair visit, as some issues can be diagnosed and resolved on the initial visit while others require follow-up parts ordering.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "pool-importance",
        label: "Why Pool Maintenance Matters",
        icon: Heart,
        sections: [
          {
            title: "The Importance of Professional Pool Maintenance",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Professional pool maintenance delivers value that extends far beyond a clean-looking pool.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Water Safety and Sanitation", body: "Pool water is a shared environment that can harbor dangerous pathogens including Pseudomonas aeruginosa (hot tub rash), Cryptosporidium, Giardia, E. coli, and numerous viruses. These organisms thrive in water with inadequate sanitizer levels, poor pH balance, or insufficient circulation. The CDC tracks Recreational Water Illness (RWI) outbreaks directly linked to poorly maintained pools. For commercial pools where dozens or hundreds of people may swim daily, professional oversight is a legal and regulatory requirement." },
                    { title: "Extending Equipment Lifespan", body: "Pool equipment — pumps, motors, heaters, filters, and automated systems — represents a significant capital investment, often totaling tens of thousands of dollars. Corrosive water etches and pits metal pump components, destroys heater heat exchangers, and corrodes electrical connections. Scaling water deposits calcium throughout the filtration and heating system. A professional service technician who maintains tight chemical balance extends equipment life by years — easily saving a pool owner multiple times the annual cost of service in avoided equipment replacements and repairs." },
                    { title: "Preventing Costly Repairs", body: "Pool pump replacements typically cost $400 to $1,200 or more. Pool resurfacing runs $5,000 to $15,000 or more. Salt cell replacement costs $600 to $1,000. Heater replacement caused by improperly balanced water costs $1,500 to $3,000 or more. All of these failures are preventable with consistent, professional maintenance. The annual cost of a weekly pool service program is typically a fraction of any one of these repair scenarios." },
                    { title: "Ensuring a Safe and Enjoyable Environment", body: "Beyond chemistry and equipment, professional pool service delivers the peace of mind that comes from knowing that the pool is always ready to swim in — safe, clean, and inviting. For families with children, this means a reliably safe play environment. For commercial clients, it means consistently passing health inspections, protecting guests, and maintaining the premium experience their brand promises. A well-maintained pool enhances the quality of outdoor living and supports property values." },
                  ].map(({ title, body }) => (
                    <div key={title} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{title}</p>
                      <p className="text-sm">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Final Note for New Team Members</p>
                  <p>Pool service is a technical profession that combines chemistry, mechanical knowledge, customer service, and physical work — all performed outdoors, on a regular schedule, with high standards of quality and reliability. Whether you are answering customer calls, scheduling routes, or servicing pools in the field, you are part of a team that helps people enjoy one of the most valued features of their home. Welcome to the team!</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const electricalServicesSections: DocGroup[] = [
  {
    title: "ELECTRICAL SERVICES BASICS",
    items: [
      {
        id: "electrical-introduction",
        label: "Introduction to Electrical Services",
        icon: Plug,
        sections: [
          {
            title: "What Is an Electrical Services Business?",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>An electrical services business is a licensed, professional contracting company that installs, repairs, maintains, upgrades, and inspects electrical systems in residential homes, commercial buildings, and industrial facilities. Electricians are among the most highly regulated trades professionals, requiring years of apprenticeship, rigorous examinations, and ongoing licensure to legally perform electrical work.</p>
                <p>Electrical service companies range from solo master electricians operating independently to large electrical contracting firms employing dozens of licensed journeymen, project managers, and support staff. All share the fundamental mission of ensuring that their clients' electrical systems are <strong className="text-foreground">safe, functional, code-compliant, and reliably powered</strong> for years to come.</p>
                <div className="p-4 bg-muted/50 border rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Industry Fact</p>
                  <p className="text-sm">The electrical contracting industry employs over 700,000 electricians and related workers in the United States. The Bureau of Labor Statistics projects continued strong demand for licensed electricians due to construction growth, infrastructure upgrades, and the rapid expansion of renewable energy systems.</p>
                </div>
              </div>
            )
          },
          {
            title: "The Importance of Electrical Systems",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Electricity is the single most essential utility in modern buildings — powering lighting, heating and cooling, communication infrastructure, appliances, medical equipment, and virtually every other system that makes a building functional. The consequences of electrical system failures range from inconvenience to catastrophe:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: "Residential", desc: "A failed electrical panel can leave a family without heat, lighting, or refrigeration. Faulty wiring is one of the leading causes of residential house fires in the United States." },
                    { label: "Commercial", desc: "Electrical failures in retail, hospitality, or office environments result in direct revenue loss, safety hazards for customers and employees, and potential regulatory consequences." },
                    { label: "Industrial", desc: "In manufacturing, processing, and data center environments, electrical failures can halt production, cause significant financial losses, and create serious safety hazards through arc flash, electrocution, or fire." },
                    { label: "Safety", desc: "The NFPA reports that electrical failures and malfunctions are a leading cause of home fires. Proper installation and maintenance of electrical systems is a primary fire prevention measure." },
                  ].map(({ label, desc }) => (
                    <div key={label} className="p-3 border rounded-lg bg-primary/5 text-sm">
                      <p className="font-semibold text-foreground mb-1">{label}</p>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          },
          {
            title: "Overview of the Electrical Services Industry",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>The electrical services industry is one of the largest segments of the construction and building services market, and one of the most essential skilled trades.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Electricians are among the most in-demand skilled tradespeople in the country, driven by construction activity, aging infrastructure replacement, EV charging installation, solar energy adoption, and smart home technology.</li>
                  <li>The industry is heavily regulated. All electrical work above a minimal threshold must be performed by licensed electricians and must comply with the National Electrical Code (NEC), local amendments, and building permit requirements.</li>
                  <li>Electrical contractors serve three primary markets: <strong className="text-foreground">residential</strong> (homes and apartments), <strong className="text-foreground">commercial</strong> (offices, retail, and institutions), and <strong className="text-foreground">industrial</strong> (factories, utilities, and data centers).</li>
                  <li>Emergency electrical service is a significant and high-value segment, as electrical failures can pose immediate safety risks that cannot wait for standard scheduling.</li>
                  <li>Emerging opportunities in EV charging infrastructure, solar photovoltaic installations, battery storage systems, and smart home automation are creating strong growth in residential electrical services.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "electrical-service-types",
        label: "Types of Electrical Services",
        icon: List,
        sections: [
          {
            title: "Residential Electrical Services",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Covers all electrical work performed in private homes, apartments, condominiums, and townhomes — from routine repairs (replacing a faulty outlet) to major projects (complete home rewiring, panel upgrades, or EV charger installation). Requires understanding of the NEC and local residential codes, strong customer communication skills, and the ability to work cleanly inside occupied living spaces. Electricians working in residential settings interact directly with homeowners and must project professionalism and trustworthiness at every visit.</p>
              </div>
            )
          },
          {
            title: "Commercial Electrical Services",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Performed in business environments including retail stores, office buildings, restaurants, medical clinics, schools, and places of worship. Commercial electrical systems are significantly more complex than residential — they operate at higher voltages, serve more diverse loads, and must meet stricter code requirements. Commercial projects often involve coordination with other trades, building owners, general contractors, and local inspectors. Lighting design, three-phase power, emergency and exit lighting systems, and fire alarm integration are common commercial service areas.</p>
              </div>
            )
          },
          {
            title: "Industrial Electrical Services",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Performed in manufacturing plants, warehouses, food processing facilities, data centers, utilities, and other industrial environments. Involves high-voltage systems, complex motor control systems, programmable logic controllers (PLCs), power distribution equipment, and specialized safety systems. Industrial electricians typically hold additional certifications in arc flash safety, high-voltage work, and industrial controls. This sector requires significant specialized expertise and carries the highest technical complexity of any electrical market.</p>
              </div>
            )
          },
          {
            title: "Emergency Electrical Services",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Available 24/7 to address electrical problems that pose an immediate safety risk or cause a significant disruption. Common emergency calls include complete loss of power, burning smells from electrical panels or outlets, sparking wiring, flooding that has compromised electrical systems, and tripped breakers that cannot be reset. Emergency calls command a premium service rate.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  CSRs and dispatchers must be trained to recognize true electrical emergencies and respond with urgency, advising customers on immediate safety steps (such as turning off the main breaker) while an electrician is dispatched.
                </div>
              </div>
            )
          },
          {
            title: "Electrical Inspections",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Comprehensive assessment of an existing electrical system to evaluate its condition, safety, and code compliance. Commonly requested during real estate transactions, after purchasing an older home, following a flood or fire, for insurance purposes, or as part of a planned renovation. A licensed electrician examines the electrical panel, wiring, outlets, switches, grounding, and visible wiring methods and produces a written report documenting findings and recommendations.</p>
              </div>
            )
          },
          {
            title: "Electrical Upgrades and Rewiring",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Improvements to bring an aging or inadequate electrical system up to modern standards. Panel upgrades (replacing an outdated panel with a higher-capacity modern panel) are among the most common upgrade projects. Full or partial rewiring is performed when original wiring has degraded or uses outdated materials (such as aluminum wiring or knob-and-tube wiring). Smart home system integration, EV charger installation, solar system integration, and whole-home surge protection are growing categories of residential electrical upgrades.</p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "SERVICES & OPERATIONS",
    items: [
      {
        id: "electrical-core-services",
        label: "Core Services",
        icon: CheckCircle,
        sections: [
          {
            title: "Electrical Installations",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>All new electrical work — installing wiring, panels, outlets, switches, lighting, and equipment in new construction or in existing buildings where new circuits or systems are being added. Installations must comply with the NEC and local code requirements, be performed under the appropriate permits, and be inspected by the local authority having jurisdiction (AHJ). Installation work is typically the highest-revenue category for electrical contractors.</p>
              </div>
            )
          },
          {
            title: "Electrical Repairs",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Addresses malfunctions, failures, and damage in existing electrical systems. Common repair calls include diagnosing and fixing non-working outlets or switches, repairing damaged wiring, replacing failed circuit breakers, troubleshooting intermittent power problems, and repairing damage caused by pests, water intrusion, or physical damage. Diagnostic accuracy is critical — the ability to quickly and correctly identify the root cause of an electrical problem is one of the most valuable skills an electrician possesses.</p>
              </div>
            )
          },
          {
            title: "Lighting Installation",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>One of the most requested electrical services in both residential and commercial settings. Services include installing recessed (can) lighting, pendant lights, chandeliers, under-cabinet lighting, outdoor security lighting, motion-sensor lighting, LED retrofit systems, commercial lighting fixtures, and emergency/exit lighting. Proper lighting installation requires knowledge of wiring methods, box ratings, dimmer compatibility, and in commercial settings, lighting control systems and energy code compliance.</p>
              </div>
            )
          },
          {
            title: "Circuit Breaker Repair and Replacement",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Circuit breakers can wear out, fail to trip when they should, or trip too easily. Replacing a failed or nuisance-tripping breaker is a common service call. Electricians also install <strong className="text-foreground">AFCI (Arc Fault Circuit Interrupter)</strong> and <strong className="text-foreground">GFCI (Ground Fault Circuit Interrupter)</strong> breakers required by modern code in specific locations including bedrooms, kitchens, and bathrooms, which provide enhanced protection against electrical fires and electrocution.</p>
              </div>
            )
          },
          {
            title: "Panel Upgrades",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>Performed when the existing panel is undersized for current electrical demand, is an outdated or recalled panel brand (such as Federal Pacific or Zinsco), has insufficient circuits for planned renovations, or lacks modern safety features. A panel upgrade typically increases the service from 100 amps to 200 amps (or higher for large homes and commercial properties) and involves coordination with the utility company for a service disconnect.</p>
                <p className="text-sm italic">Panel upgrades are high-revenue, technically demanding projects that require a licensed master electrician and a permit.</p>
              </div>
            )
          },
          {
            title: "Wiring and Rewiring",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Wiring services include running new circuits for appliances, adding outlets to existing rooms, wiring detached garages or outbuildings, and complete home rewiring where all original wiring is replaced with modern copper wiring in code-compliant conduit or cable methods. Partial rewiring may be recommended when specific circuits have degraded or when a home renovation exposes old wiring that does not meet current standards. Rewiring is invasive work that may require opening walls and ceilings.</p>
              </div>
            )
          },
          {
            title: "Outlet and Switch Installation",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>One of the most common residential electrical requests. Services include adding standard outlets, installing GFCI outlets in required locations (kitchens, bathrooms, outdoors, garages), adding USB charging outlets, installing smart switches and dimmers, and replacing outdated two-prong ungrounded outlets with modern three-prong grounded outlets.</p>
              </div>
            )
          },
          {
            title: "Generator Installation",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A growing service category driven by increasingly frequent power outages caused by extreme weather events. Generator installation involves installing the generator unit, connecting it to the home's or building's electrical system via a <strong className="text-foreground">transfer switch</strong> (which prevents dangerous back-feed to the utility grid), and running the necessary fuel supply connections. Standby generators require automatic transfer switches that sense utility power loss and start the generator automatically.</p>
              </div>
            )
          },
          {
            title: "Electrical Safety Inspections",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Performed to evaluate an existing electrical system's safety and compliance. Particularly valuable for homes more than 25 years old, recently purchased properties, properties that have experienced fire or flood damage, and commercial properties undergoing ownership changes. The inspection covers the panel, all visible wiring, outlets, switches, grounding, bonding, GFCI and AFCI protection, and any visible code violations. A comprehensive written report is provided with prioritized recommendations.</p>
              </div>
            )
          }
        ]
      },
      {
        id: "electrical-operations",
        label: "How the Business Operates",
        icon: Info,
        sections: [
          {
            title: "The Typical Service Workflow",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <ol className="space-y-4">
                  {[
                    { step: "1. Customer Inquiry or Service Request", desc: "A customer contacts the company by phone, email, website form, or online booking. CSRs should gather: the customer's name, address, and best contact number; a description of the issue or project; whether it is an emergency or routine service; and whether the customer is a homeowner, tenant, or property manager. For emergency situations, the CSR should quickly assess the severity and dispatch accordingly, providing basic safety instructions while an electrician is en route." },
                    { step: "2. Job Assessment or Consultation", desc: "For projects beyond simple repairs, a job assessment may be scheduled before the service appointment. This allows the electrician to evaluate the scope of work, identify any materials or special equipment needed, assess code requirements and permit needs, and provide an accurate written estimate. For straightforward repairs (outlet replacement, breaker swap), a same-day service call with an on-site quote at the time of service is more appropriate." },
                    { step: "3. Scheduling the Service Appointment", desc: "Once the customer agrees to proceed, a service appointment is scheduled. The scheduler assigns the appointment to the appropriate electrician based on the type of work, the electrician's license level (apprentice, journeyman, or master), their current workload, and their geographic proximity to the job site. A confirmation is sent to the customer with the appointment window and technician information." },
                    { step: "4. Dispatching an Electrician", desc: "The dispatcher assigns the job and communicates all relevant job details: customer name and address, description of the issue, any prior customer notes, permit status if applicable, and materials to bring. For emergency calls, dispatch is immediate. For scheduled calls, the dispatcher manages the electrician's daily route for maximum efficiency." },
                    { step: "5. On-Site Inspection and Diagnosis", desc: "Upon arrival, the electrician performs a thorough on-site inspection and diagnosis: listening to the customer's description, visually inspecting the affected areas, testing outlets and circuits with meters, examining the electrical panel, and identifying the root cause. A thorough diagnosis is the most important step — the best repair is worthless if the underlying cause has not been correctly identified." },
                    { step: "6. Providing a Quote", desc: "After completing the diagnosis, the electrician presents the customer with a written or verbal quote clearly explaining what was found, what work is recommended (with priority levels for safety-critical items), the materials required, the estimated time to complete, the total cost, and any permits that will be required. The customer must authorize the work in writing before the electrician proceeds." },
                    { step: "7. Performing the Electrical Work", desc: "With the customer's signed authorization, the electrician performs the work following all applicable NEC code requirements, local code amendments, and company quality standards. All work is performed with the circuit de-energized and locked out/tagged out where required. The work area is kept clean and protected to avoid damage to the customer's property." },
                    { step: "8. Testing and Safety Verification", desc: "After completing the work, the electrician tests all affected circuits and devices, restores power, and verifies that the repair or installation is functioning correctly and safely. Where permits were obtained, the work must be inspected by the local building department before walls are closed or the installation is considered complete." },
                    { step: "9. Payment and Job Documentation", desc: "Payment is collected at job completion or invoiced depending on account type. A detailed invoice documenting all work performed, materials used, permit numbers, and warranty information is provided to the customer. All job records are entered into the company's service management system. For permitted projects, a copy of the inspection approval is provided to the customer." },
                  ].map(({ step, desc }) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-semibold text-foreground min-w-fit">{step}:</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ol>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">CSR & VA Key Questions</p>
                  <p>When taking an electrical service inquiry, always capture: (1) Is this an emergency or a safety concern? (2) What specifically is the problem — lights, outlets, panel, etc.? (3) Residential or commercial property? (4) Home or building age (helps anticipate wiring type)? (5) Has there been any recent work on the electrical system? This information ensures the right electrician is dispatched with the right equipment and expectations.</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    title: "REFERENCE & COMPLIANCE",
    items: [
      {
        id: "electrical-problems",
        label: "Common Electrical Problems",
        icon: AlertCircle,
        sections: [
          {
            title: "Power Outages",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>A complete loss of power to all or part of a home or building. Before dispatching an electrician, CSRs should guide the customer through basic checks: Has the utility company confirmed a neighborhood outage? Has the main breaker tripped? Are specific circuits affected or is the entire property dark?</p>
                <p className="text-sm italic">Partial power loss often indicates a tripped main breaker, a failed utility service connection, or a blown service fuse. Complete power loss with no utility outage requires immediate electrician dispatch.</p>
              </div>
            )
          },
          {
            title: "Flickering Lights",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Isolated flickering in a single fixture usually indicates a loose bulb or failing fixture. Flickering throughout an entire circuit or the whole house can indicate loose connections at the panel, failing wire splices inside walls, or corroded service connections. Whole-house flickering synchronized with large appliance activation may indicate a voltage problem that requires utility investigation.</p>
                <p className="text-sm italic">Persistent flickering should always be evaluated by a licensed electrician.</p>
              </div>
            )
          },
          {
            title: "Tripping Circuit Breakers",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>A circuit breaker that trips repeatedly is communicating that something is wrong — either the circuit is genuinely overloaded, a specific appliance is drawing excessive current, there is a short circuit or ground fault, or the breaker itself has worn out.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  <strong>Warning:</strong> Customers should be advised never to bypass a tripping breaker or replace it with a higher-amperage breaker without professional evaluation — these are dangerous workarounds that eliminate the circuit's protection.
                </div>
              </div>
            )
          },
          {
            title: "Faulty Wiring",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Encompasses a broad range of wiring defects including loose connections at outlets and switches, deteriorated insulation on older wiring (aluminum wiring from the 1960s–70s is particularly problematic at connection points), improperly spliced wiring inside walls, and code-violating wiring methods. Faulty wiring is a leading cause of electrical fires.</p>
                <p className="text-sm italic">Signs include outlets or switches that feel warm to the touch, discolored outlet covers, burning smells, and lights that dim when appliances are turned on.</p>
              </div>
            )
          },
          {
            title: "Overloaded Circuits",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Occurs when the connected electrical loads draw more current than the circuit wiring and breaker are designed to handle. This causes the breaker to trip and, if the overload persists or the protection is inadequate, can cause wiring to overheat and potentially ignite surrounding combustible materials. Particularly common in older homes where the electrical system was designed for the appliance demands of decades past. The solution is adding additional circuits or upgrading the panel, not simply replacing a tripped breaker with a higher-rated one.</p>
              </div>
            )
          },
          {
            title: "Burning Smells from Outlets or Panels",
            content: (
              <div className="space-y-3 text-muted-foreground">
                <p>A burning smell from an electrical outlet, switch, or panel is a serious warning sign — it can indicate arcing, overheating wiring insulation, or an active electrical fire beginning inside a wall or the panel.</p>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  <strong>Emergency Protocol:</strong> Customers reporting a burning electrical smell should avoid using the affected outlet or circuit. If the smell is coming from the main panel, turn off the main breaker if it is safe to do so and vacate the building. An electrician should be dispatched immediately. Do not advise customers to investigate the source themselves.
                </div>
              </div>
            )
          },
          {
            title: "Non-Working Outlets or Switches",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <p>Dead outlets and non-functioning switches are among the most common residential service calls. Common causes include a tripped GFCI outlet on the same circuit, a tripped circuit breaker, a loose wire at the outlet or switch, a failed outlet or switch device, or an open neutral or ground connection.</p>
                <div className="p-3 bg-primary/5 border rounded-lg text-sm">
                  <strong className="text-foreground">CSR Tip:</strong> Walk customers through the GFCI reset check before scheduling a service call — pressing the reset button on a GFCI outlet in the kitchen, bathroom, or garage often restores power to outlets that appear unrelated. This resolves the majority of these cases without a technician visit.
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "electrical-terminology",
        label: "Electrical Terminology",
        icon: BookOpen,
        sections: [
          {
            title: "Common Electrical Terms Glossary",
            content: (
              <div className="text-muted-foreground">
                <p className="mb-4 text-sm">Familiarity with these terms enables confident communication with customers, electricians, and colleagues.</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-44">Term</TableHead>
                      <TableHead className="font-bold">Definition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { term: "Voltage (V)", def: "The electrical pressure that drives current through a circuit. Residential circuits in the United States operate at 120V (standard outlets) or 240V (large appliances like dryers and ranges). Voltage is analogous to water pressure in a pipe." },
                      { term: "Current (Amps / A)", def: "The flow rate of electrical charge through a conductor. The amperage rating of a circuit determines how much electrical load it can safely carry. Exceeding the rated amperage causes the breaker to trip." },
                      { term: "Wattage (W)", def: "A measure of electrical power — the rate at which electrical energy is consumed. Calculated as Voltage x Amperage (W = V x A). A 100-watt light bulb on a 120V circuit draws approximately 0.83 amps." },
                      { term: "Circuit Breaker", def: "A resettable protective device in the electrical panel that automatically interrupts current flow when a circuit is overloaded or short-circuited. Circuit breakers are rated in amperes (typically 15A or 20A for residential branch circuits)." },
                      { term: "Electrical Panel", def: "The main distribution board (also called the breaker box or load center) that receives power from the utility company and distributes it through individual circuit breakers to all circuits throughout the building." },
                      { term: "Grounding", def: "A safety system that provides a low-resistance path for fault current to return to the electrical panel and trip the breaker in the event of a wiring fault. Protects people from electrical shock by ensuring that metal enclosures are maintained at earth potential." },
                      { term: "Load", def: "The total electrical demand placed on a circuit or electrical system by all connected devices and appliances. Proper load calculations are required when sizing circuits, panels, and service entrances." },
                      { term: "Short Circuit", def: "A fault condition in which current bypasses its intended path and flows through a much lower-resistance path, resulting in a large, potentially dangerous surge of current. Causes circuit breakers to trip immediately and can cause arcing, fire, and equipment damage." },
                      { term: "Ground Fault", def: "An unintended path for electrical current to flow to ground, often through a person. Ground faults are the leading cause of electrocution. GFCI devices detect ground faults and interrupt power within milliseconds to prevent electrocution." },
                      { term: "Arc Fault", def: "An unintended electrical discharge between conductors, often caused by damaged or deteriorated wiring insulation. Arc faults produce intense heat and are a leading cause of electrical fires. AFCI breakers detect arc fault signatures and interrupt the circuit to prevent fires." },
                      { term: "GFCI", def: "Ground Fault Circuit Interrupter. A safety device that monitors the current balance between the hot and neutral conductors and trips within 4 to 6 milliseconds when a ground fault is detected. Required by code in kitchens, bathrooms, garages, outdoors, and near water sources." },
                      { term: "AFCI", def: "Arc Fault Circuit Interrupter. A circuit breaker that detects the electrical signature of arcing faults and interrupts the circuit to prevent electrical fires. Required by the NEC in bedroom circuits and increasingly in all living areas of new construction." },
                      { term: "National Electrical Code (NEC)", def: "The NFPA 70 standard — the foundational document for electrical safety in the United States. Updated every three years and adopted by most states and municipalities as the minimum standard for electrical installations." },
                      { term: "Service Entrance", def: "The point where the utility company's service conductors connect to the customer's wiring and enter the building to supply the main electrical panel. Includes the service conductors, service entrance equipment, meter, and main panel." },
                      { term: "Conduit", def: "A protective raceway — typically metal (EMT, rigid) or plastic (PVC) tubing — through which electrical wiring is routed. Conduit provides physical protection for wiring, makes wiring replaceable without opening walls, and is required in many commercial and industrial applications." },
                    ].map(({ term, def }) => (
                      <TableRow key={term}>
                        <TableCell className="font-semibold text-foreground align-top">{term}</TableCell>
                        <TableCell className="text-sm">{def}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "electrical-roles",
        label: "Roles in an Electrical Business",
        icon: Users,
        sections: [
          {
            title: "Team Roles & Responsibilities",
            content: (
              <div className="text-muted-foreground">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold w-52">Role</TableHead>
                      <TableHead className="font-bold">Responsibilities</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { role: "Master Electrician", resp: "The highest level of electrical license. Master electricians have passed rigorous examinations demonstrating comprehensive knowledge of the NEC, electrical theory, and business practices. They are legally authorized to pull electrical permits, supervise all electrical work, and sign off on completed installations. Many states require a master electrician to be the responsible party for an electrical contracting business." },
                      { role: "Journeyman Electrician", resp: "A licensed electrician who has completed an apprenticeship program and passed a journeyman examination. Journeymen can perform all electrical work independently but must work under the supervision of a master electrician for permit-required work in many jurisdictions. Journeymen are the core field workforce of most electrical contractors." },
                      { role: "Apprentice Electrician", resp: "A trainee electrician enrolled in a formal apprenticeship program (typically 4 to 5 years) that combines on-the-job training with classroom instruction. Apprentices must always work under the direct supervision of a journeyman or master electrician." },
                      { role: "Electrical Technician", resp: "In some companies, electrical technicians perform lower-voltage service work including data cabling, fire alarm system maintenance, lighting controls, and similar tasks. Technicians may not hold a full electrician's license but are trained in specific technical areas." },
                      { role: "Customer Service Representative (CSR)", resp: "Manages all incoming customer contacts, qualifies service requests, provides pricing information, schedules appointments, handles billing inquiries, and manages customer relationships. CSRs must be able to communicate clearly about electrical services and recognize genuine electrical emergencies." },
                      { role: "Dispatcher", resp: "Manages the daily schedule for all field electricians, assigns and dispatches service calls, monitors job progress, adjusts schedules for emergency calls and delays, and serves as the real-time communication hub between the office and the field." },
                      { role: "Project Manager", resp: "Oversees larger electrical projects from inception to completion. Project managers coordinate material procurement, scheduling, subcontractor management, permit tracking, inspection scheduling, and customer communication for commercial and industrial projects." },
                      { role: "Business Owner / Electrical Contractor", resp: "Holds the master electrician license and contractor's license that authorize the business to perform electrical work and pull permits. Sets company strategy, manages finances, oversees hiring, maintains contractor relationships, and is ultimately responsible for the quality and safety of all work performed under the company's license." },
                    ].map(({ role, resp }) => (
                      <TableRow key={role}>
                        <TableCell className="font-semibold text-foreground align-top">{role}</TableCell>
                        <TableCell className="text-sm">{resp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          }
        ]
      },
      {
        id: "electrical-tools",
        label: "Tools & Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Common Electrician Tools & Equipment",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Multimeters", desc: "The most essential diagnostic tool in an electrician's kit. Measures voltage (AC and DC), current (amperage), and resistance (ohms). Used to verify voltage at outlets and panels, test continuity in circuits, diagnose wiring faults, test component resistance, and verify that a circuit is de-energized before working on it. A quality multimeter is a fundamental safety tool." },
                    { name: "Wire Strippers", desc: "Precision tools used to remove the insulation from electrical conductors without nicking or damaging the copper wire underneath. Nicked conductors are weaker and can overheat at the damage point. Electricians use wire strippers calibrated for specific wire gauges (14 AWG, 12 AWG, 10 AWG, etc.) to ensure clean, consistent stripping." },
                    { name: "Voltage Testers (Non-Contact)", desc: "Detect the presence of AC voltage without requiring physical contact with a conductor. The tester is held near an outlet, wire, or panel terminal and indicates the presence of live voltage through a beep or light. Invaluable as a first-check safety tool — they do not replace multimeters for precise measurements but provide a quick and safe initial check." },
                    { name: "Insulated Screwdrivers and Hand Tools", desc: "All hand tools used by electricians must be properly insulated to prevent electrical shock when working near energized conductors. Electricians use VDE-rated insulated tools that are rated for use on circuits up to 1,000 volts AC. Using non-insulated tools near live electrical components is an OSHA violation and a serious safety hazard." },
                    { name: "Cable and Conduit Tools", desc: "Installing wiring requires: cable cutters for cleanly cutting heavy wire without deforming conductors, conduit benders for accurately bending metal conduit to precise angles, fish tapes and push rods for pulling wire through conduit and wall cavities, and cable staples and clamps for securing wiring runs." },
                    { name: "Electrical Drills and Hole-Making Tools", desc: "Heavy-duty right-angle drills, corded and cordless hammer drills, and hole saw kits to drill through studs, joists, and masonry to run wiring through structures. Self-feed spade bits and auger bits for drilling large-diameter holes through wood framing for cable runs." },
                    { name: "Safety Equipment and PPE", desc: "Insulated rubber gloves rated for the voltage being worked with (Class 00 through Class 4), safety glasses or face shields when working near energized panels, flame-resistant (FR) clothing when working on or near energized equipment, hard hats on construction sites, and arc flash suits (full body protection) for high-voltage work." },
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{name}</p>
                      <p className="text-sm">{desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  <strong>Tool Safety Note:</strong> Before beginning any electrical work, the circuit must be verified de-energized using a calibrated voltage tester or multimeter, and locked out/tagged out per OSHA 29 CFR 1910.147. Never rely solely on a flipped breaker to assume a circuit is dead — always verify with a meter.
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "electrical-safety",
        label: "Safety & Compliance",
        icon: ShieldCheck,
        sections: [
          {
            title: "Electrical Safety Procedures",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>All electrical work must begin with de-energizing the relevant circuit at the breaker, verifying de-energization with a calibrated tester, and applying <strong className="text-foreground">lockout/tagout (LOTO)</strong> procedures before any work is performed on or near potentially energized conductors.</li>
                  <li>The <strong className="text-foreground">'one-hand rule'</strong> is practiced when working near energized equipment — keeping one hand away from conductive surfaces at all times reduces the risk of current passing through the chest and heart.</li>
                  <li>Only trained and licensed personnel should perform electrical work. Even seemingly simple tasks like replacing a circuit breaker in a panel involve exposure to bus bars that remain energized even when all breakers are off.</li>
                  <li>Arc flash assessments should be performed on commercial and industrial electrical equipment before any work, and appropriate arc flash PPE selected based on the incident energy analysis.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Proper Use of Personal Protective Equipment",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Insulated rubber gloves must be inspected for holes, cuts, and deterioration before every use. Gloves that fail the air inflation test must be removed from service immediately.</li>
                  <li>Eye protection (safety glasses or face shields) must be worn when working near energized conductors, drilling, cutting, or performing any operation that could result in debris entering the eyes.</li>
                  <li>Arc-rated FR clothing must be worn when working on or near energized electrical equipment where an arc flash hazard exists.</li>
                  <li>Hard hats, high-visibility vests, and steel-toed boots are required PPE on construction sites.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Compliance with Electrical Codes and Regulations",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>All electrical installations must comply with the current edition of the <strong className="text-foreground">National Electrical Code (NEC, NFPA 70)</strong> as adopted and amended by the local authority having jurisdiction (AHJ).</li>
                  <li>Permits must be obtained from the local building department before beginning permit-required work. Unpermitted electrical work is a liability for both the contractor and the property owner and can void insurance coverage.</li>
                  <li>All permitted work must be inspected and approved by the local building inspector before being concealed in walls, closed up, or energized for permanent use.</li>
                  <li>Electricians must maintain their state license and required continuing education credits. Allowing a license to lapse or performing work outside the license scope is a legal violation.</li>
                </ul>
              </div>
            )
          },
          {
            title: "Preventing Electrical Hazards",
            content: (
              <div className="space-y-2 text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Never use extension cords as permanent wiring. Extension cords are temporary by design and are not rated for continuous load or concealment inside walls.</li>
                  <li>Inspect all tools and equipment before each use for damaged cords, cracked insulation, and compromised grounding. Damaged tools must be removed from service.</li>
                  <li>Keep the work area clean and organized, particularly when working in panels and junction boxes — stray wire strands or loose conductors can cause shorts, ground faults, or connection failures.</li>
                  <li>Report any discovered code violations or hazardous conditions to the customer in writing. Electricians have a professional and ethical obligation to disclose identified safety hazards, even if the customer did not request that system be addressed.</li>
                  <li>Never rush electrical work. Speed increases error rates, and errors in electrical work have potentially fatal consequences.</li>
                </ul>
              </div>
            )
          }
        ]
      },
      {
        id: "electrical-importance",
        label: "Why Professional Electrical Services Matter",
        icon: Heart,
        sections: [
          {
            title: "The Importance of Professional Electrical Services",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>Professional electricians provide a value that extends far beyond fixing what is broken.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Safety", body: "Electricity is fundamentally dangerous. In the United States, electrical failures cause approximately 51,000 home fires, roughly 500 deaths, more than 1,400 injuries, and $1.3 billion in property damage every year (ESFI). The vast majority of these incidents involve improperly installed, maintained, or repaired electrical systems. Licensed electricians have completed thousands of hours of training specifically to work with electricity safely and install systems that are safe for occupants for decades." },
                    { title: "Reliable Electrical Systems", body: "A home or business depends on its electrical system functioning reliably every day, around the clock. Professional installation by licensed electricians, using code-compliant materials and methods, produces electrical systems that perform consistently and predictably. Proper wire sizing ensures conductors never overheat. Proper connection methods ensure joints remain secure. Correct panel sizing ensures the system has headroom for future loads." },
                    { title: "Code Compliance", body: "Electrical code compliance is not bureaucratic red tape — it is the crystallized result of decades of engineering research, incident investigations, and professional experience. Code-compliant electrical work is required for permit approval, homeowner insurance coverage, mortgage qualification, and property sale. Unpermitted or non-compliant electrical work can prevent a home from being sold, require expensive correction, or result in insurance claims being denied." },
                    { title: "Preventing Electrical Fires", body: "The most common fire causes include arc faults in deteriorated wiring, overloaded circuits, improperly installed connections that create resistance heating, and improper use of extension cords. Professional electricians address all of these risk factors: they install AFCI breakers that detect arcing before it starts a fire, size circuits properly to prevent overloading, make connections correctly using appropriate materials, and advise customers against unsafe practices." },
                    { title: "Long-Term System Maintenance", body: "Like all building systems, electrical systems require periodic professional attention. Connections loosen with thermal cycling. Panel components age and can fail. Code requirements evolve, and older systems may lack protections now considered standard (GFCI and AFCI protection, for example). Professional electricians who establish ongoing service relationships provide the ongoing inspection and maintenance that keeps electrical systems safe for the life of the building." },
                  ].map(({ title, body }) => (
                    <div key={title} className="p-4 border rounded-lg bg-primary/5">
                      <p className="font-semibold text-foreground mb-1">{title}</p>
                      <p className="text-sm">{body}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg text-sm">
                  <p className="font-semibold text-foreground mb-1">Final Note for New Team Members</p>
                  <p>The electrical services industry is built on trust, technical excellence, and an unwavering commitment to safety. Every team member — from the apprentice electrician to the virtual assistant scheduling appointments — plays a role in delivering the professional, reliable, and safe service that our customers depend on. Take pride in being part of a team that protects people's homes, businesses, and lives. Welcome aboard.</p>
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const lawnGardenSections: DocGroup[] = [
  {
    title: "LAWN & GARDEN BASICS",
    items: [
      {
        id: "lawn-intro",
        label: "Introduction to Lawn and Garden Services",
        icon: Leaf,
        sections: [
          {
            title: "Overview",
            content: (
              <div className="space-y-4">
                <p>A lawn and garden business provides outdoor maintenance and landscaping services to residential and commercial clients. These businesses help property owners maintain clean, healthy, and visually appealing outdoor spaces through regular upkeep and specialized treatments.</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Core Mission</h4>
                  <p className="text-green-700">To enhance and maintain outdoor spaces — keeping lawns green, gardens thriving, and properties looking their best year-round.</p>
                </div>
                <p>Services range from basic grass cutting to full landscape design and installation. Many businesses offer recurring maintenance contracts as well as one-time project-based work.</p>
              </div>
            ),
          },
          {
            title: "Value to Clients",
            content: (
              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Curb Appeal:</strong> Well-maintained lawns increase property value and first impressions</li>
                  <li><strong>Time Savings:</strong> Clients reclaim hours spent on outdoor chores</li>
                  <li><strong>Health of Plants:</strong> Professional care ensures grass and plants thrive</li>
                  <li><strong>Pest & Weed Control:</strong> Proactive treatment prevents costly damage</li>
                  <li><strong>Seasonal Readiness:</strong> Properties are properly prepared for each season</li>
                  <li><strong>Safety:</strong> Overgrown vegetation can create hazards — regular maintenance prevents issues</li>
                </ul>
              </div>
            ),
          },
          {
            title: "What VAs Handle",
            content: (
              <div className="space-y-4">
                <p>As a Virtual Assistant supporting a lawn and garden business, your primary responsibilities involve customer communication, scheduling, and administrative support.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Daily Tasks</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Answer incoming calls and messages</li>
                      <li>• Schedule and confirm service appointments</li>
                      <li>• Send quotes and follow up on leads</li>
                      <li>• Process payments and invoices</li>
                      <li>• Handle rescheduling requests</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Customer Support</h4>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Address service complaints</li>
                      <li>• Communicate crew arrival times</li>
                      <li>• Provide service descriptions</li>
                      <li>• Coordinate with field teams</li>
                      <li>• Follow up after service visits</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-service-types",
        label: "Types of Lawn and Garden Services",
        icon: Leaf,
        sections: [
          {
            title: "Overview of Service Types",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">1. Lawn Maintenance</h4>
                    <p className="text-sm text-gray-600">Regular mowing, edging, and trimming to keep grass at an ideal height and appearance.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">2. Garden Care</h4>
                    <p className="text-sm text-gray-600">Planting, pruning, weeding, and maintaining flower beds and garden areas.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">3. Weed Control</h4>
                    <p className="text-sm text-gray-600">Application of herbicides or manual removal to eliminate weeds from lawns and gardens.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">4. Fertilization</h4>
                    <p className="text-sm text-gray-600">Applying nutrients to promote healthy grass growth and green color.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">5. Aeration & Seeding</h4>
                    <p className="text-sm text-gray-600">Aerating compacted soil and overseeding thin or bare patches to improve lawn density.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">6. Mulching</h4>
                    <p className="text-sm text-gray-600">Spreading mulch around plants and beds to retain moisture and suppress weeds.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">7. Hedge & Shrub Trimming</h4>
                    <p className="text-sm text-gray-600">Shaping and trimming hedges, bushes, and shrubs for a clean, manicured look.</p>
                  </div>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "CORE SERVICES",
    items: [
      {
        id: "lawn-grass-edging",
        label: "Grass Cutting & Edging",
        icon: Leaf,
        sections: [
          {
            title: "Grass Cutting",
            content: (
              <div className="space-y-4">
                <p>Grass cutting (mowing) is the most frequently requested service and often the foundation of recurring maintenance contracts.</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">What's Included</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Mowing grass to specified height</li>
                    <li>• Blowing clippings off driveways and walkways</li>
                    <li>• Bagging or mulching clippings (client preference)</li>
                    <li>• Trimming around obstacles (trees, fences, garden beds)</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600"><strong>Frequency:</strong> Weekly or bi-weekly during growing season; monthly or as needed in dormant periods.</p>
              </div>
            ),
          },
          {
            title: "Edging",
            content: (
              <div className="space-y-4">
                <p>Edging creates clean borders between the lawn and hard surfaces like sidewalks, driveways, and garden beds. It gives lawns a professional, finished appearance.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Done with a string trimmer or edger tool</li>
                  <li>Often included with standard mowing visits</li>
                  <li>Creates crisp, defined lines along all hard surfaces</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-weed-fert",
        label: "Weed Control & Fertilization",
        icon: Leaf,
        sections: [
          {
            title: "Weed Control",
            content: (
              <div className="space-y-4">
                <p>Weed control prevents invasive plants from overtaking lawns and garden beds. It can be done chemically (herbicides) or manually.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="font-semibold text-yellow-800 mb-2">Pre-Emergent</h4>
                    <p className="text-yellow-700 text-sm">Applied before weeds sprout to prevent germination. Best done in early spring and fall.</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <h4 className="font-semibold text-orange-800 mb-2">Post-Emergent</h4>
                    <p className="text-orange-700 text-sm">Applied to existing weeds to kill them. Selective types target only weeds, not grass.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Fertilization",
            content: (
              <div className="space-y-4">
                <p>Fertilization feeds the lawn with essential nutrients (nitrogen, phosphorus, potassium) to promote lush, green growth and overall health.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Typically applied 4–6 times per year depending on grass type and region</li>
                  <li>May include soil testing to identify deficiencies</li>
                  <li>Organic or synthetic fertilizer options available</li>
                  <li>Timed with seasonal growth cycles for best results</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-aeration-mulch",
        label: "Aeration, Mulching & Trimming",
        icon: Leaf,
        sections: [
          {
            title: "Aeration",
            content: (
              <div className="space-y-4">
                <p>Aeration involves perforating the soil with small holes to allow air, water, and nutrients to penetrate deep into the root zone. It relieves soil compaction.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Benefits of Aeration</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Reduces soil compaction</li>
                    <li>• Improves water absorption</li>
                    <li>• Encourages deeper root growth</li>
                    <li>• Enhances fertilizer effectiveness</li>
                    <li>• Often paired with overseeding</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600"><strong>Best Time:</strong> Fall (cool-season grasses) or spring (warm-season grasses).</p>
              </div>
            ),
          },
          {
            title: "Mulching",
            content: (
              <div className="space-y-4">
                <p>Mulching involves spreading a layer of material (wood chips, bark, straw) around plants and in garden beds to conserve moisture, regulate temperature, and suppress weeds.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Typically 2–4 inches of mulch applied per season</li>
                  <li>Keeps soil moist between waterings</li>
                  <li>Prevents weed growth in garden beds</li>
                  <li>Adds a clean, finished aesthetic to landscaping</li>
                  <li>Needs to be refreshed annually or biannually</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Hedge & Shrub Trimming",
            content: (
              <div className="space-y-4">
                <p>Hedge and shrub trimming shapes and maintains bushes, hedges, and ornamental shrubs to keep them looking neat and healthy.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Promotes healthy growth and air circulation</li>
                  <li>Prevents overgrowth and encroachment on structures</li>
                  <li>Frequency varies by species — typically 2–4 times per year</li>
                  <li>Clippings removed and disposed of cleanly</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-plant-leaf",
        label: "Plant Care & Leaf Removal",
        icon: Leaf,
        sections: [
          {
            title: "Plant Care",
            content: (
              <div className="space-y-4">
                <p>Plant care services include planting new flowers or shrubs, caring for existing garden plants, and seasonal color changes in garden beds.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Annual and perennial flower installation</li>
                  <li>Deadheading spent blooms to encourage new growth</li>
                  <li>Watering and monitoring plant health</li>
                  <li>Replacing dead or diseased plants</li>
                  <li>Soil amendment for planting areas</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Leaf Removal",
            content: (
              <div className="space-y-4">
                <p>Leaf removal is a seasonal service typically performed in fall and early winter to clear fallen leaves from lawns, beds, and driveways.</p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Prevents smothering grass under heavy leaf layers</li>
                    <li>• Reduces mold and disease risk</li>
                    <li>• Keeps gutters and drains clear</li>
                    <li>• Keeps the property looking well-maintained</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">Leaves are either bagged for disposal or mulched into the lawn as organic matter.</p>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "OPERATIONS & TASKS",
    items: [
      {
        id: "lawn-tasks",
        label: "Maintenance Tasks",
        icon: Leaf,
        sections: [
          {
            title: "Mowing",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Set mower height based on grass type and season</li>
                  <li>Mow in alternating patterns to avoid ruts</li>
                  <li>Never cut more than 1/3 of the blade at a time</li>
                  <li>Blow clippings off hard surfaces after each visit</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Trimming & Edging",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Trim around all obstacles: trees, fence lines, beds</li>
                  <li>Edge along all concrete and asphalt surfaces</li>
                  <li>Keep edges sharp and consistent</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Weeding",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Hand-pull or chemically treat weeds in beds and lawn</li>
                  <li>Note aggressive weed types for follow-up treatment</li>
                  <li>Document areas with heavy weed pressure</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Fertilization Application",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Apply fertilizer evenly with a spreader or sprayer</li>
                  <li>Follow label rates to avoid over-fertilization (lawn burn)</li>
                  <li>Water in after application if no rain expected</li>
                  <li>Log date and product used for each application</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Aeration & Overseeding",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Use core aerator to pull plugs from soil</li>
                  <li>Leave plugs on surface — they break down naturally</li>
                  <li>Overseed immediately after aeration for best germination</li>
                  <li>Advise client to water daily for 2–3 weeks</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Mulch Installation",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Remove old or depleted mulch before applying fresh</li>
                  <li>Apply 2–3 inch layer around plants and in beds</li>
                  <li>Keep mulch away from direct contact with plant stems/trunks</li>
                  <li>Clean up excess from edging areas</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Leaf Removal Tasks",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Use leaf blowers to move leaves to central collection area</li>
                  <li>Rake or vacuum into bags or tarps for removal</li>
                  <li>Check and clear leaves from garden beds and gutters</li>
                  <li>Confirm with client if leaves should be hauled away or left for composting</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Maintenance Visit Standard",
            content: (
              <div className="space-y-4">
                <p className="font-medium">What a standard lawn maintenance visit includes:</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <ol className="text-green-800 text-sm space-y-2 list-decimal list-inside">
                    <li>Arrive on time and check property for hazards</li>
                    <li>Mow lawn at appropriate height</li>
                    <li>Trim around all obstacles</li>
                    <li>Edge all hard surface borders</li>
                    <li>Spot-weed visible weed areas</li>
                    <li>Blow clippings off driveway, walkway, and patio</li>
                    <li>Check for any concerns to report (brown patches, pest signs)</li>
                    <li>Leave a visit summary note or digital update for client</li>
                  </ol>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-operations",
        label: "Business Operations",
        icon: Leaf,
        sections: [
          {
            title: "Step-by-Step Operations",
            content: (
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    { step: "1", title: "Lead Inquiry", desc: "Customer contacts the business via phone, website, or referral requesting lawn or garden services." },
                    { step: "2", title: "Property Assessment", desc: "Owner or crew lead visits to assess property size, lawn condition, and service needs. A quote is prepared." },
                    { step: "3", title: "Quote & Agreement", desc: "Client receives a service proposal with pricing. Recurring contracts or one-time service terms are agreed upon." },
                    { step: "4", title: "Scheduling", desc: "Service visits are scheduled on a recurring or one-time basis. Client receives confirmation of the schedule." },
                    { step: "5", title: "Service Delivery", desc: "Crew arrives and completes all scheduled tasks — mowing, trimming, edging, treatments, etc." },
                    { step: "6", title: "Quality Check", desc: "Crew lead or owner reviews completed work before leaving the property." },
                    { step: "7", title: "Invoicing & Payment", desc: "Invoice is sent after service. Payment collected via card, check, or online platform." },
                    { step: "8", title: "Follow-Up", desc: "VA or office team follows up with client to confirm satisfaction and schedule next visit." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-terminology",
        label: "Common Terminology",
        icon: Leaf,
        sections: [
          {
            title: "Lawn & Garden Glossary",
            content: (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-2 text-left">Term</th>
                        <th className="border px-3 py-2 text-left">Definition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Aeration", "Process of perforating soil to allow air, water, and nutrients to reach grass roots"],
                        ["Overseeding", "Spreading grass seed over existing lawn to fill thin or bare areas"],
                        ["Pre-Emergent", "Herbicide applied before weeds sprout to prevent germination"],
                        ["Post-Emergent", "Herbicide applied to kill weeds that have already grown"],
                        ["Thatch", "Layer of dead grass and organic matter between soil and grass blades"],
                        ["Dethatching", "Removing excess thatch layer to improve lawn health"],
                        ["Edging", "Creating clean borders along sidewalks, driveways, and garden beds"],
                        ["Mulch", "Organic material spread over soil to retain moisture and suppress weeds"],
                        ["Fertilizer", "Nutrients applied to soil to promote healthy plant and grass growth"],
                        ["N-P-K", "Nitrogen-Phosphorus-Potassium — the three main nutrients in fertilizer"],
                        ["pH Level", "Measure of soil acidity/alkalinity; most lawns prefer a pH of 6.0–7.0"],
                        ["Lime", "Soil amendment used to raise pH in acidic lawns"],
                        ["Dormant", "Period when grass or plants stop growing due to heat or cold stress"],
                        ["Topdressing", "Applying a thin layer of compost or soil over the lawn surface"],
                        ["Irrigation", "Watering system used to distribute water evenly across a lawn or garden"],
                      ].map(([term, def], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-3 py-2 font-medium">{term}</td>
                          <td className="border px-3 py-2">{def}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-roles",
        label: "Team Roles",
        icon: Leaf,
        sections: [
          {
            title: "Roles & Responsibilities",
            content: (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-2 text-left">Role</th>
                        <th className="border px-3 py-2 text-left">Responsibilities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Owner / Operator", "Runs the business, handles sales, manages crews, sets pricing"],
                        ["Crew Leader", "Leads field team, ensures quality work, reports issues to owner"],
                        ["Lawn Technician", "Performs mowing, trimming, edging, and other standard services"],
                        ["Landscape Specialist", "Handles installations, planting, and complex garden projects"],
                        ["Pest/Weed Technician", "Licensed applicator for herbicide and pesticide treatments"],
                        ["Office Manager", "Handles scheduling, invoicing, customer accounts, and admin tasks"],
                        ["Virtual Assistant (VA)", "Manages calls, scheduling, follow-ups, and CRM updates remotely"],
                        ["Sales Representative", "Conducts property assessments and closes new service agreements"],
                      ].map(([role, resp], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-3 py-2 font-medium">{role}</td>
                          <td className="border px-3 py-2">{resp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "SAFETY & SUPPORT",
    items: [
      {
        id: "lawn-equipment",
        label: "Tools and Equipment",
        icon: Leaf,
        sections: [
          {
            title: "Equipment Guide",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Riding Mower", desc: "Used for large commercial lawns; faster and more efficient than push mowers." },
                    { name: "Push Mower / Walk-Behind", desc: "Standard residential mower for medium-sized lawns." },
                    { name: "String Trimmer (Weed Eater)", desc: "Trims grass around edges, trees, and obstacles where mowers cannot reach." },
                    { name: "Edger", desc: "Creates clean borders along sidewalks and driveways." },
                    { name: "Leaf Blower", desc: "Clears clippings, leaves, and debris from hard surfaces." },
                    { name: "Backpack Sprayer", desc: "Used to apply herbicides, fertilizers, and pest control chemicals." },
                    { name: "Core Aerator", desc: "Machine that pulls small plugs of soil to relieve compaction and improve root growth." },
                  ].map((item) => (
                    <div key={item.name} className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-safety",
        label: "Safety and Best Practices",
        icon: Leaf,
        sections: [
          {
            title: "Personal Protective Equipment (PPE)",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Safety glasses or goggles when mowing or trimming</li>
                  <li>Hearing protection when operating loud equipment</li>
                  <li>Gloves when handling chemicals or sharp tools</li>
                  <li>Steel-toed boots for foot protection</li>
                  <li>Long pants and long sleeves to prevent cuts and chemical contact</li>
                  <li>Sun protection (hat, sunscreen) for outdoor work</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Chemical Safety",
            content: (
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Important Rules</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Always read and follow product label instructions</li>
                    <li>• Never mix chemicals unless specified as safe</li>
                    <li>• Store chemicals in original containers in a secure location</li>
                    <li>• Post-treatment: keep clients, pets, and children off treated areas per label instructions</li>
                    <li>• Technicians applying pesticides must be licensed</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: "Equipment Safety",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Inspect equipment before each use for damage or mechanical issues</li>
                  <li>Never operate mowers on steep slopes where rollover risk exists</li>
                  <li>Clear the area of debris before mowing (rocks, toys, branches)</li>
                  <li>Shut off equipment completely before performing any maintenance</li>
                  <li>Keep bystanders away from operating mowers and trimmers</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Heat & Outdoor Safety",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Take regular breaks during extreme heat</li>
                  <li>Stay hydrated throughout the workday</li>
                  <li>Recognize signs of heat exhaustion: dizziness, nausea, excessive sweating</li>
                  <li>Schedule intensive work during cooler morning hours when possible</li>
                  <li>Buddy system — crews should check on each other during hot weather</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-customer-requests",
        label: "Common Customer Requests",
        icon: Leaf,
        sections: [
          {
            title: "Frequently Asked Requests",
            content: (
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      request: "\"Can you add fertilization to my regular service?\"",
                      response: "Absolutely! We offer fertilization packages that can be added to your recurring service plan. I can schedule a technician to assess your lawn and provide a quote for the best treatment program.",
                    },
                    {
                      request: "\"My grass has brown patches — what can you do?\"",
                      response: "Brown patches can be caused by pests, disease, drought, or over/under-fertilization. I'll schedule an assessment with our team to diagnose the issue and recommend the right treatment.",
                    },
                    {
                      request: "\"Can someone come this week for a one-time cleanup?\"",
                      response: "Yes! I can check availability and schedule a one-time cleanup visit. Can you give me your address and describe what you need done (mowing, weeding, leaf removal, etc.)?",
                    },
                    {
                      request: "\"My lawn looks thin and patchy. What do you recommend?\"",
                      response: "That sounds like it may benefit from aeration and overseeding. This process loosens the soil and introduces fresh seed to thicken the lawn. I can schedule an assessment to confirm and provide a quote.",
                    },
                    {
                      request: "\"Can I pause my service for the winter?\"",
                      response: "Of course! We can put your recurring service on hold during the off-season. Would you like to keep leaf removal or any winter cleanup services active in the meantime?",
                    },
                    {
                      request: "\"The crew left grass clippings on my driveway last time.\"",
                      response: "I sincerely apologize for that! That's not our standard. I'll make a note on your account and ensure the crew clears all surfaces after every visit going forward. Thank you for letting us know.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2">
                      <p className="font-medium text-sm text-blue-800">{item.request}</p>
                      <p className="text-sm text-gray-700"><strong>Response:</strong> {item.response}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: "Upsell Opportunities",
            content: (
              <div className="space-y-4">
                <p className="text-sm">When a client calls for one service, look for natural opportunities to mention complementary add-ons:</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>• Mowing client → mention fertilization or weed control programs</li>
                    <li>• Weed control client → mention mulch installation to suppress future weeds</li>
                    <li>• Aeration client → mention overseeding and starter fertilizer</li>
                    <li>• Cleanup client → offer a recurring maintenance plan</li>
                    <li>• Spring service client → mention irrigation startup or spring fertilization</li>
                  </ul>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "lawn-importance",
        label: "Importance of Professional Services",
        icon: Leaf,
        sections: [
          {
            title: "The Professional Advantage",
            content: (
              <div className="space-y-4">
                <p>While some homeowners prefer DIY lawn care, many turn to professional services for the following reasons:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Knowledge & Expertise</h4>
                    <p className="text-blue-700 text-sm">Professionals understand grass types, soil conditions, seasonal needs, and the right products — leading to better results than guesswork.</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Time Savings</h4>
                    <p className="text-green-700 text-sm">Clients reclaim hours each week, especially during peak season when lawns grow rapidly and require frequent attention.</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Consistent Results</h4>
                    <p className="text-purple-700 text-sm">Professional crews deliver uniform, high-quality results every visit — clients always come home to a well-maintained yard.</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Proper Equipment</h4>
                    <p className="text-yellow-700 text-sm">Commercial-grade equipment produces cleaner cuts and faster service than consumer mowers and tools.</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Early Problem Detection</h4>
                    <p className="text-red-700 text-sm">Regular visits allow crews to spot pest damage, disease, irrigation issues, or drainage problems before they become costly.</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Property Value</h4>
                    <p className="text-orange-700 text-sm">A professionally maintained lawn can increase property value by up to 15% and creates a strong first impression for visitors and buyers.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "How VAs Support Business Success",
            content: (
              <div className="space-y-4">
                <p>Virtual Assistants play a critical role in keeping a lawn and garden business running smoothly behind the scenes:</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <ul className="text-gray-800 text-sm space-y-2">
                    <li>• <strong>Lead response speed:</strong> Quick responses to inquiries convert more leads into paying clients</li>
                    <li>• <strong>Scheduling efficiency:</strong> Organized route planning maximizes crew productivity</li>
                    <li>• <strong>Client retention:</strong> Follow-ups and proactive communication keep clients satisfied</li>
                    <li>• <strong>Administrative relief:</strong> Owners can focus on field work and growth when VAs handle the office</li>
                    <li>• <strong>Reputation management:</strong> Prompt handling of complaints prevents negative reviews</li>
                    <li>• <strong>Upselling:</strong> Informed VAs can educate clients on additional services that benefit their property</li>
                  </ul>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
];

export const plumbingSections: DocGroup[] = [
  {
    title: "PLUMBING BASICS",
    items: [
      {
        id: "plumbing-intro",
        label: "Introduction to Plumbing Services",
        icon: Wrench,
        sections: [
          {
            title: "What Is a Plumbing Business?",
            content: (
              <div className="space-y-4">
                <p>A plumbing business is a licensed professional service company that installs, repairs, maintains, and upgrades the systems that move water, gas, and waste through residential homes, commercial buildings, and industrial facilities. Plumbers are one of the most essential skilled tradespeople in the built environment — virtually no modern building functions without a reliable, properly installed plumbing system.</p>
                <p>Plumbing companies range from sole-operator residential service plumbers to large commercial plumbing contractors with dozens of licensed journeymen, project managers, and specialized service teams.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Industry Insight</h4>
                  <p className="text-blue-700 text-sm">The average U.S. home has more than $10,000 in plumbing infrastructure. The U.S. plumbing industry employs over 500,000 licensed plumbers and generates more than $130 billion in annual revenue.</p>
                </div>
              </div>
            ),
          },
          {
            title: "The Role of Plumbing Systems",
            content: (
              <div className="space-y-4">
                <p>Plumbing systems perform three interconnected functions in every building they serve:</p>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Water Supply</h4>
                    <p className="text-sm text-gray-600">Delivers pressurized fresh water from a municipal main or private well to every fixture and appliance in the building.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Waste and Drainage</h4>
                    <p className="text-sm text-gray-600">The drain-waste-vent (DWV) system collects all wastewater and removes it by gravity to the municipal sewer or private septic system.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-1">Gas Systems</h4>
                    <p className="text-sm text-gray-600">Many plumbing contractors work on natural gas and propane supply lines, delivering fuel to water heaters, furnaces, ranges, and dryers.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Industry Overview",
            content: (
              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Recession-resistant:</strong> Leaks, clogs, and heater failures need attention regardless of economic conditions</li>
                  <li><strong>Heavily regulated:</strong> All plumbing work must be performed by licensed plumbers under applicable building codes</li>
                  <li><strong>Growing demand:</strong> Water efficiency upgrades, aging infrastructure, and commercial construction drive strong long-term demand</li>
                  <li><strong>Emergency premium:</strong> 24/7 emergency services command 1.5x to 2x the standard service rate</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "plumbing-service-types",
        label: "Types of Plumbing Services",
        icon: Wrench,
        sections: [
          {
            title: "Residential Plumbing",
            content: (
              <div className="space-y-3">
                <p>Encompasses all plumbing work in homes, condominiums, and apartments. Includes routine repairs, appliance installation, fixture replacement, and larger renovation projects.</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm">Residential plumbers interact directly with homeowners and must combine technical excellence with strong customer communication skills and a professional presentation in the customer's home.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Commercial Plumbing",
            content: (
              <div className="space-y-3">
                <p>Performed in offices, restaurants, hotels, healthcare facilities, schools, and apartment complexes. Commercial systems are larger, more complex, and subject to higher usage demands and more stringent building codes.</p>
                <p className="text-sm text-gray-600">Commercial contracts are typically higher revenue and require greater technical expertise, often involving coordination with building managers, general contractors, and local inspectors.</p>
              </div>
            ),
          },
          {
            title: "Emergency Plumbing",
            content: (
              <div className="space-y-4">
                <p>24/7 response to plumbing failures that cannot wait for a scheduled appointment — burst pipes, sewer backups, complete loss of water, or failed water heaters in winter.</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Emergency Protocol</h4>
                  <p className="text-red-700 text-sm">Any customer reporting an active flood, burst pipe, sewage backup, or gas smell should be treated as an emergency. Advise the customer to shut off the main water supply, then dispatch immediately.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Installations & Repairs",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Installations</h4>
                    <p className="text-sm text-gray-600">Full range of new plumbing work — fixtures, appliances, water heaters, softeners, and complete systems in new construction or major renovations. Typically the highest-revenue work category.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Repairs</h4>
                    <p className="text-sm text-gray-600">Fixing leaks, clearing blockages, repairing fixtures and valves, replacing corroded pipe sections, and resolving water pressure problems. Diagnostic accuracy is the hallmark of quality repair service.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Plumbing Maintenance",
            content: (
              <div className="space-y-3">
                <p>Proactive maintenance services include water heater inspections, drain cleaning, pressure testing, leak detection, and backflow preventer certification.</p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-purple-800 text-sm">Maintenance contracts provide recurring revenue and long-term client relationships. Preventive maintenance consistently prevents expensive emergency failures — a compelling value proposition for property owners.</p>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "CORE SERVICES",
    items: [
      {
        id: "plumbing-leak-pipe",
        label: "Leaks & Pipe Work",
        icon: Wrench,
        sections: [
          {
            title: "Leak Detection and Repair",
            content: (
              <div className="space-y-4">
                <p>One of the most requested and consequential plumbing services. Visible leaks are addressed directly; hidden leaks inside walls, under slabs, and underground are detected using acoustic listening equipment, thermal imaging cameras, and pressure decay testing.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Why It Matters</h4>
                  <p className="text-yellow-700 text-sm">A faucet dripping once per second wastes over 3,000 gallons per year. Slab leaks beneath a concrete foundation are particularly serious, requiring saw-cutting the slab or rerouting pipes through walls.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Pipe Installation and Replacement",
            content: (
              <div className="space-y-4">
                <p>Ranges from adding a new branch line to replacing entire supply or drain systems. Common projects include replacing corroded galvanized pipes with copper or PEX, and rerouting pipes damaged by slab leaks.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm"><strong>PEX tubing</strong> has become the dominant residential supply piping material due to its flexibility, freeze resistance, and ease of installation.</p>
                </div>
                <p className="text-sm text-gray-600">All pipe work must comply with local plumbing codes and be installed under the appropriate permits.</p>
              </div>
            ),
          },
        ],
      },
      {
        id: "plumbing-drains-heaters",
        label: "Drains & Water Heaters",
        icon: Wrench,
        sections: [
          {
            title: "Drain Cleaning",
            content: (
              <div className="space-y-4">
                <p>One of the highest-demand plumbing services, addressing blockages from hair, soap scum, grease, food particles, and root intrusion.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="border rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm mb-1">Plunging</p>
                    <p className="text-xs text-gray-600">Minor fixture blockages</p>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm mb-1">Drain Snaking</p>
                    <p className="text-xs text-gray-600">Blockages within first 25–50 feet</p>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <p className="font-semibold text-sm mb-1">Hydro-Jetting</p>
                    <p className="text-xs text-gray-600">Full pipe cleaning, grease, roots</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Water Heater Services",
            content: (
              <div className="space-y-4">
                <p>Covers the full lifecycle: diagnosing failures (no hot water, insufficient heat, discolored water, leaking tank), maintenance (flushing sediment, testing PRV, inspecting anode rods), and full unit replacement.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Traditional tank-type water heaters last 10–15 years on average</li>
                  <li>Tankless (on-demand) heaters offer continuous hot water and energy savings</li>
                  <li>A leaking tank is urgent — warrants immediate service call</li>
                  <li>Units 15+ years old almost always merit replacement over repair</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "plumbing-fixtures-sewer",
        label: "Fixtures & Sewer",
        icon: Wrench,
        sections: [
          {
            title: "Toilet, Sink, and Faucet Installation",
            content: (
              <div className="space-y-4">
                <p>Among the most frequent residential service calls. Includes full replacement and upgrading to higher-efficiency models.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Toilets:</strong> Replaced for leaks at base, cracks, failed flush mechanisms, or efficiency upgrades</li>
                  <li><strong>Faucets:</strong> Replaced when cartridges wear out or as part of kitchen/bathroom renovations</li>
                  <li><strong>Sinks:</strong> Ranges from drop-in swaps to full vanity and rough-in work for new locations</li>
                  <li>All installations include supply shutoff valve replacement and supply line inspection</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Sewer Line Repair",
            content: (
              <div className="space-y-4">
                <p>One of the highest-value and most technically demanding services. The sewer line carries all wastewater from the building to the municipal sewer or septic system.</p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Common Sewer Issues</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Root intrusion into the pipe</li>
                    <li>• Corrosion and pipe deterioration</li>
                    <li>• Bellying — low spots where debris accumulates</li>
                    <li>• Offset joints and collapsed sections</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">Diagnosis begins with a sewer camera inspection. Trenchless repair methods (pipe lining, pipe bursting) allow rehabilitation without extensive excavation.</p>
              </div>
            ),
          },
          {
            title: "Garbage Disposal & Kitchen/Bath Upgrades",
            content: (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-1">Garbage Disposal</h4>
                    <p className="text-sm text-gray-600">Installation combines plumbing and basic electrical work. Plumbers advise on correct usage — avoiding fibrous foods, grease, and hard items — to prevent premature failure.</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-1">Bathroom & Kitchen Upgrades</h4>
                    <p className="text-sm text-gray-600">Among the most impactful and highest-revenue projects. Require close coordination with general contractors, cabinetmakers, tile setters, and electricians. Rough-in must be completed and inspected before finishing work begins.</p>
                  </div>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "COMMON PROBLEMS & WORKFLOW",
    items: [
      {
        id: "plumbing-problems",
        label: "Common Plumbing Problems",
        icon: Wrench,
        sections: [
          {
            title: "Leaking Pipes",
            content: (
              <div className="space-y-3">
                <p>Among the most common and consequential problems. Ranges from minor drips to major pipe failures. Even small concealed leaks rapidly promote mold and structural decay.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm"><strong>CSR Action:</strong> Determine if the leak is causing active water damage (emergency dispatch), whether water has been shut off, and approximate leak location. Always advise customers to shut off water to the affected area.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Clogged Drains",
            content: (
              <div className="space-y-3">
                <p>The single most common plumbing service call. Kitchen drains clog from grease; bathroom drains from hair; toilets from non-flushable items.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm"><strong>Key question:</strong> Are multiple drains affected? If yes — main line blockage, urgent. If one fixture only — standard service call.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Low Water Pressure",
            content: (
              <div className="space-y-3">
                <p>Common causes: partially closed shutoff valve, failing pressure regulator, corroded supply pipes, water leak reducing pressure, or a failing well pump.</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Whole house vs. single fixture?</li>
                  <li>Gradual or sudden onset?</li>
                  <li>Cold only or hot and cold? (helps distinguish supply from heater issues)</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Running Toilets",
            content: (
              <div className="space-y-3">
                <p>A continuously running toilet wastes 200+ gallons of water per day. Most common cause is a failed flapper valve. Other causes include a faulty fill valve, corroded flush valve seat, or float set too high.</p>
                <p className="text-sm text-gray-600">Typically a straightforward repair (fill valve and flapper replacement) completable in under an hour.</p>
              </div>
            ),
          },
          {
            title: "Water Heater Problems",
            content: (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-2 text-left">Symptom</th>
                        <th className="border px-3 py-2 text-left">Likely Cause</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["No hot water", "Failed heating element (electric) or thermocouple/gas valve (gas)"],
                        ["Insufficient hot water", "Failing element, excessive demand, or sediment buildup"],
                        ["Rusty/discolored water", "Deteriorated anode rod or corroded tank nearing end of life"],
                        ["Leaking tank", "Urgent — warrants immediate service, tank will fail completely"],
                      ].map(([sym, cause], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-3 py-2 font-medium">{sym}</td>
                          <td className="border px-3 py-2">{cause}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
          {
            title: "Burst Pipes & Sewer Backups",
            content: (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Burst Pipes — Emergency</h4>
                  <p className="text-red-700 text-sm">Most common during freezing weather. Can release hundreds of gallons per hour and cause catastrophic damage within minutes. Instruct customer to shut off the main water supply immediately, then dispatch emergency plumber.</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Sewer Backups — Emergency + Health Hazard</h4>
                  <p className="text-orange-700 text-sm">Sewage flowing back into drains contains dangerous pathogens. Multiple backing drains = main line blockage requiring immediate service. Advise customer not to use any water-based fixtures until cleared.</p>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "plumbing-workflow",
        label: "Service Workflow",
        icon: Wrench,
        sections: [
          {
            title: "Step-by-Step Service Call",
            content: (
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    { step: "1", title: "Customer Inquiry", desc: "Customer contacts by phone, email, or online form. Collect: full name, address, callback number, problem description, urgency level, and whether water has been shut off." },
                    { step: "2", title: "Scheduling", desc: "Non-emergency calls scheduled within 24–48 hours with a confirmed appointment window. Reminders sent the day before and morning of the visit." },
                    { step: "3", title: "Dispatch", desc: "Dispatcher assigns the appropriate licensed plumber based on work type, license level, location, and prior service history at the property." },
                    { step: "4", title: "On-Site Diagnosis", desc: "Plumber inspects and diagnoses root cause before doing any work. Takes notes and photographs for the service record. Diagnosis prevents treating symptoms while missing underlying causes." },
                    { step: "5", title: "Quote", desc: "Plumber presents written quote describing findings, recommended work, materials, timeline, and total price. Customer must authorize in writing before work begins." },
                    { step: "6", title: "Perform Work", desc: "With authorization confirmed, plumber completes work to code. Area protected with drop cloths and shoe covers. Water/gas shut off verified before opening any pipes." },
                    { step: "7", title: "Testing", desc: "All repaired or installed components tested under normal operating conditions before leaving. Customer shown completed work and test results." },
                    { step: "8", title: "Payment & Documentation", desc: "Payment collected at completion (residential) or invoiced (commercial). Detailed invoice documents diagnosis, work performed, materials, warranty, and any recommendations." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            title: "CSR & VA Key Questions",
            content: (
              <div className="space-y-4">
                <p className="text-sm">When taking a plumbing inquiry, always ask:</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ol className="text-blue-800 text-sm space-y-2 list-decimal list-inside">
                    <li>Is there an active leak or flooding right now?</li>
                    <li>Which fixture or area is affected?</li>
                    <li>Residential or commercial property?</li>
                    <li>Has the water been shut off?</li>
                    <li>How long has this been happening?</li>
                    <li>What is the property address?</li>
                  </ol>
                </div>
                <p className="text-sm text-gray-600">This information enables accurate dispatching, proper plumber preparation, and realistic customer expectations from the very first call.</p>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "TERMINOLOGY & ROLES",
    items: [
      {
        id: "plumbing-terminology",
        label: "Common Terminology",
        icon: Wrench,
        sections: [
          {
            title: "Plumbing Glossary",
            content: (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-2 text-left">Term</th>
                        <th className="border px-3 py-2 text-left">Definition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Water Pressure (PSI)", "Force of water through supply pipes (40–80 PSI normal). Below 40 PSI reduces performance; above 80 PSI stresses pipes and increases leak risk."],
                        ["Drain Line", "Piping that carries wastewater away from fixtures by gravity. Must maintain minimum 1/4 inch per foot slope to flow properly."],
                        ["Drain-Waste-Vent (DWV)", "Complete system of drain, waste, and vent pipes. Vent pipes extend through the roof to equalize air pressure and prevent trap siphoning."],
                        ["Pipe Fittings", "Components joining sections of pipe — elbows, tees, couplings, reducers, and unions."],
                        ["Shut-Off Valve", "Controls water flow in a supply line. Each fixture should have a dedicated shutoff. The main shutoff controls water to the entire building."],
                        ["Backflow", "Undesirable reversal of water flow that can contaminate the potable supply. Prevented by backflow prevention devices required by code."],
                        ["Sewer Line", "Main drain pipe (4–6 inch) carrying all wastewater from the building to the municipal sewer or septic tank."],
                        ["Trap", "Curved pipe section retaining water to block sewer gases from entering the building. Every fixture drain must have a trap."],
                        ["Water Hammer", "Banging noise from sudden water flow stop creating a pressure shock wave. Remedied with water hammer arrestors."],
                        ["Pressure Regulator Valve (PRV)", "Reduces incoming municipal pressure to safe operating level (typically 50–60 PSI). A failing PRV causes high or fluctuating pressure."],
                        ["PEX", "Cross-linked polyethylene — dominant residential supply pipe material. Flexible, freeze-resistant, easy to install, and corrosion-resistant."],
                        ["Hydro-Jetting", "High-pressure water (1,500–4,000 PSI) cleaning drain and sewer pipe interiors. Cuts grease and root intrusion, cleans full pipe diameter."],
                        ["Sewer Camera Inspection", "Waterproof camera on flexible cable providing real-time video of pipe interior. Definitive diagnostic tool for chronic drain and sewer problems."],
                        ["Anode Rod", "Sacrificial metal rod in tank water heaters protecting the steel tank from corrosion. Should be inspected and replaced every 3–5 years."],
                        ["Rough-In Plumbing", "Initial installation phase — supply and drain pipes installed inside walls before finishing work begins. Must be inspected before being concealed."],
                      ].map(([term, def], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-3 py-2 font-medium">{term}</td>
                          <td className="border px-3 py-2">{def}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "plumbing-roles",
        label: "Team Roles",
        icon: Wrench,
        sections: [
          {
            title: "Roles & Responsibilities",
            content: (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-2 text-left">Role</th>
                        <th className="border px-3 py-2 text-left">Responsibilities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Master Plumber", "Highest license level — can pull permits, supervise all work, and sign off on inspections. Business must be owned/operated by a master plumber in most states."],
                        ["Journeyman Plumber", "Licensed plumber (4–5 year apprenticeship) who independently performs all plumbing work under a master plumber's oversight for permit projects."],
                        ["Apprentice Plumber", "Plumber in training combining on-the-job work with classroom instruction. Must work under direct supervision of a journeyman or master plumber."],
                        ["Plumbing Technician", "Handles specific service categories (drain cleaning, water heater maintenance, basic fixture work) under licensed plumber supervision."],
                        ["Customer Service Representative (CSR)", "Handles all incoming calls, qualifies emergencies, gathers job info, schedules appointments, processes billing, and manages customer concerns."],
                        ["Dispatcher", "Manages real-time scheduling and routing of plumbers. Assigns and dispatches calls, monitors progress, and communicates arrival times to customers."],
                        ["Operations Manager", "Oversees field operations — plumber performance, scheduling, vehicles, inventory, permit tracking, and customer satisfaction metrics."],
                        ["Business Owner / Contractor", "Holds master plumber and contractor licenses. Sets strategy and pricing, manages finances, and is ultimately responsible for quality and code compliance."],
                      ].map(([role, resp], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-3 py-2 font-medium">{role}</td>
                          <td className="border px-3 py-2">{resp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "TOOLS & SAFETY",
    items: [
      {
        id: "plumbing-tools",
        label: "Tools and Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Essential Plumbing Tools",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Pipe Wrenches", desc: "Heavy adjustable wrenches for gripping and turning round pipe and fittings. Used in pairs — one to hold, one to turn." },
                    { name: "Drain Snakes & Augers", desc: "Primary tool for clearing blocked drains. Manual hand snakes for small drains; motorized drum snakes for main lines up to 4 inches in diameter." },
                    { name: "Plungers", desc: "Cup plungers for flat sink/floor drains; flange plungers designed for toilets. Simple but highly effective for minor blockages." },
                    { name: "Pipe Cutters", desc: "Rotary cutters for copper pipe; ratchet-style shears for PEX/CPVC/PVC. Produce clean, square cuts essential for proper connections." },
                    { name: "Leak Detection Equipment", desc: "Acoustic listening devices, thermal imaging cameras, and moisture meters to locate hidden leaks without opening every wall." },
                    { name: "Sewer Inspection Cameras", desc: "Waterproof cameras on flexible cables with display monitors. Modern systems include underground locators for precise excavation targeting." },
                    { name: "Soldering & Connection Tools", desc: "Propane/MAPP torches for copper sweating; crimp or clamp tools for PEX; push-to-connect fittings for accessible locations." },
                  ].map((item) => (
                    <div key={item.name} className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "plumbing-safety",
        label: "Safety and Compliance",
        icon: Wrench,
        sections: [
          {
            title: "Safe Tool Usage",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>All power tools must be used with guards in place by trained operators</li>
                  <li>Torches must be kept from combustibles — use a flame shield near framing; keep a fire extinguisher within reach</li>
                  <li>Wear cut-resistant gloves when handling copper pipe and freshly cut metal fittings</li>
                  <li>Use proper body mechanics for heavy lifts — water heater replacement is a two-person job</li>
                  <li>Eye protection required when cutting pipe, using power tools, or working overhead</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Water & Gas System Safety",
            content: (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Water Safety</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Never work on a supply line without confirming it is fully shut off, depressurized, and drained</li>
                    <li>• All materials contacting potable water must be lead-free and NSF/ANSI 61 approved</li>
                    <li>• Wear gloves and eye protection when working with sewage or drain systems</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Gas Safety</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Confirm gas supply is fully shut off at the meter before opening any connections</li>
                    <li>• Ventilate the area before gas work begins</li>
                    <li>• All new connections must pass a pressure test with a calibrated detector before restoring gas</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: "Plumbing Code Compliance",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>All work must comply with the IPC or UPC as adopted by the local authority having jurisdiction (AHJ)</li>
                  <li>Permit-required work must be submitted, inspected at required stages, and receive final approval before being concealed</li>
                  <li>All plumbers must hold the required license for the work being performed</li>
                  <li>Backflow prevention devices must be tested annually by a certified tester in most jurisdictions</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Preventing Water Damage",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Identify and test the main water shutoff before performing any supply line work</li>
                  <li>Protect flooring, cabinetry, and furnishings with drop cloths before opening plumbing</li>
                  <li>Inspect all connections for leaks under normal operating pressure before closing walls</li>
                  <li>Advise customers: no grease down drains, use sink strainers, know the main shutoff location, schedule periodic water heater maintenance</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "plumbing-importance",
        label: "Importance of Professional Plumbing",
        icon: Wrench,
        sections: [
          {
            title: "Preventing Water Damage",
            content: (
              <div className="space-y-4">
                <p>Water is one of the most destructive forces a building can face. A single concealed leaking pipe can saturate insulation, rot framing, destroy drywall, and create toxic mold conditions within 24–48 hours. A burst pipe at full pressure can cause tens of thousands of dollars in damage in a single hour.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-800 text-sm">Professional plumbers inspect the entire system for developing issues, identify root causes, and install lasting repairs — not just surface fixes.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Maintaining Sanitation & Safe Water",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Sanitation</h4>
                    <p className="text-green-700 text-sm">The plumbing system is the foundation of modern sanitation — removing human waste safely before it becomes a health hazard. Sewer backups and failed traps create direct health risks and regulatory consequences for commercial properties.</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Safe Water</h4>
                    <p className="text-purple-700 text-sm">Backflow prevention, lead-free materials, correct water heater temperatures (preventing Legionella growth), and proper pressure regulation all protect the drinking water supply. DIY work using incorrect materials can contaminate the supply in ways not immediately visible.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Preventing Costly Repairs",
            content: (
              <div className="space-y-4">
                <p>The financial argument for professional plumbing maintenance is compelling:</p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <ul className="text-gray-800 text-sm space-y-2">
                    <li>• Water damage averages <strong>$11,000+ per incident</strong> (Insurance Information Institute)</li>
                    <li>• Mold remediation adds <strong>$1,000–$10,000+</strong> after water damage</li>
                    <li>• Full sewer line replacement costs <strong>$5,000–$15,000</strong></li>
                    <li>• A water heater failure causing flooding adds remediation costs on top of replacement</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">All of these outcomes are preventable — or their severity is dramatically reducible — with professional maintenance and early intervention. Help customers understand this prevention value clearly.</p>
              </div>
            ),
          },
        ],
      },
    ],
  },
];

export const homeRemodelingSections: DocGroup[] = [
  {
    title: "HOME REMODELING BUSINESS",
    items: [
      {
        id: "remodeling-intro",
        label: "Introduction",
        icon: Info,
        sections: [
          {
            title: "What Is Home Remodeling?",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Home remodeling — also called home renovation or home improvement contracting — is the professional practice of transforming, upgrading, and improving the existing structure, layout, systems, and aesthetic of a home or commercial property.
                </p>
                <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-sm italic">
                    "Unlike new construction, which builds from the ground up, remodeling works within and around an existing building: reconfiguring floor plans, replacing outdated systems, upgrading finishes and fixtures, adding living space, and making properties more functional, beautiful, and valuable."
                  </p>
                </div>
                <p>
                  A home remodeling business is a licensed general contracting company that manages these transformation projects on behalf of homeowners and property owners.
                </p>
              </div>
            )
          },
          {
            title: "Why Homeowners Invest",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-bold mb-2 flex items-center gap-2 italic">
                      <Sparkles className="w-4 h-4 text-primary" /> Improved Living
                    </h4>
                    <p className="text-sm text-muted-foreground">Transforming outdated spaces into beautiful, efficient environments for daily family gathering and enjoyment.</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-bold mb-2 flex items-center gap-2 italic">
                      <CreditCard className="w-4 h-4 text-primary" /> Property Value
                    </h4>
                    <p className="text-sm text-muted-foreground">Consistently delivering high ROI, especially in kitchen and bathroom renovations.</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-bold mb-2 flex items-center gap-2 italic">
                      <Home className="w-4 h-4 text-primary" /> Avoiding Move Costs
                    </h4>
                    <p className="text-sm text-muted-foreground">An economical path to getting the space needed without the transaction costs of buying and selling.</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-card">
                    <h4 className="font-bold mb-2 flex items-center gap-2 italic">
                      <Zap className="w-4 h-4 text-primary" /> Modernizing Systems
                    </h4>
                    <p className="text-sm text-muted-foreground">Upgrading aging electrical, plumbing, insulation, and HVAC to modern safety and efficiency standards.</p>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "remodeling-types",
        label: "Services Types",
        icon: Home,
        sections: [
          {
            title: "Residential Services",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Kitchen Remodeling", desc: "The highest-value service, ranging from cosmetic refreshes to full gut renovations." },
                    { title: "Bathroom Remodeling", desc: "High-use, high-moisture environments that require intensive trade coordination." },
                    { title: "Basement Finishing", desc: "Increasing usable square footage at a lower cost than additions." },
                    { title: "Interior Renovations", desc: "Opening floor plans, flooring replacement, and whole-home transformations." },
                    { title: "Exterior Renovations", desc: "Improving curb appeal and maintenance via roofing, siding, and siding." },
                    { title: "Home Additions", desc: "Complex projects involving entirely new living space above or attached to the home." }
                  ].map((service, i) => (
                    <div key={i} className="p-4 border rounded-xl bg-muted/20 hover:bg-primary/5 transition-colors">
                      <h4 className="font-bold text-primary mb-1 italic">{service.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "remodeling-workflow",
        label: "Project Workflow",
        icon: Clock,
        sections: [
          {
            title: "7-Phase Management Process",
            content: (
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    { n: "1", title: "Initial Consultation", desc: "Understanding the client's vision and assessing feasibility." },
                    { n: "2", title: "Design & Planning", desc: "Developing detailed plans, 3D renderings, and material selections." },
                    { n: "3", title: "Budget Estimation", desc: "Preparing line-itemized estimates and contingency budgets." },
                    { n: "4", title: "Project Scheduling", desc: "Sequencing all phases and coordinating subcontractor timing." },
                    { n: "5", title: "Construction", desc: "Site preparation, demolition, and the progressive renovation phases." },
                    { n: "6", title: "Quality Inspection", desc: "Internal punch list resolution before client walkthrough." },
                    { n: "7", title: "Project Completion", desc: "Formal walkthrough, final payment, and celebration of the transformation." }
                  ].map((phase, i) => (
                    <div key={i} className="flex gap-4 p-4 border rounded-lg bg-background shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{phase.n}</div>
                      <div>
                        <h4 className="font-semibold text-foreground italic">{phase.title}</h4>
                        <p className="text-sm text-muted-foreground">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "remodeling-terminology",
        label: "Terminology",
        icon: List,
        sections: [
          {
            title: "Key Industry Terms",
            content: (
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold">Term</TableHead>
                        <TableHead className="font-semibold">Definition</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { term: "Renovation", def: "Restoring/updating without changing fundamental structure." },
                        { term: "Remodel", def: "Changing the structure, layout, or purpose of a space." },
                        { term: "Rough-In", def: "Phase where pipes and wires are installed before closing walls." },
                        { term: "Punch List", def: "Minor items remaining to be corrected at the end of a project." },
                        { term: "Change Order", def: "Formal modification to the original contract scope." },
                        { term: "Permit", def: "Official approval from local building authority." }
                      ].map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-bold text-primary italic">{item.term}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{item.def}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "remodeling-roles",
        label: "Team Roles",
        icon: Users,
        sections: [
          {
            title: "Company Structure",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "General Contractor", role: "License holder, strategist, and overall responsible party." },
                  { title: "Project Manager", role: "Operational leader, scheduler, and client communicator." },
                  { title: "Lead Carpenter", role: "On-site supervisor and precision craftsperson." },
                  { title: "Interior Designer", role: "Visual planner for elevations, layouts, and selections." },
                  { title: "Subcontractors", role: "Trade specialists (Plumbing, Electrical, HVAC, etc.)." },
                  { title: "Virtual Assistant", role: "Remote admin, CRM manager, and marketing support." }
                ].map((role, i) => (
                  <div key={i} className="p-4 border rounded-xl bg-card hover:bg-muted/30 transition-colors">
                    <h4 className="font-bold text-primary mb-1 flex items-center gap-2 italic">
                      <Target className="w-4 h-4 opacity-50" /> {role.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{role.role}</p>
                  </div>
                ))}
              </div>
            )
          }
        ]
      },
      {
        id: "remodeling-safety",
        label: "Safety & Codes",
        icon: Shield,
        sections: [
          {
            title: "Safety Standards",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  {[
                    { icon: Shield, label: "Eye Protection" },
                    { icon: ShieldCheck, label: "Hearing Protection", special: true },
                    { icon: Wind, label: "Respiratory Mask" },
                    { icon: Target, label: "Hard Hats" }
                  ].map((item, i) => (
                    <div key={i} className="p-3 border rounded-lg bg-destructive/[0.03] text-destructive flex flex-col items-center gap-2">
                      <Shield className="w-6 h-6 opacity-30" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-amber-700 dark:text-amber-400 text-sm italic">
                  <strong>Hazardous Materials:</strong> Pre-1978 homes may contain Lead Paint, and pre-1980 homes may contain Asbestos. Proper abatement is mandatory.
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "remodeling-importance",
        label: "Pro Value",
        icon: Star,
        sections: [
          {
            title: "Why Professional Services?",
            content: (
              <div className="space-y-4">
                <div className="p-4 border rounded-2xl bg-gradient-to-br from-primary/5 to-transparent">
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "The decision to hire a professional remodeling contractor rather than attempting to manage a project independently is one of the most significant factors determining whether a remodeling investment achieves its full potential."
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Quality Craftsmanship", desc: "Experience and tools that DIY cannot replicate." },
                    { title: "Code Compliance", desc: "Ensuring safety and legal standards are met." },
                    { title: "Trade Coordination", desc: "Managing the complex sequence of interdependent tasks." },
                    { title: "Property Value", desc: "Protecting and enhancing long-term market value." }
                  ].map((val, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-foreground italic">{val.title}</h4>
                        <p className="text-xs text-muted-foreground">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        ]
      }
    ]
  }
];

export const handymanSections: DocGroup[] = [
  {
    title: "HANDYMAN BASICS",
    items: [
      {
        id: "handyman-intro",
        label: "Introduction to Handyman Services",
        icon: Wrench,
        sections: [
          {
            title: "What Is a Handyman Business?",
            content: (
              <div className="space-y-4">
                <p>A handyman or general repair business provides a broad range of small-to-medium maintenance, repair, and installation tasks for residential homes and commercial properties. Unlike specialized contractors, a handyman business is defined by its versatility — the ability to address the wide variety of everyday repair needs that properties generate continuously.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Industry Insight</h4>
                  <p className="text-blue-700 text-sm">The handyman business is relationship-driven. Customers who have a positive experience become long-term clients who call back for every maintenance need. Showing up on time, completing work correctly the first time, communicating clearly, and leaving the job site clean is the most reliable growth strategy.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Why Handyman Services Matter",
            content: (
              <div className="space-y-4">
                <p>Every building generates a continuous stream of maintenance needs — loose handles, damaged drywall, sticking doors, worn fixtures, failing caulk. Left unaddressed, small issues compound into larger, more expensive problems.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">For Homeowners</h4>
                    <p className="text-green-700 text-sm">Time savings and peace of mind. A trusted handyman who knows the property and can be called when something breaks is an indispensable resource.</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">For Property Managers</h4>
                    <p className="text-purple-700 text-sm">An operational necessity. Maintenance requests must be addressed promptly; turnovers must be completed quickly. A reliable handyman partner is worth far more than their hourly rate.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Industry Overview",
            content: (
              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>U.S. handyman services market generates over <strong>$4 billion in annual revenue</strong></li>
                  <li>Serves both residential (homeowners, landlords, investors) and commercial clients (property managers, retail, hotels)</li>
                  <li>Median U.S. home age is ~40 years — older homes generate more continuous maintenance needs</li>
                  <li>Highly fragmented market — professional companies with consistent quality enjoy a significant competitive advantage</li>
                  <li>Property managers, Airbnb hosts, and commercial facilities are high-volume recurring customer segments</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "handyman-service-types",
        label: "Types of Handyman Services",
        icon: Wrench,
        sections: [
          {
            title: "Minor Plumbing Repairs",
            content: (
              <div className="space-y-3">
                <p>Common handyman plumbing tasks (no license required): replacing faucet washers/cartridges, supply hoses, toilet flappers and fill valves, P-trap drain assemblies, and caulking around tubs and sinks.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm"><strong>Boundary:</strong> Handymen do NOT perform new plumbing rough-in, pipe replacement inside walls, or work on main supply/drain lines — those require a licensed plumber.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Minor Electrical Repairs",
            content: (
              <div className="space-y-3">
                <p>Standard handyman electrical tasks: replacing outlets and switches, light fixtures and ceiling fans, dimmers, and installing smart home devices (smart switches, doorbells, thermostats, security cameras, smart locks).</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm"><strong>Boundary:</strong> Panel work, new circuit installation, and service entrance work require a licensed electrician. Always confirm the local scope of permitted handyman electrical work.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Furniture Assembly",
            content: (
              <div className="space-y-3">
                <p>One of the most consistently requested services, driven by flat-pack furniture retailers (IKEA, Wayfair, Amazon). Customers need beds, desks, dressers, wardrobes, shelving, and outdoor furniture assembled correctly.</p>
                <p className="text-sm text-gray-600">Large furniture assembly jobs (full bedroom sets, home office setups) are excellent multi-hour jobs with good revenue. Always bring your own tools — the included hex keys are slow and inadequate.</p>
              </div>
            ),
          },
          {
            title: "Drywall Repair & Painting",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Drywall Repair</h4>
                    <p className="text-sm text-gray-600">From filling nail holes to cutting and replacing large damaged sections. Requires texture matching and seamless blending — one of the most technically demanding common repair tasks.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Painting & Touch-Ups</h4>
                    <p className="text-sm text-gray-600">Touch-up work, single-room painting, doors and trim, and newly repaired drywall patches. Matching existing paint color accurately is a key differentiating skill.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Fixture Installation & Door/Window Repairs",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Fixture Installation</h4>
                    <p className="text-sm text-gray-600">Bathroom accessories, shelving, wall-mounted TVs, ceiling fans, mirrors, cabinet hardware, garage organization systems, and security devices.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Door & Window Repairs</h4>
                    <p className="text-sm text-gray-600">Adjusting sticking/dragging doors, aligning latches and strike plates, replacing hinges and hardware, window pane replacement, weatherstripping, and screen repair.</p>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Home Maintenance Tasks",
            content: (
              <div className="space-y-3">
                <p>A broad category ideal for combination visits where multiple small tasks are completed efficiently:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Caulking around windows, doors, tubs, and sinks</li>
                  <li>Re-grouting tile floors and shower walls</li>
                  <li>Cleaning and sealing gutters</li>
                  <li>Installing smoke detectors and CO detectors</li>
                  <li>Pressure washing decks and walkways</li>
                  <li>Deck staining and sealing</li>
                  <li>Replacing exterior light fixtures</li>
                  <li>Seasonal maintenance (winterizing outdoor faucets)</li>
                </ul>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "CORE SERVICES",
    items: [
      {
        id: "handyman-drywall-paint",
        label: "Drywall & Painting",
        icon: Wrench,
        sections: [
          {
            title: "Drywall Patching and Repair",
            content: (
              <div className="space-y-4">
                <p>Ranges from filling small nail holes with lightweight spackle to cutting out and replacing large sections with new drywall, taping, floating compound in multiple coats, texturing, and priming.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Most Common Repairs</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Door-handle-sized holes from missing door stops</li>
                    <li>• Water-stained areas (once the water source is fixed)</li>
                    <li>• Large impact damage from furniture moves</li>
                    <li>• Screw holes and wall anchors from removed fixtures</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">Professional drywall repair is invisible when done correctly. A badly done patch — visible lines, mismatched texture, or paint differences — immediately reflects poorly on the service.</p>
              </div>
            ),
          },
          {
            title: "Interior Painting and Touch-Ups",
            content: (
              <div className="space-y-4">
                <p>Quality touch-up work involves carefully matching existing paint, applying the correct sheen level, using proper cutting-in technique, and feathering edges to blend the repaired area invisibly.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Rolling a small patch at high contrast in an otherwise smooth wall will be obvious — match sheen as carefully as color</li>
                  <li>Understand roller nap selection, wet-edge technique, and paint chemistry</li>
                  <li>Single-room painting jobs provide several hours of well-compensated, productive work</li>
                </ul>
              </div>
            ),
          },
        ],
      },
      {
        id: "handyman-fixtures-doors",
        label: "Fixtures, Doors & Caulking",
        icon: Wrench,
        sections: [
          {
            title: "Fixture and Hardware Installation",
            content: (
              <div className="space-y-4">
                <p>Requires knowing how to locate studs, select the correct wall anchor for the load, drill precisely, and achieve a level and plumb finish.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm font-medium">Examples of quality installation:</p>
                    <ul className="text-green-700 text-sm mt-1 space-y-1">
                      <li>• TV mount into studs, perfectly level</li>
                      <li>• Grab bar anchored securely at correct position</li>
                      <li>• Floating shelf perfectly level with invisible fasteners</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm font-medium">Poor installation signs:</p>
                    <ul className="text-red-700 text-sm mt-1 space-y-1">
                      <li>• Crooked or wobbling mount</li>
                      <li>• Anchor pulling from wall under load</li>
                      <li>• Misaligned hardware holes</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Door and Cabinet Adjustments",
            content: (
              <div className="space-y-4">
                <p>Doors that stick, drag, fail to latch, or swing open are among the most frequent handyman calls. Diagnosis is critical first.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Diagnose Before Fixing</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• <strong>Hinge wear</strong> → tighten or replace hinges</li>
                    <li>• <strong>Paint buildup</strong> → plane the door edge</li>
                    <li>• <strong>Humidity swelling</strong> → plane or wait for season change</li>
                    <li>• <strong>Foundation settlement</strong> → structural assessment first</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">European concealed-hinge cabinet adjustments are straightforward — a small six-way adjustment screw turn can dramatically improve an entire kitchen's appearance.</p>
              </div>
            ),
          },
          {
            title: "Caulking and Weatherstripping",
            content: (
              <div className="space-y-4">
                <p>Caulking is one of the highest-value-for-effort maintenance tasks. Applied with good technique, it prevents water infiltration, seals air gaps, and dramatically improves finished appearance.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Remove all old caulk completely before applying new</li>
                  <li>Ensure surface is clean and dry before application</li>
                  <li>Apply straight, even bead of the correct caulk type for the application</li>
                  <li>Tool the bead to a professional concave profile</li>
                </ul>
                <p className="text-sm text-gray-600">Weatherstripping types: foam tape (easy, short lifespan), V-strip tension seal (long-lasting), door sweeps (bottom gap), door shoes (most durable).</p>
              </div>
            ),
          },
          {
            title: "Furniture Assembly & Tile/Grout Repair",
            content: (
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Furniture Assembly</h4>
                  <p className="text-sm text-gray-600 mb-2">An experienced handyman assembles a wardrobe that takes a homeowner 3–4 hours in under 90 minutes, correctly, without stripped screws or misaligned panels. Always bring your own impact driver.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Tile and Grout Repair</h4>
                  <p className="text-sm text-gray-600">Re-grouting restores the water seal and dramatically improves appearance. Individual cracked tiles can be replaced if matching tile is available. Shower caulk at floor-wall junctions must be maintained to prevent water infiltration behind tiles.</p>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "COMMON ISSUES & WORKFLOW",
    items: [
      {
        id: "handyman-problems",
        label: "Common Home Repair Issues",
        icon: Wrench,
        sections: [
          {
            title: "Broken Fixtures & Damaged Drywall",
            content: (
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Broken Fixtures</h4>
                  <p className="text-sm text-gray-600 mb-2">Common: towel bars pulled out (no proper anchors), toilet paper holders loose, light fixtures with failed sockets, cabinet hardware loose.</p>
                  <p className="text-sm text-blue-700"><strong>CSR Questions:</strong> Which fixture? Does customer have the replacement? Wall construction type?</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Damaged Drywall</h4>
                  <p className="text-sm text-gray-600 mb-2">Key qualifying questions: How large is the damage? High-visibility area (raises texture matching quality bar)? Does the customer want painting included (significantly adds to scope)?</p>
                  <p className="text-sm text-blue-700">Photos from the customer are extremely helpful for accurate quoting.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Loose Doors, Minor Leaks & Electrical",
            content: (
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Loose Doors and Cabinets</h4>
                  <p className="text-sm text-gray-600">Ask how long the problem has been occurring. A sudden change in door operation can indicate a structural issue requiring professional assessment before the door alone is addressed.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Minor Plumbing Leaks</h4>
                  <p className="text-sm text-gray-600">Dripping faucets, leaking supply lines, running toilets, deteriorated tub caulk — within handyman scope. Escalate to licensed plumber for pipes inside walls, main supply/drain issues, or sewage.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Light Fixture Replacement</h4>
                  <p className="text-sm text-gray-600">Ask: Does the customer have the new fixture? Type of ceiling? Standard junction box? Dimmer switch involved? Most standard replacements: 30–60 minutes.</p>
                </div>
              </div>
            ),
          },
          {
            title: "TV & Shelf Mounting + CSR Quick Reference",
            content: (
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">TV and Shelf Mounting</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>TV mounting:</strong> Correct VESA bracket, stud location, viewing height, cable management</li>
                    <li>• <strong>Floating shelves:</strong> Precise layout, level installation, correct anchor for load, series alignment</li>
                    <li>• High-visibility — a crooked installation is immediately noticed</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">CSR Quick Reference</h4>
                  <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                    <li>What specifically is broken or not working?</li>
                    <li>Approximately how large or severe is the problem?</li>
                    <li>Is there urgency — ongoing damage or a safety concern?</li>
                  </ol>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">VA Pro Tip</h4>
                  <p className="text-green-700 text-sm">Always ask: <em>"Is there anything else you've been meaning to get fixed while we're there?"</em> Many customers have 3–4 small tasks. Bundling multiple tasks dramatically increases appointment value for both the customer and the business.</p>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "handyman-workflow",
        label: "Service Workflow",
        icon: Wrench,
        sections: [
          {
            title: "Step-by-Step Service Call",
            content: (
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    { step: "1", title: "Customer Inquiry", desc: "Gather: customer name, address, contact number, complete task list (not just the top item), whether they have parts/materials, access info (gate codes, pets), and timing constraints." },
                    { step: "2", title: "Job Assessment", desc: "For multi-task or material-sourcing jobs, an assessment may be scheduled before the service visit. For straightforward single tasks, quote on arrival and begin immediately upon authorization." },
                    { step: "3", title: "Scheduling", desc: "Book in hourly blocks — 1-hour minimum for small tasks, larger blocks for multi-task visits. Customer receives confirmed window and reminder. Materials purchasing scheduled in advance if needed." },
                    { step: "4", title: "Performing the Repairs", desc: "Technician confirms scope in walkthrough with customer before starting. Protect all work areas. Start with most disruptive tasks (drilling, drywall), finish with cleanest (painting, fixtures). Communicate any unexpected findings before adjusting scope or cost." },
                    { step: "5", title: "Job Completion", desc: "Thorough final walkthrough with customer demonstrating each completed task and confirming satisfaction. Remove all debris and packaging. Leave the work area clean — often cleaner than found." },
                    { step: "6", title: "Payment & Documentation", desc: "Payment collected at completion (residential) or invoiced (commercial). Invoice documents all tasks, materials, time, and warranty info. Note recommended follow-up items. Send satisfaction follow-up for reviews, referrals, and future bookings." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "TERMINOLOGY & ROLES",
    items: [
      {
        id: "handyman-terminology",
        label: "Common Terminology",
        icon: Wrench,
        sections: [
          {
            title: "Handyman & Home Repair Glossary",
            content: (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-2 text-left">Term</th>
                        <th className="border px-3 py-2 text-left">Definition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Drywall (Gypsum Board)", "Common interior wall/ceiling material. Standard thicknesses: 1/2 inch (walls) and 5/8 inch (fire-rated). Repairs require joint compound, tape, texture matching, and paint."],
                        ["Joint Compound (Mud)", "Plaster-like material for filling and smoothing drywall seams and holes. Applied in multiple thin coats, sanded between coats to achieve a smooth, invisible finish."],
                        ["Stud", "Vertical framing member (typically 2x4 or 2x6) forming the structural skeleton of walls. Typically spaced 16 or 24 inches on center. Critical for securing heavy fixture anchors."],
                        ["Wall Anchor", "Fastener for attaching objects to drywall without a stud. Types: plastic expansion (light loads), toggle bolts (medium/heavy), snap toggles (highest loads). Selecting correctly is critical."],
                        ["Caulk / Caulking", "Flexible sealant filling gaps to prevent water, air, and pest infiltration. Silicone for wet areas; paintable latex for trim/windows; polyurethane/elastomeric for exterior."],
                        ["Sheen (Paint Finish)", "Level of gloss in paint. Flat/matte for ceilings; eggshell/satin for walls; semi-gloss/gloss for trim. Matching sheen is as important as matching color for touch-ups."],
                        ["Strike Plate", "Metal plate on door frame receiving the latch bolt. Misalignment causes sticking or incomplete latching — one of the most common door adjustment issues."],
                        ["P-Trap", "Curved pipe under sinks holding water to block sewer gases. A sewer gas smell at a drain often means a dry or failed P-trap."],
                        ["GFCI Outlet", "Safety outlet shutting off power when current leaks to ground. Identified by TEST and RESET buttons. Required near water. A tripped GFCI is the most common cause of 'dead outlets.'"],
                        ["Weatherstripping", "Sealing material around doors/windows closing gaps. Types: foam tape, V-strip tension seal, door sweeps, door shoes (most durable)."],
                        ["Grout", "Cement-based filler between tiles. Cracked/missing grout allows water penetration leading to progressive tile damage."],
                        ["Flat-Pack Furniture", "Ready-to-assemble furniture sold disassembled. Professional handymen assemble significantly faster and with better results — a high-demand service."],
                        ["On-Center (OC)", "Spacing measured from center to center of structural elements. Standard stud spacing is 16\" OC."],
                        ["Load-Bearing Wall", "Structural wall supporting the building weight above. Cannot be removed without engineering assessment. Handymen must identify before any wall work."],
                      ].map(([term, def], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-3 py-2 font-medium">{term}</td>
                          <td className="border px-3 py-2">{def}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "handyman-roles",
        label: "Team Roles",
        icon: Wrench,
        sections: [
          {
            title: "Roles & Responsibilities",
            content: (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-3 py-2 text-left">Role</th>
                        <th className="border px-3 py-2 text-left">Responsibilities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Senior Handyman Technician", "Experienced multi-skilled professional handling the full service range to a high standard — drywall, painting, fixture installation, door/window work, minor plumbing/electrical, furniture assembly. Handles complex/high-value jobs with full ownership of quality."],
                        ["Handyman Technician", "Skilled field professional (1–3 years experience) competently handling common service types: furniture assembly, fixture installation, basic drywall, caulking, door adjustments, and general maintenance."],
                        ["Maintenance Worker", "Entry-level team member performing repeatable tasks — pressure washing, gutter cleaning, basic assembly, caulking — often in support of a technician on larger jobs."],
                        ["Customer Service Representative (CSR)", "Handles all inbound inquiries, gathers complete task lists, provides pricing, schedules appointments, follows up on estimates, manages billing questions and customer concerns."],
                        ["Dispatcher / Scheduler", "Manages daily technician schedules, sequences jobs geographically, monitors progress, handles rescheduling, and ensures technicians arrive on time and fully prepared."],
                        ["Operations Manager", "Oversees field and office operations — technician performance and quality, scheduling, customer satisfaction, vehicle stocking, and company growth."],
                        ["Business Owner", "Sets strategy, manages finances, drives business development, maintains key client relationships. In smaller businesses, often also a working technician for the most complex jobs."],
                      ].map(([role, resp], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border px-3 py-2 font-medium">{role}</td>
                          <td className="border px-3 py-2">{resp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: "TOOLS & SAFETY",
    items: [
      {
        id: "handyman-tools",
        label: "Tools and Equipment",
        icon: Wrench,
        sections: [
          {
            title: "Essential Handyman Tools",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Power Drills & Impact Drivers", desc: "The two most essential power tools. Drill/driver for precision and controlled torque; impact driver for driving long screws and lag bolts. Professional 18V/20V lithium-ion tools with multiple batteries ensure full-day productivity." },
                    { name: "Screwdrivers", desc: "A full quality set remains essential for controlled work and tight spaces. Include Phillips (0–3), flat (multiple widths), square-drive (Robertson), and Torx in multiple sizes." },
                    { name: "Measuring Tools", desc: "25-foot tape measure, 4-foot level, 9-inch torpedo level, combination square, chalk line, and speed square. Digital levels and laser distance measurers improve accuracy on larger projects." },
                    { name: "Hammers", desc: "16-oz curved-claw finish hammer for general tasks; rubber mallet for furniture assembly without marring surfaces; ball-peen for metal work." },
                    { name: "Stud Finders", desc: "Magnetic types locate metal fasteners in studs. Electronic types sense density changes. Advanced multi-sensor finders also detect live wiring and metal pipes — invaluable for wall drilling." },
                    { name: "Utility Knives & Cutting Tools", desc: "Sharp utility knives for drywall and cutting tasks. Drywall saw for outlet/patch holes. Oscillating multi-tool for cutting damaged drywall, trimming door bottoms in place, and removing old caulk." },
                    { name: "Finishing & Painting Tools", desc: "Drywall knives (6\", 10\", 12\"), corner knife, sanding block (80/120/150 grit), pole sander. Quality angled brushes, 3/8\"–1/2\" nap rollers, painter's tape, and drop cloths." },
                  ].map((item) => (
                    <div key={item.name} className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Vehicle Stocking</h4>
                  <p className="text-gray-700 text-sm">A well-stocked service vehicle is one of a handyman company's most important assets. Carry common hardware, repair materials (spackle, joint compound, caulk, sandpaper), and replacement parts. A vehicle stocked for 80% of jobs without a materials run dramatically increases daily productivity.</p>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "handyman-safety",
        label: "Safety and Best Practices",
        icon: Wrench,
        sections: [
          {
            title: "Safe Power Tool Usage",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Inspect every power tool before use — damaged cords, cracked housing, loose components, malfunctioning guards</li>
                  <li>Wear eye protection whenever drilling, driving, cutting, or grinding</li>
                  <li>Keep cutting accessories sharp — dull tools require more force and slip more easily</li>
                  <li>Never disable or bypass safety guards on power tools</li>
                  <li>Route extension cords along walls, not across walkways</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Ladder Safety",
            content: (
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Use correct ladder — step ladders up to 6 feet; extension ladders for high work</li>
                  <li>Never stand on the top two rungs (step ladder) or top three rungs (extension ladder)</li>
                  <li>Inspect before every use — damaged rungs, cracked rails, bent feet, non-functioning locks</li>
                  <li>Set up on stable, level ground — use leg levelers on uneven surfaces</li>
                  <li>Maintain three points of contact at all times when climbing or descending</li>
                  <li>Never overreach — descend and move the ladder rather than stretching</li>
                </ul>
              </div>
            ),
          },
          {
            title: "Electrical Safety",
            content: (
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <ul className="text-red-700 text-sm space-y-2">
                    <li>• Turn off the circuit breaker before replacing any outlet, switch, or fixture. Verify dead with a non-contact voltage tester. Never assume a circuit is off without testing.</li>
                    <li>• If a job suggests wiring damage, circuit issues, or panel work — defer to a licensed electrician.</li>
                    <li>• Never work on electrical components in wet conditions or with wet hands.</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            title: "Property Protection & Know Your Limits",
            content: (
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2">Property Protection</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Drop cloths on all floor surfaces before any task generating dust, debris, or drips</li>
                    <li>• Painter's tape to protect adjacent surfaces — remove immediately after final coat</li>
                    <li>• Report any accidental damage immediately and honestly</li>
                    <li>• Never move customer belongings without asking first</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Know Your Limits</h4>
                  <p className="text-orange-700 text-sm">The most important safety practice is knowing when a job is beyond appropriate scope and referring it to the correct licensed specialist. Structural repairs, full rewiring, new plumbing rough-in, gas line work, mold remediation, and asbestos removal all require specialists.</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm"><strong>Licensing Note:</strong> Handyman licensing requirements vary significantly by state and municipality. Performing licensed trade work without credentials exposes the business to fines, voided insurance, and legal liability.</p>
                </div>
              </div>
            ),
          },
        ],
      },
      {
        id: "handyman-importance",
        label: "Importance of Handyman Services",
        icon: Wrench,
        sections: [
          {
            title: "For Homeowners: Time Savings & Peace of Mind",
            content: (
              <div className="space-y-4">
                <p>The most universal reason homeowners hire a handyman is time. A homeowner who spends their Saturday watching a handyman complete five items on their maintenance list in four hours has reclaimed a Saturday, reduced their stress, and checked items off a mental to-do list accumulating for months.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">There is genuine peace of mind in having a trusted, skilled professional who knows the property and will show up reliably to fix it. The handyman who builds this relationship becomes an indispensable part of the homeowner's support system.</p>
                </div>
              </div>
            ),
          },
          {
            title: "For Property Managers: Operational Reliability",
            content: (
              <div className="space-y-4">
                <p>For property managers overseeing multiple rental units, commercial facilities, or mixed-use properties, a reliable handyman service is an operational necessity, not a luxury.</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Maintenance requests must be addressed promptly for habitability compliance</li>
                  <li>Turnovers require quick property refreshes for the next occupant</li>
                  <li>Ongoing preventive maintenance must be scheduled and completed to protect the asset</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm">Property managers who find a reliable handyman partner become consistent, high-volume recurring customers — among the most valuable client relationships a handyman business can develop.</p>
                </div>
              </div>
            ),
          },
          {
            title: "Preventing Small Problems from Becoming Large Ones",
            content: (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Deferred = Expensive</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Small roof leak → rotted deck and mold problem</li>
                      <li>• Misaligned strike plate → damaged frame requiring replacement</li>
                      <li>• Deteriorated tub caulk → water behind tile → full bathroom renovation</li>
                      <li>• Clogged gutters → foundation and siding damage</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Maintained = Protected</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Property looks better and functions better</li>
                      <li>• Retains market value over time</li>
                      <li>• Safer and more pleasant for occupants</li>
                      <li>• Dramatically lower lifetime repair costs</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Every team member who understands and communicates this prevention value helps customers make the decision to invest in professional service — and protect their most valuable asset.</p>
              </div>
            ),
          },
        ],
      },
    ],
  },
];

export const garageDoorSections: DocGroup[] = [
  {
    title: "GARAGE DOOR SERVICE",
    items: [
      {
        id: "gd-intro",
        label: "General Overview",
        icon: Info,
        sections: [
          {
            title: "1. Introduction to Garage Door Services",
            content: (
              <div className="space-y-4 text-muted-foreground">
                <p>A garage door service business specializes in the installation, maintenance, repair, and replacement of garage doors and their associated systems. These businesses serve both residential homeowners and commercial property owners, providing essential services that keep garage doors functioning safely, reliably, and efficiently.</p>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-bold text-foreground mb-4 text-lg">Why Garage Door Maintenance Is Important</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Safety", desc: "Prevents accidental falls, injuries, or trapped vehicles." },
                      { title: "Security", desc: "Reduces vulnerability to unauthorized entry." },
                      { title: "Protection", desc: "Shields interior from weather, pests, and theft." },
                      { title: "Cost Savings", desc: "Catching small problems early avoids expensive emergencies." },
                      { title: "Energy Efficiency", desc: "Properly sealed doors help regulate interior temperatures." },
                      { title: "Home Value", desc: "Increases curb appeal and property resale value." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-foreground">{item.title}:</span> {item.desc}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "gd-types",
        label: "Product Knowledge",
        icon: Home,
        sections: [
          {
            title: "2. Types of Garage Doors",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      title: "Sectional Garage Doors", 
                      features: ["Most common residential choice", "Composed of 4–6 panels", "Supported by rollers in track system", "Compatible with most openers"]
                    },
                    { 
                      title: "Roll-Up Garage Doors", 
                      features: ["Designed for heavy-use environments", "Slats coil around a drum above", "Minimal ceiling clearance required", "Common in warehouses"]
                    },
                    { 
                      title: "Tilt-Up Garage Doors", 
                      features: ["One-piece solid panel", "Swings outward then tilts up", "Simpler mechanical design", "Found in older homes"]
                    },
                    { 
                      title: "Side-Hinged Doors", 
                      features: ["Resemble traditional barn doors", "Swings outward from side hinges", "Can be manually operated easily", "Popular for workshops"]
                    }
                  ].map((door, i) => (
                    <div key={i} className="p-5 border rounded-2xl bg-muted/20 hover:bg-muted/40 transition-shadow">
                      <h4 className="font-bold text-foreground mb-3 text-sm underline decoration-primary/30 underline-offset-4">{door.title}</h4>
                      <ul className="space-y-1.5">
                        {door.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-tight">
                            <div className="w-1 h-1 rounded-full bg-primary/60" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-primary/[0.03] border border-primary/20 rounded-xl">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> Automatic Garage Doors
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Functional category applying to any door fitted with a motorized opener. Features include safety sensors, Wi-Fi connectivity, and integration with smart home systems like myQ.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "gd-services",
        label: "Services & Maintenance",
        icon: Wrench,
        sections: [
          {
            title: "3. Core Services Offered",
            content: (
              <div className="space-y-6 text-muted-foreground">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Installation", desc: "Full assembly of panels, tracks, and hardware tension calibration." },
                    { title: "Repairs", desc: "Fixing damaged panels, frayed cables, and worn components." },
                    { title: "Spring Service", desc: "Replacement of broken high-tension torsion or extension springs." },
                    { title: "Opener Service", desc: "Motor troubleshooting, sensor alignment, and smart home setup." },
                    { title: "Track & Roller", desc: "Realignment of bent tracks and lubrication of rollers." },
                    { title: "Maintenance", desc: "Annual inspections, balance tests, and hardware tightening." }
                  ].map((service, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 border rounded-xl bg-background hover:border-primary/50 transition-colors">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm tracking-tight">{service.title}</h4>
                        <p className="text-[11px] mt-1 italic">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl space-y-3">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                    <div>
                      <h4 className="font-black text-destructive text-xs uppercase tracking-widest">⚠ SAFETY WARNING — SPRING SERVICE</h4>
                      <p className="text-sm">Garage door springs are under extreme tension and can cause severe injury. Only trained technicians with proper tools should perform spring replacement. Never attempt DIY spring replacement.</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "gd-problems",
        label: "Diagnostics",
        icon: AlertCircle,
        sections: [
          {
            title: "4. Common Garage Door Problems",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl bg-muted/20 space-y-2">
                    <h4 className="font-bold text-foreground">Door Not Opening/Closing</h4>
                    <p className="text-sm text-muted-foreground">The most urgent complaint. Often caused by broken springs, misaligned sensors, or dead opener motors.</p>
                  </div>
                  <div className="p-4 border rounded-xl bg-muted/20 space-y-2">
                    <h4 className="font-bold text-foreground">Broken Springs</h4>
                    <p className="text-sm text-muted-foreground">Average lifespan is 10,000 cycles (~7-10 years). Failure is often marked by a loud bang.</p>
                  </div>
                </div>

                <div className="overflow-hidden border rounded-xl">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[120px] font-bold">Sound</TableHead>
                        <TableHead className="font-bold">Interpretation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { sound: "Grinding", meaning: "Worn rollers or track misalignment" },
                        { sound: "Squeaking", meaning: "Lack of lubrication on coils or hinges" },
                        { sound: "Rattling", meaning: "Loose hardware, bolts, or brackets" },
                        { sound: "Popping", meaning: "Binding sections or spring nearing failure" },
                        { sound: "Clicking", meaning: "Loose chain or limit switch issues" }
                      ].map((item, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono text-xs text-primary font-bold tracking-tighter uppercase">{item.sound}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{item.meaning}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "gd-workflow",
        label: "Business Operations",
        icon: Clock,
        sections: [
          {
            title: "5. Service Workflow",
            content: (
              <div className="relative space-y-4 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {[
                  { t: "Customer Inquiry", d: "Collect details, symptômes, and urgency levels." },
                  { t: "Scheduling", d: "Dispatch based on priority and geography." },
                  { t: "Inspection", d: "Conduct thorough visual system checks on arrival." },
                  { t: "Diagnosis", d: "Identifying root causes and potential future failures." },
                  { t: "Quoting", d: "Present written proposal before work begins." },
                  { t: "Execution", d: "Perform agreed repair following safety protocols." },
                  { t: "Testing", d: "Full system operation and safety sensor verification." },
                  { t: "Closing", d: "Payment collection and maintenance documentation." }
                ].map((item, i) => (
                  <div key={i} className="relative pl-10 flex flex-col items-start group">
                    <div className="absolute left-0 w-8 h-8 rounded-lg bg-background border flex items-center justify-center font-bold text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-all z-10">{i+1}</div>
                    <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">{item.t}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.d}</p>
                  </div>
                ))}
              </div>
            )
          }
        ]
      },
      {
        id: "gd-terminology",
        label: "Industry Language",
        icon: List,
        sections: [
          {
            title: "6. Common Garage Door Terminology",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { t: "Torsion Spring", d: "Mounted above opening, stores energy to lift weight." },
                  { t: "Extension Spring", d: "Located on sides, stretching during operation." },
                  { t: "Tracks", d: "Metal rails that guide the door panels." },
                  { t: "Rollers", d: "Wheel components riding inside tracks." },
                  { t: "Safety Sensors", d: "Infrared beams mounted near floor level." },
                  { t: "Limit Switches", d: "Settings controlling travel distance." },
                  { t: "Weather Seal", d: "Gaskets used to seal gaps from elements." },
                  { t: "Counterbalance", d: "System offsetting the heavy door weight." },
                  { t: "Headroom", d: "Vertical space between opening and ceiling." },
                  { t: "Backroom", d: "Depth of garage required for door travel." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 pb-3 border-b border-border/50">
                    <div className="font-bold text-primary text-[10px] uppercase min-w-[100px] tracking-widest">{item.t}</div>
                    <p className="text-[11px] text-muted-foreground leading-snug">{item.d}</p>
                  </div>
                ))}
              </div>
            )
          }
        ]
      },
      {
        id: "gd-roles",
        label: "Team & Support",
        icon: Users,
        sections: [
          {
            title: "7. Roles in a Garage Door Business",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { r: "Technician", s: "Mechanical aptitude, diagnostics, problem-solving" },
                  { r: "Installer", s: "Carpentry, precision measurement, assembly" },
                  { r: "CSR", s: "Communication, product knowledge, empathy" },
                  { r: "Dispatcher", s: "Logistics, geography, decision-making" },
                  { r: "Operations", s: "Vendor management, inventory, quality standards" },
                  { r: "Virtual Assistant", s: "Scheduling, follow-ups, data entry" }
                ].map((role, i) => (
                  <div key={i} className="p-4 border rounded-xl bg-muted/10 space-y-2">
                    <h4 className="font-bold text-foreground inline-block px-2 py-0.5 bg-primary/5 rounded text-[10px] uppercase tracking-wider">{role.r}</h4>
                    <p className="text-xs text-muted-foreground leading-tight italic">"{role.s}"</p>
                  </div>
                ))}
              </div>
            )
          }
        ]
      },
      {
        id: "gd-tools",
        label: "Equipment",
        icon: Target,
        sections: [
          {
            title: "8. Tools and Equipment",
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="p-4 border rounded-xl">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Hand Tools</h4>
                      <div className="flex flex-wrap gap-2 uppercase font-bold text-[9px] text-foreground opacity-70">
                        {["Wrenches", "Pliers", "Screwdrivers", "Level", "Hammer"].map(t => <span key={t} className="px-1.5 py-0.5 border rounded-md">{t}</span>)}
                      </div>
                   </div>
                   <div className="p-4 border rounded-xl bg-primary/[0.02]">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Specialized</h4>
                      <ul className="space-y-1 text-xs">
                         <li>• Winding Bars</li>
                         <li>• Torsion Calculator</li>
                         <li>• Cable Puller</li>
                      </ul>
                   </div>
                   <div className="p-4 border rounded-xl">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Supplies</h4>
                      <ul className="space-y-1 text-xs">
                         <li>• WD-40 / Lubricants</li>
                         <li>• Fasteners/Bolts</li>
                         <li>• Weatherstripping</li>
                      </ul>
                   </div>
                </div>

                <div className="p-5 border-2 border-dashed rounded-2xl flex flex-wrap gap-6 justify-center bg-destructive/[0.02]">
                   {[
                     { l: "Safety Glasses", i: Shield },
                     { l: "Work Gloves", i: ShieldCheck },
                     { l: "Steel Boots", i: Target },
                     { l: "Hard Hat", i: Shield }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                        <item.i className="w-5 h-5 text-destructive/40" />
                        <span className="text-[10px] font-bold text-destructive/60 uppercase">{item.l}</span>
                     </div>
                   ))}
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "gd-safety",
        label: "Security & Safety",
        icon: ShieldCheck,
        sections: [
          {
            title: "9. Safety and Best Practices",
            content: (
              <div className="space-y-4">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <h4 className="font-bold text-destructive mb-3 flex items-center gap-2 uppercase tracking-tight">
                    <AlertTriangle className="w-4 h-4" /> Non-Negotiable Safety Rules
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/80 italic">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" /> NEVER wind springs by hand; use winding bars.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" /> Replace springs in pairs – they age together.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" /> Maintain three points of contact on ladders.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" /> Disconnect power before wiring work.</li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl border space-y-2">
                   <h4 className="font-bold text-foreground text-xs uppercase">General Best Practices</h4>
                   <p className="text-xs text-muted-foreground">Keep work areas clear of clutter. Communicate clearly with customers to keep them away from moving systems. Never bypass safety sensors.</p>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "gd-importance",
        label: "Value & Standards",
        icon: Star,
        sections: [
          {
            title: "10. Importance of Professional Services",
            content: (
              <div className="space-y-6 text-muted-foreground">
                <p>Garage systems involve extreme tension and heavy components that present real dangers. Professional services ensure:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 border rounded-xl space-y-2">
                      <h4 className="font-bold text-foreground text-sm border-l-4 border-primary pl-3">Safety & Liability</h4>
                      <p className="text-xs leading-relaxed">Qualified pros carry insurance and follow code. DIY errors can void warranties and cause fatal accidents.</p>
                   </div>
                   <div className="p-4 border rounded-xl space-y-2">
                      <h4 className="font-bold text-foreground text-sm border-l-4 border-primary pl-3">Code Compliance</h4>
                      <p className="text-xs leading-relaxed">Installations must meet building codes and UL 325 safety standards for automatic openers.</p>
                   </div>
                </div>
                <div className="bg-primary/10 p-5 rounded-2xl flex items-center justify-between gap-6">
                   <div className="space-y-1">
                      <h4 className="font-bold text-primary">1,500+</h4>
                      <p className="text-[10px] text-primary/80 uppercase">Annual Cycles (Avg)</p>
                   </div>
                   <div className="w-px h-10 bg-primary/20" />
                   <div className="space-y-1">
                      <h4 className="font-bold text-primary">Precision</h4>
                      <p className="text-[10px] text-primary/80 uppercase">Root Cause Analysis</p>
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

export const docsData: Record<string, DocGroup[]> = {
  home: homeSections,
  onboarding: onboardingSections,
  assistance: assistanceSections,
  promptEngine: promptEngineeringSections,
  hvac: hvacSections,
  carpetCleaning: carpetCleaningSections,
  cleaningBusiness: cleaningBusinessSections,
  pestControl: pestControlSections,
  poolCleaning: poolCleaningSections,
  electricalServices: electricalServicesSections,
  lawnGarden: lawnGardenSections,
  plumbing: plumbingSections,
  handyman: handymanSections,
  homeRemodeling: homeRemodelingSections,
  garageDoor: garageDoorSections,
};

export const TOP_LINKS = [
  {
    id: "onboarding",
    label: "VA Onboarding Portal",
    icon: Home,
    title: "Onboarding Guide",
    desc: "VA Expectation & Responsibility",
  },
  {
    id: "home",
    label: "SOP Playbook",
    icon: BookOpen,
    title: "SOP Playbook",
    desc: "Standard Operating Procedures",
  },
  {
    id: "assistance",
    label: "Executive Assistance",
    icon: Users,
    title: "Executive Assistance",
    desc: "EA Patterns & Guidelines",
  },
  {
    id: "promptEngine",
    label: "Prompt Engineering",
    icon: Zap,
    title: "Prompt Engineering",
    desc: "Google Cloud Prompt Guide",
  },
  {
    id: "homeRemodeling",
    label: "Home Remodeling Business",
    icon: Home,
    title: "Home Remodeling Guide",
    desc: "Training Resource",
  },
  {
    id: "hvac",
    label: "HVAC Business",
    icon: Thermometer,
    title: "HVAC Knowledge Guide",
    desc: "Training Resource",
  },
  {
    id: "carpetCleaning",
    label: "Carpet Cleaning Business",
    icon: Sparkles,
    title: "Carpet Cleaning Guide",
    desc: "Training Resource",
  },
  {
    id: "cleaningBusiness",
    label: "Cleaning Business",
    icon: Star,
    title: "Cleaning Business Guide",
    desc: "Training Resource",
  },
  {
    id: "pestControl",
    label: "Pest Control Business",
    icon: Bug,
    title: "Pest Control Guide",
    desc: "Training Resource",
  },
  {
    id: "poolCleaning",
    label: "Pool Cleaning Business",
    icon: Waves,
    title: "Pool Cleaning Guide",
    desc: "Training Resource",
  },
  {
    id: "electricalServices",
    label: "Electrical Services Business",
    icon: Plug,
    title: "Electrical Services Guide",
    desc: "Training Resource",
  },
  {
    id: "lawnGarden",
    label: "Lawn & Garden Business",
    icon: Leaf,
    title: "Lawn & Garden Guide",
    desc: "Training Resource",
  },
  {
    id: "plumbing",
    label: "Plumbing Business",
    icon: Wrench,
    title: "Plumbing Knowledge Guide",
    desc: "Training Resource",
  },
  {
    id: "handyman",
    label: "Handyman & General Repair",
    icon: Wrench,
    title: "Handyman Knowledge Guide",
    desc: "Training Resource",
  },
  {
    id: "garageDoor",
    label: "Garage Door Service",
    icon: Wrench,
    title: "Garage Door Guide",
    desc: "Training Resource",
  },
];
