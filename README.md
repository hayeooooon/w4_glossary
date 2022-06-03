# Week3. 리액트 숙련 과제 - 나만의 사전 만들기

<a href="http://hay-eon.shop.s3-website.ap-northeast-2.amazonaws.com/" target="_blank">과제 보러가기</a>

<br/>
<hr/>
<br/>

## 과제 목표
- 라우팅을 할 수 있어요.
- 리덕스를 활용할 수 있어요.
- 단어 목록을 파이어스토어에 저장하고 가져올 수 있어요.

## 과제 요구사항
`1) 나만의 사전 완성`,  `2) 파이어베이스 or S3로 배포` 를 완성해야 합니다.
1. 게시글 목록 페이지
    - 게시글 목록을 화면에 그리기 (각각 뷰는 카드 뷰로 만들기)
    - 게시글 내의 예시는 파란 글씨로 보여주기
    - 게시글 목록을 리덕스에서 관리하기
    - 게시글 목록을 파이어스토어에서 가져오기
2. 게시글 작성 페이지
    - 게시글 작성에 필요한 input 3개를 ref로 관리하기
    - 작성한 게시글을 리덕스 내 게시글 목록에 추가하기
    - 게시글 목록을 파이어스토어에 저장하기
3. 추가로 해보면 좋을 기능 (필수 X)
    - 무한 스크롤 붙이기
    - 게시글 수정해보기

<br/>
<hr/>
<br/>

## 작업 내용

<br/>

### 공통
- CSS는 styled-componenets 라이브러리 활용
- Media Query 사용하여 모바일까지 반응형 스타일 추가

<br/>

### App.js
- 모든 페이지에 공통으로 적용되는 <header/> 태그는 app.js 에 작성
- Route 기능을 이용하여 각 컴포넌트의 경로를 나누고, 페이지별 컴포넌트는 Main(리스트 페이지) / Register(등록 페이지) / Edit(수정 페이지) 으로 구성
- 리스트 페이지에서 카드 삭제 버튼을 눌렀을 때, 삭제 확인 Modal이 레이아웃상 모든 화면을 덮어야 하므로 App.js 파일에 위치
삭제 버튼은 자식 컴포넌트인 Main 컴포넌트에 있기 때문에 Redux를 활용하여 데이터를 주고받을 수 있도록 처리하였다.

<br/>

### Main.js : 리스트 페이지
- 카드 리스트들이 처음 화면에 그려질 때 Fade In 효과를 주기 위해 데이터를 불러오는 시간을 고려하여 setTimeout을 이용해 class 추가 
- unmout 시 clearTimeout 이벤트 추가하여 이벤트 제거
- Description, Example 텍스트들에 내려쓰기 기능을 추가하고 싶어서 해당 데이터 내에 `<br/>` 이라는 텍스트가 있을 경우 `<br/>`을 기준으로 텍스트를 split 하고,
split된 요소들을 map으로 돌려서 텍스트 뒤에 `<br/>` 태그가 추가되도록 처리.
마지막 요소 뒤에는 `<br/>`태그가 필요 없으므로 split된 요소들의 length와 index 값을 비교하여 마지막 요소에는 `<br/>`태그 추가되지 않도록 if문으로 분기처리
- 공부 완료 처리된 카드에는 수정/삭제 버튼이 보여지지 않도록 && 조건문으로 분기 처리
- 삭제 버튼 클릭 시 삭제 확인 모달을 노출시키기 위해 Boolean값을 redux를 통해 저장하고, Boolean 값이 true일 경우 모달 노출, false일 경우 모달이 노출되지 않도록 처리
- 삭제 버튼 클릭 시 삭제 요청된 카드의 id값도 함께 공유할 수 있도록 redux에 id값을 함께 전달

<br/>

### Register.js : 등록 페이지
- 각 input의 최대 글자수를 제한하기 위해 maxLength 속성 추가
- 각 input에 작성중인 value 값을 저장하기 위해 각 input에 해당되는 ref와 state 추가
- onInput 이벤트를 추가해 작성중인 input의 value값을 state에 저장
- Description과 Example은 최대 글자수가 각 300/200자로 길기 때문에, 실시간으로 반영되는 state의 length값을 출력해서 작성하고 있는 글자수를 실시간으로 보여줌
- 모든 input의 내용이 필수로 작성될 수 있도록 validation 기능 추가
```
const [validation, setValidation] = useState({
	term: false,
	desc: false,
	exam: false,
});
```
위와 같이 각 input의 항목별로 boolean값을 가지는 state를 생성한 후, 초기값은 false로 설정. <br/>
등록하기 버튼을 눌렀을 때 checkForm() 함수에서 각 input의 value에 해당하는 state의 length를 체크하고, 해당 input의 value에서 공백을 제외한 length값이 1보다 작을 경우 validation state의 값을 false로, 그렇지 않을 경우 true로 설정<br/>
하나의 항목이라도 false일 경우 오류 텍스트가 노출되고, 새로운 데이터를 저장하는 이벤트는 실행되지 않음.<br/>
모든 항목이 true일 경우에만 새로운 데이터를 전송하는 이벤트가 dispatch 될 수 있도록 조건문 설정

<br/>

### Edit.js : 수정 페이지
- 기능적인 부분은 Register 페이지와 동일<br/>
- 모든 데이터를 불러온 뒤, 수정해야하는 아이템의 데이터만 가져오기 위해 reduce 함수를 활용해 파라미터의 해당 id와 일치하는 데이터만 추출.<br/>
filter 함수를 활용할 경우 리턴값이 배열인데, 하나의 데이터만 사용할 것이기 때문에 배열에 담을 필요가 없다고 생각해서 recude 활용...<br/>
- useEffect의 dependency값에 리덕스에서 불러오는 data를 추가해서 data의 값이 update된 후에 각 input의 value에 적용돼야하는 state들에 값이 추가되도록 분기 처리

<br/>

### Modal.js : 삭제 확인 모달
- Main.js 컴포넌트에서 삭제 버튼을 클릭했을 경우 redux를 통해 Boolean값을 전달받아 true일 경우 모달 보여지도록 CSS 처리<br/>
- 삭제 확인 버튼을 클릭할 경우 함께 전달받은 삭제할 아이템의 id값을 삭제하는 액션에 담아서 termsList reducer에 dispatch 요청<br/>
- 삭제 취소 버튼을 클릭할 경우 ModalToggle 이벤트에 false값을 전달하여 Modal 컴포넌트 숨김처리 <br/>

<br/>
<hr/>
<br/>

## 사용한 라이브러리
- react-router-dom
- styled-components
- react-redux
- firebase

<br/>

## 배포
- AWS s3 버킷 활용하여 배포

