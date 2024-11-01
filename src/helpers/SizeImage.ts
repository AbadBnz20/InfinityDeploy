export const SizeImage = (url: string, size: string) => {
  if (!url) {
    return '';
  }
  const image = url.replace("{size}", size);
  return image;
};



