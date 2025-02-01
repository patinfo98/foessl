import { BlogPost, StrapiCategory, StrapiMediaType } from "@/types/types";

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'localhost://1337';

export const fetchBlogPostsByCategory = async (slug : string) => {
    const response = await fetch(`${apiUrl}/api/blogs?filters[category][slug][$eq]=${slug}&populate[0]=Images&sort=Date:desc`); // Adjust the URL for your Strapi API
    const data = await response.json();
    return data?.data?.map((post: BlogPost) => ({
      id: post.id,
      title: post.title, // Access 'Title' from the response
      content: post.content, // Content is an array of blocks
      date: post.date,
      slug: post.slug,
      titleImage: apiUrl + post.images[0].formats.medium.url, 
    }));
  };

  export const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/api/categories?populate=Banner`); 
    const data = await res.json();
    return data?.data?.map((category: StrapiCategory) => ({
      id: category.id,
      title: category.title,
      slug: category.slug,
      banner: apiUrl + category.banner?.formats?.large?.url, 
    }));
  };

  export const fetchSingleBlogPost = async (blogSlug: string) => {
    const res = await fetch(`${apiUrl}/api/blogs?filters[slug][$eq]=${blogSlug}&populate=Images`);
    const data = await res.json();
  
    const post = data?.data[0]; // Assuming blog post exists
  
    return {
      id: post.id,
      title: post.Title,
      content: post.Content[0].children[0].text,  // Assuming content is stored as text or rich text
      images: post.Images.map((image: StrapiMediaType) => apiUrl + image.formats?.large?.url)
    };
  };
  
  