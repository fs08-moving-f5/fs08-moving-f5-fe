export type KakaoShareProps = {
  platform: 'kakao';
  size?: 'lg' | 'md' | 'sm';
  kakaoTitle: string;
  kakaoDescription?: string;
  kakaoImageUrl: string;
  kakaoLink?: string;
};

export type FacebookShareProps = {
  platform: 'facebook';
  size?: 'lg' | 'md' | 'sm';
};

export type ShareProps = KakaoShareProps | FacebookShareProps;

interface IKakaoShareLink {
  mobileWebUrl: string;
  webUrl: string;
}

interface IKakaoShareContent {
  title: string;
  description?: string;
  imageUrl?: string;
  link: IKakaoShareLink;
}

interface IKakaoShareFeed {
  objectType: 'feed';
  content: IKakaoShareContent;
}

interface IKakaoShare {
  sendDefault(options: IKakaoShareFeed): void;
}

interface IKakao {
  isInitialized(): boolean;
  init(key: string): void;
  Share: IKakaoShare;
}

declare global {
  interface Window {
    Kakao?: IKakao;
  }
}
