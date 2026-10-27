export const checkMediaFiles = async (file: File, variant: "image" | "music" | "bonus") => {
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 МБ
  const MIN_RESOLUTION = 1000;
  const MAX_AUDIO_SIZE = 500 * 1024 * 1024; // 500 МБ
  const MAX_BONUS_SIZE = 500 * 1024 * 1024; // 500 МБ

  const allowedImageMime = ["image/jpeg", "image/webp", "image/png"];
  const isImage = allowedImageMime.includes(file.type);

  const allowedAudioMime = [
    "audio/mpeg", 
    "audio/flac", 
    "audio/x-flac", 
    "audio/wav", 
    "audio/x-wav", 
    "audio/vnd.wave",
  ];
  const isAudio = allowedAudioMime.includes(file.type);

  const allowedBonusMime = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "video/mp4",
    "text/plain",
    "application/zip",
  ];
  const isBonus = allowedBonusMime.includes(file.type);

  if (!isImage && !isAudio) {
    return {
      validFile: null,
      error: variant === "image" 
        ? "Разрешенные форматы для изображений: JPEG, WebP, PNG." 
        : variant === "music"
          ? "Разрешенные форматы для аудиофайлов -  MP3, FLAC, WAV"
          : "Разрешенные фороматы для бонусов:  PDF, JPG, PNG, MP4, TXT, ZIP",
    };
  }

  if (isImage) {
    if (file.size > MAX_IMAGE_SIZE) {
      return {
        validFile: null,
        error: `Размер загружаемого изображения не должен превышать ${MAX_IMAGE_SIZE  / 1024 / 1024} МБ`
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
        error: `Размер загружаемого файла не должен превышать ${MAX_AUDIO_SIZE / 1024 / 1024} МБ`
      }
    }
  }

  if (isBonus) {
    if (file.size > MAX_BONUS_SIZE) {
      return {
        validFile: null,
        error: `Размер бонусного файла не должен превышать ${MAX_BONUS_SIZE / 1024 / 1024} МБ.`,
      };
    }
  }

  return { validFile: file, error: null };
};