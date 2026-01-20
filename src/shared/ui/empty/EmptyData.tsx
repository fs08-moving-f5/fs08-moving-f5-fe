import Image from 'next/image';

const EmptyData = ({ message, subMessage }: { message: string; subMessage: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/img/moving-car.png"
        alt="moving-car"
        width={280}
        height={280}
        className="mobile:w-[184px] mobile:h-[184px] h-[280px] w-[280px]"
      />
      <div className="mobile:text-2lg text-center text-xl font-normal text-gray-400">
        {message}
        <br />
        {subMessage}
      </div>
    </div>
  );
};

export default EmptyData;
