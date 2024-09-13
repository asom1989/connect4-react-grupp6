
export default async function loginUser(username: string, password: string){
  try {
    const response = await( await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) })).json();
    if (!response.ok) {
      throw new Error("Error: Login failed!");
    }
    const { userData } = response;
    return userData;
  } catch (error) {
    console.error(error);
    return false;
  }

}