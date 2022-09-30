const express= require('express');
const verifyToken = require("../middleware/AuthJWT");
const router= express.Router();

router.get("/api/v1/users", verifyToken, function (req, res) {
    if (!req.user) {
        res.status(403)
            .send({
                message: "Invalid JWT token"
            });
    }
    if (req.user.role === "admin") {
        res.status(200)
            .send({
                message: "Congratulations! but there is no hidden content"
            });
    } else {
        res.status(403)
            .send({
                message: "Unauthorised access"
            });
    }
});

module.exports = router;
