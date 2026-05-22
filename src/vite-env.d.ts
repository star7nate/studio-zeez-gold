/// <reference types="vite/client" />

declare module "*?picture" {
  const value: {
    sources: Record<string, string>;
    img: { src: string; w: number; h: number };
  };
  export default value;
}