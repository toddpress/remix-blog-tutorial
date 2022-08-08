import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from '~/models/posts.server';

type Post = {
  id: Number;
  slug: string;
  title: string;
  author: string;
  publised_on: string;
}

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader = async () => json<LoaderData>({
  posts: await getPosts(),
})

export default function Posts() {
  const { posts } = useLoaderData();
  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: Post, i: Number) => (
          <li key={`${post.slug}_${i}`}>
            <Link
              to={encodeURIComponent(post.slug)}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
