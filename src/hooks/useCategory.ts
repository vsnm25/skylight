import { useCallback, useEffect, useState } from 'react';

export default function useCategory() {
  const [category, setCategory] = useState('전체');

  const updateCategory = useCallback((updatedCategory: string) => {
    setCategory(updatedCategory);
    window.history.pushState(
      { updatedCategory },
      '',
      `${window.location.pathname}?category=${updatedCategory}`
    );
  }, []);

  const changeCategory = useCallback(() => {
    const search = new URLSearchParams(window.location.search);
    const categoryParam = search.get('category');
    const updatedCategory = categoryParam || '전체';
    setCategory(updatedCategory);
  }, []);

  useEffect(() => {
    changeCategory();
  }, [changeCategory]);

  useEffect(() => {
    window.addEventListener('popstate', () => {
      changeCategory();
    });
  }, [changeCategory]);

  return { category, updateCategory };
}
