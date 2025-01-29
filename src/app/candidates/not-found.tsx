import NotFoundTemplate from "@/components/templates/not-found";

export default NotFoundTemplate({
	header: "No Candidates Found",
	description: "The requested candidate could not be found",
	buttonText: "View All Candidates",
	buttonLink: "/candidates",
});
