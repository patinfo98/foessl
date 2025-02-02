import { fetchBlogPostsByCategory, fetchCategories, fetchSingleBlogPost } from '../lib/api';
import { jest } from '@jest/globals';

const mockBlogPosts = [
    {
        id: 1,
        title: 'Dresden',
        content: [
            {
                children: [{ text: 'Urlaub in Dresden' }],
            },
        ],
        date: '2024-04-02',
        slug: 'dresden',
        images: [{ formats: { medium: { url: '/dresden.jpg' }, large: { url: '/dresden.jpg' } } }],
    },
    {
        id: 2,
        title: 'Teneriffa',
        content: [
            {
                children: [{ text: 'Urlaub auf Teneriffa' }],
            },
        ],
        date: '2024-04-02',
        slug: 'teneriffa',
        images: [{ formats: { medium: { url: '/teneriffa.jpg' }, large: { url: '/teneriffa.jpg' } } }],
    }
];

const mockCategories = [
    {
        id: 1,
        title: 'Urlaub',
        slug: 'urlaub',
        banner: { formats: { large: { url: '/banner.jpg' } } }
    },
    {
        id: 2,
        title: 'Klettern',
        slug: 'klettern',
        banner: { formats: { large: { url: '/klettern.jpg' } } }
    },

];

const mockApiData = jest.fn(
    (input: RequestInfo, init?: RequestInit): Promise<Response> =>
        Promise.resolve({
            ok: true,
            json: async () => {
                if (init) console.log(init);
                const url = (input as string);
                if (url.includes('teneriffa')) return { data: [mockBlogPosts[1]] };
                if (url.includes('/api/blogs')) return { data: mockBlogPosts };
                if (url.includes('/api/categories')) return { data: mockCategories };
                return { data: [] };
            },
        }) as Promise<Response>
) as jest.MockedFunction<typeof fetch>;

describe('API Fetch Functions', () => {
    beforeEach(() => {
        global.fetch = mockApiData;
    });

    test('fetchBlogPostsByCategory should return mapped blog posts', async () => {
        const posts = await fetchBlogPostsByCategory('urlaub');
        expect(posts).toHaveLength(2);
        expect(posts[0].title).toBe('Dresden');
        expect(posts[0].titleImage).toBe(`localhost://1337/dresden.jpg`);
        expect(posts[1].title).toBe('Teneriffa');
        expect(posts[1].titleImage).toBe(`localhost://1337/teneriffa.jpg`);
    });

    test('fetchCategories should return mapped categories', async () => {
        const categories = await fetchCategories();
        expect(categories).toHaveLength(2);
        expect(categories[0].title).toBe('Urlaub');
        expect(categories[0].banner).toBe('localhost://1337/banner.jpg');
        expect(categories[1].title).toBe('Klettern');
        expect(categories[1].banner).toBe('localhost://1337/klettern.jpg');
    });

    test('fetchSingleBlogPost should return a mapped blog post', async () => {
        const post = await fetchSingleBlogPost('teneriffa');
        expect(post!.id).toBe(2);
        expect(post!.title).toBe('Teneriffa');
        expect(post!.content).toBe('Urlaub auf Teneriffa');
        expect(post!.images[0]).toBe('localhost://1337/teneriffa.jpg');
    });
});

const mockApiDataEmpty = jest.fn(
    (input: RequestInfo, init?: RequestInit): Promise<Response> =>
        Promise.resolve({
            ok: true,
            json: async () => {
                if (init) console.log(init);
                return { data: [] };
            },
        }) as Promise<Response>
) as jest.MockedFunction<typeof fetch>;

describe('API Fetch Functions Empty Response', () => {
    beforeEach(() => {
        global.fetch = mockApiDataEmpty;
    });
    test('fetchBlogPostsByCategory should return empty array', async () => {
        const posts = await fetchBlogPostsByCategory('urlaub');
        expect(posts).toHaveLength(0);
    });

    test('fetchCategories should return empty array', async () => {
        const categories = await fetchCategories();
        expect(categories).toHaveLength(0);
    });

    test('fetchSingleBlogPost should return null', async () => {
        const post = await fetchSingleBlogPost('dresden');
        expect(post).toBe(null);
    });
});