const NonConfirmMessage = () => {
  return (
    <div className="tab:mt-8 mobile:mt-5 mobile:p-4 bg-bg-200 mt-[50px] w-full rounded-xl px-7 py-5">
      <div className="mobile:justify-center flex items-center justify-start gap-3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_11923)">
            <circle cx="12" cy="12" r="11.5" fill="#F7F7F7" stroke="#61605E" />
            <rect x="11" y="6" width="2" height="8" fill="#61605E" />
            <circle cx="12" cy="17" r="1" fill="#61605E" />
          </g>
          <defs>
            <clipPath id="clip0_1_11923">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="text-black-100 text-lg font-semibold">확정하지 않은 견적이에요!</div>
      </div>
    </div>
  );
};

export default NonConfirmMessage;
