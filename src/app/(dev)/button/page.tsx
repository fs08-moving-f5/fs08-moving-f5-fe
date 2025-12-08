import Button from '@/shared/ui/Button/Button';

const ButtonPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-[8px] bg-[var(--foreground)]">
      <Button>기본 버튼</Button>
      <Button design="secondary">기본 버튼 2</Button>
      <Button disabled={true}>기본 버튼 비활성화</Button>

      <Button variant="outlined" design="primary">
        버튼 2
      </Button>
      <Button variant="outlined" design="secondary">
        버튼 2
      </Button>
      <Button variant="outlined" disabled={true}>
        버튼 2 비활성화
      </Button>

      <Button size="lg">기본 버튼 lg</Button>
      <Button size="md">기본 버튼 md</Button>
      <Button size="sm">기본 버튼 sm</Button>
      <Button size="xs">기본 버튼 xs</Button>
      <Button size="2xs">기본 버튼 2xs</Button>
    </div>
  );
};

export default ButtonPage;
