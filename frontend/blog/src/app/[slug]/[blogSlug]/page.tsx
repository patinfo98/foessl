import { fetchSingleBlogPost } from '@/lib/api';
import Image from 'next/image';

type paramsType = Promise<{ blogSlug: string }>;
export default async function SinglePostPage({ params }: { params: paramsType }) {
  const { blogSlug } = await params;
  const blogPost = await fetchSingleBlogPost(blogSlug);

  if (!blogPost) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-8">
        <p>Kein Blogpost verfügbar</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-4">
      <h1 className="text-4xl font-bold mb-8">{blogPost.title}</h1>

      {/* Slideshow container */}
      <div className="relative mb-8">
        {/* Display images in full size, not limited to fixed size */}
        <div className="flex overflow-x-auto space-x-4">
          {blogPost.images.map((image: string, index: number) => (
            <div key={index} className="w-full h-auto flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={blogPost.title}
                className="object-cover w-full h-auto" // Ensure image maintains aspect ratio and takes full width
                width={1920} // Set width to match the screen size or maximum desired size
                height={1080} // Set height proportionally or use the natural image height
                layout="intrinsic" // This ensures images are displayed with their natural aspect ratio
                quality={100} // Use the highest quality image
              />
            </div>
          ))}
        </div>
      </div>

      {/* Blog content */}
      <div className="mt-6">
        <p className="text-lg">{blogPost.content}</p>
      </div>
    </div>
  );
}
