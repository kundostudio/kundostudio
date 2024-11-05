type FetcherOptions = RequestInit & {
  headers?: HeadersInit;
};

export const fetcher = (url: string, options?: FetcherOptions) =>
  fetch(url, options).then((res) => res.json());
