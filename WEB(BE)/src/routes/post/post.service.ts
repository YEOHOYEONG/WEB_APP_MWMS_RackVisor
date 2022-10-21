import { CreatePostInput } from './post.schema';
import prisma from '../../plugins/prisma';

export async function createPost(input: CreatePostInput) {
  const post = await prisma.post.create({
    data: input,
  });

  return post;
}

export async function readPostsOnUnit(unitId: number) {
  const posts = await prisma.post.findMany({
    where: {
      postingUnitId: unitId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          rank: true,
        },
      },
    },
  });

  return posts;
}

export async function readPostOnId(id: number) {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          rank: true,
        },
      },
    },
  });

  return post;
}

export async function deletePostOnId(id: number) {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });

  return post;
}