import call from "@/lib/api/call";
import Head from "next/head";

export default async function Page() {
  const res = await call("/hello");
  const data = await res.json();

  return (
    <>
      <Head>
        <title>Bienvenue !</title>
      </Head>
      <main>
        <h1>{data.message}</h1>
      </main>
    </>
  );
}
