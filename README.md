# 42-2nd-Hyggesil-backend

<img width="475" alt="휘게실 로고" src="https://user-images.githubusercontent.com/117356735/224227424-63040165-6765-4acc-97d9-e91071eb02cc.png">


### 개발 인원 및 기간 👤

- 개발기간 : 2023/02/24 ~ 2023/3/10
- 개발 인원 : 프론트엔드 3명, 백엔드 2명 
<br>
[프론트엔드] : 강승찬, 김한솔, 이동민
<br>
[백엔드] : 박세희, 이한재
<br>
<br>
🙋🏻‍♀️ 박세희 : https://github.com/sayhihi <br>
🙋🏻 이한재 : https://github.com/jayhanjaelee

### 프로젝트 선정이유

<img width="940" alt="휘게실 설명" src="https://user-images.githubusercontent.com/117356735/224227987-c98fbd40-6ffa-49ec-83de-28650ad623a9.png">

<br>
- 세계 최대의 숙박 공유 서비스 "에어비앤비" (https://www.airbnb.co.kr//) 를 모티브로 진행.
<br>
<br>
- 바쁜 현대 사회를 살아가는 사람들에게 휘게(편안함, 안락함)를 제공해 주는 서비스를 만들고 싶고, 
  고객에게 편안한 이미지로 다가갈 수 있도록 휴게실과 비슷한 어감의 "휘게실(Hyggesil)"로 프로젝트를 진행함.
<br>
<br>
- 서울 지역 호텔을 호스트가 직접 등록하고, 고객이 다양한 호텔을 이용할 수 있도록 호텔 정보를 공유하는 서비스를 목표로 구현. <br>
   👉🏼 작은 시장에서 확고하게 자리를 잡고, 비즈니스 모델을 구축한 후, 다른 영역까지 확장하는 전략.
<br>
<br>
💡 서비스의 궁극적인 목표 💡 
<br>
<br>
유저의 성향에 맞춘 추천 기능으로 웹 사이트에 체류하는 시간을 단축 시켜 예약할 수 있도록 하는 것.
<br>
<br>
 👉🏼 유저의 만족도를 높이는 것이 중요한 포인트 요소.
  


<br>

## 적용 기술 및 구현 기능

### 적용 기술 🧑🏻‍💻👩🏻‍💻

Front-End
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&amp;logo=javascript&amp;logoColor=white">
<img src="https://img.shields.io/badge/React.js-61DAFB?style=flat&amp;logo=React&amp;logoColor=white">
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&amp;logo=styled-components-DB7093&amp;logoColor=white">
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat&amp;logo=ReactRouter&amp;logoColor=white">

Back-End
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&amp;logo=javascript&amp;logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&amp;logo=Node.js&amp;logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&amp;logo=MySQL&amp;logoColor=white">
<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=flat&amp;logo=Amazon%20EC2&logoColor=white">
<img src="https://img.shields.io/badge/AWS_RDS-527FFF?style=flat&amp;logo=Amazon RDS&amp;logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat&amp;logo=Docker&amp;logoColor=white">

Common
<img src="https://img.shields.io/badge/Git-F05032?style=flat&amp;logo=Git&amp;logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&amp;logo=GitHub&amp;logoColor=white">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&amp;logo=prettier&amp;logoColor=white">
<img src="https://img.shields.io/badge/RestfulAPI-F7533E?style=flat&amp;logo=RestfulAPII&amp;logoColor=white">
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&amp;logo=Visual Studio Code&amp;logoColor=white">
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&amp;logo=Postman&amp;logoColor=white">
<img src="https://img.shields.io/badge/KakaoAPI-FFCD00?style=flat&amp;logo=Kakao&amp;logoColor=white">

Communication
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&amp;logo=Slack&amp;logoColor=white">
<img src="https://img.shields.io/badge/Trello-0052CC?style=flat&amp;logo=Trello&amp;logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=flat&amp;logo=Notion&amp;logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white">

---

### 구현 기능


| 기능 | 구현 내용 | 개발 담당 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| ERD 모델링 설계 | - 정규화를 통한 데이터 모델의 일관성 확보 <br> - 서비스에 대한 Key, 속성, 관계 등을 표시 | 박세희 <br> 이한재  |
| 모델링 기반 테이블 및 데이터 생성 | - mysql 및 dbmate 를 적용한 테이블 생성<br> - 숙박 웹서비스에 적합한 Mock Data를 Node.js 자동화 스크립트를 활용하여 데이터 생성 | 박세희 <br> 이한재 |
| 회원가입/로그인 API | - 일반 회원가입 및 로그인 기능, 소셜 로그인(Kakao) API 를 이용한 로그인 기능 구현 <br> - JWT를 활용한 회원정보 유효성 검증 | 박세희 |
| 호텔 목록 조회 API | - 한 페이지당 8개의 호텔 목록을 보여주도록 구현 (Pagination) <br> - 상세 필터링 기능 구현 (편의시설, 가격, 날짜, 옵션 필터링) | 이한재 |
| 호텔 상세 조회 API | - 예약 가능한 날짜 유저에게 보여주고, 선택한 기간에 맞게 예약할 수 있도록 구현 <br> - DB에 저장된 호텔의 위치 정보를 불러와 지도상 나타나도록 구현| 이한재 |
| 결제하기 API | - 포인트를 이용한 결제 기능 구현<br> - 트랜젝션을 활용한 DB 데이터 추가 및 업데이트 기능 구현 | 박세희 |
| 호텔 방 등록 API | - JWT 토큰으로 유저 권한 판단 후 호스트 유저에 대해서 방 추가 할 수 있도록 기능 구현 | 박세희 |
| Unit Test | - 기능 단위로 발생할 수 있는 에러를 테스트 | 박세희 <br> 이한재 |
| AWS 배포 및 Docker 세팅 | - AWS EC2 와 RDS를 VPC 내에서 public, private 으로 구분하여 DB 보안 강화 <br> - Node.js 웹 서버를 배포하기 위한 Docker 이미지 생성| 박세희 <br> 이한재 |
<br>


#### 데이터베이스 ERD 모델링

<img width="545" alt="휘게실 erd" src="https://user-images.githubusercontent.com/117356735/224233458-2e7439f1-35e2-4ce3-88e2-6a1d81a0fcb2.png">



#### 일반 회원가입, 로그인 / KAKAO 로그인
 
 ![로그인](https://user-images.githubusercontent.com/117356735/224241315-cc0ea152-bc6b-4cdf-a5a0-284bf5a30110.gif)

#### 필터링

![필터링](https://user-images.githubusercontent.com/117356735/224243040-3b136d02-3029-48e8-8a67-722bed1dc867.gif)


#### 호스팅
![호스팅](https://user-images.githubusercontent.com/117356735/224240990-aaa9680c-533f-4499-b6e0-947f93be8f43.gif)

#### 메인지도, 상세 페이지
![메인 지도 상세](https://user-images.githubusercontent.com/117356735/224241988-8b5ef292-e68c-4fbc-9561-b05349a5a05a.gif)


#### 최근 본 상품
![최근본상품](https://user-images.githubusercontent.com/117356735/224242274-960b49a7-fe8e-4dd2-8e32-18c464be6238.gif)


#### 공유하기
![공유하기](https://user-images.githubusercontent.com/117356735/224244009-78932d29-1ab1-4879-a8c8-2131a4e5c44c.gif)


## Reference

- 이 프로젝트는 [에어비앤비](https://www.airbnb.co.kr//) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
