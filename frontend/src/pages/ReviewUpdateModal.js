import axios from "axios";
import React, { useState, useEffect } from "react";

const ReviewUpdateModal = ({ isOpen, onClose, hostReservation }) => {
  const [rating, setRating] = useState(1); // 별점 상태
  const [review, setReview] = useState(""); // 리뷰 내용 상태

  useEffect(() => {
    if (isOpen) {
      getMyReview();
    }
  }, [isOpen]);

  if (!isOpen) return null; // 모달이 열리지 않았을 경우 아무것도 렌더링하지 않음

  const handleRatingClick = (value) => {
    setRating(value); // 별점 업데이트
  };
  const getMyReview = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/hospitalreview?hospitalReviewId=${hostReservation.hospReviewId}`
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.data);
          setReview(response.data.data.hospReviewContent);
          setRating(response.data.data.hospReviewRating);
        }
      });
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value); // 리뷰 텍스트 업데이트
  };

  const handleSubmit = () => {
    const hospitalReviewUpdateInput = {
      hospReviewId: hostReservation.hospReviewId,
      content: review,
      rating: rating,
      userId: hostReservation.userId,
      hospId: hostReservation.hospId,
      hospitalReservationId: hostReservation.hospReservationId,
    };
    axios
      .post(
        `http://localhost:8080/api/v1/hospitalreview/update`,
        hospitalReviewUpdateInput
      )
      .then((response) => {
        if (response.data.data) {
        }
      });
    onClose(); // 모달 닫기
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2>리뷰 수정</h2>
        <p>{`"${hostReservation?.yadmNm}"에 대한 평점과 리뷰를 수정해주세요.`}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                style={{
                  fontSize: "24px",
                  color: starValue <= rating ? "#FFD700" : "#C0C0C0",
                  cursor: "pointer",
                  marginRight: "5px",
                }}
                onClick={() => handleRatingClick(starValue)}
              >
                ★
              </span>
            );
          })}
        </div>
        <p>선택된 평점: {rating}점</p>
        {/* 리뷰 작성 영역 */}
        <p>{hostReservation.hospReservationId}</p>
        <p>{hostReservation.hospId}</p>
        <textarea
          placeholder={`"${hostReservation?.yadmNm}"에 대한 리뷰를 작성해주세요.`}
          value={review}
          onChange={handleReviewChange}
          style={textareaStyle}
        ></textarea>
        <div style={{ marginTop: "10px" }}>
          <button onClick={onClose} style={closeButtonStyle}>
            닫기
          </button>
          <button onClick={handleSubmit} style={submitButtonStyle}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

// 스타일
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  width: "300px",
};

const textareaStyle = {
  width: "100%",
  height: "100px",
  marginBottom: "10px",
  resize: "none",
};

const closeButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "10px",
};

const submitButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28A745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ReviewUpdateModal;
