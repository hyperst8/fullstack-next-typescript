import Link from "next/link";
import FormPost from "./FormPost";

export const revalidate = 0

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);
  if(!res.ok) {
    console.log(res);
  }
  return res.json()
}

export default async function Home() {
  const data: { id: number; title: string }[] = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link className="bg-teal-500 text-black font-medium py-2 px-4 rounded-md" href={"/dashboard"}>Go to dashboard</Link>
      <FormPost />
      <h1 className="text-lg font-bold py-4">Posts from database</h1>

      {
        data.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))
      }
    </main>
  )
}
