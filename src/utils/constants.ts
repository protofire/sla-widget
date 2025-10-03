export const STATUS_API_URL = 'https://global.chain.love/health';

export const HIDE_KEY = 'slaBannerHideUntil';

export const HIDE_MINUTES = 10;

export const MIN_REFRESH_INTERVAL = 1000; // 1 second
export const MAX_REFRESH_INTERVAL = 3600000; // 1 hour

export const DEFAULT_MESSAGES = {
  warning:
    'Some features might not work correctly due to ongoing indexing delays. We’re on it and will restore full functionality soon. Your data is safe and recorded on-chain.',
  error:
    'Oops! A technical error is affecting subgraph availability. Our engineers are fixing it. Nothing is lost — all transactions are safely stored on-chain.',
  unknown:
    'Something’s not right. We’re seeing unexpected behavior in the indexing service and are investigating it. Your on-chain data is secure.',
  ok: 'All systems operational! Your subgraphs are fully indexed and ready to use.',
};
