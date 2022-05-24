import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import multiavatar from "@multiavatar/multiavatar";

import { useQuery } from "react-query";
import { FetchData, Post, User } from "../interface";
import { fetchComments, fetchPosts, fetchUsers } from "../requests";
import "./PostsDetail.css";

export const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading: isLoadingPost } = useQuery(
    [FetchData.FetchPosts, postId],
    () => fetchPosts({ id: parseInt(postId || "") })
  );
  const { data: comments, isLoading: isLoadingComments } = useQuery(
    [FetchData.FetchComments],
    () => fetchComments({ postId: parseInt(postId || "") })
  );
  const currentPost: Post | undefined = post && post.data[0];
  const { data: postUser, isLoading: isLoadingUser } = useQuery(
    [FetchData.FetchUsers, currentPost?.id],
    () => fetchUsers({ id: currentPost?.userId || NaN })
  );
  const currentUser: User | undefined = postUser?.data[0];

  const navigateToUser = (id?: number) => {
    if (id) navigate(`/users/${id}`);
  };
  console.log("multiavator", multiavatar("Ryland Lewes"));
  return (
    <div>
      PostDetail
      {isLoadingPost && <p>Loading post details....</p>}
      {currentPost && (
        <div>
          <div
            className="post postheader"
            onClick={() => navigateToUser(currentUser?.id)}
          >
            {isLoadingUser && <p>Loading</p>}
            {currentUser && (
              <div
                className="avatar"
                dangerouslySetInnerHTML={{
                  __html: multiavatar(currentUser?.name || ""),
                }}
              />
            )}
            {currentUser && (
              <div className="nickname">
                <p>{currentUser.name}</p>
              </div>
            )}
          </div>
          <div className="post font">{currentPost.body}</div>
          <p>Comments</p>
          <div className="post font">
            {isLoadingComments && <p>Loading Comments</p>}
            {comments &&
              comments.data.map((comment) => (
                <div>
                  {/*<div className="post subheader">{comment.email}</div>*/}
                  <div className="post subheader">
                    <div
                      className="avatar"
                      dangerouslySetInnerHTML={{
                        __html: multiavatar(comment.email),
                      }}
                    />
                    <p>{comment.email}</p>
                  </div>
                  <div className="post font">{comment.body}</div>
                  <hr style={{color: "#ccc"}}/>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
