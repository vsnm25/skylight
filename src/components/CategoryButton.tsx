import clsx from 'clsx';
import React, { FC, ReactNode, useCallback } from 'react';

interface CategoryButtonProps {
  /**
   * children props 입니다.
   */
  children: ReactNode;
  /**
   * 버튼 활성화 여부를 의미합니다.
   */
  isToggle: boolean;
  /**
   * 버튼 name 속성을 변경합니다.
   */
  name: string;
  /**
   * 클릭 이벤트 콜백 함수입니다.
   */
  onClick?: (name: string) => void;
}

const CategoryButton: FC<CategoryButtonProps> = ({
  children,
  isToggle,
  name,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(name);
    }
  }, [onClick, name]);
  return (
    <button
      className={clsx(
        'px-4',
        'h-10',
        'flex items-center',
        isToggle ? 'bg-blue200 text-white100' : 'text-blue200',
        'shadow-[0_2px_15px_0_rgba(0,0,0,0.1)]',
        'rounded-[50vh]'
      )}
      name={name}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
