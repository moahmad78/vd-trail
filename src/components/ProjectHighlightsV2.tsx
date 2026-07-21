import fs from "fs";
import path from "path";
import ProjectHighlightsV2Client, { ProjectData } from "./ProjectHighlightsV2Client";

// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] Project Highlights V2 — Editorial Masonry Showcase (Server)

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function ProjectHighlightsV2({ hideCTA = false }: { hideCTA?: boolean }) {
  const categories = [
    { name: "Hospitality", folder: "hospitality" },
    { name: "Residential", folder: "resedential" },
    { name: "Educational", folder: "education" },
    { name: "Idea", folder: "idea" }
  ];

  const projects: ProjectData[] = [];

  categories.forEach((cat) => {
    try {
      const dirPath = path.join(process.cwd(), "public", "Design", cat.folder);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        
        files.forEach((file, index) => {
          // Check if it's an image file
          if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
            projects.push({
              name: `${cat.name} Concept ${index + 1}`,
              category: cat.name,
              image: `/Design/${cat.folder}/${file}`,
            });
          }
        });
      }
    } catch (err) {
      console.error(`Error reading directory for category ${cat.name}:`, err);
    }
  });

  // Intelligently mix/shuffle the "All" collection right on the server
  // This shuffled array acts as the stable initial prop for the client
  const mixedProjects = shuffleArray(projects);

  return <ProjectHighlightsV2Client projects={mixedProjects} hideCTA={hideCTA} />;
}
