import '@testing-library/jest-dom'

jest.mock('@linaria/core', () => ({
    css: jest.fn(() => ''),
    cx: jest.fn(() => ''),
}))

jest.mock('@linaria/react', () => {
  function styled(tag: any) {
    return jest.fn(() => `mock-styled.${tag}`);
  }
  return {
    styled: new Proxy(styled, {
      get(o, prop) {
        return o(prop);
      },
    }),
  };
});

export const a = ""