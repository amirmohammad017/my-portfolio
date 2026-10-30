import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_DB_NAME } = process.env;

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    body: String,
    date: Date,
    image: { type: new mongoose.Schema({ url: String, key: String }, { _id: false }) },
  },
  { timestamps: true, collection: "blogs" },
);

const projectSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    image: { type: new mongoose.Schema({ url: String, key: String }, { _id: false }) },
    view_demo: String,
    source_code: String,
    date: Date,
    featured: Boolean,
    technologies: [String],
    kind: String,
    internal_path: String,
  },
  { timestamps: true, collection: "projects" },
);

const Blog = mongoose.model("Blog", blogSchema);
const Project = mongoose.model("Project", projectSchema);

const img = (folder, file) => ({ url: `/images/${folder}/${file}`, key: "" });

const blogs = [
  {
    title: "React Router Essentials",
    slug: "react-router-essentials",
    excerpt: "A practical look at how React Router shaped modern single page applications.",
    date: new Date("2026-05-21"),
    image: img("blogs", "react_router_essentials.avif"),
    body: `## The Evolution of Single Page Applications

Single page applications moved navigation to the browser. React Router made that model declarative: routes map URLs to components and the page never fully reloads.

## Data Loading and Route Management

Loaders and actions bring data fetching next to the route that needs it. Nested routes let layouts persist while only the changing part of the page updates.

## Conclusion

Whether you stay on React Router or move to a framework like Next.js, understanding routing fundamentals pays off everywhere.`,
  },
  {
    title: "Why Use a Headless CMS Like Strapi",
    slug: "why-use-a-headless-cms-like-strapi",
    excerpt: "Decoupling content from presentation gives you flexibility and speed.",
    date: new Date("2026-04-30"),
    image: img("blogs", "strapi_cms_benefits.avif"),
    body: `## Content Without Constraints

A headless CMS exposes content through an API, so the same data can power a website, a mobile app or anything else.

## Developer Experience

Custom content types, role based access and a ready admin panel save weeks of work.

## Trade-offs

You operate one more service. For a small personal site, a built-in admin backed by MongoDB can be simpler, which is exactly why this site has its own.`,
  },
  {
    title: "Deploying to Vercel in Minutes",
    slug: "deploying-to-vercel-in-minutes",
    excerpt: "From a Git repository to a live URL with almost no configuration.",
    date: new Date("2026-04-15"),
    image: img("blogs", "vercel-deployment.jpeg"),
    body: `## Connect Your Repository

Import the project, and Vercel detects the framework and build settings automatically.

## Environment Variables

Add secrets in the project settings instead of committing them.

## Preview Deployments

Every branch gets its own URL, making review and testing effortless.`,
  },
  {
    title: "The Case for Minimalist Design",
    slug: "the-case-for-minimalist-design",
    excerpt: "Less noise, more clarity: why restraint makes interfaces better.",
    date: new Date("2026-03-28"),
    image: img("blogs", "minimalist-design-concept.jpeg"),
    body: `## Clarity First

Every element should earn its place. Removing the unnecessary makes the important obvious.

## Typography and Space

Good spacing and a consistent type scale do more than decoration ever can.

## Performance Is Design

Fewer elements and lighter assets mean faster pages, and speed is part of the experience.`,
  },
];

const projects = [
  {
    title: "calculator app",
    slug: "calculator-app",
    description:
      "A modern and responsive Calculator App built with HTML, SCSS, and JavaScript. Supports keyboard input, live calculations, error handling, and smooth UI interactions.",
    image: img("projects", "calculator-app.png"),
    view_demo: "https://amirmohammad017.github.io/calculator-app/",
    source_code: "https://github.com/amirmohammad017/calculator-app",
    date: new Date("2026-04-08"),
    featured: true,
    kind: "external",
    internal_path: "",
  },
  {
    title: "property pulse",
    slug: "property-pulse",
    description:
      "A full-stack property rental marketplace built with Next.js and MongoDB, with its own authentication, bookmarks, messaging and image uploads. Lives inside this site as an isolated section.",
    image: img("projects", "property-pulse.jpg"),
    view_demo: "",
    source_code: "https://github.com/amirmohammad017/property-pulse",
    date: new Date("2026-05-01"),
    featured: true,
    technologies: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    kind: "embedded",
    internal_path: "/projects/property-pulse",
  },
];

await mongoose.connect(MONGODB_URI, {
  dbName: MONGODB_DB_NAME || undefined,
  serverSelectionTimeoutMS: 15000,
});

for (const blog of blogs) {
  await Blog.updateOne({ slug: blog.slug }, { $set: blog }, { upsert: true });
}
for (const project of projects) {
  await Project.updateOne({ slug: project.slug }, { $set: project }, { upsert: true });
}

console.log(`Seeded ${blogs.length} blogs and ${projects.length} projects`);
await mongoose.disconnect();
