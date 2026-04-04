import express from "express";
import passport from "passport";

const router = express.Router();

// login com Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.send("Login successful 🚀");
  }
);

// logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.send("Logged out");
  });
});

export default router;