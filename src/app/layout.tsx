import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <Head>
          <title>jesaispasquoi</title>
          <meta name="description" content="jesaispasquoi" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </head>
      <body>{children}</body>
    </html>
  );
}
