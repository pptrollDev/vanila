# vanilla

1. npm install
2. npm start
3. npm build

# 해결 전략

1. Event Listener 설정
2. 시작 버튼 클릭 -> 문제 데이터 Get
3. startGame 함수 호출 -> 문제, 남은시간 초기화 이후 1초 간격 timer Set
4. 1초마다 남은 시간 감소시키며 0초를 확인하며 0초일때 다음 문제로 넘어가거나 마지막 문제라면 점수와 평균시간을 함께 결과 페이지로 이동
5. Input box Enter -> handleSubmit 함수 호출
6. Input 값과 문제 값 비교후 맞으면 점수와 맞춘 시간 합산하고 마지막 문제라면 점수와 퍙균시간을 함께 결과 페이지로 이동
7. 결과페이지에서 전달 받은 점수와 평균시간을 출력
