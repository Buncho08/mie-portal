import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <div class="grid h-screen place-content-center bg-white px-4">
                <div class="text-center">
                    <h1 class="text-9xl font-black text-gray-200">404</h1>

                    <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        あらら！
                    </p>

                    <p class="mt-4 text-gray-500">
                        <i>{error.statusText || error.message}</i>
                    </p>

                    <Link
                        to={'/mie/Mypage'}
                        class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                    >
                        マイページへもどる
                    </Link>
                </div>
            </div>
        </div>
    );
}