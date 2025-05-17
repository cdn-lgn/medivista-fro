import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography } from "@mui/material";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const CategorySection = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const categories = [
    "General Medicine",
    "Dental Care",
    "Eye Care",
    "Heart Care",
    "Diabetic Care",
    "Mental Health",
    "Children Care",
    "Women Care",
    "Skin Care",
    "First Aid"
  ];

  // Move to next item
  const nextSlide = () => {
    setCurrentPosition((prevPosition) => (prevPosition + 1) % categories.length); // Loop back to first
  };

  // Move to previous item
  const prevSlide = () => {
    setCurrentPosition((prevPosition) => (prevPosition - 1 + categories.length) % categories.length); // Loop back to last
  };

  return (
    <Box sx={{ mt: 5 }}>
      {/* Category Header */}
      <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Categories
        </Typography>
      </Box>

      {/* Desktop Carousel View */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "relative",
          overflow: "hidden",
          margin: "20px auto",
          width: "100%",
          height: "220px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentPosition * 33.33}%)`, // Move 33.33% per item
            width: `${categories.length * 33.33}%`, // Total width based on number of items
          }}
        >
          {categories.map((category, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 33.33%", // Each item takes 33.33% of the width
                height: "200px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  transform: "translateY(-3px)",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <MedicalInformationIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "500" }}>
                {category}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.5)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowBackIosNewIcon />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.5)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowForwardIosIcon />
        </button>
      </Box>

      {/* Mobile Grid View */}
      <Box
        sx={{
          display: { xs: "grid", md: "none" },
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              height: "130px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <MedicalInformationIcon sx={{ fontSize: 40, color: "#45a049" }} />
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "500" }}>
              {category}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorySection;
