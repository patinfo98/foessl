export const fetchBlogPostsByCategory = async (slug : string) => {
    const response = await fetch(`http://localhost:1337/api/blogs?filters[category][slug][$eq]=${slug}&populate[0]=Images&sort=Date:desc`); // Adjust the URL for your Strapi API
    const data = await response.json();
    return data.data.map((post: any) => ({
      id: post.id,
      title: post.Title, // Access 'Title' from the response
      content: post.Content, // Content is an array of blocks
      date: post.Date,
      slug: post.slug,
      titleImage: "http://localhost:1337" + post.Images[0].formats.medium.url, 
    }));
  };

  export const fetchCategories = async () => {
    const res = await fetch('http://localhost:1337/api/categories?populate=Banner'); 
    const data = await res.json();
    return data.data.map((category: any) => ({
      id: category.id,
      title: category.Title,
      slug: category.slug,
      banner: "http://localhost:1337" + category.Banner.formats.large.url, 
    }));
  };

  export const fetchSingleBlogPost = async (blogSlug: string) => {
    const res = await fetch(`http://localhost:1337/api/blogs?filters[slug][$eq]=${blogSlug}&populate=Images`);
    const data = await res.json();
  
    const post = data.data[0]; // Assuming blog post exists
  
    return {
      id: post.id,
      title: post.Title,
      content: post.Content[0].children[0].text,  // Assuming content is stored as text or rich text
      images: post.Images.map((image: any) => "http://localhost:1337" + image.formats?.large?.url)
    };
  };
  
  