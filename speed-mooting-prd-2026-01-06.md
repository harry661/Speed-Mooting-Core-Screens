# Project Requirements Document

**Project:** Speed Mooting
**Created:** January 5, 2026
**Status:** Discovery

## Project Overview

<ul><li><p><strong>Admin Capabilities</strong></p><ul><li><p><strong>Exercise Management:</strong> A basic administrative portal allowing Advocacy Club staff to create and edit exercises.</p></li><li><p><strong>User Management:</strong> The functionality to manage user profiles, including create, read, update and delete users.</p></li></ul></li></ul><ul><li><p><strong>Rubric Application:</strong> The system will apply the specific teaching rubric associated with the selected exercise to generate structured feedback (e.g., assessing "Clarity," "Persuasiveness," and "Structure").</p></li></ul><p><strong>📼 Voice Recording:</strong> New User Registration System and Integration • 00:25 • Dec 15, 2025 2:57 PM</p><ul><li><p>Implement user registration with standard functionality</p></li><li><p>Include forgotten password, remember me, and secure password requirements</p></li><li><p>User registrations will be separate from the existing website initially</p></li><li><p>Future integration with the existing website user base to be considered</p></li></ul><p></p><p><strong>📼 Voice Recording:</strong> AI-Powered Video Analysis and Topic Generation • 02:02 • Dec 15, 2025 3:00 PM</p><ul><li><p>Upon registration, users can select existing topics or input their own.</p></li><li><p>The system will provide information on discussion points, themes and rules based on the speed mooting system.</p></li><li><p>Users can upload a video for AI analysis.</p></li><li><p>The AI will transcribe the video.</p></li><li><p>The AI will analyse the video against predefined rules and guidelines.</p></li><li><p>The AI will validate if the video meets the criteria.</p></li><li><p>The system will score the video based on adherence to guidelines, explaining any deductions.</p></li><li><p>Initial rules and guidelines will be based on existing Speed Mooting criteria.</p></li><li><p>The system will provide guides on legal subjects with AI-suggested topics and arguments.</p></li><li><p>The system will suggest interview questions with an option for manual scoring.</p></li><li><p>Tutorial links and help guides will be available.</p></li></ul><p></p><p><strong>📼 Voice Recording:</strong> AI Cross-Checking Skeleton Arguments for Accuracy • 00:12 • Dec 15, 2025 3:09 PM</p><ul><li><p>Enable users to upload skeleton arguments as Word documents or .pdf.</p></li><li><p>Implement cross-checking of skeleton arguments during AI analysis.</p></li><li><p>Verify the factual accuracy of user statements against the uploaded arguments.</p></li></ul><p></p><p><strong>📼 Voice Recording:</strong> AI Cross-Checking of Legal Case Files • 00:13 • Dec 15, 2025 3:11 PM</p><ul><li><p>Enhance AI cross-checking of skeleton arguments.</p></li><li><p>Enable uploading original case files.</p></li><li><p>Cross-check skeleton arguments against uploaded case files to ensure accuracy.</p></li></ul><p></p><p><strong>📼 Voice Recording:</strong> **User Submission History and AI Feedback** • 00:43 • Dec 15, 2025 3:12 PM</p><ul><li><p>Users can access their past video submissions.</p></li><li><p>Users can review historical AI-generated feedback.</p></li><li><p>Display AI feedback in a readable, structured layout on a responsive webpage.</p></li><li><p>Users can export reports as PDFs.</p></li></ul><p></p><p><strong>📼 Voice Recording:</strong> AI Report Ready Notifications • 00:27 • Dec 15, 2025 3:13 PM</p><ul><li><p>Send users an email notification when their report is ready.</p></li><li><p>Consider adding web notifications in addition to email notifications.</p></li></ul><p></p><p><strong>📼 Voice Recording:</strong> **Laravel Vertex Gemini AI Helper** • 00:15 • Jan 5, 2026 3:11 PM</p><ul><li><p>Create a Vertex Gemini API Helper in Laravel.</p></li><li><p>Enable querying AI within the application using a single method.</p></li></ul><p></p><p><strong>📼 Voice Recording:</strong> Vertex Helper &amp; Structured JSON Data • 00:30 • Jan 5, 2026 3:13 PM</p><ul><li><p>Configure Vertex Helper to return data in a specific JSON format.</p></li><li><p>The system will use the JSON data to display information.</p></li><li><p>The system will use the JSON data to store information in the database.</p></li></ul><p></p>

## Target Platforms & Frameworks

- **Web**: React
- **API**: Laravel
- **Admin Panel**: Filament
- **Backend**: Laravel
- **Database**: MySQL
- **Styling**: Tailwind CSS
- **UI/UX**: shadcn/ui
- **Authentication**: Laravel Sanctum
- **Web Framework Integration**: Inertia

## User Types

### Guest
Unauthenticated visitor with read-only access to public content. Cannot create or modify data.

### Registered User
Authenticated user with access to core features. Can upload videos, submit arguments, and review AI feedback.

### Administrator
Authenticated user with administrative privileges to manage users, exercises, and system settings within the admin panel.

## Project Decisions

*Decisions made during the discovery process.*

- **Are the core functionalities that the Advocacy ...**: The core functionalities for Advocacy Club staff are Exercise Management (create and edit exercises) and User Management (create, read, update, and delete users).
- **There any specific legal research databases or ...**: The AI's access to legal research databases should be carefully controlled. It should prioritize reputable and authoritative sources like Westlaw, LexisNexis, HeinOnline, and official government publications (e.g., official court websites, legislative databases). Access to open-source legal databases like Google Scholar (specifically the legal section) can be permitted but with caution, ensuring the AI can differentiate between peer-reviewed sources and less reliable information. The AI should be explicitly programmed to avoid unreliable or non-authoritative sources such as random websites, blogs, or forums where legal information may be inaccurate or misleading. Furthermore, access to legal databases should adhere to any licensing restrictions and usage agreements.
- **Should user roles and permissions be structured...**: Based on the context, the user roles should include: Guest (read-only access), Registered User (access to core features like video upload and AI feedback), and Administrator (full access to manage users, exercises, and system settings). Permissions should be structured so that Administrators can manage all aspects of the platform, Registered Users can only access and modify their own data and interact with exercises, and Guests have read-only access to public content.
- **Are the key elements of an exercise that Advoca...**: The key elements of an exercise that Advocacy Club staff need to define include:

1.  **Exercise Title:** A descriptive name for easy identification.
2.  **Description:** A summary of the exercise's purpose and objectives.
3.  **Case Details:** The factual background, relevant legal issues, and any simulated court or tribunal details.
4.  **Arguments (For and Against):** Outline the key arguments that participants should address, including both sides of the issue. These might be pre-defined points or open-ended guidance.
5.  **Rules:** Specific rules, constraints, or guidelines for the exercise (e.g., time limits, format requirements, specific legal precedents to follow or avoid). This aligns with the "predefined rules and guidelines" for AI analysis mentioned in the project overview.
6.  **Teaching Rubric:** The specific assessment criteria that the AI will use to provide feedback (e.g., Clarity, Persuasiveness, Structure, Knowledge of Law, Use of Authority). This directly aligns with the requirement for "Rubric Application".
7.  **Legal Subject & Relevant Topic/Keywords:** Categorization to assist the AI in providing relevant guidance and suggesting arguments. It will also help in topic suggestions to the user during video uploads.
8. **Uploadable Case Files**: The related and relevant information so that it can be included in the AI cross-checking of legal case files.
- **Will the AI identify and handle potentially bia...**: To identify and handle potentially biased or misleading information within uploaded legal case files, the AI will employ a multi-faceted approach:

