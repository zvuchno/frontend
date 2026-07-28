export const checkMediaFiles = async (file: File) => {
  const MAX_IMAGE_SIZE = 35 * 1024 * 1024; // 35 МБ
  const MIN_RESOLUTION = 1000;

  const allowedImageExt = ['jpeg', 'jpg', 'webp'];

  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  if (file.type.startsWith('image/') || allowedImageExt.includes(ext)) {
    if (file.size > MAX_IMAGE_SIZE) {
      
    }
  }
}