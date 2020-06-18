/********** IMPORT **********/
import {
  getPosts,
  getUserPosts,
  getFeed,
  addPost,
  removePost,
  editPost,
} from "./posts";

import {
  getClassList,
  getClasses,
  addClasses,
  removeClasses,
  createClass,
} from "./classes";

import {
  getComments,
  addComment,
  deleteComment,
  editComment,
} from "./comments";

import { getNotifications, readNotification } from "./notifications";

import {
  watchMessages,
  addMessages,
  getChats,
  addChats,
  addMember,
  leaveChat,
} from "./chats";

import { addUser, loginUser } from "./users";

/********** EXPORT **********/
export {
  getPosts,
  getUserPosts,
  getFeed,
  addPost,
  removePost,
  editPost,
  getClassList,
  getClasses,
  addClasses,
  removeClasses,
  createClass,
  getComments,
  addComment,
  deleteComment,
  editComment,
  getNotifications,
  readNotification,
  watchMessages,
  addMessages,
  getChats,
  addChats,
  addMember,
  leaveChat,
  addUser,
  loginUser,
};
