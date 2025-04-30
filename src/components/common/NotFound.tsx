import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
  keyframes,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Home } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../redux/reducers/userDetailsReducer";

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const AnimatedIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: "150px",
  color: theme.palette.primary.main,
  animation: `${float} 3s ease-in-out infinite`,
}));

const NotFound: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGoHome = () => {
    dispatch(clearUserDetails());
    navigate("/checkin");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "md",
            textAlign: "center",
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          <AnimatedIcon />

          <Typography
            variant={isMobile ? "h3" : "h1"}
            component="h1"
            sx={{
              mb: 2,
              mt: 4,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              width: "100%",
            }}
          >
            404
          </Typography>

          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            sx={{
              mb: 3,
              color: theme.palette.text.primary,
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
              width: "100%",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Oops! The page you are looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={handleGoHome}
            sx={{
              borderRadius: "28px",
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              boxShadow: theme.shadows[8],
              "&:hover": {
                boxShadow: theme.shadows[12],
              },
            }}
          >
            Back To Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
