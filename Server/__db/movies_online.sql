-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2022 at 10:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `userName` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_account`
--

CREATE TABLE `_account` (
  `userName` varchar(36) NOT NULL,
  `pwd` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_actor`
--

CREATE TABLE `_actor` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `movieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_comment`
--

CREATE TABLE `_comment` (
  `id` int(11) NOT NULL,
  `content` text CHARACTER SET utf8 DEFAULT NULL,
  `commentDate` date DEFAULT NULL,
  `userName` varchar(36) DEFAULT NULL,
  `movieID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_country`
--

CREATE TABLE `_country` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `movieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_episode`
--

CREATE TABLE `_episode` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `movieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_evaluation`
--

CREATE TABLE `_evaluation` (
  `userName` varchar(36) NOT NULL,
  `movieID` int(11) NOT NULL,
  `score` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_favoritemovie`
--

CREATE TABLE `_favoritemovie` (
  `userName` varchar(36) NOT NULL,
  `movieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_genre`
--

CREATE TABLE `_genre` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `movieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_movie`
--

CREATE TABLE `_movie` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `anotherName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `YOM` int(11) DEFAULT NULL,
  `content` text CHARACTER SET utf8 DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `numView` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_studio`
--

CREATE TABLE `_studio` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `movieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_user`
--

CREATE TABLE `_user` (
  `userName` varchar(36) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`userName`);

--
-- Indexes for table `_account`
--
ALTER TABLE `_account`
  ADD PRIMARY KEY (`userName`);

--
-- Indexes for table `_actor`
--
ALTER TABLE `_actor`
  ADD PRIMARY KEY (`id`,`movieID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_comment`
--
ALTER TABLE `_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userName` (`userName`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_country`
--
ALTER TABLE `_country`
  ADD PRIMARY KEY (`id`,`movieID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_episode`
--
ALTER TABLE `_episode`
  ADD PRIMARY KEY (`id`,`movieID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_evaluation`
--
ALTER TABLE `_evaluation`
  ADD PRIMARY KEY (`userName`,`movieID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_favoritemovie`
--
ALTER TABLE `_favoritemovie`
  ADD PRIMARY KEY (`userName`,`movieID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_genre`
--
ALTER TABLE `_genre`
  ADD PRIMARY KEY (`id`,`movieID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_movie`
--
ALTER TABLE `_movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_studio`
--
ALTER TABLE `_studio`
  ADD PRIMARY KEY (`id`,`movieID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `_user`
--
ALTER TABLE `_user`
  ADD PRIMARY KEY (`userName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `_comment`
--
ALTER TABLE `_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `_account` (`userName`);

--
-- Constraints for table `_actor`
--
ALTER TABLE `_actor`
  ADD CONSTRAINT `_actor_ibfk_1` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_comment`
--
ALTER TABLE `_comment`
  ADD CONSTRAINT `_comment_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `_user` (`userName`),
  ADD CONSTRAINT `_comment_ibfk_2` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_country`
--
ALTER TABLE `_country`
  ADD CONSTRAINT `_country_ibfk_1` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_episode`
--
ALTER TABLE `_episode`
  ADD CONSTRAINT `_episode_ibfk_1` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_evaluation`
--
ALTER TABLE `_evaluation`
  ADD CONSTRAINT `_evaluation_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `_user` (`userName`),
  ADD CONSTRAINT `_evaluation_ibfk_2` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_favoritemovie`
--
ALTER TABLE `_favoritemovie`
  ADD CONSTRAINT `_favoritemovie_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `_user` (`userName`),
  ADD CONSTRAINT `_favoritemovie_ibfk_2` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_genre`
--
ALTER TABLE `_genre`
  ADD CONSTRAINT `_genre_ibfk_1` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_studio`
--
ALTER TABLE `_studio`
  ADD CONSTRAINT `_studio_ibfk_1` FOREIGN KEY (`movieID`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_user`
--
ALTER TABLE `_user`
  ADD CONSTRAINT `_user_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `_account` (`userName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
