
const NotFoundPage = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center items-center min-h-screen">
                <section className="text-center bg-white py-10">
                    <div className="w-full">
                        <div className="mb-10">
                            <div
                                className="bg-center bg-no-repeat h-96"
                                style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}
                            >
                                <h1 className="text-9xl">404</h1>
                            </div>
                        </div>

                        <div className="-mt-12">
                            <h3 className="text-4xl mb-4">
                                Look like you're lost
                            </h3>
                            <p className="mb-4">The page you are looking for is not available!</p>
                            <a href="/" className="inline-block px-5 py-2 text-white bg-green-700 hover:bg-green-800 rounded">
                                Go to Home
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NotFoundPage;
