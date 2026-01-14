---
name: speedmooting-context
description: SpeedMooting project context including PRD, requirements, tech stack (React, Laravel, Tailwind, shadcn/ui), AI features (Vertex Gemini), and legal mooting domain knowledge. Use when working on SpeedMooting features, building new screens, implementing AI analysis, exercise management, user submission workflows, or any SpeedMooting-related development.
---

# SpeedMooting Project Context

Comprehensive project context for the SpeedMooting legal mooting practice platform.

## Quick Reference

**Project**: Speed Mooting
**Status**: Discovery
**Created**: January 5, 2026

**Tech Stack**:
- Frontend: React + Tailwind CSS + shadcn/ui
- Backend: Laravel + MySQL
- Admin Panel: Filament
- AI: Vertex Gemini (custom Laravel helper)
- Authentication: Laravel Sanctum
- Integration: Inertia

**Target Users**: Law students, Advocacy Club members preparing for moot court competitions

## Project Overview

SpeedMooting is an AI-powered platform designed to help law students practice and improve their mooting (mock court) skills. The platform allows users to:

- Upload video recordings of legal arguments
- Submit skeleton arguments and case files
- Receive AI-powered feedback on clarity, persuasiveness, and structure
- Track progress over multiple submissions
- Access legal subject guides and argument suggestions

The system uses Vertex Gemini AI to analyze video submissions, transcribe arguments, cross-check facts against uploaded case files, and provide detailed feedback based on customizable teaching rubrics.

## User Roles & Permissions

### Guest
- Read-only access to public content
- Cannot create or modify data

### Registered User
- Upload video submissions
- Submit skeleton arguments (Word/PDF)
- Upload legal case files
- Receive AI feedback and reports
- View submission history
- Export reports as PDFs
- Select exercises and topics

### Administrator
- Full access to manage users (CRUD operations)
- Create and edit exercises
- Manage teaching rubrics
- Customize AI feedback rules and guidelines
- Manage suggested topics and arguments
- Configure notification templates
- Access Filament admin panel

## Core Features

### Exercise Management
Administrators define mooting exercises with:
- **Exercise Title & Description**
- **Case Details**: Background, legal issues, court details
- **Arguments**: Key points for both sides
- **Rules**: Time limits, format requirements, precedents
- **Teaching Rubric**: Assessment criteria (Clarity, Persuasiveness, Structure, Knowledge of Law, Use of Authority)
- **Legal Subject & Keywords**: Categorization for AI guidance
- **Uploadable Case Files**: Reference materials for AI cross-checking

Exercises are categorized by:
- Legal subject (Contract Law, Criminal Law, etc.)
- Difficulty level (beginner, intermediate, advanced)
- Type (mock trial, negotiation)

### Video Analysis & AI Feedback
The AI system:
1. **Transcribes** uploaded video submissions
2. **Analyzes** arguments against predefined rules and guidelines
3. **Cross-checks** facts against skeleton arguments and case files
4. **Evaluates** using exercise-specific teaching rubrics
5. **Scores** based on:
   - Clarity (1-5): Language precision, coherence
   - Structure (1-5): Logical organization, flow
   - Relevance (1-5): Addressing the issue directly
   - Accuracy (1-5): Factual correctness
   - Use of Authority (1-5): Proper citations, legal precedents
   - Persuasiveness (1-5): Rhetorical effectiveness
   - Completeness (1-5): Addressing all key issues
6. **Generates** detailed feedback reports with:
   - Overall score
   - Rubric breakdown
   - Specific deductions with explanations
   - Video transcription
   - Suggestions for improvement

### Argument Analysis & Cross-Checking
The AI identifies and handles biased or misleading information through:
- **Source Verification**: Checking author credibility
- **Cross-Referencing**: Comparing with authoritative sources (Westlaw, LexisNexis, HeinOnline)
- **Fact-Checking**: Verifying claims against legal databases
- **Bias Detection**: NLP techniques to detect loaded language, logical fallacies
- **Citation Analysis**: Checking for proper, complete citations
- **Red Flag Indicators**: Outdated precedents, misrepresentation, selective omission

When issues are detected, the AI:
- Warns the user with explanations
- Offers alternative authoritative sources
- Lowers confidence scores

### Submission History
Users can:
- View all past submissions (retained for 3 years)
- Review historical AI feedback
- Track progress over time
- Export reports as PDFs
- Delete submissions (subject to data retention policy)

The system supports **multiple submissions per exercise**:
- Each submission is uniquely tracked
- Version numbers identify attempts
- Separate AI analysis for each submission
- Configurable submission limits per exercise

### Notifications
Users receive notifications when:
- AI report is ready (email + optional web notification)
- Contains: availability message, report link, exercise name, submission date

Administrators can customize:
- Email subject, body text, sender name, logo
- Dynamic content variables (user name, report name, link)
- Preview functionality

