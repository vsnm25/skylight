import React, { FC } from 'react';

import CategoryButton from './CategoryButton';

interface CategoryListProps {
  category: string;
  list: string[];
  onCategory: (category: string) => void;
}

const CategoryList: FC<CategoryListProps> = ({
  category,
  list,
  onCategory,
}) => {
  return (
    <div className="flex gap-4">
      <CategoryButton
        isToggle={category === '전체'}
        name="전체"
        onClick={onCategory}
      >
        전체
      </CategoryButton>
      {list.map((categoryItem) => (
        <CategoryButton
          key={categoryItem}
          isToggle={categoryItem === category}
          name={categoryItem}
          onClick={onCategory}
        >
          {categoryItem}
        </CategoryButton>
      ))}
    </div>
  );
};

export default CategoryList;
