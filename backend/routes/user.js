const express = require("express");
const { getUsers, getUser, setUserRole, deleteUser } = require("../handlers/user-handler");
const router = express.Router();

/* Admin-only routes */

router.get("/", async (req, res) => {
    const users = await getUsers();
    res.send(users);
});

router.get("/:id", async (req, res) => {
    const user = await getUser(req.params.id);
    if (!user) return res.status(404).send({ error: "User not found." });
    res.send(user);
});

router.patch("/:id/role", async (req, res) => {
    const { isAdmin } = req.body;
    if (typeof isAdmin !== "boolean") {
        return res.status(400).send({ error: "Provide isAdmin as a boolean." });
    }
    /* Prevent self lockout */
    if (req.params.id === req.user.id && isAdmin === false) {
        return res.status(400).send({ error: "You cannot remove your own admin access." });
    }
    const user = await setUserRole(req.params.id, isAdmin);
    if (!user) return res.status(404).send({ error: "User not found." });
    res.send(user);
});

router.delete("/:id", async (req, res) => {
    if (req.params.id === req.user.id) {
        return res.status(400).send({ error: "You cannot delete your own account." });
    }
    const user = await deleteUser(req.params.id);
    if (!user) return res.status(404).send({ error: "User not found." });
    res.send({ message: "User Removed" });
});

module.exports = router;
