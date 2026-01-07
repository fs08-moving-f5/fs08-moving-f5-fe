'use client';

import Image from 'next/image';

const HomePageUI = () => {
  return (
    <main className="flex flex-col justify-center">
      <section className="w-full">
        <header className="h-[405px] w-full content-end bg-[url(/img/homePage/header-bg.svg)] bg-cover bg-center bg-no-repeat sm:h-[313px]">
          <div className="flex flex-col items-center gap-[26px]">
            <div className="mb-[45px] flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold text-[var(--color-grayScale-50)]">
                이사업체, 어떻게 고르세요?
              </h1>
              <p className="text-lg font-normal text-[var(--color-gray-100)]">
                무빙은 여러 견적을 한눈에 비교해 <br />
                이사업체 선정 과정을 간편하게 바꿔드려요
              </p>
            </div>
          </div>
        </header>

        <section className="mx-auto mt-[53px] mb-[61px] w-full md:mt-[69px] md:mb-27 lg:mt-[115px] lg:mb-31">
          <div className="flex flex-col justify-center gap-[34px] md:gap-10 lg:flex-row lg:items-center">
            <h1 className="ml-8 text-3xl font-bold text-[var(--color-black-400)] lg:mx-auto">
              번거로운 선정과정, <br />
              이사 유형부터 선택해요
            </h1>

            <div className="mx-0 flex items-center justify-center gap-6 md:mx-[34px] lg:mx-auto">
              <div className="flex flex-col items-center gap-2 rounded-4xl border-none bg-[var(--color-bg-200)] p-[25px]">
                <Image
                  src="/img/moving-type/small.png"
                  alt="small moving"
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-center gap-[2px] text-center">
                  <p className="text-lg font-bold text-[var(--color-black-400)]">소형이사</p>
                  <p className="text-xs font-normal text-[var(--color-gray-500)]">
                    원룸, 투룸, 20평대 미만
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-[40px] border-3 border-solid border-[var(--color-primary-orange-300)] p-[22]">
                <Image src="/img/moving-type/home.png" alt="home moving" width={155} height={155} />
                <div className="flex flex-col items-center gap-[2px] text-center">
                  <p className="text-xl font-bold text-[var(--color-primary-orange-400)]">
                    가정이사
                  </p>
                  <p className="text-sm font-normal text-[var(--color-gray-500)]">
                    쓰리룸, 20평대 미만
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-4xl border-none bg-[var(--color-bg-200)] p-[25px]">
                <Image
                  src="/img/moving-type/office2.png"
                  alt="office moving"
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-center gap-[2px] text-center">
                  <p className="text-lg font-bold text-[var(--color-black-400)]">
                    기업, 사무실 이사
                  </p>
                  <p className="text-xs font-normal text-[var(--color-gray-500)]">
                    사무실, 상업공간
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          {/* <Image src="img/homePage/img-lg.svg" alt="section2 img" width={1402} height={786} /> */}
          <div className="relative h-[496px] max-w-[1402px] min-w-[375px] bg-[url(/img/homePage/img-sm.svg)] bg-cover bg-no-repeat md:h-[835px] md:bg-[url(/img/homePage/img-md.svg)] lg:mx-[auto] lg:h-[786px] lg:bg-[url(/img/homePage/img-lg.svg)]">
            <h1 className="absolute top-10 right-10 left-10 text-right font-bold text-[var(--color-grayScale-50)] sm:text-xl md:top-20 md:text-3xl lg:top-40 lg:left-190 lg:text-left lg:text-3xl">
              원하는 이사 서비스를 요청하고 <br />
              견적을 받아보세요
            </h1>
          </div>
        </section>

        <section className="w-full">
          <div className="relative flex h-[876px] w-full gap-[143px] bg-gradient-to-b from-[var(--color-gray-50)] from-25% via-[var(--color-primary-orange-100)] via-25% to-[var(--color-primary-orange-100)] md:h-[1090px] md:from-40% md:via-40% lg:h-[1081px] lg:from-40% lg:via-40%">
            <h1 className="absolute top-20 right-10 left-10 font-bold text-[var(--color-black-400)] sm:text-xl md:top-40 md:left-20 md:text-3xl lg:top-40 lg:left-80 lg:text-3xl">
              여러 업체의 견적을 <br /> 한눈에 비교하고 선택해요
            </h1>
            <Image
              src="/img/homePage/city.svg"
              alt="city icon"
              width={180}
              height={104}
              className="absolute top-37 right-0 md:top-91 md:right-15 lg:top-76 lg:left-80 lg:w-[131px] lg:w-[316px]"
            />

            <div className="gird-rows-3 absolute top-60 right-20 left-20 grid h-[722px] max-w-200 md:top-62 md:right-25 md:left-25 lg:top-30 lg:right-20 lg:left-220 lg:h-[850px]">
              {/* lg, md 전용 */}
              <div className="row-span-3 row-start-1 hidden md:block">
                <Image src="/img/homePage/card.svg" alt="card example" width={390} height={390} />
                <Image src="/img/homePage/card.svg" alt="card example" width={390} height={390} />
              </div>
              <div className="row-span-3 row-start-2 hidden md:block">
                <Image src="/img/homePage/card.svg" alt="card example" width={390} height={390} />
                <Image src="/img/homePage/card.svg" alt="card example" width={390} height={390} />
              </div>

              {/* sm 전용 */}
              <div className="flex flex-col gap-4 sm:flex md:hidden">
                <Image src="/img/homePage/card.svg" width={250} height={250} alt="" />
                <Image src="/img/homePage/card.svg" width={250} height={250} alt="" />
                <Image src="/img/homePage/card.svg" width={250} height={250} alt="" />
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full content-end bg-linear-to-r from-[#f95D2E] to-[var(--color-primary-orange-400)] sm:h-[200px] md:h-[311px] lg:h-[305px]">
          <div className="my-[39px] flex flex-col items-center gap-[26px] md:my-[65px] lg:my-[87px]">
            <div className="rounded-[20px] bg-[var(--color-grayScale-50)] p-4">
              <Image
                src="/img/logo-character-only.svg"
                alt="logo-character icon"
                width={33}
                height={33}
                className="h-[33px] w-[33px] md:h-[60px] md:w-[60px] lg:h-[60px] lg:w-[60px]"
              />
            </div>

            <h1 className="items-center text-center font-bold text-[var(--color-grayScale-50)] sm:text-lg md:text-[28px] lg:text-[28px]">
              복잡한 이사 준비, <br className="block sm:hidden" /> 무빙 하나면 끝!
            </h1>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default HomePageUI;
