import { getProjects } from "@/actions/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./delete-project";

export default async function ProjectList({ orgId }) {
    const projects = await getProjects(orgId);
    if (projects.length === 0) {
        return (
            <div className="flex items-center justify-center flex-col">
                <p className="text-red-600 font-semibold text-2xl">No projects found</p>
                <Link
                    href="/project/create"
                    className="bg-blue-500 mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create new
                </Link>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
                <Card key={project.id}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            {project.name}

                            <DeleteProject projectId={project.id} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500 mb-4">{project.description}</p>
                        <Link
                            href={`/project/${project.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            View Project
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
