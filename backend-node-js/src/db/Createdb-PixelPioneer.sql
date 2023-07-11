create database delphit;

CREATE TABLE Users(
  userID INT PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(256),
  email VARCHAR(256),
  password VARCHAR(256),
  avatarID VARCHAR (256),
  bio VARCHAR(500)

);

CREATE TABLE likes (
  likeID INT PRIMARY KEY IDENTITY(1,1),
  userID INT,
  postID INT,
  like_date DATE,
  CONSTRAINT FK_likes_userID
  FOREIGN KEY (userID)
  REFERENCES Users(userID)  ON DELETE CASCADE
);



CREATE TABLE post (
  postID INT PRIMARY KEY IDENTITY(1,1),
  userID INT,
  content VARCHAR(500),
  postImg VARCHAR(256),
  post_date DATE,
  likesCount INT,
  comments VARCHAR(500), 
  CONSTRAINT FK_post_userID
    FOREIGN KEY (userID)
    REFERENCES Users(userID)  ON DELETE CASCADE
);

CREATE TABLE message (
  messageID INT PRIMARY KEY IDENTITY(1,1),
  userID INT,
  receiverID INT,
  message_date DATE,
  contents VARCHAR(500),
  CONSTRAINT FK_message_userID
    FOREIGN KEY (userID)
    REFERENCES Users(userID)  ON DELETE CASCADE
);



CREATE TABLE friendship (
  friendship_id INT PRIMARY KEY IDENTITY(1,1),
  user1ID INT,
  user2ID INT,
  friendship_date DATE,
 
);

CREATE TABLE comment (
  commentID INT PRIMARY KEY IDENTITY(1,1),
  userID INT,
  postID INT,
  comment_date DATE,
  content VARCHAR(500), 
  CONSTRAINT FK_comment_userID
    FOREIGN KEY (userID)
    REFERENCES Users(userID),
  CONSTRAINT FK_comment_postId
    FOREIGN KEY (postID)
    REFERENCES post(postID)  ON DELETE CASCADE
);

