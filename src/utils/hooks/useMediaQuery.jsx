import {useState, useEffect}  from 'react'

export const useMediaQuery = (query) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', (e) => setMatch(e.matches));
    setMatch(mql.matches);
    return () => mql.removeEventListener('change', (e) => setMatch(e.matches));
  }, [match, query]);

  return match;
}

export const queryPoint = { 
  xs: 399.98,
	sm: 575.98,
	md: 767.98,
	lg: 991.98,
	xl: 1199.98,
	xxl: 1399.98,
}