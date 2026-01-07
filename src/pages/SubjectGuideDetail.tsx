import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, BookOpen, Scale, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Subject guide content data
const subjectGuideContentMap: Record<number, {
    id: number
    name: string
    description: string
    bannerImage: string
    topics: string
    introduction: string
    keyPrinciples: Array<{
        title: string
        description: string
    }>
    importantCases: Array<{
        name: string
        citation: string
        principle: string
    }>
    statutoryProvisions?: Array<{
        title: string
        reference: string
        description: string
    }>
    argumentStructures: Array<{
        scenario: string
        approach: string
    }>
    relatedGuides: number[]
}> = {
    1: {
        id: 1,
        name: "Contract Law",
        description: "Fundamental principles of contract formation, breach, and remedies.",
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        topics: "Offer, acceptance, consideration, breach of contract",
        introduction: "Contract law forms the foundation of commercial relationships and legal obligations. Understanding the essential elements of contract formation, the principles of breach, and available remedies is crucial for effective mooting in contract disputes.",
        keyPrinciples: [
            {
                title: "Offer and Acceptance",
                description: "A contract requires a valid offer and acceptance. An offer must be clear, certain, and communicated to the offeree. Acceptance must be unqualified and communicated to the offeror. The 'postal rule' applies to acceptance by post, but not to modern communication methods."
            },
            {
                title: "Consideration",
                description: "Consideration is the price paid for a promise. It must be sufficient but need not be adequate. Past consideration is generally not valid, except in certain circumstances. The doctrine of promissory estoppel may provide relief where consideration is absent."
            },
            {
                title: "Intention to Create Legal Relations",
                description: "The parties must intend to create legally binding obligations. Commercial agreements are presumed to have this intention, while domestic and social agreements are presumed not to, though these presumptions can be rebutted."
            },
            {
                title: "Breach of Contract",
                description: "A breach occurs when a party fails to perform their contractual obligations. Breaches can be repudiatory (fundamental) or non-repudiatory. The innocent party may affirm the contract or accept the repudiation and claim damages."
            },
            {
                title: "Remedies",
                description: "Available remedies include damages (compensatory, nominal, or liquidated), specific performance, injunctions, and rescission. The aim is to put the innocent party in the position they would have been in had the contract been performed."
            }
        ],
        importantCases: [
            {
                name: "Carlill v Carbolic Smoke Ball Co",
                citation: "[1893] 1 QB 256",
                principle: "Established that advertisements can constitute offers when they contain specific terms and demonstrate intention to be bound. The notification of acceptance can be waived by the offeror."
            },
            {
                name: "Hadley v Baxendale",
                citation: "(1854) 9 Exch 341",
                principle: "Established the rule for remoteness of damage in contract. Damages are recoverable if they arise naturally from the breach or were in the contemplation of both parties at the time of contract formation."
            },
            {
                name: "Williams v Roffey Bros & Nicholls (Contractors) Ltd",
                citation: "[1991] 1 QB 1",
                principle: "Established that practical benefit can constitute sufficient consideration, even where a party is performing an existing contractual duty owed to the other party."
            },
            {
                name: "Hong Kong Fir Shipping Co Ltd v Kawasaki Kisen Kaisha Ltd",
                citation: "[1962] 2 QB 26",
                principle: "Introduced the concept of innominate terms, where the consequences of breach determine whether a term is a condition or warranty, rather than the label attached to it."
            }
        ],
        statutoryProvisions: [
            {
                title: "Sale of Goods Act 1979",
                reference: "s. 13-15",
                description: "Implied terms as to description, quality, and fitness for purpose in contracts for the sale of goods."
            },
            {
                title: "Unfair Contract Terms Act 1977",
                reference: "s. 2-3",
                description: "Restricts the ability to exclude or limit liability for negligence and breach of contract, particularly in consumer contracts."
            }
        ],
        argumentStructures: [
            {
                scenario: "Arguing that a contract was formed",
                approach: "Establish offer (clear, certain, communicated) → Show acceptance (unqualified, communicated) → Prove consideration (sufficient, not past) → Demonstrate intention to create legal relations → Address any vitiating factors"
            },
            {
                scenario: "Arguing breach of contract",
                approach: "Identify the contractual term breached → Classify the term (condition, warranty, or innominate) → Establish the breach → Show causation and loss → Quantify damages under Hadley v Baxendale"
            },
            {
                scenario: "Defending against breach claim",
                approach: "Challenge formation (no valid offer/acceptance) → Argue no consideration → Deny intention to create legal relations → Raise vitiating factors (misrepresentation, mistake, duress) → Argue terms were not breached → Challenge remoteness of damage"
            }
        ],
        relatedGuides: [2, 5, 6]
    },
    2: {
        id: 2,
        name: "Tort Law",
        description: "Civil wrongs including negligence, nuisance, and defamation.",
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        topics: "Duty of care, negligence, causation, damages",
        introduction: "Tort law provides remedies for civil wrongs that cause harm. Negligence is the most common tort, requiring duty of care, breach, causation, and damage. Understanding these elements and their application is essential for mooting in tort disputes.",
        keyPrinciples: [
            {
                title: "Duty of Care",
                description: "A duty of care exists where there is a relationship of proximity between parties and it is fair, just, and reasonable to impose such a duty. The 'neighbour principle' from Donoghue v Stevenson remains foundational, though modern law has developed more sophisticated tests."
            },
            {
                title: "Breach of Duty",
                description: "A breach occurs when the defendant fails to meet the standard of care expected of a reasonable person in the circumstances. The standard is objective, though account may be taken of the defendant's profession, age, and any special characteristics."
            },
            {
                title: "Causation",
                description: "The claimant must prove both factual causation ('but for' test) and legal causation (remoteness). The 'but for' test asks whether the damage would have occurred but for the defendant's breach. Legal causation considers whether the damage was reasonably foreseeable."
            },
            {
                title: "Defenses",
                description: "Common defenses include contributory negligence (reducing damages), volenti non fit injuria (consent), and illegality. The defense of contributory negligence can reduce damages proportionally under the Law Reform (Contributory Negligence) Act 1945."
            },
            {
                title: "Damages",
                description: "Damages aim to restore the claimant to their pre-tort position. Types include general damages (pain and suffering), special damages (quantifiable losses), and aggravated/exemplary damages in exceptional cases."
            }
        ],
        importantCases: [
            {
                name: "Donoghue v Stevenson",
                citation: "[1932] AC 562",
                principle: "Established the 'neighbour principle' and the modern law of negligence. A duty of care exists where you can reasonably foresee that your acts or omissions would be likely to injure your neighbour."
            },
            {
                name: "Caparo Industries plc v Dickman",
                citation: "[1990] 2 AC 605",
                principle: "Established the three-stage test for duty of care: foreseeability, proximity, and whether it is fair, just, and reasonable to impose a duty."
            },
            {
                name: "Wagon Mound (No 1)",
                citation: "[1961] AC 388",
                principle: "Established that damage must be reasonably foreseeable for the defendant to be liable, replacing the directness test from Re Polemis."
            },
            {
                name: "Fairchild v Glenhaven Funeral Services Ltd",
                citation: "[2002] UKHL 22",
                principle: "Modified the 'but for' test in cases involving multiple potential causes, allowing recovery where the defendant materially increased the risk of harm."
            }
        ],
        argumentStructures: [
            {
                scenario: "Arguing negligence",
                approach: "Establish duty of care (foreseeability, proximity, fair/just/reasonable) → Prove breach (failure to meet reasonable standard) → Show factual causation ('but for' test) → Establish legal causation (foreseeability) → Quantify damage"
            },
            {
                scenario: "Defending negligence claim",
                approach: "Deny duty of care (no proximity or not fair/just/reasonable) → Argue no breach (met reasonable standard) → Challenge causation (damage would have occurred anyway) → Argue remoteness (damage not foreseeable) → Raise defenses (contributory negligence, volenti, illegality)"
            }
        ],
        relatedGuides: [1, 3, 5]
    },
    3: {
        id: 3,
        name: "Criminal Law",
        description: "Criminal offenses, mens rea, actus reus, and defenses.",
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        topics: "Mens rea, actus reus, defenses, sentencing",
        introduction: "Criminal law defines offenses against the state and prescribes punishments. The fundamental principle is that a crime requires both actus reus (guilty act) and mens rea (guilty mind). Understanding these elements and available defenses is crucial for criminal law mooting.",
        keyPrinciples: [
            {
                title: "Actus Reus",
                description: "The physical element of a crime, which may be an act, omission, or state of affairs. The actus reus must be voluntary and, for result crimes, must cause the prohibited consequence."
            },
            {
                title: "Mens Rea",
                description: "The mental element of a crime, which varies by offense. Common forms include intention, recklessness, and negligence. The mens rea must coincide with the actus reus."
            },
            {
                title: "Causation",
                description: "For result crimes, the defendant's act must be both a factual cause ('but for' test) and a legal cause (substantial and operating cause) of the prohibited result. Intervening acts may break the chain of causation."
            },
            {
                title: "Defenses",
                description: "Common defenses include self-defense, duress, necessity, mistake, and insanity. The burden of proof for defenses varies, with some requiring the defendant to prove them on the balance of probabilities."
            },
            {
                title: "Inchoate Offenses",
                description: "Attempt, conspiracy, and incitement are inchoate offenses that criminalize conduct falling short of the complete offense. They require intention to commit the full offense."
            }
        ],
        importantCases: [
            {
                name: "R v Woollin",
                citation: "[1999] 1 AC 82",
                principle: "Established that intention includes both direct intention and oblique intention, where the defendant foresaw the consequence as virtually certain and the jury may find intention."
            },
            {
                name: "R v G and Another",
                citation: "[2003] UKHL 50",
                principle: "Reformed the law of recklessness, requiring that the defendant was aware of a risk and unreasonably took that risk, replacing the objective test from Caldwell."
            },
            {
                name: "R v Miller",
                citation: "[1983] 2 AC 161",
                principle: "Established that a defendant who creates a dangerous situation has a duty to act to prevent harm, even if the initial act was not criminal."
            },
            {
                name: "R v Ahluwalia",
                citation: "(1992) 96 Cr App R 133",
                principle: "Recognized that cumulative provocation can be considered in cases of domestic violence, even where there is a 'cooling off' period."
            }
        ],
        argumentStructures: [
            {
                scenario: "Prosecuting a criminal offense",
                approach: "Establish actus reus (voluntary act/omission causing prohibited result) → Prove mens rea (intention, recklessness, or other required mental state) → Show coincidence of actus reus and mens rea → Address any defenses raised"
            },
            {
                scenario: "Defending a criminal charge",
                approach: "Challenge actus reus (no voluntary act, no causation) → Deny mens rea (no intention, no recklessness) → Argue no coincidence (mens rea at different time) → Raise substantive defense (self-defense, duress, mistake, etc.) → Address sentencing factors if convicted"
            }
        ],
        relatedGuides: [2, 4, 6]
    },
    4: {
        id: 4,
        name: "Constitutional Law",
        description: "Constitutional principles, separation of powers, and human rights.",
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        topics: "Separation of powers, judicial review, human rights",
        introduction: "Constitutional law governs the relationship between the state and individuals, and between different branches of government. Key principles include parliamentary sovereignty, separation of powers, and the protection of human rights through the Human Rights Act 1998.",
        keyPrinciples: [
            {
                title: "Parliamentary Sovereignty",
                description: "Parliament is the supreme law-making body and can make or unmake any law. However, this principle has been modified by EU law (historically), the Human Rights Act 1998, and devolution."
            },
            {
                title: "Separation of Powers",
                description: "The three branches of government (legislative, executive, judicial) should be separate to prevent abuse of power. However, the UK has a partial separation, with overlap between executive and legislature."
            },
            {
                title: "Rule of Law",
                description: "All persons and authorities are subject to and accountable to law. The rule of law requires that laws be clear, prospective, and applied equally, and that there be access to justice."
            },
            {
                title: "Judicial Review",
                description: "The courts can review the legality of administrative action and legislation. Grounds include illegality, irrationality, and procedural impropriety. The Human Rights Act 1998 allows courts to make declarations of incompatibility."
            },
            {
                title: "Human Rights",
                description: "The Human Rights Act 1998 incorporates most ECHR rights into UK law. Public authorities must act compatibly with Convention rights. Courts can interpret legislation compatibly or make declarations of incompatibility."
            }
        ],
        importantCases: [
            {
                name: "R (Jackson) v Attorney General",
                citation: "[2005] UKHL 56",
                principle: "Confirmed parliamentary sovereignty but noted that the courts may have a role in determining the limits of parliamentary power, particularly regarding constitutional fundamentals."
            },
            {
                name: "R v Secretary of State for the Home Department, ex parte Fire Brigades Union",
                citation: "[1995] 2 AC 513",
                principle: "Established that the executive cannot frustrate the will of Parliament by failing to bring legislation into force."
            },
            {
                name: "A v Secretary of State for the Home Department",
                citation: "[2004] UKHL 56",
                principle: "Demonstrated the power of the Human Rights Act, with the House of Lords declaring legislation incompatible with Convention rights."
            },
            {
                name: "R (Miller) v Secretary of State for Exiting the European Union",
                citation: "[2017] UKSC 5",
                principle: "Confirmed that the executive cannot use prerogative powers to trigger Article 50 without parliamentary approval, reinforcing parliamentary sovereignty."
            }
        ],
        statutoryProvisions: [
            {
                title: "Human Rights Act 1998",
                reference: "s. 3, 4, 6",
                description: "Requires public authorities to act compatibly with Convention rights (s. 6), allows courts to interpret legislation compatibly (s. 3), and permits declarations of incompatibility (s. 4)."
            },
            {
                title: "Constitutional Reform Act 2005",
                reference: "s. 1",
                description: "Establishes the rule of law as a constitutional principle and creates the Supreme Court, separating judicial and legislative functions."
            }
        ],
        argumentStructures: [
            {
                scenario: "Challenging administrative action",
                approach: "Establish standing → Identify the decision/action challenged → Argue illegality (ultra vires, error of law) → Argue irrationality (Wednesbury unreasonableness) → Argue procedural impropriety → Address human rights if applicable"
            },
            {
                scenario: "Defending administrative action",
                approach: "Challenge standing → Argue action was intra vires → Show decision was rational and reasonable → Prove proper procedure was followed → Demonstrate compatibility with human rights"
            }
        ],
        relatedGuides: [3, 7, 2]
    },
    5: {
        id: 5,
        name: "Civil Procedure",
        description: "Rules and procedures governing civil litigation.",
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        topics: "Pleadings, discovery, trial procedure, appeals",
        introduction: "Civil procedure governs how civil cases are conducted in court. The Civil Procedure Rules 1998 emphasize the overriding objective of dealing with cases justly and at proportionate cost. Understanding procedure is essential for effective advocacy.",
        keyPrinciples: [
            {
                title: "Overriding Objective",
                description: "The CPR's overriding objective is to enable the court to deal with cases justly and at proportionate cost. This includes ensuring parties are on an equal footing, saving expense, and dealing with cases expeditiously."
            },
            {
                title: "Case Management",
                description: "The court has extensive case management powers to control proceedings, set timetables, and give directions. The court can strike out claims, make summary judgments, and impose sanctions for non-compliance."
            },
            {
                title: "Pre-Action Protocols",
                description: "Parties should follow pre-action protocols before commencing proceedings. Failure to comply may result in cost sanctions, even if the claim succeeds."
            },
            {
                title: "Disclosure",
                description: "Parties must disclose documents on which they rely and documents that adversely affect their case or support another party's case. Disclosure is ongoing throughout proceedings."
            },
            {
                title: "Costs",
                description: "The general rule is that the unsuccessful party pays the successful party's costs. However, the court has discretion and may make different orders, including costs orders against non-parties."
            }
        ],
        importantCases: [
            {
                name: "Three Rivers District Council v Bank of England (No 3)",
                citation: "[2003] 2 AC 1",
                principle: "Established the test for disclosure: documents must be relevant to the issues in the case and must be documents that would be disclosable if the case proceeded to trial."
            },
            {
                name: "Biguzzi v Rank Leisure plc",
                citation: "[1999] 1 WLR 1926",
                principle: "Demonstrated the court's robust approach to case management and the use of sanctions for non-compliance with rules and orders."
            },
            {
                name: "Mitchell v News Group Newspapers Ltd",
                citation: "[2013] EWCA Civ 1537",
                principle: "Established a strict approach to relief from sanctions, requiring a good reason for non-compliance. This was later modified in Denton v TH White Ltd."
            }
        ],
        argumentStructures: [
            {
                scenario: "Applying for summary judgment",
                approach: "Establish the claim/defense has no real prospect of success → Show there is no other compelling reason for trial → Address any issues of fact or law → Argue costs and proportionality"
            },
            {
                scenario: "Opposing summary judgment",
                approach: "Show there is a real prospect of success → Identify triable issues of fact or law → Argue there are compelling reasons for trial → Address proportionality"
            }
        ],
        relatedGuides: [1, 2, 6]
    },
    6: {
        id: 6,
        name: "Evidence Law",
        description: "Rules of evidence, admissibility, and proof in legal proceedings.",
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        topics: "Admissibility, hearsay, expert evidence, privilege",
        introduction: "Evidence law governs what information can be presented in court and how it can be used. The rules aim to ensure fair trials while allowing relevant evidence to be considered. Understanding evidence rules is crucial for effective advocacy.",
        keyPrinciples: [
            {
                title: "Relevance and Admissibility",
                description: "Evidence must be relevant to be admissible. Relevant evidence is that which makes a fact in issue more or less probable. However, relevant evidence may still be excluded if it is unfairly prejudicial or falls within an exclusionary rule."
            },
            {
                title: "Hearsay",
                description: "Hearsay is a statement made out of court that is tendered to prove the truth of its contents. The general rule is that hearsay is inadmissible, but there are numerous exceptions under the Criminal Justice Act 2003 and common law."
            },
            {
                title: "Character Evidence",
                description: "Evidence of bad character is generally inadmissible, but exceptions exist where it is relevant to an important matter in issue, explanatory evidence, or evidence of propensity. The Criminal Justice Act 2003 governs this area."
            },
            {
                title: "Expert Evidence",
                description: "Expert evidence is admissible where the matter requires expertise beyond that of the court. Experts must be qualified, independent, and their evidence must be within their expertise. The court has a gatekeeping role."
            },
            {
                title: "Privilege",
                description: "Certain communications are privileged and cannot be disclosed, including legal professional privilege, without prejudice communications, and public interest immunity."
            }
        ],
        importantCases: [
            {
                name: "R v Horncastle",
                citation: "[2009] UKSC 14",
                principle: "Confirmed the compatibility of hearsay evidence with the right to a fair trial under Article 6 ECHR, provided there are sufficient safeguards."
            },
            {
                name: "R v Z",
                citation: "[2009] UKHL 4",
                principle: "Established that previous convictions can be admitted as bad character evidence where they show propensity, even if they are for different offenses."
            },
            {
                name: "Kennedy v Cordia (Services) LLP",
                citation: "[2016] UKSC 6",
                principle: "Reaffirmed the test for expert evidence: the matter must require expertise, the witness must be qualified, and the evidence must be within their expertise."
            }
        ],
        argumentStructures: [
            {
                scenario: "Admitting evidence",
                approach: "Establish relevance to facts in issue → Show evidence is not excluded by hearsay/character rules → Address any exceptions → Argue probative value outweighs prejudicial effect → Address any privilege issues"
            },
            {
                scenario: "Excluding evidence",
                approach: "Challenge relevance → Argue evidence falls within exclusionary rule (hearsay, character) → Show no exception applies → Argue prejudicial effect outweighs probative value → Raise privilege or public interest immunity"
            }
        ],
        relatedGuides: [2, 3, 5]
    },
    7: {
        id: 7,
        name: "Property Law",
        description: "Real and personal property, ownership, and land law.",
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        topics: "Ownership, leases, easements, land registration",
        introduction: "Property law governs rights and interests in land and personal property. Key concepts include ownership, possession, leases, easements, and the registration system under the Land Registration Act 2002. Understanding property rights is essential for property disputes.",
        keyPrinciples: [
            {
                title: "Ownership and Possession",
                description: "Ownership is the ultimate right to property, while possession is physical control. The distinction is important, as possessors have rights even against owners in certain circumstances."
            },
            {
                title: "Leases",
                description: "A lease creates an estate in land for a fixed or periodic term. Essential characteristics include exclusive possession, certainty of term, and a term less than that of the grantor. Leases differ from licenses, which do not grant exclusive possession."
            },
            {
                title: "Easements",
                description: "An easement is a right over another's land, such as a right of way. The four characteristics are: there must be a dominant and servient tenement, the easement must accommodate the dominant tenement, the tenements must be owned by different persons, and the right must be capable of forming the subject matter of a grant."
            },
            {
                title: "Land Registration",
                description: "The Land Registration Act 2002 creates a system of title by registration. Registered interests bind the world, while unregistered interests may be overridden. The register is conclusive as to title, subject to certain exceptions."
            },
            {
                title: "Co-ownership",
                description: "Property can be owned jointly (joint tenancy) or in common (tenancy in common). Joint tenants have rights of survivorship, while tenants in common have distinct shares that pass on death."
            }
        ],
        importantCases: [
            {
                name: "Street v Mountford",
                citation: "[1985] AC 809",
                principle: "Established that a lease requires exclusive possession for a term. The substance of the agreement, not its label, determines whether it is a lease or license."
            },
            {
                name: "Re Ellenborough Park",
                citation: "[1956] Ch 131",
                principle: "Set out the four characteristics of an easement: dominant and servient tenement, accommodation of the dominant tenement, different ownership, and capability of grant."
            },
            {
                name: "Stack v Dowden",
                citation: "[2007] UKHL 17",
                principle: "Established that in domestic property disputes, the court looks to the parties' common intention, inferred from their conduct, rather than strict legal title."
            }
        ],
        argumentStructures: [
            {
                scenario: "Arguing property rights",
                approach: "Establish ownership/possession → Identify the nature of the interest (freehold, lease, easement) → Show the interest was properly created → Address registration requirements → Prove the right has been infringed"
            },
            {
                scenario: "Defending property claim",
                approach: "Challenge ownership/possession → Argue no valid interest was created → Show registration requirements not met → Deny infringement → Raise defenses (adverse possession, estoppel, etc.)"
            }
        ],
        relatedGuides: [1, 4, 5]
    },
    8: {
        id: 8,
        name: "Administrative Law",
        description: "Judicial review, administrative decision-making, and public law principles.",
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        topics: "Judicial review, procedural fairness, delegated legislation",
        introduction: "Administrative law governs the exercise of power by public authorities. Judicial review allows courts to supervise administrative action to ensure it is lawful, rational, and procedurally fair. Understanding administrative law is essential for challenging or defending public authority decisions.",
        keyPrinciples: [
            {
                title: "Judicial Review Grounds",
                description: "The three main grounds are illegality (acting beyond powers), irrationality (Wednesbury unreasonableness), and procedural impropriety (breach of natural justice). The Human Rights Act 1998 adds a fourth ground of incompatibility with Convention rights."
            },
            {
                title: "Procedural Fairness",
                description: "Public authorities must act fairly, which includes the right to be heard, the right to an unbiased decision-maker, and the right to reasons. The requirements vary depending on the nature of the decision and its impact."
            },
            {
                title: "Legitimate Expectation",
                description: "Where a public authority creates a legitimate expectation, it may be required to honor it unless there is an overriding public interest. Legitimate expectations can be procedural or substantive."
            },
            {
                title: "Delegated Legislation",
                description: "Parliament can delegate law-making power to ministers and other bodies. Delegated legislation must be within the scope of the enabling Act and comply with any procedural requirements. It is subject to judicial review."
            },
            {
                title: "Standing",
                description: "To bring judicial review, a claimant must have sufficient interest (standing). This includes those directly affected, but also those with a genuine interest in the matter, such as pressure groups in appropriate cases."
            }
        ],
        importantCases: [
            {
                name: "Associated Provincial Picture Houses Ltd v Wednesbury Corporation",
                citation: "[1948] 1 KB 223",
                principle: "Established the test for irrationality: a decision is irrational if it is so unreasonable that no reasonable authority could have made it."
            },
            {
                name: "R v Secretary of State for the Home Department, ex parte Doody",
                citation: "[1994] 1 AC 531",
                principle: "Established that prisoners have a right to reasons for parole decisions, demonstrating the expansion of procedural fairness requirements."
            },
            {
                name: "R (Bancoult) v Secretary of State for Foreign and Commonwealth Affairs",
                citation: "[2008] UKHL 61",
                principle: "Demonstrated the limits of substantive legitimate expectation, showing that policy changes may override expectations where there is sufficient public interest."
            }
        ],
        argumentStructures: [
            {
                scenario: "Challenging administrative decision",
                approach: "Establish standing → Identify the decision challenged → Argue illegality (ultra vires, error of law) → Argue irrationality (Wednesbury unreasonableness) → Argue procedural impropriety (breach of natural justice) → Address human rights if applicable"
            },
            {
                scenario: "Defending administrative decision",
                approach: "Challenge standing → Argue decision was intra vires → Show decision was rational and reasonable → Prove proper procedure was followed → Demonstrate compatibility with human rights → Address legitimate expectation if raised"
            }
        ],
        relatedGuides: [4, 5, 6]
    }
}

