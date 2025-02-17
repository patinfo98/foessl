import Link from 'next/link';
import { fetchBlogPostsByCategory as fetchBlogPostsByCategory } from '../../lib/api';
import { BlogPostSimplified as BlogPostSimplified } from '@/types/types';

type paramsType = Promise<{ slug: string }>;
export default async function BlogPostsPage({ params }: { params: paramsType }) {
  const { slug } = await params;
  const blogPosts = await fetchBlogPostsByCategory(slug);

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-8">
        <p>Keine Blogposts in dieser Kategorie verfügbar</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogPosts.map((post: BlogPostSimplified) => (
          <div key={post.id} className="relative rounded-lg overflow-hidden bg-white shadow-lg group">
            <Link href={`/${slug}/${post.slug}`} passHref>
              <img
                src={post.titleImage}
                alt={post.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 transition-all duration-300 group-hover:bg-opacity-50">
                <h2 className="text-white text-2xl font-semibold truncate">{post.title}</h2>
                <p className="text-white text-sm mt-2">{post.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
