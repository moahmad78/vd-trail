import { Metadata } from "next";
import { projectsData } from "@/data/projectsData";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.id === resolvedParams.slug);

  if (!project) return { title: "Project Not Found | VoometDesign" };

  return {
    title: `${project.title} | ${project.descriptor} | VoometDesign`,
    description: project.description,
    openGraph: {
      title: `${project.title} | VoometDesign`,
      description: project.description,
      images: [project.heroImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | VoometDesign`,
      description: project.description,
      images: [project.heroImage],
    },
    alternates: {
      canonical: `/work/${project.id}`,
    },
  };
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
