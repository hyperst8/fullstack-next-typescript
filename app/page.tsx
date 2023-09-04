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
