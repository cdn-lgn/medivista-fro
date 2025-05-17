import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MedicineSection = () => {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${API_URL}/data`)
      .then((response) => setMedicines(response.data))
      .catch((err) => console.error("Error fetching medicines:", err));
  }, []);

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
        Popular Medicines
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {medicines?.map((medicine) => (
          <Card
            key={medicine.id}
            onClick={() => navigate('/products')}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                transform: "translateY(-5px)",
                transition: "all 0.3s ease",
              },
              cursor: 'pointer',
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: "500" }}
              >
                {medicine.productName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {medicine.company}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ mb: 2 }}
              >
                ₹{medicine.salesPrice}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                  label={medicine.tags}
                  size="small"
                  sx={{
                    backgroundColor: "#45a049",
                    color: "white",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MedicineSection;
