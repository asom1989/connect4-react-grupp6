import fileToBase64 from "./fileToBase64";

export default async function register(
  username: string,
  password: string,
  image: File | null
) {
  let encoded: string | undefined;
  if (image) {
    encoded = (await fileToBase64(image)) as string;
  }
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, encoded }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
