import { useEffect } from "react";

export default function SuccessAlert({ alert, setAlert }) {
    useEffect(() => {
        let time = setTimeout(() => {
            setAlert({
                'message': '',
                'disc': '',
                'status': ''
            });
        }, 3000);

        return () => {
            clearTimeout(time);
        }
    }, [])
    return (
        <div className={`border-t-2 rounded-lg p-4 absolute w-1/3 left-0 right-0 bottom-12 m-auto h-20
        ${alert.status ? ('bg-red-100 border-red-500') : ('border-teal-500 bg-teal-50')}
        `} role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    {
                        alert.status
                            ? (
                                <div className="flex-shrink-0">
                                    <svg className="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                                </div>
                            )
                            : (
                                <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
                                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                                </span>
                            )
                    }

                </div>
                <div className="ms-3">
                    <h3 className="text-gray-800 font-semibold dark:text-white">
                        {alert.message}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        {alert.disc}
                    </p>
                </div>
            </div>
        </div>
    )
}