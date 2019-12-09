import stringifyParams, {QueryParams} from 'stringify-params';
export interface SearchOptions {
  page?: number;
  perPage?: number;
}
interface Urls {
  full: string;
  raw: string;
  regular: string;
  small: string;
  thumb: string;
}
interface User {
  id: string;
  username: string;
  name: string;
  bio: string;
}
interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface PhotoRawResponse {
  id: string;
  created_at: string;
  height: number;
  width: number;
  urls: Urls;
  description: string;
  user: User;
  links: Links;
}
export interface PhotoResponse {
  id: string;
  createdAt: string;
  width: number;
  height: number;
  urls: Urls;
  description: string;
  user: User;
  links: Links;
}

interface SearchRawResponse {
  results: PhotoRawResponse[];
}
export type SearchResponse = PhotoResponse;

const apiUrl = 'https://api.unsplash.com';

// TODO: add support for AbortController ?
export class Unsplash {
  constructor(private accessKey: string, private fetcher: typeof fetch = fetch) {}

  async search(query: string, params: SearchOptions = {perPage: 10, page: 1}): Promise<PhotoResponse[]> {
    const { results } = await this.request<SearchRawResponse>('/search/photos', {
      query,
      per_page: params.perPage,
      page: params.page
    });

    return results.map(this.mapResponse);
  }

  async random(count: number = 10): Promise<PhotoResponse[]> {
    const response = await this.request<PhotoRawResponse[]>('/photos/random', {count})
    
    return response.map(this.mapResponse);
  }

  async lookup(id: string): Promise<PhotoResponse> {
    const response = await this.request<PhotoRawResponse>(`/photos/${id}`);

    return this.mapResponse(response);
  }

  private mapResponse = (photo: PhotoRawResponse): PhotoResponse => ({
    id: photo.id,
    createdAt: photo.created_at,
    height: photo.height,
    width: photo.width,
    urls: photo.urls,
    description: photo.description,
    user: photo.user,
    links: photo.links,
  });

  private async request<T>(path: string, params?: QueryParams): Promise<T> {
    const stringifiedParams = stringifyParams({
      client_id: this.accessKey,
      ...params
    })
    const url = `${apiUrl}${path}${stringifiedParams}`;
    const response = await (await this.fetcher(url)).json();

    return response;
  }
}