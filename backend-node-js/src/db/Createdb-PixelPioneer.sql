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
  likeID INT,
  userID INT,
  postID INT,
  like_date DATE,
  PRIMARY KEY (likeID),
  CONSTRAINT FK_likes_userID
  FOREIGN KEY (userID)
  REFERENCES Users(userID)  ON DELETE CASCADE
);



CREATE TABLE post (
  postID INT,
  userID INT,
  content VARCHAR(500),
  postImg VARCHAR(256),
  post_date DATE,
  likes INT,
  comments VARCHAR(500),
  PRIMARY KEY (postID),
  CONSTRAINT FK_post_userID
    FOREIGN KEY (userID)
    REFERENCES Users(userID)  ON DELETE CASCADE
);

CREATE TABLE message (
  messageID INT,
  userID INT,
  receiverID INT,
  message_date DATE,
  contents VARCHAR(500),
  PRIMARY KEY (messageID),
  CONSTRAINT FK_message_userID
    FOREIGN KEY (userID)
    REFERENCES Users(userID)  ON DELETE CASCADE
);



CREATE TABLE friendship (
  friendship_id INT,
  user1ID INT,
  user2ID INT,
  friendship_date DATE,
  PRIMARY KEY (friendship_id)
);

CREATE TABLE comment (
  commentID INT,
  userID INT,
  postID INT,
  comment_date DATE,
  content VARCHAR(500),
  PRIMARY KEY (commentID),
  CONSTRAINT FK_comment_userID
    FOREIGN KEY (userID)
    REFERENCES Users(userID),
  CONSTRAINT FK_comment_postId
    FOREIGN KEY (postID)
    REFERENCES post(postID)  ON DELETE CASCADE
);


