export interface StrapiBaseModel {
    id: number;
    slug: string;
    title: string;
    documentId: string;
}

export interface StrapiBlog {
    title: string,
    slug: string
    date?: string;
}

export interface StrapiResponse {
    data?: StrapiBaseModel;
  };

export interface StrapiResponseMultiple {
    data?: StrapiBaseModel[];
}

export interface Category extends StrapiBaseModel {
    banner: string;
}

export interface StrapiCategory extends StrapiBaseModel {
    banner: StrapiMediaType;
}

export interface BlogPostSimplified extends StrapiBaseModel {
    titleImage: string;
    description: string;
}

export interface BlogPost extends StrapiBaseModel {
    date: string;
    content: string;
    images: StrapiMediaType[];
}

export interface StrapiMediaType {
    formats: {
        large: {
            url: string;
        };
        medium: {
            url: string;
        };
        small: {
            url: string;
        };
    };
}