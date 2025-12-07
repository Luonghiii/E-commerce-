
export const isSandbox = (): boolean => {
  // Checks for common sandbox environments (AI Studio, StackBlitz, CodeSandbox, etc.)
  const hostname = window.location.hostname;
  return (
    hostname.includes('webcontainer') ||
    hostname.includes('googleusercontent') || 
    hostname.includes('localhost') || // Optional: treat localhost as sandbox for safety or dev
    hostname.includes('csb.app')
  );
};

export const navigateToSection = (elementId: string, path: string) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    // 1. Always scroll smoothly
    element.scrollIntoView({ behavior: 'smooth' });

    // 2. Handle URL updates
    if (isSandbox()) {
      // Sandbox mode: Do NOT change URL to avoid 404s on refresh
      console.log(`Sandbox detected: Scrolling to ${elementId} without URL change.`);
    } else {
      // Production mode: Use History API to change URL cleanly without #
      window.history.pushState({}, '', path);
    }
  }
};