1.  **Source Verification:** The AI will attempt to verify the source and author of the legal case file. If the source is unknown or questionable (e.g., not from a reputable court or legal publisher), the AI will flag it with a lower confidence score and a warning to the user.
2.  **Cross-Referencing with Authoritative Sources:** The AI will compare the information in the uploaded case file with information from known authoritative sources (Westlaw, LexisNexis, HeinOnline, official government publications). Discrepancies between the uploaded file and these authoritative sources will be flagged.
3.  **Fact-Checking:** The AI will employ fact-checking algorithms to assess the accuracy of factual claims made within the legal case file. This will involve searching for corroborating evidence or conflicting information in reputable legal databases and news sources.
4.  **Bias Detection:** The AI will be trained to identify potentially biased language or arguments. This will involve using Natural Language Processing (NLP) techniques to detect loaded words, emotional appeals, logical fallacies, and other rhetorical devices that could indicate bias. Any detected bias will be noted in the AI feedback report.
5.  **Citation Analysis:** The AI will analyze the citations within the uploaded case file. If the citations are missing, incomplete, or appear to be cherry-picked to support a particular argument, this will be flagged as a potential issue.
6.  **Red Flag Indicators:** The AI will maintain a list of "red flag" indicators that suggest potential bias or misleading information. Examples include: reliance on outdated legal precedents, misrepresentation of facts, selective omission of relevant information, and appeals to emotion over reason.

When the AI detects potentially biased or misleading information, it will:

*   **Provide a warning to the user:** The AI feedback report will include a clear warning that the uploaded case file may contain biased or misleading information.
*   **Explain the basis for the warning:** The AI will explain the specific reasons why it believes the information may be biased or misleading (e.g., citing specific examples of biased language or inaccurate facts).
*   **Offer alternative perspectives:** The AI will provide links to authoritative sources or alternative viewpoints that users can consult to get a more balanced understanding of the legal issues.
*   **Lower the confidence score:** The AI will lower the confidence score of its overall assessment to reflect the uncertainty introduced by the potentially biased information.

It is crucial to emphasize that the AI is not intended to replace human judgment. Its role is to assist users in identifying potential issues and making informed decisions. Users should always carefully review the AI feedback and consult with qualified legal professionals before relying on any legal information.
- **Criteria should the AI use to evaluate the qual...**: The AI should evaluate the quality and effectiveness of arguments based on the following criteria:

1.  **Clarity:** How clearly and concisely the argument is presented. Is the language precise and easy to understand? Does the argument avoid ambiguity and vagueness?

2.  **Structure:** How logically the argument is organized. Does the argument have a clear beginning, middle, and end? Does the argument flow smoothly and logically from one point to the next? Is there a clear chain of reasoning?

3.  **Relevance:** How relevant the argument is to the case details and the specific issue being addressed. Does the argument directly address the question at hand? Does the argument avoid irrelevant or tangential points?

4.  **Accuracy:** How factually accurate the argument is. Are the claims supported by evidence? Are the sources reliable and authoritative? Are there any factual errors or misrepresentations?

5.  **Use of Authority:** How effectively the argument uses legal authority (e.g., case law, statutes, regulations). Are the authorities properly cited? Are the authorities properly interpreted and applied to the facts of the case?

6.  **Persuasiveness:** How persuasive the argument is. Does the argument appeal to reason and logic? Does the argument anticipate and address counterarguments? Does the argument use rhetorical devices effectively?

7. **Completeness:** How comprehensive the argument is. Does the argument address all the key issues and arguments raised by the opposing side? Does the argument provide a thorough and well-reasoned analysis of the relevant legal principles?

8. **Originality/Creativity:** (Optional - Use carefully) Does the argument demonstrate original thought or a creative approach to the problem? Does the argument offer a novel or insightful perspective?

These criteria align with the project's focus on applying teaching rubrics (Clarity, Persuasiveness, Structure) and cross-checking arguments for accuracy against legal case files. The AI should be trained to identify and assess these elements in the arguments presented by users.
- **Specific information should the AI feedback rep...**: The AI feedback reports should include: a score based on adherence to guidelines, explanations of any deductions, transcription of the video, analysis of the video against predefined rules and guidelines, assessment against the selected exercise's teaching rubric (Clarity, Persuasiveness, and Structure) and suggestions for improvement.
- **Long should user submission history be retained...**: The duration for which user submission history is retained should be determined based on a combination of factors, including storage capacity, performance considerations, user needs, and legal/regulatory requirements. Here's a breakdown:

*   **Recommended Retention Period:** A reasonable starting point is to retain user submission history for a period of **3 years**. This allows users to track their progress over time and provides sufficient data for analysis and improvement. However, it is critical to define this in a policy and communicate it to the users.
*   **Data Retention Policies to Consider:**
    *   **Legal and Regulatory Compliance:** Check for any legal or regulatory requirements regarding data retention for educational or training purposes. Some jurisdictions may have specific rules about how long user data must be stored.
    *   **Storage Costs:** Factor in the cost of storing the user submission history. Video files, in particular, can consume significant storage space. Consider implementing a tiered storage system, where older data is archived to less expensive storage.
    *   **Performance:** As the amount of data grows, it can impact the performance of the application. Regularly archive or delete older data to maintain optimal performance.
    *   **User Consent:** Obtain user consent for data retention and provide them with the option to delete their submission history. This enhances transparency and builds trust.
    *   **Data Minimization:** Only retain the data that is necessary for the intended purpose. Avoid collecting or storing data that is not directly relevant to the Speed Mooting exercises.
    *   **Privacy Policies:** Ensure that the data retention policy is clearly stated in the application's privacy policy and that users are informed about how their data is being used and protected.
    *   **Anonymization/Pseudonymization:** Consider anonymizing or pseudonymizing older data to reduce the risk of re-identification. This is particularly important if the data contains sensitive information.
*   **Implementation Steps:**
    1.  **Define a Data Retention Policy:** Clearly document the data retention policy, including the retention period, the criteria for deleting or archiving data, and the procedures for handling user requests for data deletion.
    2.  **Implement Automated Data Archiving/Deletion:** Implement automated processes to archive or delete data according to the defined policy. This ensures consistent and reliable data management.
    3.  **Provide User Controls:** Provide users with the ability to view, download, and delete their submission history. This empowers users to control their data.
    4.  **Monitor and Review:** Regularly monitor and review the data retention policy and processes to ensure they are effective and compliant with any changes in legal or regulatory requirements.

By carefully considering these factors and implementing a well-defined data retention policy, the Speed Mooting platform can effectively manage user submission history while protecting user privacy and complying with all applicable regulations.
- **Events should trigger notifications, and what i...**: The primary event that should trigger a notification is when the AI report is ready. The notification should contain a clear message indicating that the report is available, a link to access the report, and potentially the exercise name and submission date for context.
- **Types of files will users be able to upload, an...**: Users will be able to upload video files, skeleton arguments (Word documents or PDFs), and legal case files. Specific size limits for each file type should be determined based on storage capacity and performance considerations. Industry best practice is to define reasonable limits and communicate these to users.
- **Types of legal subject guides should the AI pri...**: The AI should prioritize legal subject guides covering fundamental and frequently encountered areas of law relevant to mooting and legal education. Specifically, the AI should prioritize legal subject guides on the following areas:

1.  **Contract Law:** Covering offer, acceptance, consideration, breach, and remedies.
2.  **Tort Law:** Including negligence, intentional torts, and product liability.
3.  **Criminal Law:** Focusing on elements of crimes, defenses, and criminal procedure.
4.  **Constitutional Law:** Covering fundamental rights, separation of powers, and judicial review.
5.  **Civil Procedure:** Addressing jurisdiction, pleadings, discovery, and trial practice.
6.  **Evidence Law:** Covering admissibility of evidence, relevance, and witness examination.
7.  **Property Law:** Including real property, personal property, and intellectual property.
8.  **Administrative Law:** Focusing on agency powers, rulemaking, and judicial review of agency action.

