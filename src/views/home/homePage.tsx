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

        <section className="mx-auto w-full sm:mt-[53px] sm:mb-[61px] md:mt-[69px] md:mb-27 lg:mt-[115px] lg:mb-31">
          <div className="flex flex-col items-start justify-center sm:gap-[34px] md:gap-10 lg:flex-row lg:items-center">
            <h1 className="ml-8 text-3xl font-bold text-[var(--color-black-400)] lg:mx-auto">
              번거로운 선정과정, <br />
              이사 유형부터 선택해요
            </h1>

            <div className="ml-[34px] flex items-center gap-6 lg:mx-auto">
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
          <div className="relative h-[786px] max-w-[1402px] min-w-[375px] bg-[url(/img/homePage/img-sm.svg)] bg-cover bg-no-repeat md:bg-[url(/img/homePage/img-md.svg)] lg:mx-[auto] lg:bg-[url(/img/homePage/img-lg.svg)]">
            <h1 className="absolute top-10 right-20 text-3xl font-bold text-[var(--color-grayScale-50)] md:top-20 lg:top-40 lg:right-75">
              원하는 이사 서비스를 요청하고 <br />
              견적을 받아보세요
            </h1>
          </div>
        </section>

        <section className="mt-20 w-full">
          <div className="relative flex h-[1076px] w-full gap-[143px] bg-gradient-to-b from-[var(--color-gray-50)] from-40% via-[var(--color-primary-orange-100)] via-40% to-[var(--color-primary-orange-100)] md:h-[1088px] lg:h-[1081px]">
            <h1 className="absolute top-30 left-20 text-3xl font-bold text-[var(--color-black-400)] md:top-40 md:left-20 lg:top-40 lg:left-40">
              여러 업체의 견적을 <br /> 한눈에 비교하고 선택해요
            </h1>
            <Image
              src="/img/homePage/city.svg"
              alt="city icon"
              width={253}
              height={104}
              className="absolute top-82 right-0 md:top-83 md:right-15 lg:top-76 lg:left-40 lg:w-[131px] lg:w-[316px]"
            />

            <div className="gird-rows-3 absolute top-70 right-5 left-5 grid h-[722px] w-full max-w-200 md:top-70 md:right-15 md:left-15 lg:top-30 lg:left-140">
              <div className="row-span-3 row-start-1">
                <Image src="/img/homePage/card.svg" alt="card example" width={370} height={370} />
                <Image src="/img/homePage/card.svg" alt="card example" width={370} height={370} />
              </div>
              <div className="row-span-3 row-start-2">
                <Image src="/img/homePage/card.svg" alt="card example" width={370} height={370} />
                <Image src="/img/homePage/card.svg" alt="card example" width={370} height={370} />
              </div>
            </div>
          </div>
        </section>

        <footer className="h-[305px] w-full content-end bg-linear-to-r from-[#f95D2E] to-[var(--color-primary-orange-400)]">
          <div className="my-[87px] flex flex-col items-center gap-[26px]">
            <div className="rounded-[20px] bg-[var(--color-grayScale-50)] p-4">
              <Image
                src="/img/logo-character-only.svg"
                alt="logo-character icon"
                width={60}
                height={60}
              />
            </div>
            <div className="mb-[45px] flex flex-col items-center gap-4 text-center">
              <h1 className="text-[28px] font-bold text-[var(--color-grayScale-50)]">
                복잡한 이사 준비, 무빙 하나면 끝!
              </h1>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default HomePageUI;
