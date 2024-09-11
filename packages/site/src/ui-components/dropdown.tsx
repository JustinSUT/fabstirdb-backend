import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

type DropdownItem = {
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
  className?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  className,
}) => {
  return (
    <Menu
      as="div"
      className={clsx('relative inline-block text-left', className)}
    >
      <div>
        <Menu.Button
          className={clsx(
            'inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium',
            'bg-primary text-primary-content hover:bg-primary-light active:bg-primary-dark focus:ring-2 focus:ring-primary-dark disabled:bg-primary-light/50 shadow-md',
            'dark:hover:bg-dark-primary-light',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-dark-primary focus-visible:ring-opacity-75',
          )}
        >
          {label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-border dark:divide-dark-border',
            'rounded-md bg-foreground dark:bg-dark-foreground',
            'shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          )}
        >
          <div className="px-1 py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={clsx(
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      active
                        ? 'bg-primary dark:bg-dark-primary text-primary-content dark:text-dark-primary-content'
                        : 'text-copy dark:text-dark-copy',
                    )}
                  >
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
