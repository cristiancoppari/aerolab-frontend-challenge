export async function searchGame(query: string) {
  try {
    const response = await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error("Failed to fetch games", response);
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games", error);
    throw new Error("Failed to fetch games");
  }
}

export async function getToken() {
  try {
    const response = await fetch("/api/token", {
      method: "POST",
    });

    if (!response.ok) {
      console.error("Failed to fetch token", response);
      throw new Error("Failed to fetch token");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token", error);
    throw new Error("Failed to fetch token");
  }
}
