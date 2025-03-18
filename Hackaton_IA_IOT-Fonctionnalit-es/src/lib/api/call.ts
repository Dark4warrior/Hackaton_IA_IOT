export default async function call(
  url: string,
  version: "/v1" = "/v1"
): Promise<Response> {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/api" + version + url);
}