Within each subject area, the AI should also suggest topics related to current events and emerging legal issues. This will help users stay up-to-date on the latest developments in the law and prepare for moot court competitions that often involve novel legal questions.
- **Type of AI models are we using with the Vertex ...**: The project uses Vertex Gemini AI models accessed via a custom Laravel API helper. The specific models employed for video analysis, transcription, legal document cross-checking, and argument evaluation aren't explicitly named in the project overview, but the system leverages Vertex Gemini for these tasks. The configuration is set to return data in a specific JSON format for display and storage.
- **Will the system handle errors during video anal...**: The system will handle errors during video analysis in the following ways:

1.  **Error Detection:** The system will implement robust error handling to catch exceptions and unexpected conditions during the AI analysis process. This includes network errors, file processing errors, AI model errors, and database errors.

2.  **Logging:** All errors will be logged with detailed information, including the timestamp, user ID, file name, error message, and stack trace. This will aid in debugging and identifying recurring issues.

3.  **Retry Mechanism:** For transient errors (e.g., temporary network issues), the system will implement a retry mechanism with exponential backoff. This will allow the analysis to resume automatically without user intervention.

4.  **User Notification:** Users will be informed of errors through a combination of methods:

    *   **In-App Notification:** A clear and concise error message will be displayed within the user interface, explaining that the video analysis failed. The message should avoid technical jargon and provide helpful guidance to the user (e.g., "Video analysis failed. Please try again later. If the problem persists, contact support.").
    *   **Email Notification:** An email notification will be sent to the user, providing more detailed information about the error. This email can include the error message, the file name, and steps the user can take to resolve the issue (e.g., re-uploading the video, checking the file format, contacting support).

5.  **Error Classification:** The system will attempt to classify errors based on their severity and cause. This will allow the system to provide more specific and helpful error messages to users.

6.  **Fallback Mechanism:** In the event of a critical error that prevents the AI analysis from completing, the system will implement a fallback mechanism. This may involve:

    *   **Partial Report:** Providing the user with a partial report based on the data that was successfully analyzed before the error occurred.
    *   **Manual Review:** Flagging the video for manual review by an administrator or expert. The administrator can then manually analyze the video and provide feedback to the user.

7.  **Support Contact:** Provide a clear and easy way for users to contact support if they encounter errors that they cannot resolve on their own. This can include a link to a help center, an email address, or a phone number.

By implementing these error handling and notification mechanisms, the system can effectively manage errors during video analysis and provide a positive user experience, even when things go wrong.
- **Will administrators manage and update the list ...**: Administrators will manage and update the list of suggested topics and arguments through the Filament admin panel. This interface should provide CRUD (Create, Read, Update, Delete) functionality for both topics and arguments. Specifically:

1.  **Topic Management:** Administrators should be able to add new topics, edit existing topics (e.g., change the title, description, associated themes), and delete topics that are no longer relevant. The system should allow for categorizing topics based on legal subjects (e.g., Contract Law, Criminal Law, Constitutional Law) to ensure relevance.

2.  **Argument Management:** Administrators should be able to add arguments for both sides of a given topic. This would involve creating new argument entries, associating them with a specific topic, editing the argument text, and deleting arguments. Each argument entry should allow specification of whether it is a 'for' or 'against' argument. Consider adding a 'source' field for each argument to cite legal precedents or scholarly articles. Arguments should be version controlled (allowing administrators to view previous iterations). A 'status' field could indicate whether the argument is approved or pending review.

3.  **Search and Filtering:** The admin interface should include search and filtering capabilities to easily find specific topics or arguments. Filtering should be possible by legal subject, keywords, and status (e.g., approved, pending review).

4.  **Bulk Import/Export (Optional):** Depending on the scale of content management, consider implementing bulk import and export functionality (e.g., using CSV files) to facilitate the addition or modification of large numbers of topics and arguments.

5. **AI Topic Suggestions Integration**: The administrator interface may include functionality to review and approve AI-suggested topics and arguments before they are made available to users. This ensures the quality and accuracy of the AI-generated content.

6. **Governance**: Implement a governance and approval workflow for new suggestions and updates to arguments.
- **Can the Advocacy Club staff customize the feedb...**: To enable Advocacy Club staff to customize the feedback provided by the AI, several mechanisms can be implemented:

1.  **Customizable Teaching Rubrics:** Within the Exercise Management section of the administrative portal (Filament panel), staff should be able to define and edit teaching rubrics for each exercise. This includes specifying the assessment criteria (e.g., Clarity, Persuasiveness, Structure, Knowledge of Law, Use of Authority), their relative weights, and detailed descriptions of what constitutes excellent, good, fair, and poor performance for each criterion. This approach is directly related to the 'Rubric Application' feature and the administrative 'Exercise Management' requirement. Furthermore, the staff should have the option to select a default rubric to be associated with all new exercises to save time in setup.

2.  **Rule and Guideline Customization:** The administrative portal should allow staff to modify the 'predefined rules and guidelines' used by the AI during video analysis. This could involve adding new rules, editing existing rules, or adjusting the severity of penalties for violating specific rules. This aligns with the AI analysis of video against predefined rules.

3.  **Argument Libraries:** Provide staff the capability to build and maintain libraries of arguments (for and against) that the AI can use as examples or benchmarks during its analysis. The staff could categorize arguments by legal subject and topic, making it easier for the AI to suggest relevant arguments to users.

4.  **Exception Handling and Overrides:** Allow staff to manually review and override the AI's feedback in certain cases. This is particularly important when dealing with edge cases or nuanced legal issues where the AI's judgment may be flawed. The system should log all manual overrides for auditing purposes.

5.  **Bias Mitigation Configuration:** Provide staff with options to adjust the AI's sensitivity to potentially biased or misleading information. This could involve adjusting the thresholds for flagging questionable sources or customizing the list of "red flag" indicators.

6.  **Feedback Templates:** Offer the ability for the staff to define templates to allow a custom preface or closing remarks to the generated feedback. These templates can be general or specific to certain areas of the exercise.

7.  **AI Model Fine-Tuning (Advanced):** In the future, consider allowing staff to fine-tune the AI model itself using a curated dataset of exercises and feedback. This would require significant technical expertise but could lead to more accurate and relevant feedback over time. This should only be considered once the initial system is validated as staff expertise might be limited to configure a model without AI engineers.
- **Data points from the AI analysis are most impor...**: The most important data points to display are: the overall score, the breakdown of the score based on the rubric criteria (Clarity, Persuasiveness, Structure), specific deductions made by the AI with explanations, a transcription of the video, and suggested improvements.
- **Metadata, if any, should be captured during the...**: Metadata to capture during the upload process should include: user ID, upload timestamp, file name, file type, exercise name (if applicable), topic selection (if applicable), and potentially a brief description provided by the user.
- **There specific legal jurisdictions or areas of ...**: Yes, while the platform should ideally be adaptable to various legal jurisdictions, initial training of the AI should focus on the legal system most relevant to the Advocacy Club's primary area of focus or the jurisdiction where the speed mooting exercises are commonly based. Given that the Advocacy Club is based in the UK, the AI should be trained on the law of England and Wales, including common law principles, statutes, and relevant EU law (to the extent it still applies or is relevant). The training should also cover relevant legal citation styles (e.g. OSCOLA for UK law) to ensure accurate citation analysis. It is very important that during the initial training phase, the AI is made aware of any important regional differences. Also, the training of the AI can grow over time to include more legal systems.
- **Should the system handle multiple submissions f...**: The system should allow multiple submissions for the same exercise, enabling users to iterate on their performance and improve based on AI feedback. Each submission should be treated as a separate and distinct attempt, with its own AI analysis and feedback report. To manage these multiple submissions effectively:

