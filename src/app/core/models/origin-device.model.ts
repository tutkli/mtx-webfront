export interface OriginDevice {
  id: string;
  options: OriginDeviceOption[];
}

export enum OriginDeviceOption {
  Android = 'android',
  BotTelegram = 'bot_telegram',
  BotWeb = 'bot_web',
  BotWhatsapp = 'bot_whatsapp',
  Email = 'email',
  Facebook = 'facebook',
  Inperson = 'inperson',
  Internal = 'internal',
  Ios = 'ios',
  Twitter = 'twitter',
  WebChannel = 'web_channel',
}
