const NotificationDetail = ({
  title,
  time,
  onClick,
}: {
  title: string;
  time: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="tab:py-3 tab:px-4 mobile:py-3 mobile:px-4 flex cursor-pointer flex-col gap-[2px] px-6 py-4 hover:brightness-80"
      onClick={onClick}
    >
      <div className="text-black-400 tab:text-md mobile:text-md w-full text-lg font-medium break-all">
        {title}
      </div>
      <div className="text-md tab:text-sm mobile:text-sm font-medium text-gray-300">{time}</div>
    </div>
  );
};

export default NotificationDetail;
