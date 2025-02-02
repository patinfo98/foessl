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
      <div className="relative mb-8">
        <div className="flex overflow-x-auto space-x-4">
          {blogPost.images.map((image: string, index: number) => (
            <div key={index} className="w-full h-auto flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={blogPost.title}
                className="object-cover w-full h-auto"
                width={1920} 
                height={1080}
                layout="intrinsic"
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-lg">{blogPost.content}</p>
      </div>
    </div>
  );
}
