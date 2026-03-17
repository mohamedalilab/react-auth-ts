const router = require("express").Router();
const postController = require("../controllers/post.controller");
const postSchema = require("../utils/post.schema");

// middlewares:
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");
const verifyMWToken = require("../middlewares/verifyMWToken");
const validateMW = require("../middlewares/validateMW");

// Validate id param:
router.param("id", objectIdMWValidator("id"));

// All routes require authentication:
router.use(verifyMWToken);

// 1) get all posts:
router.get("/", postController.getAllPosts);

// 2) get post by id:
router.get("/:id", postController.getPost);

// 3) create new post:
router.post("/", validateMW(postSchema), postController.addNewPost);

// 4) update post:
router.put("/:id", validateMW(postSchema), postController.updatePost);

// 5) delete post:
router.delete("/:id", postController.deletePost);

module.exports = router;
