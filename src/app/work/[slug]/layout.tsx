import { Metadata } from "next";

const projectsData = [
  { id: "apps-for-bharat", title: "APPS FOR BHARAT", descriptor: "VIBRANT STARTUP HEADQUARTERS" },
  { id: "zluri", title: "ZLURI", descriptor: "OFFICE OF THE FUTURE" },
  { id: "qpiai", title: "QPIAI", descriptor: "QUANTUM TECH LAB" },
  { id: "pw-brigade", title: "PHYSICS WALLAH", descriptor: "ED-TECH CAMPUS & STUDIOS" },
  { id: "juego", title: "JUEGO", descriptor: "GAMING & ANIMATION STUDIO" },
  { id: "orbit", title: "ORBIT", descriptor: "EXECUTIVE CORPORATE HQ" },
  { id: "littlegym", title: "THE LITTLE GYM", descriptor: "CHILDREN'S FITNESS CENTER" },
  { id: "happey", title: "HAPPEY", descriptor: "MODERN FINTECH OFFICE" }
];

export async function generateStaticParams() {
  return projectsData.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.id === resolvedParams.slug);
  if (!project) return { title: "Project Not Found | Voomet Design" };

  return {
    title: `${project.title} | Voomet Design`,
    description: `View the ${project.title} project by Voomet Design: ${project.descriptor}.`,
  };
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}