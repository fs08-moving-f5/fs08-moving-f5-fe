import { Button } from '../button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface EmptyRedirectProps {
  message: string;
  subMessage?: string;
  redirectPath?: string;
  redirectButtonText?: string;
}

const EmptyRedirect = ({
  message,
  subMessage,
  redirectPath,
  redirectButtonText,
}: EmptyRedirectProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        src="/img/moving-car.png"
        alt="moving-car"
        width={280}
        height={280}
        className="mobile:w-[184px] mobile:h-[184px] h-[280px] w-[280px]"
      />
      <div className="mobile:text-2lg text-center text-xl font-normal text-gray-400">
        {message}
        {subMessage && (
          <>
            <br />
            {subMessage}
          </>
        )}
      </div>
      {redirectPath && redirectButtonText && (
        <Button
          size="sm"
          variant="solid"
          design="primary"
          onClick={() => router.push(redirectPath ?? '/')}
        >
          {redirectButtonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyRedirect;