### Content Upload & Processing
Users can upload:
- **Video files**: Submissions for analysis
- **Skeleton arguments**: Word documents or PDFs
- **Legal case files**: Supporting documentation

Metadata captured:
- User ID, upload timestamp
- File name, file type
- Exercise name, topic selection
- User-provided description

Error handling includes:
- Retry mechanism for transient errors
- User notifications (in-app + email)
- Error logging and classification
- Fallback mechanisms (partial reports, manual review)

## Domain Knowledge: Legal Mooting

### What is Mooting?
Moot court is a simulated court proceeding where law students practice oral arguments before judges. Students prepare legal arguments on both sides of a case, citing precedents and statutes to support their positions.

### Speed Mooting System
A specific format for mooting practice developed by the Advocacy Club, with defined:
- Time limits
- Argument structure requirements
- Assessment criteria
- Legal subject focus areas

### Legal Jurisdiction
**Primary Focus**: England & Wales law
- Common law principles
- UK statutes and regulations
- Relevant EU law (where applicable)
- OSCOLA citation style for UK law

### Legal Subjects Covered
The AI prioritizes guidance on:
1. **Contract Law**: Offer, acceptance, consideration, breach, remedies
2. **Tort Law**: Negligence, intentional torts, product liability
3. **Criminal Law**: Elements of crimes, defenses, criminal procedure
4. **Constitutional Law**: Fundamental rights, separation of powers, judicial review
5. **Civil Procedure**: Jurisdiction, pleadings, discovery, trial practice
6. **Evidence Law**: Admissibility, relevance, witness examination
7. **Property Law**: Real property, personal property, intellectual property
8. **Administrative Law**: Agency powers, rulemaking, judicial review

### Assessment Criteria
Arguments are evaluated on:
- **Clarity**: Precise, understandable language without ambiguity
- **Persuasiveness**: Reasoned logic, addressing counterarguments
- **Structure**: Clear introduction, supporting points, conclusion
- **Knowledge of Law**: Understanding of legal principles
- **Use of Authority**: Proper citation and interpretation of precedents

## Technical Architecture

### Frontend (React)
- **Framework**: React 19.2.0
- **Styling**: Tailwind CSS 3.4.19
- **Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router 7.11.0
- **Animations**: Framer Motion 12.24.3
- **Icons**: Lucide React
- **State Management**: Context API (initially)

### Backend (Laravel)
- **Framework**: Laravel (latest stable)
- **Database**: MySQL
- **Admin Panel**: Filament
- **Authentication**: Laravel Sanctum
- **Frontend Integration**: Inertia
- **AI Integration**: Custom Vertex Gemini API helper

### Vertex Gemini AI Helper
Custom Laravel helper that:
- Queries Vertex Gemini AI with single method
- Returns structured JSON data
- Handles video analysis, transcription, legal document cross-checking
- Configured for specific output format for display and database storage

### AI Data Sources
**Prioritize** (Authoritative):
- Westlaw
- LexisNexis
- HeinOnline
- Official government publications (court websites, legislative databases)

**Permitted with caution** (Verify sources):
- Google Scholar (legal section only)

**Explicitly avoid** (Unreliable):
- Random websites, blogs, forums
- Non-authoritative legal information sources

All access must comply with licensing restrictions and usage agreements.

## Key Project Decisions

### Data Retention
- **Submission History**: 3 years retention period
- **Policies**: Legal compliance, storage costs, performance, user consent
- **User Controls**: View, download, delete their own data
- **Archiving**: Automated processes for old data
- **Anonymization**: For older sensitive data

### Customizable Feedback
Advocacy Club staff can customize:
1. **Teaching Rubrics**: Define criteria, weights, performance descriptions
2. **Rules & Guidelines**: Modify AI analysis rules, penalty severity
3. **Argument Libraries**: Build example argument repositories
4. **Exception Handling**: Manually review and override AI feedback
5. **Bias Mitigation**: Adjust sensitivity thresholds
6. **Feedback Templates**: Custom preface/closing remarks

### File Upload Limits
Size limits to be determined based on:
- Storage capacity
- Performance considerations
- Industry best practices
- Clear communication to users

### Future Considerations
- Moderator role (review user content, flag inappropriate material)
- Coach/Instructor role (provide specific feedback)
- Bulk import/export for topics/arguments
- AI model fine-tuning (advanced, requires AI expertise)
- Gradual expansion to other legal jurisdictions

## When to Use This Skill

Use this skill when:
- Building new SpeedMooting features or screens
- Implementing AI analysis workflows
- Creating exercise management interfaces
- Designing user submission flows
- Working with legal domain concepts
- Understanding project architecture decisions
- Need context on user roles and permissions
- Implementing notification systems
- Building admin panel features

## Reference

For complete PRD details, see [prd.md](prd.md) or the source PRD at `speed-mooting-prd-2026-01-06.md`.
