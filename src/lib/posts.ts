// import fetch from "node-fetch";

export async function getAllData() {
  const res = await fetch(new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/password`));
  const data = await res.json();
  return data;
}
