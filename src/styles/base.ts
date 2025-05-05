export const baseStyles = /* css */ `
  .monitor-widget-content {
    padding: 20px;
    border-radius: var(--monitor-border-radius);
    background: var(--monitor-background);
    color: var(--monitor-text);
    font-family: var(--monitor-font-family);
    font-size: var(--monitor-font-size);
    max-width: 350px;
    margin: 0 auto;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }

  /* Animations */
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    50% {
      transform: translateX(2px);
    }
    75% {
      transform: translateX(-2px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
