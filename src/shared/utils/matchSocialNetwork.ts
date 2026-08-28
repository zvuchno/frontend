// по строке с адресом соцсети определяет иконку для отображения, при дефолтном значении отображается одинаковая иконка при любом значении адреса

export const matchSocialNetwork = (url: string): string => {
  try {
    const cleanUrl = url.trim();

    const hostname = new URL(cleanUrl).hostname;

    switch (true) {
      case /(^|\.)(facebook\.com|fb\.com)$/.test(hostname):
        return 'url("/icons/fb-icon.svg")';

      case /(^|\.)(vk\.(com|ru)|vkontakte\.ru)$/.test(hostname):
        return 'url("/icons/vk-icon.svg")';

      case /(^|\.)(t\.me|telegram\.(me|org|dog)|tx\.me)$/.test(hostname):
        return 'url("/icons/tg-icon.svg")';

      case /(^|\.)tiktok\.com$/.test(hostname):
        return 'url("/icons/tiktok-icon.svg")';

      case /(^|\.)(ok\.ru|odnoklassniki\.ru)$/.test(hostname):
        return 'url("/icons/ok-icon.svg")';

      case /(^|\.)mail\.ru$/.test(hostname):
        return 'url("/icons/mailru-icon.svg")';

      case /(^|\.)(youtube\.(com|ru)|youtu\.be)$/.test(hostname):
        return 'url("/icons/YouTube-icon.svg")';

      case /(^|\.)(instagram\.com|instagr\.am)$/.test(hostname):
        return 'url("/icons/ig-icon.svg")';

      default:
        return 'url("/icons/social-default-icon.svg")';
    }
  } catch {
    return "null";
  }
};
