-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2022 at 04:45 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nursing_schedular`
--

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `Id` int(11) NOT NULL,
  `Name` varchar(525) NOT NULL,
  `Address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`Id`, `Name`, `Address`) VALUES
(1, 'Windsor Hospital', 'Sunset Avenue windsor'),
(14, 'Oullete hospital', 'demo address');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `Id` int(11) NOT NULL,
  `Instructor_number` int(11) NOT NULL,
  `First_name` varchar(512) NOT NULL,
  `Last_name` varchar(512) NOT NULL,
  `Email` varchar(512) NOT NULL,
  `Comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`Id`, `Instructor_number`, `First_name`, `Last_name`, `Email`, `Comments`) VALUES
(1, 1234, 'Gail', 'GreenG', 'greeng@uwindsor.ca', 'hired 2020-works nuero coordinator- located out of hd'),
(3, 123456, 'demo', 'instructor', 'demo@uwin.ca', 'dsgdthjy');

-- --------------------------------------------------------

--
-- Table structure for table `placement_location`
--

CREATE TABLE `placement_location` (
  `Id` int(11) NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `unit` text NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `section` varchar(512) NOT NULL,
  `day` varchar(512) NOT NULL,
  `comments` varchar(612) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `placement_location`
--

INSERT INTO `placement_location` (`Id`, `hospital_id`, `unit`, `instructor_id`, `section`, `day`, `comments`) VALUES
(1, 1, '1', 1, 'Nurs-2523', 'MON-DAY', 'demo comments'),
(7, 1, 'Oullete-Unit Occology-FW2354', 3, 'Class-2343', 'THURS-DAY', ' m xc,mv');

-- --------------------------------------------------------

--
-- Table structure for table `school_locations`
--

CREATE TABLE `school_locations` (
  `Id` int(11) NOT NULL,
  `SchoolName` varchar(512) NOT NULL,
  `Campus` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_locations`
--

INSERT INTO `school_locations` (`Id`, `SchoolName`, `Campus`) VALUES
(1, 'University Of Windsor', 'Sunset Avenue'),
(4, 'St.Clair', 'Windsor');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Id` int(11) NOT NULL,
  `Term` varchar(512) NOT NULL,
  `SchoolName` text NOT NULL,
  `FirstName` varchar(512) NOT NULL,
  `LastName` varchar(512) NOT NULL,
  `Email` varchar(512) NOT NULL,
  `StudentNumber` int(11) NOT NULL,
  `Comments` text NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Id`, `Term`, `SchoolName`, `FirstName`, `LastName`, `Email`, `StudentNumber`, `Comments`, `pid`) VALUES
(1, 'Winter-2022', 'St.Clair', 'ds', 'fdgd', 'pagte@win.ca', 11778210, 'wer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `term`
--

CREATE TABLE `term` (
  `Id` int(11) NOT NULL,
  `term` varchar(512) NOT NULL,
  `yearId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `term`
--

INSERT INTO `term` (`Id`, `term`, `yearId`) VALUES
(7, 'spring-2022', 2),
(9, 'Winter-2022', 2),
(11, 'May2022', 2),
(12, 'Fall2021', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Username` varchar(200) NOT NULL,
  `Password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Username`, `Password`) VALUES
(1, 'nursing', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `year`
--

CREATE TABLE `year` (
  `Id` int(11) NOT NULL,
  `year` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `year`
--

INSERT INTO `year` (`Id`, `year`) VALUES
(2, 2022),
(3, 2021);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `placement_location`
--
ALTER TABLE `placement_location`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `hospital_id` (`hospital_id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `school_locations`
--
ALTER TABLE `school_locations`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `term`
--
ALTER TABLE `term`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `term_ibfk_1` (`yearId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `year`
--
ALTER TABLE `year`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hospital`
--
ALTER TABLE `hospital`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `placement_location`
--
ALTER TABLE `placement_location`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `school_locations`
--
ALTER TABLE `school_locations`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `term`
--
ALTER TABLE `term`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `year`
--
ALTER TABLE `year`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `placement_location`
--
ALTER TABLE `placement_location`
  ADD CONSTRAINT `placement_location_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `placement_location_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `term`
--
ALTER TABLE `term`
  ADD CONSTRAINT `term_ibfk_1` FOREIGN KEY (`yearId`) REFERENCES `year` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
