import ApplicationLogo from '@/Components/common/ApplicationLogo';
import DarkModeToggle from '@/Components/common/DarkModeToggle';
import LanguageSwitcher from '@/Components/common/LanguageSwitcher';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 dark:bg-gray-900 sm:justify-center">
            <div className="absolute top-0 w-full border-b border-gray-100 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-800">
                <div className="left-0 m-0 mx-auto flex max-w-7xl flex-row items-center justify-between sm:px-6 lg:px-8">
                    <div>
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </div>
                    <div className="flex flex-row">
                        <LanguageSwitcher className="mr-4" />
                        <DarkModeToggle className="mr-4" />

                        <div className="relative ml-3">
                            <span className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                Not Logged in
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Link href="/">
                <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
            </Link>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md dark:bg-gray-800 sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
