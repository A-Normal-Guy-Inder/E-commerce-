const User = require("../db/user");
const { toSafeUser } = require("./auth-handler");

async function getUsers() {
    /* Excluding password at the query level, not after the fact */
    const users = await User.find({}, "-password").lean();
    return users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin === true,
    }));
}

async function getUser(id) {
    const user = await User.findById(id, "-password");
    return user ? toSafeUser(user) : null;
}

async function setUserRole(id, isAdmin) {
    const user = await User.findByIdAndUpdate(
        id,
        { isAdmin: isAdmin === true },
        { new: true, fields: "-password" }
    );
    return user ? toSafeUser(user) : null;
}

async function deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user ? toSafeUser(user) : null;
}

module.exports = { getUsers, getUser, setUserRole, deleteUser };
