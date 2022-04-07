const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router
   .route("/")
   .get(auth, async (req, res) => {
      try {
         const { orederBy, equalTo } = req.query;
         const list = await Comment.find({ [orederBy]: equalTo });
         res.send(list);
      } catch (error) {
         res.status(500).json({
            message: `На сервере произошла ошибка. Попробуйте немного позже`,
         });
      }
   })
   .post(auth, async (req, res) => {
      try {
         const newComment = await Comment.create({
            ...req.body,
            userId: req.user._id,
         });
         res.status(201).send(newComment);
      } catch (error) {
         console.log(error.message);

         res.status(500).json({
            message: `На сервере произошла ошибка. Попробуйте немного позже`,
         });
      }
   });
router.delete("/:commentId", auth, async (req, res) => {
   try {
      const { commentId } = req.params;
      const removeComment = await Comment.findById(commentId);

      if (removeComment.userId.toString() === req.user._id) {
         await removeComment.remove();
         return res.send(null);
      } else {
         res.status(401).json({ message: "Неавторизован" });
      }
   } catch (error) {
      res.status(500).json({
         message: `На сервере произошла ошибка. Попробуйте немного позже`,
      });
   }
});
module.exports = router;
