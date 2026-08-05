# Classroom Expansion Plan

## Goal
Increase students to 20, add homework questions and exams, and enhance teams with images and Messi/Ronaldo content.

## Changes

### 1. Students: 12 → 20 (`src/data/students.ts`)
- Add 8 new students (seats 13–20) with unique names, usernames, and passwords
- Keep existing 12 students unchanged
- IDs 13–20, seats 13–20

### 2. Homework Questions (`src/data/homework.ts`)
- Add 5+ new questions (total ~10) covering math, general knowledge, science, and Persian literature appropriate for 3rd grade
- Keep existing 5 questions unchanged
- Ensure `correctIndex` values are valid for the new options arrays

### 3. Exams (`src/data/exams.ts`)
- Activate locked exams (set `locked: false` for exams 2–4)
- Add 2+ new exams (e.g., "آزمون علوم", "آزمون ادبیات فارسی" with real content, or new subjects)
- Keep existing 4 exams, just change `locked` status and add new ones

### 4. Teams Enhancement (`src/data/teams.ts`)
- Keep the same 4 teams (messi, ronaldo, haaland, mbappe)
- Add `image` field to the `Team` interface and each team object (URL or local path to player images)
- Add more descriptive content about Messi and Ronaldo (bio, achievements, etc.)
- Update `Team` interface in `src/types.ts` if needed to include `image` field
- Update `TeamPicker.tsx` component to display team images

### 5. CSS Grid Adjustment (`src/index.css`)
- Current 4-column grid handles 20 students (5 rows) — no change needed for desktop
- Verify mobile breakpoint (3 columns) works for 20 students

### 6. README Update (`README.md`)
- Update "۱۲ صندلی" → "۲۰ صندلی"
- Update "۱۲ دانش‌آموز" → "۲۰ دانش‌آموز"
- Update "هر ۱۲ دانش‌آموز" → "هر ۲۰ دانش‌آموز"

## Files to Modify
- `src/data/students.ts` — add 8 students
- `src/data/homework.ts` — add 5+ questions
- `src/data/exams.ts` — activate locked + add new exams
- `src/data/teams.ts` — add images, Messi/Ronaldo content
- `src/types.ts` — add `image` to `Team` interface
- `src/components/TeamPicker.tsx` — render team images
- `README.md` — update student count references

## Verification
- Run `npm run build` to confirm TypeScript compilation
- Run `npm run dev` to verify classroom renders 20 seats correctly
- Verify homework questions cycle through all new questions
- Verify exams show as unlocked in profile view
- Verify team picker displays images