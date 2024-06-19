import { useState } from 'react';
import logo from './assets/logo_transparent.png';
import { Dialog } from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Events', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header({ onLoginClick }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-purple-900 to-orange-800 fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
            <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center">
                    <a href="#" className="flex-shrink-0">
                        <img className="h-10 w-auto" src={logo} alt="Logo" />
                    </a>
                </div>
                <div className="hidden md:flex space-x-10">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-white hover:bg-gray-700 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden md:flex md:items-center">
                    <button
                        onClick={onLoginClick}
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Log in
                    </button>
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>

            <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-40">
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full bg-gradient-to-r from-purple-950 via-pink-700 to-orange-700 backdrop-blur-md overflow-y-auto">
                        <div className="flex items-center justify-between p-5">
                            <a href="#" className="flex-shrink-0">
                                <img className="h-8 w-auto" src={logo} alt="Logo" />
                            </a>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 px-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:bg-opacity-75"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 mt-6 pt-4 pb-3">
                            <div className="flex items-center px-5">
                                <button
                                    onClick={onLoginClick}
                                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </header>
    );
}
