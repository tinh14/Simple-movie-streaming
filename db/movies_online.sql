-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2022 at 06:40 PM
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
-- Table structure for table `_account`
--

CREATE TABLE `_account` (
  `username` varchar(36) NOT NULL,
  `pwd` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_account`
--

INSERT INTO `_account` (`username`, `pwd`) VALUES
('aaaaa', '594f803b380a41396ed63dca39503542'),
('aaaaaa', '594f803b380a41396ed63dca39503542'),
('admin', '21232f297a57a5a743894a0e4a801fc3'),
('bbbbb', 'a21075a36eeddd084e17611a238c7101'),
('caigiz', '4cab3105358671a965011076061adbbb'),
('caigiz2', '4cab3105358671a965011076061adbbb'),
('caigiz3', 'acf4678968116fc0a8ba4806fc4d06a3'),
('caigiztroi', '4a16fddc9d81090216a896ca26467b99'),
('caigiztroi1', '816040000ff020b8ec8bfbc037b48bdf'),
('cailon', 'ad24555947de3fea14244486ccc64414'),
('cailon1', 'bae4be5cc4963726362a0cacb307ecef'),
('cailon2', 'bae4be5cc4963726362a0cacb307ecef'),
('cailon3', '06b14697278c005049786237230a60cd'),
('cailon5', '33eb0dcf65d831f93e29ec84fae4661d'),
('cailon6', 'bae4be5cc4963726362a0cacb307ecef'),
('cailon7', '8aa1cb18c6931fe74ab9e7bee12c4fbd'),
('ccccc', '67c762276bced09ee4df0ed537d164ea'),
('cccccc', 'c1f68ec06b490b3ecb4066b1b13a9ee9'),
('hehehe', 'ffe553694f5096471590343432359e02'),
('huhuhu', 'a334ed15e6c4bc3cff677821df4a8960'),
('taikhoanmoi', '7a98db847b6234200d9099d1af6260d1'),
('taikhoanmoi2', '7ea14b8d4095a45c1c99c6f8429f2bf3'),
('tinhdeptrai', '594f803b380a41396ed63dca39503542'),
('tinhkg', '138649f3170f4d44d1b540d913d91964'),
('tinhkg123', 'fd884743df9cd0fb3c5f936088527f43');

-- --------------------------------------------------------

--
-- Table structure for table `_actor`
--

CREATE TABLE `_actor` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_actor`
--

INSERT INTO `_actor` (`id`, `name`, `avatar`) VALUES
(1, 'Quach Trung Vuong', 'jpg'),
(2, 'Ngo Phuoc Thanh', 'jpg'),
(3, 'Lam Thien Tinh', 'jpg'),
(4, 'Tran Minh Thong', 'jpg'),
(5, 'Vo Tuan Kiet', 'jpg'),
(6, 'Tran Quoc Thinh', 'jpg'),
(7, 'Tran Dao Quoc Dat', 'jpg');

-- --------------------------------------------------------

--
-- Table structure for table `_admin`
--

CREATE TABLE `_admin` (
  `username` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_admin`
--

INSERT INTO `_admin` (`username`) VALUES
('admin');

-- --------------------------------------------------------

--
-- Table structure for table `_country`
--

CREATE TABLE `_country` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_country`
--

INSERT INTO `_country` (`id`, `name`) VALUES
(1, 'Viet Nam'),
(2, 'USA');

-- --------------------------------------------------------

--
-- Table structure for table `_evaluation`
--

CREATE TABLE `_evaluation` (
  `username` varchar(36) NOT NULL,
  `movieId` int(11) NOT NULL,
  `score` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_evaluation`
--

INSERT INTO `_evaluation` (`username`, `movieId`, `score`) VALUES
('aaaaa', 1, 7),
('bbbbb', 1, 8),
('tinhkg', 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `_genre`
--

CREATE TABLE `_genre` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_genre`
--

INSERT INTO `_genre` (`id`, `name`) VALUES
(1, 'Tinh Cam'),
(2, 'Tam Ly'),
(3, 'Xa Hoi'),
(4, 'Co Trang'),
(5, 'Hai Huoc'),
(6, 'Tai lieu'),
(7, 'Hanh Dong'),
(8, '18+');

-- --------------------------------------------------------

--
-- Table structure for table `_movie`
--

CREATE TABLE `_movie` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `anotherName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `releaseYear` int(11) DEFAULT NULL,
  `description` text CHARACTER SET utf8 DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  `trailer` text DEFAULT NULL,
  `video` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_movie`
--

INSERT INTO `_movie` (`id`, `name`, `anotherName`, `releaseYear`, `description`, `avatar`, `trailer`, `video`) VALUES
(1, 'a', 'a', 2020, 'Bao ve trai dat', 'webp', 'https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=0&mute=0;', 'mp4'),
(2, 'ab', 'a', 2022, 'asdasdasda asdasd', 'jpg', NULL, NULL),
(3, 'ad', 'a', 2020, 'sad', 'jpg', NULL, NULL),
(4, 'a', 'a', 2020, NULL, 'jpg', NULL, NULL),
(5, '5', '5', 5, '5', 'jpeg', '5', 'mp4'),
(6, 'a', 'a', 2020, NULL, 'jpg', NULL, NULL),
(7, 'a', '7', 2020, NULL, 'jpg', NULL, NULL),
(8, 'a', '8', 8, NULL, 'jpg', NULL, NULL),
(9, 'a', '9', 2020, NULL, 'jpg', NULL, NULL),
(10, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(11, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(12, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(13, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(14, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(15, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(16, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(17, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(18, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(19, 'a', NULL, NULL, NULL, 'jpg', NULL, NULL),
(20, 'b', NULL, NULL, NULL, 'jpg', NULL, NULL),
(300, '300', '300', 300, '300', 'jpeg', '300', 'mp4'),
(400, '400', '400', 400, '400', 'jpeg', '400', 'mp4');

-- --------------------------------------------------------

--
-- Table structure for table `_movie_actor`
--

CREATE TABLE `_movie_actor` (
  `movieId` int(11) NOT NULL,
  `actorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_movie_actor`
--

INSERT INTO `_movie_actor` (`movieId`, `actorId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 6),
(1, 7),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(20, 1),
(300, 2),
(300, 3),
(300, 7),
(400, 2);

-- --------------------------------------------------------

--
-- Table structure for table `_movie_country`
--

CREATE TABLE `_movie_country` (
  `movieId` int(11) NOT NULL,
  `countryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_movie_country`
--

INSERT INTO `_movie_country` (`movieId`, `countryId`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(300, 1),
(400, 1);

-- --------------------------------------------------------

--
-- Table structure for table `_movie_genre`
--

CREATE TABLE `_movie_genre` (
  `movieId` int(11) NOT NULL,
  `genreId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_movie_genre`
--

INSERT INTO `_movie_genre` (`movieId`, `genreId`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(300, 2),
(300, 3),
(400, 2);

-- --------------------------------------------------------

--
-- Table structure for table `_user`
--

CREATE TABLE `_user` (
  `username` varchar(36) NOT NULL,
  `firstname` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `avatar` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_user`
--

INSERT INTO `_user` (`username`, `firstname`, `lastname`, `email`, `avatar`) VALUES
('aaaaa', 'aaaa', 'aaaaa', 'caigithenay@gmail.com', 'jpeg'),
('aaaaaa', 'aaaaa', 'aaaaa', 'aaaaa@gmail.com', NULL),
('bbbbb', 'bbbbb', 'bbbbb', 'bbbbb@gmail.com', NULL),
('caigiz', 'caigiz', 'caigiz', 'caigiz@gmail.com', NULL),
('caigiz2', 'caigiz', 'caigiz', 'caigiz@gmail.com', NULL),
('caigiz3', 'caigiz3', 'caigiz3', 'caigiz3@gmail.com', NULL),
('caigiztroi', 'caigiztroi', 'caigiztroi', 'caigiztroi@gmail.com', NULL),
('caigiztroi1', 'caigiztroi1', 'caigiztroi1', 'caigiztroi1@gmail.com', NULL),
('cailon', 'cailon', 'cailon', 'cailon@gmail.com', NULL),
('cailon1', 'cailon1', 'cailon1', 'cailon1@gmail.com', NULL),
('cailon2', 'cailon1', 'cailon1', 'cailon1@gmail.com', NULL),
('cailon3', 'cailon2', 'cailon2', 'cailon2@gmail.com', NULL),
('cailon5', 'cailon5', 'cailon5', 'cailon5@gmail.com', NULL),
('cailon6', 'cailon1', 'cailon1', 'cailon1@gmail.com', NULL),
('cailon7', 'cailon7', 'cailon7', 'cailon7@gmail.com', NULL),
('ccccc', 'ccccc', 'ccccc', 'ccccc@gmail.com', NULL),
('cccccc', 'cccccc', 'cccccc', 'cccccc@gmail.com', NULL),
('hehehe', 'hehehe', 'hehehe', 'hehehe@gmail.com', ''),
('huhuhu', 'huhuhu', 'huhuhu', 'huhuhu@gmail.com', NULL),
('taikhoanmoi', '', '', '', NULL),
('taikhoanmoi2', 'taikhoanmoi2', 'taikhoanmoi2', 'taikhoanmoi2@gmail.com', NULL),
('tinhdeptrai', 'tinh', 'tinh', 'tinhdeptrai@gmail.com', ''),
('tinhkg', 'fgf', 'fg4', 'firstname@gmail.com', NULL),
('tinhkg123', 'asdasds', 'asds', 'asdasda@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `_watchlist`
--

CREATE TABLE `_watchlist` (
  `username` varchar(36) NOT NULL,
  `movieId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_watchlist`
--

INSERT INTO `_watchlist` (`username`, `movieId`) VALUES
('aaaaa', 1),
('aaaaa', 2),
('aaaaa', 5),
('caigiztroi1', 1),
('hehehe', 1),
('hehehe', 2),
('hehehe', 3),
('huhuhu', 2),
('tinhdeptrai', 2),
('tinhdeptrai', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `_account`
--
ALTER TABLE `_account`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `_actor`
--
ALTER TABLE `_actor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_admin`
--
ALTER TABLE `_admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `_country`
--
ALTER TABLE `_country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_evaluation`
--
ALTER TABLE `_evaluation`
  ADD PRIMARY KEY (`username`,`movieId`),
  ADD KEY `movieId` (`movieId`);

--
-- Indexes for table `_genre`
--
ALTER TABLE `_genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_movie`
--
ALTER TABLE `_movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_movie_actor`
--
ALTER TABLE `_movie_actor`
  ADD PRIMARY KEY (`movieId`,`actorId`),
  ADD KEY `actorId` (`actorId`);

--
-- Indexes for table `_movie_country`
--
ALTER TABLE `_movie_country`
  ADD PRIMARY KEY (`movieId`,`countryId`),
  ADD KEY `countryId` (`countryId`);

--
-- Indexes for table `_movie_genre`
--
ALTER TABLE `_movie_genre`
  ADD PRIMARY KEY (`movieId`,`genreId`),
  ADD KEY `genreId` (`genreId`);

--
-- Indexes for table `_user`
--
ALTER TABLE `_user`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `_watchlist`
--
ALTER TABLE `_watchlist`
  ADD PRIMARY KEY (`username`,`movieId`),
  ADD KEY `movieId` (`movieId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `_admin`
--
ALTER TABLE `_admin`
  ADD CONSTRAINT `_admin_ibfk_1` FOREIGN KEY (`username`) REFERENCES `_account` (`username`);

--
-- Constraints for table `_evaluation`
--
ALTER TABLE `_evaluation`
  ADD CONSTRAINT `_evaluation_ibfk_1` FOREIGN KEY (`username`) REFERENCES `_user` (`username`),
  ADD CONSTRAINT `_evaluation_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `_movie` (`id`);

--
-- Constraints for table `_movie_actor`
--
ALTER TABLE `_movie_actor`
  ADD CONSTRAINT `_movie_actor_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `_movie` (`id`),
  ADD CONSTRAINT `_movie_actor_ibfk_2` FOREIGN KEY (`actorId`) REFERENCES `_actor` (`id`);

--
-- Constraints for table `_movie_country`
--
ALTER TABLE `_movie_country`
  ADD CONSTRAINT `_movie_country_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `_movie` (`id`),
  ADD CONSTRAINT `_movie_country_ibfk_2` FOREIGN KEY (`countryId`) REFERENCES `_country` (`id`);

--
-- Constraints for table `_movie_genre`
--
ALTER TABLE `_movie_genre`
  ADD CONSTRAINT `_movie_genre_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `_movie` (`id`),
  ADD CONSTRAINT `_movie_genre_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `_genre` (`id`);

--
-- Constraints for table `_user`
--
ALTER TABLE `_user`
  ADD CONSTRAINT `_user_ibfk_1` FOREIGN KEY (`username`) REFERENCES `_account` (`username`);

--
-- Constraints for table `_watchlist`
--
ALTER TABLE `_watchlist`
  ADD CONSTRAINT `_watchlist_ibfk_1` FOREIGN KEY (`username`) REFERENCES `_user` (`username`),
  ADD CONSTRAINT `_watchlist_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `_movie` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