1.  **Submission Tracking:** Each submission should be uniquely identified and associated with the user, the exercise, and a timestamp. This allows the system to track the submission history for each user and exercise.
2.  **Versioning:** Implement a versioning system for submissions. Each time a user submits a new attempt for the same exercise, it creates a new version. The system should clearly display the version number or submission date/time to the user. This allows users to differentiate between multiple attempts and easily find specific submissions.
3.  **Storage and Access:** All submissions should be stored and made accessible to the user. The user interface should provide a clear and intuitive way to browse through their submission history for each exercise.
4.  **AI Feedback Association:** Each submission should have its own associated AI feedback report. The feedback should be specific to the content and timestamp of that submission. Users should be able to easily access and review the AI feedback for each individual attempt.
5.  **Data Management:** Ensure efficient storage and retrieval of multiple submissions, taking into account storage capacity and performance considerations. Implement archiving or deletion policies for older submissions if needed.
6.  **User Interface:** The user interface for viewing submission history should include:
    *   A list of all submissions for the selected exercise, ordered by submission date/time (newest first).
    *   Clear indication of the version number or submission timestamp.
    *   A link to view the AI feedback report for each submission.
    *   A preview or summary of the submission (e.g., video thumbnail, argument title).
    *   Options to download or delete individual submissions (subject to data retention policies).
7. **Limiting Submissions:** It is a good practice to limit the number of submissions allowed for a single exercise. This prevents abuse and encourages users to focus on improving their best attempts. This limit should be configurable by an administrator.

By implementing these strategies, the system can effectively handle multiple submissions for the same exercise, providing users with a valuable tool for improving their skills and performance.
- **Will user accounts be created, and what informa...**: User accounts will be created through a standard registration process that includes a form requesting information such as: Full Name, Email Address, Password (with secure password requirements), and potentially affiliation (e.g., university, organization). The system will implement user registration with standard functionality and include forgotten password and remember me features.
- **Specific metrics should be used to measure the ...**: The effectiveness of arguments during video analysis should be measured using a combination of quantitative and qualitative metrics, directly related to the criteria used to evaluate argument quality. These metrics should be derived and calculated by the AI during video analysis. The metrics should include:

1.  **Clarity Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the AI's assessment of how easy it is to understand the argument. Factors influencing this score include sentence complexity, use of jargon, and overall coherence. The AI can calculate this score by analysing the transcript and penalizing use of ambiguous language and convoluted sentence structures.

2.  **Structure Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the AI's assessment of the logical flow and organization of the argument. Factors influencing this score include the presence of a clear introduction, supporting points, and conclusion. The AI can look for signal words indicating structure such as 'firstly', 'secondly', 'in conclusion' to assist with scoring.

3.  **Relevance Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the degree to which the argument directly addresses the issue at hand. This involves comparing the argument's content to the case details and exercise objectives defined by the Advocacy Club staff. The AI cross-references the arguments extracted from the video against the case details and known keywords. Arguments that deviate significantly are penalized.

4.  **Accuracy Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the factual correctness of the argument. This involves comparing claims made in the argument to authoritative legal sources and uploaded case files. If inconsistencies or errors are found, the score is reduced. This builds upon the requirement for "AI Cross-Checking Skeleton Arguments for Accuracy" and "AI Cross-Checking of Legal Case Files".

5.  **Use of Authority Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the appropriate and effective use of legal precedents, statutes, and regulations. The AI should check for proper citations and the accurate interpretation of legal authorities. Absence of citations or misinterpretation leads to score deductions. The AI should prioritize reputable and authoritative sources like Westlaw, LexisNexis, HeinOnline, and official government publications.

6.  **Persuasiveness Assessment:** (Qualitative and Quantitative) - This is a more subjective assessment based on the AI's analysis of rhetorical devices, logical reasoning, and emotional appeals used in the argument. A quantitative score (e.g., 1-5) can be assigned based on the presence and effectiveness of persuasive techniques, accompanied by a qualitative explanation of why the argument was or was not persuasive. The AI should identify logical fallacies or instances of biased language to lower the persuasiveness score.

7. **Completeness Assessment:** (Qualitative and Quantitative) - Assesses how well all relevant issues are addressed, and counter-arguments are considered. Score could be determined by identifying if the main topics and arguments as supplied by the exercise details and supporting arguments have been considered in the video submission. 

8.  **Qualitative Feedback:** (Qualitative) - In addition to the quantitative scores, the AI should provide specific, actionable feedback on areas where the argument could be improved. This feedback should be tailored to the individual student and the specific exercise requirements. This should be displayed in a readable and structured format as detailed under the user submission history requirements.

The AI feedback reports should include a combination of these quantitative metrics and qualitative feedback, providing a comprehensive assessment of the argument's effectiveness. These reports can be exported as PDFs as requested in the initial prompt.
- **Will the AI handle legal terminology and jargon...**: The AI should utilize a legal-specific natural language processing (NLP) model and terminology database to accurately identify and interpret legal jargon. This includes maintaining a glossary of terms, understanding contextual usage, and potentially flagging ambiguous or outdated terminology. The AI should also cross-reference the terminology against the uploaded case files for consistency and accuracy.
- **Options should administrators have for customiz...**: Administrators should have the ability to customize the email subject, body text, sender name, and logo. They should also be able to configure variables for dynamic content insertion, such as user name, report name, and link to the report. A preview function would allow admins to verify the appearance of the customized email.
- **Should exercises be categorized and organized w...**: Exercises should be categorized by legal subject (e.g., contract law, criminal law), difficulty level (e.g., beginner, intermediate, advanced), and type (e.g., mock trial, negotiation). A hierarchical folder structure or tagging system could be used for organization, with search and filtering capabilities for easy access.
- **Should the Advocacy Club staff manage and updat...**: The exercise management module should include a dedicated section for rubric management. Advocacy Club staff should be able to create new rubrics, edit existing rubrics, and associate rubrics with specific exercises. Version control and a clear audit trail for rubric changes would be beneficial.
- **There a need for user roles beyond standard 'us...**: Potentially. Consider a 'Moderator' role with privileges to review user-submitted content and flag inappropriate material. A 'Coach' or 'Instructor' role could also be useful for providing specific feedback or guidance to users on their submissions. These roles would require more granular permission control within the system.
- **Tutorials need to be linked**: Tutorials should cover: How to upload videos, how to submit skeleton arguments, how to interpret AI feedback, how to navigate the user interface, how to select topics, understanding the speed mooting system rules, and guides on legal subjects. These should be easily accessible and searchable.

## Requirements

*Detailed requirements will be generated from answered questions when requested.*

## User Stories

*User stories will be generated when requested.*

## Technical Specifications

*Technical details will be generated when requested.*



## Questions & Responses

**Q:** What are the core functionalities that the Advocacy Club staff need from the platform?
**A:** The core functionalities for Advocacy Club staff are Exercise Management (create and edit exercises) and User Management (create, read, update, and delete users).

**Q:** Are there any specific legal research databases or resources the AI should prioritize or avoid when providing guidance?
**A:** The AI's access to legal research databases should be carefully controlled. It should prioritize reputable and authoritative sources like Westlaw, LexisNexis, HeinOnline, and official government publications (e.g., official court websites, legislative databases). Access to open-source legal databases like Google Scholar (specifically the legal section) can be permitted but with caution, ensuring the AI can differentiate between peer-reviewed sources and less reliable information. The AI should be explicitly programmed to avoid unreliable or non-authoritative sources such as random websites, blogs, or forums where legal information may be inaccurate or misleading. Furthermore, access to legal databases should adhere to any licensing restrictions and usage agreements.

