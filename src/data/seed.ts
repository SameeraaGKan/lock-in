import type { Deadline, Session } from '@/lib/types'

// Thanksgiving break 2026 plan (generated from the week-plan Sheet)
export const SEED_SESSIONS: Session[] = [
  {
    "id": "s1",
    "date": "2026-11-22",
    "start": "20:15",
    "end": "20:55",
    "task": "Download HW 1–4 (with your graded feedback) + HW 1–2 solutions into one folder",
    "category": "Admin",
    "done": false
  },
  {
    "id": "s2",
    "date": "2026-11-22",
    "start": "21:15",
    "end": "21:55",
    "task": "Log into Modern States, check how much of the Hist I + II courses is left. Order friend's bday stickers",
    "category": "Admin",
    "done": false
  },
  {
    "id": "s3",
    "date": "2026-11-22",
    "start": "22:15",
    "end": "22:30",
    "task": "Week-goals page with stickers",
    "category": "Journal",
    "done": false
  },
  {
    "id": "s4",
    "date": "2026-11-23",
    "start": "09:00",
    "end": "09:40",
    "task": "Ch 4.1 pumping lemma (regular). Close the book, write the lemma + proof template from memory",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+pumping+lemma+regular+languages",
    "done": false
  },
  {
    "id": "s5",
    "date": "2026-11-23",
    "start": "10:00",
    "end": "10:40",
    "task": "Ch 4.2–4.3 closure + decision properties. Make a 1-page summary sheet",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+closure+properties+regular+languages",
    "done": false
  },
  {
    "id": "s6",
    "date": "2026-11-23",
    "start": "11:00",
    "end": "11:40",
    "task": "Do 3 starred Ch 4 pumping-lemma exercises, then check them against the book site's starred solutions",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+pumping+lemma+example",
    "done": false
  },
  {
    "id": "s7",
    "date": "2026-11-23",
    "start": "13:00",
    "end": "13:40",
    "task": "Modern States Hist I: next units (videos at 1.5x + Check for Understanding quizzes)",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s8",
    "date": "2026-11-23",
    "start": "14:00",
    "end": "14:40",
    "task": "Hist I course continued, aim for half the course done today",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s9",
    "date": "2026-11-23",
    "start": "15:00",
    "end": "15:40",
    "task": "UT MSCS research: on-campus vs online; list 5 courses + 3 faculty matching AI/ML, agents, AI policy",
    "category": "Grad apps",
    "done": false
  },
  {
    "id": "s10",
    "date": "2026-11-23",
    "start": "16:00",
    "end": "16:40",
    "task": "Email 2–3 recommenders (UT app due Dec 15, letters Dec 20). Attach resume + a 5-bullet brag sheet",
    "category": "Grad apps",
    "done": false
  },
  {
    "id": "s11",
    "date": "2026-11-23",
    "start": "19:00",
    "end": "19:40",
    "task": "Run Lock In locally (npm install, npm run dev) and read through src/ so you can explain how it works",
    "category": "Project",
    "done": false
  },
  {
    "id": "s12",
    "date": "2026-11-23",
    "start": "20:00",
    "end": "20:40",
    "task": "List all design deliverables + deadlines, rough draft of design #1",
    "category": "ACM",
    "done": false
  },
  {
    "id": "s13",
    "date": "2026-11-23",
    "start": "21:15",
    "end": "21:30",
    "task": "Daily page",
    "category": "Journal",
    "done": false
  },
  {
    "id": "s14",
    "date": "2026-11-24",
    "start": "09:00",
    "end": "09:40",
    "task": "Ch 4.4 DFA equivalence + minimization (table-filling). Minimize 2 DFAs by hand",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+minimization+of+dfa",
    "done": false
  },
  {
    "id": "s15",
    "date": "2026-11-24",
    "start": "10:00",
    "end": "10:40",
    "task": "Ch 5.1 CFGs + derivations. Write grammars for aⁿbⁿ, palindromes, balanced parens",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+context+free+grammar",
    "done": false
  },
  {
    "id": "s16",
    "date": "2026-11-24",
    "start": "11:00",
    "end": "11:40",
    "task": "Ch 5.2–5.4 parse trees + ambiguity. Show a grammar is ambiguous, then fix it",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+ambiguous+grammar",
    "done": false
  },
  {
    "id": "s17",
    "date": "2026-11-24",
    "start": "13:00",
    "end": "13:40",
    "task": "Hist I course: finish the remaining units + quizzes",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s18",
    "date": "2026-11-24",
    "start": "14:00",
    "end": "14:40",
    "task": "Hist I: Modern States sample CLEP, review the misses",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s19",
    "date": "2026-11-24",
    "start": "15:00",
    "end": "15:40",
    "task": "Hist I: Modern States final exam (need 75%+) → hit Voucher Request right away (~2 business days)",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s20",
    "date": "2026-11-24",
    "start": "16:00",
    "end": "16:40",
    "task": "SOP outline: why an MS, why AI/ML + agents, Predica + hackathon wins, why UT specifically",
    "category": "Grad apps",
    "done": false
  },
  {
    "id": "s21",
    "date": "2026-11-24",
    "start": "19:00",
    "end": "19:40",
    "task": "Read the Project 3 spec + HW 6 prompt, sketch the code structure, start coding",
    "category": "OS",
    "done": false
  },
  {
    "id": "s22",
    "date": "2026-11-24",
    "start": "20:00",
    "end": "20:40",
    "task": "Collect feedback, design edits pass 1",
    "category": "WeHack",
    "done": false
  },
  {
    "id": "s23",
    "date": "2026-11-24",
    "start": "21:15",
    "end": "21:30",
    "task": "Daily page",
    "category": "Journal",
    "done": false
  },
  {
    "id": "s24",
    "date": "2026-11-25",
    "start": "09:00",
    "end": "09:40",
    "task": "Modern States Hist II: units (videos + quizzes)",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s25",
    "date": "2026-11-25",
    "start": "10:00",
    "end": "10:40",
    "task": "Hist II course continued",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s26",
    "date": "2026-11-25",
    "start": "11:00",
    "end": "11:40",
    "task": "Hist II course continued",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s27",
    "date": "2026-11-25",
    "start": "13:30",
    "end": "14:10",
    "task": "Ch 6.1–6.2 PDA definition, IDs, final-state vs empty-stack acceptance",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+pushdown+automata",
    "done": false
  },
  {
    "id": "s28",
    "date": "2026-11-25",
    "start": "14:30",
    "end": "15:10",
    "task": "Ch 6.3 CFG ↔ PDA equivalence. Convert 1 grammar into a PDA",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+cfg+to+pda+conversion",
    "done": false
  },
  {
    "id": "s29",
    "date": "2026-11-25",
    "start": "15:30",
    "end": "16:10",
    "task": "Build 3 PDAs for HW-style languages",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+pushdown+automata+example",
    "done": false
  },
  {
    "id": "s30",
    "date": "2026-11-25",
    "start": "16:30",
    "end": "17:10",
    "task": "Read every problem, map each to a chapter, solve the easiest one",
    "category": "HW 5",
    "done": false
  },
  {
    "id": "s31",
    "date": "2026-11-25",
    "start": "19:00",
    "end": "19:40",
    "task": "Project 3: core implementation",
    "category": "OS",
    "done": false
  },
  {
    "id": "s32",
    "date": "2026-11-25",
    "start": "20:00",
    "end": "20:40",
    "task": "Polish design #1, start design #2",
    "category": "ACM",
    "done": false
  },
  {
    "id": "s33",
    "date": "2026-11-25",
    "start": "21:15",
    "end": "21:30",
    "task": "Daily page",
    "category": "Journal",
    "done": false
  },
  {
    "id": "s34",
    "date": "2026-11-26",
    "start": "09:00",
    "end": "09:40",
    "task": "Ch 7.1 Chomsky Normal Form. Convert 2 grammars to CNF",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+chomsky+normal+form",
    "done": false
  },
  {
    "id": "s35",
    "date": "2026-11-26",
    "start": "10:00",
    "end": "10:40",
    "task": "Ch 7.2 CFL pumping lemma. 2 proofs (e.g. aⁿbⁿcⁿ)",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+pumping+lemma+context+free+languages",
    "done": false
  },
  {
    "id": "s36",
    "date": "2026-11-26",
    "start": "11:00",
    "end": "11:40",
    "task": "Ch 7.3–7.4 CFL closure + CYK. Run CYK on one string by hand",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+cyk+algorithm",
    "done": false
  },
  {
    "id": "s37",
    "date": "2026-11-26",
    "start": "13:00",
    "end": "13:40",
    "task": "Hist II course: finish the remaining units + quizzes",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s38",
    "date": "2026-11-26",
    "start": "14:00",
    "end": "14:40",
    "task": "Hist II: Modern States sample CLEP, review the misses",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s39",
    "date": "2026-11-26",
    "start": "15:00",
    "end": "15:40",
    "task": "Hist II: Modern States final exam (75%+) → request the voucher",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s40",
    "date": "2026-11-26",
    "start": "16:00",
    "end": "16:40",
    "task": "Solve 2 more problems",
    "category": "HW 5",
    "done": false
  },
  {
    "id": "s41",
    "date": "2026-11-26",
    "start": "19:00",
    "end": "19:40",
    "task": "Project 3: finish it + test the edge cases",
    "category": "OS",
    "done": false
  },
  {
    "id": "s42",
    "date": "2026-11-26",
    "start": "20:00",
    "end": "20:40",
    "task": "Design edits pass 2",
    "category": "WeHack",
    "done": false
  },
  {
    "id": "s43",
    "date": "2026-11-26",
    "start": "21:15",
    "end": "21:45",
    "task": "Thanksgiving gratitude spread with stickers 🦃",
    "category": "Journal",
    "done": false
  },
  {
    "id": "s44",
    "date": "2026-11-27",
    "start": "09:00",
    "end": "09:40",
    "task": "Both vouchers requested? Save the codes + write a winter-break CLEP study list from your weakest units",
    "category": "CLEP",
    "done": false
  },
  {
    "id": "s45",
    "date": "2026-11-27",
    "start": "10:00",
    "end": "10:40",
    "task": "Spaced review: redo HW 3–4 problems cold. Check against your graded feedback or send them to Claude",
    "category": "Automata",
    "done": false
  },
  {
    "id": "s46",
    "date": "2026-11-27",
    "start": "11:00",
    "end": "11:40",
    "task": "Spaced review: starred Ch 6–7 exercises, checked against the book's starred solutions",
    "category": "Automata",
    "done": false
  },
  {
    "id": "s47",
    "date": "2026-11-27",
    "start": "13:30",
    "end": "14:10",
    "task": "Ch 8.1–8.2 TM definition + IDs. Build a TM for 0ⁿ1ⁿ",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+turing+machine",
    "done": false
  },
  {
    "id": "s48",
    "date": "2026-11-27",
    "start": "14:30",
    "end": "15:10",
    "task": "Ch 8.3–8.4 TM techniques, multitape + nondeterministic TMs",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+multitape+turing+machine",
    "done": false
  },
  {
    "id": "s49",
    "date": "2026-11-27",
    "start": "15:30",
    "end": "16:10",
    "task": "Finish the remaining problems",
    "category": "HW 5",
    "done": false
  },
  {
    "id": "s50",
    "date": "2026-11-27",
    "start": "16:30",
    "end": "17:10",
    "task": "SOP rough draft v1 (just get words down)",
    "category": "Grad apps",
    "done": false
  },
  {
    "id": "s51",
    "date": "2026-11-27",
    "start": "19:00",
    "end": "19:40",
    "task": "Knock out HW 6, then submit Project 3 early if it's done",
    "category": "OS",
    "done": false
  },
  {
    "id": "s52",
    "date": "2026-11-27",
    "start": "20:00",
    "end": "20:40",
    "task": "Send Claude your Exam 3 slides/topics → generate the study guide, skim it once",
    "category": "SE",
    "done": false
  },
  {
    "id": "s53",
    "date": "2026-11-27",
    "start": "21:00",
    "end": "21:30",
    "task": "Buy bday stickers in person if they didn't ship + daily page",
    "category": "Journal",
    "done": false
  },
  {
    "id": "s54",
    "date": "2026-11-28",
    "start": "10:00",
    "end": "10:40",
    "task": "Ch 9.1–9.2 diagonalization + universal language, why L_u is undecidable",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=neso+academy+undecidability+halting+problem",
    "done": false
  },
  {
    "id": "s55",
    "date": "2026-11-28",
    "start": "11:00",
    "end": "11:40",
    "task": "Ch 9.3 reductions + Rice's theorem. 2 practice problems",
    "category": "Automata",
    "link": "https://www.youtube.com/results?search_query=rice%27s+theorem+undecidability",
    "done": false
  },
  {
    "id": "s56",
    "date": "2026-11-28",
    "start": "13:00",
    "end": "13:40",
    "task": "Clean write-up, double-check, get it submit-ready",
    "category": "HW 5",
    "done": false
  },
  {
    "id": "s57",
    "date": "2026-11-28",
    "start": "14:00",
    "end": "14:40",
    "task": "Finish design #2, send it for review",
    "category": "ACM",
    "done": false
  },
  {
    "id": "s58",
    "date": "2026-11-28",
    "start": "15:00",
    "end": "15:40",
    "task": "Make Lock In yours: tweak the tasks/colors, add the live link to the README",
    "category": "Project",
    "done": false
  },
  {
    "id": "s59",
    "date": "2026-11-29",
    "start": "10:00",
    "end": "10:40",
    "task": "Mixed no-notes set, 1 problem per chapter (Ch 4–9). Circle the weak spots",
    "category": "Automata",
    "done": false
  },
  {
    "id": "s60",
    "date": "2026-11-29",
    "start": "11:00",
    "end": "11:40",
    "task": "Venture Scholars app: final pass + submit (due 11/30)",
    "category": "Grad apps",
    "done": false
  },
  {
    "id": "s61",
    "date": "2026-11-29",
    "start": "13:00",
    "end": "13:40",
    "task": "UTD MSCS: make an account, doc checklist, request transcripts",
    "category": "Grad apps",
    "done": false
  },
  {
    "id": "s62",
    "date": "2026-11-29",
    "start": "14:00",
    "end": "14:40",
    "task": "Pin the Lock In repo on your GitHub profile + add it to your portfolio",
    "category": "Project",
    "done": false
  },
  {
    "id": "s63",
    "date": "2026-11-29",
    "start": "15:00",
    "end": "15:40",
    "task": "Skim both chapters + set a 2-day study plan for Dec 6–7",
    "category": "OBHR",
    "done": false
  },
  {
    "id": "s64",
    "date": "2026-11-29",
    "start": "20:00",
    "end": "20:30",
    "task": "Daily page + plan next week",
    "category": "Journal",
    "done": false
  },
  {
    "id": "s65",
    "date": "2026-11-29",
    "start": "22:00",
    "end": "22:15",
    "task": "LITMP check-in due",
    "category": "Admin",
    "done": false
  }
]

