export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem("token");

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json();
};
