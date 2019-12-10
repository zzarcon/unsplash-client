import {Unsplash} from '../src';

describe('Unsplash', () => {
  const accessKey = 'my-key';

  it('should use given fetcher', async () => {
    const customFetcher = jest.fn().mockReturnValue(Promise.resolve({json: () => Promise.resolve([])}));
    const client = new Unsplash(accessKey, customFetcher);

    await client.random();

    expect(customFetcher).toBeCalledTimes(1);
    expect(customFetcher).toBeCalledWith('https://api.unsplash.com/photos/random?client_id=my-key&count=10')
  });
});