**Q:** How should user roles and permissions be structured to ensure data security and appropriate access levels?
**A:** Based on the context, the user roles should include: Guest (read-only access), Registered User (access to core features like video upload and AI feedback), and Administrator (full access to manage users, exercises, and system settings). Permissions should be structured so that Administrators can manage all aspects of the platform, Registered Users can only access and modify their own data and interact with exercises, and Guests have read-only access to public content.

**Q:** What are the key elements of an exercise that Advocacy Club staff need to define (e.g., case details, arguments, rules)?
**A:** The key elements of an exercise that Advocacy Club staff need to define include:

1.  **Exercise Title:** A descriptive name for easy identification.
2.  **Description:** A summary of the exercise's purpose and objectives.
3.  **Case Details:** The factual background, relevant legal issues, and any simulated court or tribunal details.
4.  **Arguments (For and Against):** Outline the key arguments that participants should address, including both sides of the issue. These might be pre-defined points or open-ended guidance.
5.  **Rules:** Specific rules, constraints, or guidelines for the exercise (e.g., time limits, format requirements, specific legal precedents to follow or avoid). This aligns with the "predefined rules and guidelines" for AI analysis mentioned in the project overview.
6.  **Teaching Rubric:** The specific assessment criteria that the AI will use to provide feedback (e.g., Clarity, Persuasiveness, Structure, Knowledge of Law, Use of Authority). This directly aligns with the requirement for "Rubric Application".
7.  **Legal Subject & Relevant Topic/Keywords:** Categorization to assist the AI in providing relevant guidance and suggesting arguments. It will also help in topic suggestions to the user during video uploads.
8. **Uploadable Case Files**: The related and relevant information so that it can be included in the AI cross-checking of legal case files.

**Q:** How will the AI identify and handle potentially biased or misleading information within the uploaded legal case files?
**A:** To identify and handle potentially biased or misleading information within uploaded legal case files, the AI will employ a multi-faceted approach:

1.  **Source Verification:** The AI will attempt to verify the source and author of the legal case file. If the source is unknown or questionable (e.g., not from a reputable court or legal publisher), the AI will flag it with a lower confidence score and a warning to the user.
2.  **Cross-Referencing with Authoritative Sources:** The AI will compare the information in the uploaded case file with information from known authoritative sources (Westlaw, LexisNexis, HeinOnline, official government publications). Discrepancies between the uploaded file and these authoritative sources will be flagged.
3.  **Fact-Checking:** The AI will employ fact-checking algorithms to assess the accuracy of factual claims made within the legal case file. This will involve searching for corroborating evidence or conflicting information in reputable legal databases and news sources.
4.  **Bias Detection:** The AI will be trained to identify potentially biased language or arguments. This will involve using Natural Language Processing (NLP) techniques to detect loaded words, emotional appeals, logical fallacies, and other rhetorical devices that could indicate bias. Any detected bias will be noted in the AI feedback report.
5.  **Citation Analysis:** The AI will analyze the citations within the uploaded case file. If the citations are missing, incomplete, or appear to be cherry-picked to support a particular argument, this will be flagged as a potential issue.
6.  **Red Flag Indicators:** The AI will maintain a list of "red flag" indicators that suggest potential bias or misleading information. Examples include: reliance on outdated legal precedents, misrepresentation of facts, selective omission of relevant information, and appeals to emotion over reason.

When the AI detects potentially biased or misleading information, it will:

*   **Provide a warning to the user:** The AI feedback report will include a clear warning that the uploaded case file may contain biased or misleading information.
*   **Explain the basis for the warning:** The AI will explain the specific reasons why it believes the information may be biased or misleading (e.g., citing specific examples of biased language or inaccurate facts).
*   **Offer alternative perspectives:** The AI will provide links to authoritative sources or alternative viewpoints that users can consult to get a more balanced understanding of the legal issues.
*   **Lower the confidence score:** The AI will lower the confidence score of its overall assessment to reflect the uncertainty introduced by the potentially biased information.

It is crucial to emphasize that the AI is not intended to replace human judgment. Its role is to assist users in identifying potential issues and making informed decisions. Users should always carefully review the AI feedback and consult with qualified legal professionals before relying on any legal information.

**Q:** What criteria should the AI use to evaluate the quality and effectiveness of arguments?
**A:** The AI should evaluate the quality and effectiveness of arguments based on the following criteria:

1.  **Clarity:** How clearly and concisely the argument is presented. Is the language precise and easy to understand? Does the argument avoid ambiguity and vagueness?

2.  **Structure:** How logically the argument is organized. Does the argument have a clear beginning, middle, and end? Does the argument flow smoothly and logically from one point to the next? Is there a clear chain of reasoning?

3.  **Relevance:** How relevant the argument is to the case details and the specific issue being addressed. Does the argument directly address the question at hand? Does the argument avoid irrelevant or tangential points?

4.  **Accuracy:** How factually accurate the argument is. Are the claims supported by evidence? Are the sources reliable and authoritative? Are there any factual errors or misrepresentations?

5.  **Use of Authority:** How effectively the argument uses legal authority (e.g., case law, statutes, regulations). Are the authorities properly cited? Are the authorities properly interpreted and applied to the facts of the case?

6.  **Persuasiveness:** How persuasive the argument is. Does the argument appeal to reason and logic? Does the argument anticipate and address counterarguments? Does the argument use rhetorical devices effectively?

7. **Completeness:** How comprehensive the argument is. Does the argument address all the key issues and arguments raised by the opposing side? Does the argument provide a thorough and well-reasoned analysis of the relevant legal principles?

8. **Originality/Creativity:** (Optional - Use carefully) Does the argument demonstrate original thought or a creative approach to the problem? Does the argument offer a novel or insightful perspective?

These criteria align with the project's focus on applying teaching rubrics (Clarity, Persuasiveness, Structure) and cross-checking arguments for accuracy against legal case files. The AI should be trained to identify and assess these elements in the arguments presented by users.

**Q:** What specific information should the AI feedback reports include?
**A:** The AI feedback reports should include: a score based on adherence to guidelines, explanations of any deductions, transcription of the video, analysis of the video against predefined rules and guidelines, assessment against the selected exercise's teaching rubric (Clarity, Persuasiveness, and Structure) and suggestions for improvement.

**Q:** How long should user submission history be retained, and are there any data retention policies to consider?
**A:** The duration for which user submission history is retained should be determined based on a combination of factors, including storage capacity, performance considerations, user needs, and legal/regulatory requirements. Here's a breakdown:

*   **Recommended Retention Period:** A reasonable starting point is to retain user submission history for a period of **3 years**. This allows users to track their progress over time and provides sufficient data for analysis and improvement. However, it is critical to define this in a policy and communicate it to the users.
*   **Data Retention Policies to Consider:**
    *   **Legal and Regulatory Compliance:** Check for any legal or regulatory requirements regarding data retention for educational or training purposes. Some jurisdictions may have specific rules about how long user data must be stored.
    *   **Storage Costs:** Factor in the cost of storing the user submission history. Video files, in particular, can consume significant storage space. Consider implementing a tiered storage system, where older data is archived to less expensive storage.
    *   **Performance:** As the amount of data grows, it can impact the performance of the application. Regularly archive or delete older data to maintain optimal performance.
    *   **User Consent:** Obtain user consent for data retention and provide them with the option to delete their submission history. This enhances transparency and builds trust.
    *   **Data Minimization:** Only retain the data that is necessary for the intended purpose. Avoid collecting or storing data that is not directly relevant to the Speed Mooting exercises.
    *   **Privacy Policies:** Ensure that the data retention policy is clearly stated in the application's privacy policy and that users are informed about how their data is being used and protected.
    *   **Anonymization/Pseudonymization:** Consider anonymizing or pseudonymizing older data to reduce the risk of re-identification. This is particularly important if the data contains sensitive information.
