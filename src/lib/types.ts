export interface Candidate {
	id: string;
	name: string;
	email: string;
	phone: string;
	status: CandidateStatus;
	createdAt: Date;
}

export enum CandidateStatus {
	NEW = "NEW",
	REVIEWING = "REVIEWING",
	SHORTLISTED = "SHORTLISTED",
	REJECTED = "REJECTED",
	HIRED = "HIRED",
}
