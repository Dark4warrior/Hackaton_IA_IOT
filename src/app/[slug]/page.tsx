import call from "@/lib/api/call";
import Head from "next/head";

export default async function Page({ params }: any) {
  const slug = params.slug;
  const res = await call("/hello/" + slug);
  const data = await res.json();

  return (
    <>
      <Head>
        <title>Bienvenue {data.message} !</title>
      </Head>
      <main>
        <h1>Bienvenue {data.message} !</h1>
      </main>
    </>
  );
}
