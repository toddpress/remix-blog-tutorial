import { prisma } from "~/db.server";

type Post = {
  slug: string;
  title: string;
  markdown: string;
};

export const getPosts = async () => {
  return prisma.post.findMany()
}