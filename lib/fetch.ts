export const fetchWithToken = async (url: string) => {
  return await globalThis.fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 30 },
  });
};
