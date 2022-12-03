import clsx from 'clsx';
import { Link } from 'gatsby';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title: ReactNode;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="relative min-h-screen">
      <header className="fixed inset-x-0 z-10 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-4">
          <h1 className="text-3xl font-bold text-blue300">
            <Link to="/">{title}</Link>
          </h1>
        </div>
      </header>
      <main className="pt-16 pb-32">{children}</main>
      <footer
        className={clsx(
          'absolute inset-x-0 bottom-0 mx-auto bg-black200 py-6',
          'h-32 w-full',
          'flex items-center justify-center'
        )}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-gray100">
            © 2022 정승옥 All rights reserved.
          </span>
          <span className="text-gray100">
            Built with{' '}
            <a className="underline" href="https://www.gatsbyjs.com">
              Gatsby
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