export const SEED_DEADLINES: Deadline[] = [
  {
    "id": "d1",
    "title": "Modern States courses (Hist I + II)",
    "date": "2026-11-26",
    "note": "Pass both finals (75%+) + request both vouchers"
  },
  {
    "id": "d2",
    "title": "Venture Scholars app",
    "date": "2026-11-30",
    "note": "Submit Sun 11/29"
  },
  {
    "id": "d3",
    "title": "SE Exam 3",
    "date": "2026-12-03",
    "note": "Prep Tue 12/1 – Wed 12/2 with the study guide"
  },
  {
    "id": "d4",
    "title": "OBHR Exam 3",
    "date": "2026-12-08",
    "note": "2 chapters, prep Sun 12/6 – Mon 12/7"
  },
  {
    "id": "d5",
    "title": "Automata E2 (Ch 4–9)",
    "date": "2026-12-09",
    "note": "Deep review Fri 12/4 – Sat 12/5"
  },
  {
    "id": "d6",
    "title": "OS Project 3",
    "date": "2026-12-09",
    "note": "Same day as E2, so aim to submit early"
  },
  {
    "id": "d7",
    "title": "OS Homework 6",
    "date": "2026-12-09",
    "note": "Same day as E2"
  },
  {
    "id": "d8",
    "title": "OS Exam 3 (Ch 9–12, 14)",
    "date": "2026-12-14",
    "note": "Open book/notes: tabbed notes binder + sample exam"
  },
  {
    "id": "d9",
    "title": "UT Austin CS grad app",
    "date": "2026-12-15",
    "note": "Aim to submit by ~12/12"
  },
  {
    "id": "d10",
    "title": "UT recommendation letters",
    "date": "2026-12-20",
    "note": "Ask recommenders Mon 11/23"
  },
  {
    "id": "d11",
    "title": "Automata HW 5",
    "date": "2026-12-09",
    "note": "Same day as E2, so submit early (plan has it ready Sat 11/28)"
  },
  {
    "id": "d12",
    "title": "CLEP US History I + II",
    "date": null,
    "note": "Winter break, with the voucher codes"
  }
]
