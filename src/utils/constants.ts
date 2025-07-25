export const STATUS_API_URL =
  'https://dev-api.slalayer.xyz/api/v1/subgraphs/heads';

export const HIDE_KEY = 'slaBannerHideUntil';

export const HIDE_MINUTES = 10;

export const DEFAULT_MESSAGES = {
  warning:
    'Some features might not work correctly due to ongoing indexing delays. We’re on it and will restore full functionality soon. Your data is safe and recorded on-chain.',
  error:
    'Oops! A technical error is affecting subgraph availability. Our engineers are fixing it. Nothing is lost — all transactions are safely stored on-chain.',
  unknown:
    'Something’s not right. We’re seeing unexpected behavior in the indexing service and are investigating it. Your on-chain data is secure.',
  ok: 'All systems operational! Your subgraphs are fully indexed and ready to use.',
};
