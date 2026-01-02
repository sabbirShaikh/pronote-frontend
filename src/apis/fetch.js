const API_URL = import.meta.env.VITE_API_URL;

const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const finalOptions = {
    ...options,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      "Content-Type": "application/json",
      ...options.headers
    }
  }

  const res = await fetch(`${API_URL}${endpoint}`, finalOptions);
  const data = await res.json();
  return data
}

export default authFetch;