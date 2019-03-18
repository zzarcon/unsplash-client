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
export interface SearchResponse {
  id: string;
  createdAt: string;
  height: number;
  width: number;
  urls: Urls;
  description: string;
}

interface SearchRawResponseResult {
  id: string;
  created_at: string;
  height: number;
  width: number;
  urls: Urls;
  description: string;
}
interface SearchRawResponse {
  results: SearchRawResponseResult[];
}

const apiUrl = 'https://api.unsplash.com';

// TODO: add support for AbortController ?
export class Unsplash {
  constructor(private accessKey: string) {}

  async search(query: string, params: SearchOptions = {perPage: 10, page: 1}): Promise<SearchResponse[]> {
    const response = await this.request<SearchRawResponse>('/search/photos', {
      query,
      per_page: params.perPage,
      page: params.page
    });

    return this.mapResponse(response.results);
  }

  async random(count: number = 10): Promise<SearchResponse[]> {
    const response = await this.request<SearchRawResponseResult[]>('/photos/random', {count})
    
    return this.mapResponse(response);
  }

  private mapResponse = (results: SearchRawResponseResult[]): SearchResponse[] => {
    return results.map(result => ({
      id: result.id,
      createdAt: result.created_at,
      height: result.height,
      width: result.width,
      urls: result.urls,
      description: result.description
    }));
  }

  private async request<T>(path: string, params?: QueryParams): Promise<T> {
    const stringifiedParams = stringifyParams({
      client_id: this.accessKey,
      ...params
    })
    const url = `${apiUrl}${path}${stringifiedParams}`;
    const response = await (await fetch(url)).json();

    return response;
  }
}