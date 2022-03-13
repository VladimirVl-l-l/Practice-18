import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../serviсes/comment.service";

const commentsSlice = createSlice({
   name: "comments",
   initialState: {
      entities: null,
      isLoading: true,
      error: null
   },
   reducers: {
      commentsRequested: (state) => {
         state.isLoading = true;
      },
      commentsReceived: (state, action) => {
         state.entities = action.payload;
         state.isLoading = false;
      },
      commentsRequestFailed: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      }
   }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed } = actions;

const createCommentFailed = createAction("comments/createCommentFailed");
const createCommentRequested = createAction("comments/createCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");
const removeCommentFailed = createAction("comments/removeCommentFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
   dispatch(commentsRequested());
   try {
      const { content } = await commentService.getComments(userId);
      dispatch(commentsReceived(content));
   } catch (error) {
      dispatch(commentsRequestFailed(error.message));
   }
};

export const createComment = (payload) => async (dispatch, getState) => {
   dispatch(createCommentRequested());
   try {
      const { content } = await commentService.createComment(payload);
      const stateComments = getState().comments.entities;
      const newContent = [...stateComments, content];
      dispatch(commentsReceived(newContent));
   } catch (error) {
      dispatch(createCommentFailed(error.message));
   }
};

export const removeComment = (commentId) => async (dispatch, getState) => {
   dispatch(removeCommentRequested());
   try {
      await commentService.removeComment(commentId);
      const stateComments = getState().comments.entities;
      const content = stateComments.filter((c) => c._id !== commentId);
      dispatch(commentsReceived(content));
   } catch (error) {
      dispatch(removeCommentFailed(error.message));
   }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
   state.comments.isLoading;

export default commentsReducer;