*   **Implementation Steps:**
    1.  **Define a Data Retention Policy:** Clearly document the data retention policy, including the retention period, the criteria for deleting or archiving data, and the procedures for handling user requests for data deletion.
    2.  **Implement Automated Data Archiving/Deletion:** Implement automated processes to archive or delete data according to the defined policy. This ensures consistent and reliable data management.
    3.  **Provide User Controls:** Provide users with the ability to view, download, and delete their submission history. This empowers users to control their data.
    4.  **Monitor and Review:** Regularly monitor and review the data retention policy and processes to ensure they are effective and compliant with any changes in legal or regulatory requirements.

By carefully considering these factors and implementing a well-defined data retention policy, the Speed Mooting platform can effectively manage user submission history while protecting user privacy and complying with all applicable regulations.

**Q:** What events should trigger notifications, and what information should each notification contain?
**A:** The primary event that should trigger a notification is when the AI report is ready. The notification should contain a clear message indicating that the report is available, a link to access the report, and potentially the exercise name and submission date for context.

**Q:** What types of files will users be able to upload, and what size limits should be imposed?
**A:** Users will be able to upload video files, skeleton arguments (Word documents or PDFs), and legal case files. Specific size limits for each file type should be determined based on storage capacity and performance considerations. Industry best practice is to define reasonable limits and communicate these to users.

**Q:** What types of legal subject guides should the AI prioritize for suggestion?
**A:** The AI should prioritize legal subject guides covering fundamental and frequently encountered areas of law relevant to mooting and legal education. Specifically, the AI should prioritize legal subject guides on the following areas:

1.  **Contract Law:** Covering offer, acceptance, consideration, breach, and remedies.
2.  **Tort Law:** Including negligence, intentional torts, and product liability.
3.  **Criminal Law:** Focusing on elements of crimes, defenses, and criminal procedure.
4.  **Constitutional Law:** Covering fundamental rights, separation of powers, and judicial review.
5.  **Civil Procedure:** Addressing jurisdiction, pleadings, discovery, and trial practice.
6.  **Evidence Law:** Covering admissibility of evidence, relevance, and witness examination.
7.  **Property Law:** Including real property, personal property, and intellectual property.
8.  **Administrative Law:** Focusing on agency powers, rulemaking, and judicial review of agency action.

Within each subject area, the AI should also suggest topics related to current events and emerging legal issues. This will help users stay up-to-date on the latest developments in the law and prepare for moot court competitions that often involve novel legal questions.

**Q:** What type of AI models are we using with the Vertex Gemini API helper?
**A:** The project uses Vertex Gemini AI models accessed via a custom Laravel API helper. The specific models employed for video analysis, transcription, legal document cross-checking, and argument evaluation aren't explicitly named in the project overview, but the system leverages Vertex Gemini for these tasks. The configuration is set to return data in a specific JSON format for display and storage.

**Q:** How will the system handle errors during video analysis, and how will users be informed?
**A:** The system will handle errors during video analysis in the following ways:

1.  **Error Detection:** The system will implement robust error handling to catch exceptions and unexpected conditions during the AI analysis process. This includes network errors, file processing errors, AI model errors, and database errors.

2.  **Logging:** All errors will be logged with detailed information, including the timestamp, user ID, file name, error message, and stack trace. This will aid in debugging and identifying recurring issues.

3.  **Retry Mechanism:** For transient errors (e.g., temporary network issues), the system will implement a retry mechanism with exponential backoff. This will allow the analysis to resume automatically without user intervention.

4.  **User Notification:** Users will be informed of errors through a combination of methods:

    *   **In-App Notification:** A clear and concise error message will be displayed within the user interface, explaining that the video analysis failed. The message should avoid technical jargon and provide helpful guidance to the user (e.g., "Video analysis failed. Please try again later. If the problem persists, contact support.").
    *   **Email Notification:** An email notification will be sent to the user, providing more detailed information about the error. This email can include the error message, the file name, and steps the user can take to resolve the issue (e.g., re-uploading the video, checking the file format, contacting support).

5.  **Error Classification:** The system will attempt to classify errors based on their severity and cause. This will allow the system to provide more specific and helpful error messages to users.

6.  **Fallback Mechanism:** In the event of a critical error that prevents the AI analysis from completing, the system will implement a fallback mechanism. This may involve:

    *   **Partial Report:** Providing the user with a partial report based on the data that was successfully analyzed before the error occurred.
    *   **Manual Review:** Flagging the video for manual review by an administrator or expert. The administrator can then manually analyze the video and provide feedback to the user.

7.  **Support Contact:** Provide a clear and easy way for users to contact support if they encounter errors that they cannot resolve on their own. This can include a link to a help center, an email address, or a phone number.

By implementing these error handling and notification mechanisms, the system can effectively manage errors during video analysis and provide a positive user experience, even when things go wrong.

**Q:** How will administrators manage and update the list of suggested topics and arguments?
**A:** Administrators will manage and update the list of suggested topics and arguments through the Filament admin panel. This interface should provide CRUD (Create, Read, Update, Delete) functionality for both topics and arguments. Specifically:

1.  **Topic Management:** Administrators should be able to add new topics, edit existing topics (e.g., change the title, description, associated themes), and delete topics that are no longer relevant. The system should allow for categorizing topics based on legal subjects (e.g., Contract Law, Criminal Law, Constitutional Law) to ensure relevance.

2.  **Argument Management:** Administrators should be able to add arguments for both sides of a given topic. This would involve creating new argument entries, associating them with a specific topic, editing the argument text, and deleting arguments. Each argument entry should allow specification of whether it is a 'for' or 'against' argument. Consider adding a 'source' field for each argument to cite legal precedents or scholarly articles. Arguments should be version controlled (allowing administrators to view previous iterations). A 'status' field could indicate whether the argument is approved or pending review.

3.  **Search and Filtering:** The admin interface should include search and filtering capabilities to easily find specific topics or arguments. Filtering should be possible by legal subject, keywords, and status (e.g., approved, pending review).

4.  **Bulk Import/Export (Optional):** Depending on the scale of content management, consider implementing bulk import and export functionality (e.g., using CSV files) to facilitate the addition or modification of large numbers of topics and arguments.

5. **AI Topic Suggestions Integration**: The administrator interface may include functionality to review and approve AI-suggested topics and arguments before they are made available to users. This ensures the quality and accuracy of the AI-generated content.

6. **Governance**: Implement a governance and approval workflow for new suggestions and updates to arguments.

**Q:** How can the Advocacy Club staff customize the feedback provided by the AI?
**A:** To enable Advocacy Club staff to customize the feedback provided by the AI, several mechanisms can be implemented:

1.  **Customizable Teaching Rubrics:** Within the Exercise Management section of the administrative portal (Filament panel), staff should be able to define and edit teaching rubrics for each exercise. This includes specifying the assessment criteria (e.g., Clarity, Persuasiveness, Structure, Knowledge of Law, Use of Authority), their relative weights, and detailed descriptions of what constitutes excellent, good, fair, and poor performance for each criterion. This approach is directly related to the 'Rubric Application' feature and the administrative 'Exercise Management' requirement. Furthermore, the staff should have the option to select a default rubric to be associated with all new exercises to save time in setup.

2.  **Rule and Guideline Customization:** The administrative portal should allow staff to modify the 'predefined rules and guidelines' used by the AI during video analysis. This could involve adding new rules, editing existing rules, or adjusting the severity of penalties for violating specific rules. This aligns with the AI analysis of video against predefined rules.

3.  **Argument Libraries:** Provide staff the capability to build and maintain libraries of arguments (for and against) that the AI can use as examples or benchmarks during its analysis. The staff could categorize arguments by legal subject and topic, making it easier for the AI to suggest relevant arguments to users.

