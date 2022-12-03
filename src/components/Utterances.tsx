import React, { useEffect, useRef } from 'react';

const Utterances = () => {
  const utteranceRef = useRef(null);

  useEffect(() => {
    const utteranceScript = document.createElement('script');

    utteranceScript.src = 'https://utteranc.es/client.js';
    utteranceScript.setAttribute('repo', 'vsnm25/skylight');
    utteranceScript.setAttribute('issue-term', 'pathname');
    utteranceScript.setAttribute('theme', 'github-light');
    utteranceScript.setAttribute('crossorigin', 'anonymous');
    utteranceScript.async = true;

    if (utteranceRef.current) {
      const wrapper = utteranceRef.current as Node;
      wrapper.appendChild(utteranceScript);
    }
  }, []);

  return <div ref={utteranceRef} className="w-full" />;
};

export default Utterances;
