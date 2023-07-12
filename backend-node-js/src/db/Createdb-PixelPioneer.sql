create database delphit;

CREATE TABLE Users(
  userID INT PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(256),
  email VARCHAR(256),
  password VARCHAR(256),
  avatarID VARCHAR (256),
  bio VARCHAR(500)

);

CREATE TABLE Likes (
  likeID INT PRIMARY KEY IDENTITY(1,1),
  userID INT,
  postID INT,
  like_date DATE,
  CONSTRAINT FK_likes_userID
  FOREIGN KEY (userID)
  REFERENCES Users(userID)  ON DELETE CASCADE
);



CREATE TABLE Posts (
  postID INT PRIMARY KEY IDENTITY(1,1),
  userID INT,
  content VARCHAR(1000),
  postImg VARCHAR(256),
  post_date DATE,
  likesCount INT,
  comments VARCHAR(500), 
  CONSTRAINT FK_post_userID
    FOREIGN KEY (userID)
    REFERENCES Users(userID)  ON DELETE CASCADE
);

CREATE TABLE Messages (
  messageID INT PRIMARY KEY IDENTITY(1, 1),
  room VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  time VARCHAR(20) NOT NULL,
  created_at DATETIME DEFAULT GETDATE(),
  
);
CREATE TABLE Friendship (
  friendship_id INT PRIMARY KEY IDENTITY(1,1),
  user1ID INT,
  user2ID INT,
  friendship_date DATE,
 
);

CREATE TABLE Comments (
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
    REFERENCES Posts(postID)  ON DELETE CASCADE
);

