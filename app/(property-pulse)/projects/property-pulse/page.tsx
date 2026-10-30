import Link from "next/link";
import Hero from "@/modules/property-pulse/components/Hero";
import FeaturedProperties from "@/modules/property-pulse/components/FeaturedProperties";
import RecentProperties from "@/modules/property-pulse/components/RecentProperties";
import connectDb from "@/modules/property-pulse/config/database";
import Property, { PropertyDataWithId } from "@/modules/property-pulse/models/Property";
import { convertToSerializableObject } from "@/modules/property-pulse/utils/convertToObject";

export default async function HomePage() {
  await connectDb();
  const rawProperties = await Property.find({}).sort({ createdAt: -1 }).lean();
  const properties = rawProperties.map((item) =>
    convertToSerializableObject(item),
  ) as unknown as PropertyDataWithId[];
  const featured = properties
    .filter((property) => property.is_featured)
    .slice(0, 2);
  const recent = properties
    .filter((property) => !property.is_featured)
    .slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedProperties featured={featured} />
      <RecentProperties recent={recent} />
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/projects/property-pulse/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}