export default function SubjectGuideDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const guideId = id ? parseInt(id) : null
    const guide = guideId ? subjectGuideContentMap[guideId] : null

    if (!guide) {
        return (
            <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
                <div className="w-full space-y-6">
                    <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-xl font-bold text-gray-900 font-heading mb-2">Subject Guide Not Found</h2>
                            <p className="text-sm text-gray-600 font-sans mb-4">The subject guide you're looking for doesn't exist.</p>
                            <Link to="/tutorials?tab=subjects">
                                <Button className="gap-2 bg-accent hover:bg-accent/90 text-white rounded-sm font-heading font-bold text-[10px] uppercase tracking-widest px-3">
                                    <ArrowLeft className="w-4 h-4" /> Back to Subject Guides
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    const relatedGuides = guide.relatedGuides
        .map(id => subjectGuideContentMap[id])
        .filter(Boolean)

    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Back Button */}
                <Link to="/tutorials?tab=subjects">
                    <Button 
                        variant="ghost" 
                        className="gap-2 text-primary hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest px-3 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Subject Guides
                    </Button>
                </Link>

                {/* Hero Section */}
                <div className="relative w-full h-80 rounded-sm overflow-hidden">
                    <img 
                        src={guide.bannerImage} 
                        alt={guide.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Badge className="mb-3 bg-white/90 text-gray-700 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                            Legal Subject
                        </Badge>
                        <h1 className="text-3xl font-bold text-white font-heading mb-2">{guide.name}</h1>
                        <p className="text-white/90 text-sm font-sans mb-3">{guide.description}</p>
                        <div className="flex items-center gap-4 text-white/80 text-xs font-sans">
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{guide.topics}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                    <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                        <CardContent className="p-8 lg:p-10">
                            {/* Introduction */}
                            <p className="text-base text-gray-700 font-sans leading-relaxed mb-8">
                                {guide.introduction}
                            </p>

                            <Separator className="mb-8" />

                            {/* Key Principles */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 font-heading mb-6">Key Principles</h2>
                                    <div className="space-y-6">
                                        {guide.keyPrinciples.map((principle, index) => (
                                            <div key={index} className="space-y-2">
                                                <h3 className="text-lg font-bold text-gray-900 font-heading">{principle.title}</h3>
                                                <p className="text-sm text-gray-700 font-sans leading-relaxed">
                                                    {principle.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Important Cases */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 font-heading mb-6">Important Cases</h2>
                                    <div className="space-y-4">
                                        {guide.importantCases.map((caseItem, index) => (
                                            <div key={index} className="bg-gray-50 rounded-sm p-4 border-l-4 border-accent">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <h4 className="text-base font-bold text-gray-900 font-heading">{caseItem.name}</h4>
                                                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest shrink-0">
                                                        {caseItem.citation}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-700 font-sans leading-relaxed">
                                                    <span className="font-semibold">Principle: </span>
                                                    {caseItem.principle}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Statutory Provisions */}
                                {guide.statutoryProvisions && guide.statutoryProvisions.length > 0 && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 font-heading mb-6">Statutory Provisions</h2>
                                            <div className="space-y-4">
                                                {guide.statutoryProvisions.map((statute, index) => (
                                                    <div key={index} className="bg-accent/5 rounded-sm p-4 border-l-4 border-accent">
                                                        <div className="flex items-start justify-between gap-3 mb-2">
                                                            <h4 className="text-base font-bold text-gray-900 font-heading">{statute.title}</h4>
                                                            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest shrink-0">
                                                                {statute.reference}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-700 font-sans leading-relaxed">
                                                            {statute.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                <Separator />

                                {/* Argument Structures */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 font-heading mb-6">Common Argument Structures</h2>
                                    <div className="space-y-4">
                                        {guide.argumentStructures.map((structure, index) => (
                                            <div key={index} className="bg-gray-50 rounded-sm p-4">
                                                <h4 className="text-base font-bold text-gray-900 font-heading mb-2">{structure.scenario}</h4>
                                                <p className="text-sm text-gray-700 font-sans leading-relaxed">
                                                    {structure.approach}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar - Related Guides */}
                    {relatedGuides.length > 0 && (
                        <Card className="rounded-sm border-gray-200 bg-white shadow-none lg:sticky lg:top-6">
                            <CardHeader className="border-b border-gray-100 p-5">
                                <CardTitle className="text-base font-bold font-heading">Related Guides</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="space-y-4">
                                    {relatedGuides.map((related) => (
                                        <Link 
                                            key={related.id} 
                                            to={`/subjects/${related.id}`}
                                            className="flex items-center gap-3 p-2 rounded-sm hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 flex-shrink-0">
                                                <img 
                                                    src={related.bannerImage} 
                                                    alt={related.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 group-hover:text-accent transition-colors font-sans leading-tight">
                                                    {related.name}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