4.  **Exception Handling and Overrides:** Allow staff to manually review and override the AI's feedback in certain cases. This is particularly important when dealing with edge cases or nuanced legal issues where the AI's judgment may be flawed. The system should log all manual overrides for auditing purposes.

5.  **Bias Mitigation Configuration:** Provide staff with options to adjust the AI's sensitivity to potentially biased or misleading information. This could involve adjusting the thresholds for flagging questionable sources or customizing the list of "red flag" indicators.

6.  **Feedback Templates:** Offer the ability for the staff to define templates to allow a custom preface or closing remarks to the generated feedback. These templates can be general or specific to certain areas of the exercise.

7.  **AI Model Fine-Tuning (Advanced):** In the future, consider allowing staff to fine-tune the AI model itself using a curated dataset of exercises and feedback. This would require significant technical expertise but could lead to more accurate and relevant feedback over time. This should only be considered once the initial system is validated as staff expertise might be limited to configure a model without AI engineers.

**Q:** What data points from the AI analysis are most important to display to the user?
**A:** The most important data points to display are: the overall score, the breakdown of the score based on the rubric criteria (Clarity, Persuasiveness, Structure), specific deductions made by the AI with explanations, a transcription of the video, and suggested improvements.

**Q:** What metadata, if any, should be captured during the content upload process?
**A:** Metadata to capture during the upload process should include: user ID, upload timestamp, file name, file type, exercise name (if applicable), topic selection (if applicable), and potentially a brief description provided by the user.

**Q:** Are there specific legal jurisdictions or areas of law the AI should be trained on?
**A:** Yes, while the platform should ideally be adaptable to various legal jurisdictions, initial training of the AI should focus on the legal system most relevant to the Advocacy Club's primary area of focus or the jurisdiction where the speed mooting exercises are commonly based. Given that the Advocacy Club is based in the UK, the AI should be trained on the law of England and Wales, including common law principles, statutes, and relevant EU law (to the extent it still applies or is relevant). The training should also cover relevant legal citation styles (e.g. OSCOLA for UK law) to ensure accurate citation analysis. It is very important that during the initial training phase, the AI is made aware of any important regional differences. Also, the training of the AI can grow over time to include more legal systems.

**Q:** How should the system handle multiple submissions for the same exercise?
**A:** The system should allow multiple submissions for the same exercise, enabling users to iterate on their performance and improve based on AI feedback. Each submission should be treated as a separate and distinct attempt, with its own AI analysis and feedback report. To manage these multiple submissions effectively:

1.  **Submission Tracking:** Each submission should be uniquely identified and associated with the user, the exercise, and a timestamp. This allows the system to track the submission history for each user and exercise.
2.  **Versioning:** Implement a versioning system for submissions. Each time a user submits a new attempt for the same exercise, it creates a new version. The system should clearly display the version number or submission date/time to the user. This allows users to differentiate between multiple attempts and easily find specific submissions.
3.  **Storage and Access:** All submissions should be stored and made accessible to the user. The user interface should provide a clear and intuitive way to browse through their submission history for each exercise.
4.  **AI Feedback Association:** Each submission should have its own associated AI feedback report. The feedback should be specific to the content and timestamp of that submission. Users should be able to easily access and review the AI feedback for each individual attempt.
5.  **Data Management:** Ensure efficient storage and retrieval of multiple submissions, taking into account storage capacity and performance considerations. Implement archiving or deletion policies for older submissions if needed.
6.  **User Interface:** The user interface for viewing submission history should include:
    *   A list of all submissions for the selected exercise, ordered by submission date/time (newest first).
    *   Clear indication of the version number or submission timestamp.
    *   A link to view the AI feedback report for each submission.
    *   A preview or summary of the submission (e.g., video thumbnail, argument title).
    *   Options to download or delete individual submissions (subject to data retention policies).
7. **Limiting Submissions:** It is a good practice to limit the number of submissions allowed for a single exercise. This prevents abuse and encourages users to focus on improving their best attempts. This limit should be configurable by an administrator.

By implementing these strategies, the system can effectively handle multiple submissions for the same exercise, providing users with a valuable tool for improving their skills and performance.

**Q:** How will user accounts be created, and what information will be required during registration?
**A:** User accounts will be created through a standard registration process that includes a form requesting information such as: Full Name, Email Address, Password (with secure password requirements), and potentially affiliation (e.g., university, organization). The system will implement user registration with standard functionality and include forgotten password and remember me features.

**Q:** What specific metrics should be used to measure the effectiveness of arguments during video analysis?
**A:** The effectiveness of arguments during video analysis should be measured using a combination of quantitative and qualitative metrics, directly related to the criteria used to evaluate argument quality. These metrics should be derived and calculated by the AI during video analysis. The metrics should include:

1.  **Clarity Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the AI's assessment of how easy it is to understand the argument. Factors influencing this score include sentence complexity, use of jargon, and overall coherence. The AI can calculate this score by analysing the transcript and penalizing use of ambiguous language and convoluted sentence structures.

2.  **Structure Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the AI's assessment of the logical flow and organization of the argument. Factors influencing this score include the presence of a clear introduction, supporting points, and conclusion. The AI can look for signal words indicating structure such as 'firstly', 'secondly', 'in conclusion' to assist with scoring.

3.  **Relevance Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the degree to which the argument directly addresses the issue at hand. This involves comparing the argument's content to the case details and exercise objectives defined by the Advocacy Club staff. The AI cross-references the arguments extracted from the video against the case details and known keywords. Arguments that deviate significantly are penalized.

4.  **Accuracy Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the factual correctness of the argument. This involves comparing claims made in the argument to authoritative legal sources and uploaded case files. If inconsistencies or errors are found, the score is reduced. This builds upon the requirement for "AI Cross-Checking Skeleton Arguments for Accuracy" and "AI Cross-Checking of Legal Case Files".

5.  **Use of Authority Score:** (Quantitative) - Measured on a scale (e.g., 1-5) based on the appropriate and effective use of legal precedents, statutes, and regulations. The AI should check for proper citations and the accurate interpretation of legal authorities. Absence of citations or misinterpretation leads to score deductions. The AI should prioritize reputable and authoritative sources like Westlaw, LexisNexis, HeinOnline, and official government publications.

6.  **Persuasiveness Assessment:** (Qualitative and Quantitative) - This is a more subjective assessment based on the AI's analysis of rhetorical devices, logical reasoning, and emotional appeals used in the argument. A quantitative score (e.g., 1-5) can be assigned based on the presence and effectiveness of persuasive techniques, accompanied by a qualitative explanation of why the argument was or was not persuasive. The AI should identify logical fallacies or instances of biased language to lower the persuasiveness score.

7. **Completeness Assessment:** (Qualitative and Quantitative) - Assesses how well all relevant issues are addressed, and counter-arguments are considered. Score could be determined by identifying if the main topics and arguments as supplied by the exercise details and supporting arguments have been considered in the video submission. 

8.  **Qualitative Feedback:** (Qualitative) - In addition to the quantitative scores, the AI should provide specific, actionable feedback on areas where the argument could be improved. This feedback should be tailored to the individual student and the specific exercise requirements. This should be displayed in a readable and structured format as detailed under the user submission history requirements.

The AI feedback reports should include a combination of these quantitative metrics and qualitative feedback, providing a comprehensive assessment of the argument's effectiveness. These reports can be exported as PDFs as requested in the initial prompt.

**Q:** How will the AI handle legal terminology and jargon within the uploaded documents?
**A:** The AI should utilize a legal-specific natural language processing (NLP) model and terminology database to accurately identify and interpret legal jargon. This includes maintaining a glossary of terms, understanding contextual usage, and potentially flagging ambiguous or outdated terminology. The AI should also cross-reference the terminology against the uploaded case files for consistency and accuracy.

