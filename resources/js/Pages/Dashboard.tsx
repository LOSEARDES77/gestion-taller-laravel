import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { __, useTranslation } from '@/Providers/TranslationProvider';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {__('home')}
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <article className="prose mb-4 dark:prose-invert">
                                <h4 className="mb-4 text-2xl font-semibold">
                                    {__('welcome')} {auth.user.name}!
                                </h4>
                                <p className="w-full">{__('home.welcome')}</p>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
