import { useLocation, useNavigate } from '@modern-js/runtime/router';
import { useEffect, useState } from 'react';

type Params = Record<string, string | number>;

export function useURLParams<T extends Params>(initialState: T) {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<T>(initialState);

  const goto = (newVal: T | ((val: T) => T)) => {
    const value = typeof newVal === 'function' ? newVal(params) : newVal;
    const pairs = Object.entries(value).map(([key, val]) => `${key}=${val}`);
    const search = pairs.length > 0 ? `?${pairs.join('&')}` : '';
    navigate(`/${search}`);
  };

  useEffect(() => {
    const initial: Params = {};
    let validCount = 0;
    for (const pairStr of location.search.split(/[?&]/)) {
      if (pairStr) {
        validCount++;
        const [key, val] = pairStr.split('=');
        if (val !== '') {
          initial[key] = Number.isInteger(Number(val)) ? Number(val) : val;
        }
      }
    }
    if (validCount > 0) {
      setParams(initial as T);
    } else {
      goto(initialState);
    }
  }, [location]);

  return {
    params,
    setParams: goto,
  };
}