**Q:** What options should administrators have for customizing email notification templates?
**A:** Administrators should have the ability to customize the email subject, body text, sender name, and logo. They should also be able to configure variables for dynamic content insertion, such as user name, report name, and link to the report. A preview function would allow admins to verify the appearance of the customized email.

**Q:** How should exercises be categorized and organized within the exercise management module?
**A:** Exercises should be categorized by legal subject (e.g., contract law, criminal law), difficulty level (e.g., beginner, intermediate, advanced), and type (e.g., mock trial, negotiation). A hierarchical folder structure or tagging system could be used for organization, with search and filtering capabilities for easy access.

**Q:** How should the Advocacy Club staff manage and update rubrics?
**A:** The exercise management module should include a dedicated section for rubric management. Advocacy Club staff should be able to create new rubrics, edit existing rubrics, and associate rubrics with specific exercises. Version control and a clear audit trail for rubric changes would be beneficial.

**Q:** What specific types of legal cases should the AI use as the basis for its suggestions?
**A:** *Pending response*

**Q:** Is there a need for user roles beyond standard 'user' and 'administrator'?
**A:** Potentially. Consider a 'Moderator' role with privileges to review user-submitted content and flag inappropriate material. A 'Coach' or 'Instructor' role could also be useful for providing specific feedback or guidance to users on their submissions. These roles would require more granular permission control within the system.

**Q:** What tutorials need to be linked?
**A:** Tutorials should cover: How to upload videos, how to submit skeleton arguments, how to interpret AI feedback, how to navigate the user interface, how to select topics, understanding the speed mooting system rules, and guides on legal subjects. These should be easily accessible and searchable.

---

# Context

The following context was captured during the project scope discovery process, organized by feature group:

## Uncategorised

- Advocacy Club staff will require the ability to manage exercises, including creating and editing them, as well as managing users with full CRUD (Create, Read, Update, Delete) operations.

## User Management

- User roles will be structured with the following permissions: Administrators will have full access, Registered Users will be able to access and modify their own data and interact with exercises, and Guests will have read-only access to public content.
- User accounts will be created through a registration form, requesting full name, email address, and a secure password, with optional affiliation information; standard functionality will include forgotten password and remember me features.
- A 'Moderator' role with privileges to review user-submitted content and flag inappropriate material, and a 'Coach'/'Instructor' role for providing specific feedback, are being considered for future implementation, which would require more granular permission control.

## Exercise Management

- Advocacy Club staff will define moot court exercises by specifying the exercise title, a descriptive summary, case details, arguments for and against, exercise-specific rules, a teaching rubric covering clarity, persuasiveness, structure, knowledge of law, and use of authority, the legal subject with relevant topics and keywords, and uploadable case files.
- Exercises will be categorized by legal subject, difficulty level, and type, using a hierarchical folder structure or tagging system, with search and filtering capabilities for easy access.
- The exercise management module will include a dedicated section for rubric management, enabling Advocacy Club staff to create, edit, and associate rubrics with exercises, including version control and an audit trail for changes.

## Video Analysis

- The system will incorporate robust error handling to detect issues during video analysis, including network, file processing, AI model, and database errors; all errors will be logged with detailed information to aid debugging; a retry mechanism with exponential backoff will be implemented for transient errors; users will be notified of errors via in-app messages and email, with guidance on resolution; errors will be classified based on severity; a fallback mechanism will provide either a partial report or flag the video for manual review in critical error scenarios; and users will be provided with clear support contact information.
- Argument effectiveness during video analysis will be measured using a combination of quantitative and qualitative metrics, calculated by AI, directly related to argument quality evaluation criteria; these metrics will include clarity, structure, relevance, accuracy, use of authority, persuasiveness, and completeness scores, each measured on a scale of 1-5, alongside qualitative feedback providing actionable insights for improvement, with the resulting feedback reports available for PDF export.

## Argument Analysis

- The AI will identify and handle potentially biased or misleading information in uploaded legal case files through source verification, cross-referencing with authoritative sources, fact-checking algorithms, bias detection using NLP techniques, citation analysis, and the use of "red flag" indicators. Upon detection, the AI will warn the user, explain the basis for the warning, offer alternative perspectives and authoritative sources, and lower the confidence score of its assessment. The AI is designed to assist users in identifying potential issues, and users should always review AI feedback and consult qualified legal professionals.
- The AI will evaluate arguments based on the following weighted criteria: clarity of presentation, logical structure, relevance to the case, factual accuracy supported by evidence, effective use and interpretation of legal authority, persuasiveness through reasoned logic, completeness in addressing key issues and arguments, and optionally, originality and creativity.
- The AI will utilize a legal-specific natural language processing (NLP) model and terminology database to accurately identify and interpret legal jargon within uploaded documents, including a glossary of terms and cross-referencing against uploaded case files.

## AI Feedback & Reporting

- AI feedback reports will include a score based on adherence to guidelines, explanations of deductions, video transcription, video analysis against predefined rules, assessment against the teaching rubric (Clarity, Persuasiveness, and Structure), and suggestions for improvement.
- Advocacy Club staff will be able to customize the feedback provided by the AI through configurable teaching rubrics, rule and guideline customization, argument libraries, exception handling and overrides, bias mitigation configuration, and feedback templates.

## Submission History

- User submission history will be retained for 3 years, adhering to a defined data retention policy that considers legal and regulatory compliance, storage costs, performance, user consent, data minimization, privacy policies, and anonymization/pseudonymization techniques. Automated data archiving and deletion processes will be implemented, and users will be provided with controls to view, download, and delete their submission history. The data retention policy and processes will be regularly monitored and reviewed.

## Notifications

- Users will receive notifications when their AI report is ready, including a message indicating availability, a direct link to the report, and relevant exercise and submission date context.
- Administrators will be able to customize email notification templates, including the subject, body text, sender name, logo, and dynamic content insertion variables, with a preview function to verify appearance.

## Content Upload & Processing

- Users will be able to upload video files, skeleton arguments in Word or PDF formats, and legal case files, with specific size limits to be determined and communicated based on storage and performance considerations.
- The content upload process will capture the following metadata: user ID, upload timestamp, file name, file type, exercise name, topic selection, and user-provided description.

## AI-Powered Guidance & Suggestions

- Administrators will manage suggested topics and arguments using a Filament admin panel that provides CRUD functionality. This includes the ability to add, edit, and delete topics, categorizing them by legal subject. For each topic, administrators can add, edit, and delete supporting arguments, specifying whether they are 'for' or 'against', and citing sources. An argument version control system will be implemented. The interface will feature search and filtering by legal subject, keywords, and approval status. The admin interface may also integrate with an AI topic suggestion system, requiring admin approval before publishing new suggestions. A governance and approval workflow will be implemented for new suggestions and updates to arguments.

## Legal Resource Guidance

- To ensure accuracy and reliability, the AI will prioritize legal guidance based on reputable sources, including Westlaw, LexisNexis, HeinOnline, and official government publications, while access to open-source databases like Google Scholar's legal section will be carefully monitored for source differentiation. The AI will be explicitly restricted from using unreliable or non-authoritative legal information sources such as random websites, blogs, and forums, and all database access will comply with licensing restrictions and usage agreements.
- The AI will prioritize suggestions for legal subject guides covering contract law, tort law, criminal law, constitutional law, civil procedure, evidence law, property law, and administrative law, while also including topics related to current events and emerging legal issues within each subject area.
- Tutorials will be created and linked covering video uploads, skeleton argument submissions, interpreting AI feedback, user interface navigation, topic selection, understanding speed mooting rules, and legal subject guides, to ensure these resources are easily accessible and searchable.

## Vertex Gemini API Helper

- The project utilizes Vertex Gemini AI models, accessed through a custom Laravel API helper, for video analysis, transcription, legal document cross-checking, and argument evaluation, with the output formatted as JSON for display and storage.

