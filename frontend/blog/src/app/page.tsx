import { fetchCategories } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/types';

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  if (!categories || categories.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-8">
        <p>Keine Kategorien verfügbar</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {categories.map((category: Category) => (
          <div
            key={category.id}
            className="relative w-full h-96 lg:h-[20rem] rounded-lg overflow-hidden bg-white shadow-lg group"
          >
            <Link href={`/${category.slug}`} passHref>
              <Image
                src={category.banner}
                alt={category.title!}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                className="transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-opacity-50">
                <h2 className="text-white text-4xl font-semibold truncate">{category.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
