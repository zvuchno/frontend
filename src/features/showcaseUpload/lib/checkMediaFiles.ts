export const checkMediaFiles = async (file: File) => {
  const MAX_IMAGE_SIZE = 35 * 1024 * 1024; // 35 МБ
  const MIN_RESOLUTION = 1000;
  const MAX_AUDIO_SIZE = 500 * 1024 * 1024; // 500 МБ

  const allowedImageMime = ["image/jpeg", "image/webp", "image/png"];
  const isImage = allowedImageMime.includes(file.type);

  const allowedAudioMime = ['audio/mpeg', 'audio/flac', 'audio/wav'];
  const isAudio = allowedAudioMime.includes(file.type);

  if (!isImage && !isAudio) {
    return {
      validFile: null,
      error: 'Разрешенные форматы для изображений: JPEG, WebP, PNG. Для аудиофайлов -  MP3, FLAC, WAV',
    };
  }

  if (isImage) {
    if (file.size > MAX_IMAGE_SIZE) {
      return {
        validFile: null,
        error: 'Размер загружаемого изображения не должен превышать 35 МБ'
      }
    }
    const img = new Image();
    img.src = URL.createObjectURL(file);
    const isImageValid = await new Promise<boolean>((resolve) => {
      img.onload = () => {
        if (img.width < MIN_RESOLUTION || img.height < MIN_RESOLUTION) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => resolve(false);
    });

    URL.revokeObjectURL(img.src);

    if (!isImageValid) {
      return {
        validFile: null,
        error: `Изображение должно иметь минимальный размер ${MIN_RESOLUTION}x${MIN_RESOLUTION} пикселей.`
      }
    }
  }

  if (isAudio) {
    if (file.size > MAX_AUDIO_SIZE) {
      return {
        validFile: null,
        error: 'Размер загружаемого файла не должен превышать 500 МБ'
      }
    }
  }

  return { validFiles: file, error: null };
};