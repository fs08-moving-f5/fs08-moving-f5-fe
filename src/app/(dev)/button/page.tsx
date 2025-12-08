import Button from '@/shared/ui/Button/Button'

const ButtonPage = () => {
  return (
    <div className='flex flex-col gap-[8px] bg-[var(--foreground)] w-full h-full'>
      <Button>기본 버튼</Button>
      <Button design='secondary'>기본 버튼 2</Button>
      <Button disabled={true} >기본 버튼 비활성화</Button>
      
      <Button variant="outlined" design="primary">버튼 2</Button>
      <Button variant="outlined" design="secondary">버튼 2</Button>
      <Button variant="outlined" disabled={true}>버튼 2 비활성화</Button>
    </div>
  )
}

export default ButtonPage