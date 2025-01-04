function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center">
      <div className="container px-4 md:px-6 self-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Why Choose SocialConnect?
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-4 bg-white rounded-full dark:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Global Community</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Connect with people from diverse backgrounds and cultures.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-4 bg-white rounded-full dark:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <path d="m22 8-6 4 6 4V8Z"></path>
                <rect x="2" y="6" width="14" height="12" rx="2" ry="2"></rect>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Rich Media Sharing</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Share photos, videos, and live streams with your network.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-4 bg-white rounded-full dark:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Privacy First</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Advanced privacy controls to keep your data safe and secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { StatsSection };
