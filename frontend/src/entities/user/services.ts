
export const saveTokens = (access: string, refresh: string) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh)
}

export const getAccessToken = () => localStorage.getItem('access');