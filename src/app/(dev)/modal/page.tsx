'use client';

import ModalConfirm from '@/shared/ui/modal/ModalConfirm';
import ModalQuetRequest from '@/shared/ui/modal/ModalRequest';
import { useState } from 'react';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(true);

  /* 모달 타입 */
  type modalrequestType = 'confirm' | 'reject' | 'review';
  const requestList: modalrequestType[] = ['confirm', 'reject', 'review'];
  const [requestType, setRequestType] = useState(0);

  /* 유저 타입 */
  type roleType = 'guest' | 'user' | 'driver';
  const roleList: roleType[] = ['guest', 'user', 'driver'];
  const [userType, setUserType] = useState(0);

  /* 사용하는 필드만 prop으로 넘기기*/
  const [comment, setComment] = useState(''); //코멘트
  const [price, setPrice] = useState<number>(); //견적가는 빈 값으로 설정
  const [score, setScore] = useState<number>(0); //평점

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer rounded-[8px] border border-black bg-white p-[8px]"
      >
        확인 모달 열기
      </button>
      <button
        onClick={() => setIsModalOpen2(true)}
        className="cursor-pointer rounded-[8px] border border-black bg-white p-[8px]"
      >
        리퀘스트 모달 열기
      </button>
      <button
        onClick={() => setRequestType((requestType + 1) % 3)}
        className="cursor-pointer rounded-[8px] border border-black bg-white p-[8px]"
      >
        리퀘스트 모달 타입: {requestList[requestType]}
      </button>
      <button
        onClick={() => setUserType((userType + 1) % 3)}
        className="cursor-pointer rounded-[8px] border border-black bg-white p-[8px]"
      >
        유저 타입: {roleList[userType]}
      </button>
      <ModalConfirm
        title="지정 견적 요청하기"
        content="일반 견적 요청을 먼저 진행해주세요."
        btnText="일반 견적 요정하기"
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClick={() => {}}
      />
      <ModalQuetRequest
        type={requestList[requestType]}
        user={{ name: '김가나', role: roleList[userType] }}
        mvInfo={{
          movingType: 'small',
          pickedDriver: true,
          departure: '서울시 중구',
          destination: '경기도 수원시',
          date: '2024년 07월 01일 (월)',
        }}
        comment={comment}
        setComment={setComment}
        price={price}
        setPrice={setPrice}
        score={score}
        setScore={setScore}
        isOpen={isModalOpen2}
        setIsOpen={setIsModalOpen2}
      />
    </div>
  );
}
