import { describe, test, beforeAll, afterAll, expect, jest } from '@jest/globals';
import { BlogPostSimplified, StrapiBlog, StrapiResponse, StrapiResponseMultiple } from '../../frontend/blog/src/types/types';

const baseURL = 'http://localhost:1337';

let categoryId;
let blogId;
describe('Create Tests', () => {


  test('should create a new category', async () => {
    const newCategory: StrapiBlog = {
      title: 'Klettern',
      slug: 'klettern',
    }
    const response = await fetch(`${baseURL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ data: newCategory }),
    });
    console.log(await response);
    const createdCategory: StrapiResponse = await response.json();
    console.log(createdCategory);
    expect(response.status).toBe(201);
    expect(createdCategory.data).toHaveProperty('id');
    expect(createdCategory.data).toHaveProperty('title', 'Klettern');

    categoryId = createdCategory?.data?.documentId;
  });

  test('should create a new blogEntry', async () => {
    const newBlog: StrapiBlog = {
      title: 'Teneriffa',
      slug: 'teneriffa',
      date: '2024-04-02'
    }
    const response = await fetch(`${baseURL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ data: newBlog }),
    });
    console.log(await response);
    const createdBlog: StrapiResponse = await response.json();
    console.log(createdBlog);
    expect(response.status).toBe(201);
    expect(createdBlog.data).toHaveProperty('id');
    expect(createdBlog.data).toHaveProperty('title', 'Teneriffa');

    blogId = createdBlog?.data?.documentId;
  });
});

describe('Get Tests', () => {

  test('should retrieve a category by id', async () => {
    const response = await fetch(`${baseURL}/api/categories/${categoryId}`, {
      method: 'GET',
      headers: {

      },
    });

    const retrievedCategory: StrapiResponse = await response.json();

    expect(response.status).toBe(200);
    expect(retrievedCategory.data).toHaveProperty('documentId', categoryId);
    expect(retrievedCategory.data).toHaveProperty('title');
  });

  test('should retrieve a blog by id', async () => {
    const response = await fetch(`${baseURL}/api/blogs/${blogId}`, {
      method: 'GET',
      headers: {

      },
    });

    const retrievedBlog: StrapiResponse = await response.json();

    expect(response.status).toBe(200);
    expect(retrievedBlog.data).toHaveProperty('documentId', blogId);
    expect(retrievedBlog.data).toHaveProperty('title');
  });
});

describe('Put Tests', () => {

  test('should update a category', async () => {
    const updatedCategory = {
      data: {
        title: 'Updated Technology',
        slug: 'updated-technology'
      }
    };

    const response = await fetch(`${baseURL}/api/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    });

    expect(response.status).toBe(200);
    expect((await response.json() as StrapiResponse).data).toHaveProperty('title', 'Updated Technology');
  });

  test('should update a blog', async () => {
    const updatedBlog = {
      data: {
        title: 'Urlaub Teneriffa',
        slug: 'urlaub-teneriffa'
      }
    };

    const response = await fetch(`${baseURL}/api/blogs/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBlog),
    });

    expect(response.status).toBe(200);
    expect((await response.json() as StrapiResponse).data).toHaveProperty('title', 'Urlaub Teneriffa');
  });
});

describe('Get All Tests', () => {


  test('should retrieve all categories', async () => {
    const response = await fetch(`${baseURL}/api/categories`, {
      method: 'GET',
      headers: {

      },
    });

    const categories: StrapiResponseMultiple = await response.json();
    expect(response.status).toBe(200);
    expect(categories!.data!.length).toBeGreaterThanOrEqual(1);
    expect(categories!.data![0]).toHaveProperty('title');
  });

  test('should retrieve all blogs', async () => {
    const response = await fetch(`${baseURL}/api/blogs`, {
      method: 'GET',
      headers: {

      },
    });

    const blogs: StrapiResponseMultiple = await response.json();
    expect(response.status).toBe(200);
    expect(blogs!.data!.length).toBeGreaterThanOrEqual(1);
    expect(blogs!.data![0]).toHaveProperty('title');
  });
});


describe('Delete Tests', () => {

  test('should delete a category', async () => {
    const response = await fetch(`${baseURL}/api/categories/${categoryId}`, {
      method: 'DELETE',
    });
    expect(response.status).toBe(204);
  });

  test('should delete a blog', async () => {
    const response = await fetch(`${baseURL}/api/blogs/${blogId}`, {
      method: 'DELETE',
    });
    expect(response.status).toBe(204);
  });
});