export const fetchWithToken = async (url: string) => {
  try {
    return await globalThis.fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      next: { revalidate: 30 },
    });
  } catch (error) {
    console.error(`fetchWithToken error for ${url}:`, error);
    return null;
  }
};
