-- Kamal Medicare Hospital - Clean Schema
-- Run this on a fresh MariaDB database

CREATE DATABASE IF NOT EXISTS `hospital`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `hospital`;

-- Users (Admin + Visitor roles, supports OAuth)
CREATE TABLE IF NOT EXISTS `user` (
  `userid` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(30) UNIQUE NOT NULL,
  `hashedpassword` VARCHAR(100),
  `email` VARCHAR(30),
  `role` ENUM('Admin','Visitor') DEFAULT 'Visitor',
  `createat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updateat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `oauth_provider` VARCHAR(20),
  `oauth_id` VARCHAR(100)
);

-- Initial admin user (password: Admin@123 — change immediately!)
INSERT IGNORE INTO `user` (username, hashedpassword, email, role)
VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8RqtbwPDNd/W5a.Km6', 'admin@kamalmedicare.in', 'Admin');

-- Specializations
CREATE TABLE IF NOT EXISTS `speacialization` (
  `speacializationid` INT AUTO_INCREMENT PRIMARY KEY,
  `fieldname` VARCHAR(50),
  `description` MEDIUMTEXT,
  `imagepath` VARCHAR(255)
);

-- Sub-Specializations
CREATE TABLE IF NOT EXISTS `subspeacialization` (
  `subspeacializationid` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  `description` MEDIUMTEXT,
  `speacialization` INT,
  CONSTRAINT `subspeacialization_fk` FOREIGN KEY (`speacialization`)
    REFERENCES `speacialization` (`speacializationid`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Sub-Specialization Images (file-based, no blobs)
CREATE TABLE IF NOT EXISTS `subspeacializationimagesvideo` (
  `subspeacializationimagesid` INT AUTO_INCREMENT PRIMARY KEY,
  `subspeacialization` INT,
  `imagepath` VARCHAR(255),
  `imagename` MEDIUMTEXT,
  `imagetype` MEDIUMTEXT,
  CONSTRAINT `subspeacializationimages_fk` FOREIGN KEY (`subspeacialization`)
    REFERENCES `subspeacialization` (`subspeacializationid`) ON DELETE CASCADE
);

-- Diseases
CREATE TABLE IF NOT EXISTS `disease` (
  `diseaseid` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(40),
  `description` MEDIUMTEXT
);

CREATE TABLE IF NOT EXISTS `diseaseimages` (
  `diseaseimageid` INT AUTO_INCREMENT PRIMARY KEY,
  `imagepath` VARCHAR(255),
  `imagename` MEDIUMTEXT,
  `imagetype` VARCHAR(12),
  `disease` INT,
  CONSTRAINT `disease_fk` FOREIGN KEY (`disease`)
    REFERENCES `disease` (`diseaseid`) ON DELETE CASCADE
);

-- Facilities
CREATE TABLE IF NOT EXISTS `facilites` (
  `facilitesid` INT AUTO_INCREMENT PRIMARY KEY,
  `facilityname` VARCHAR(30),
  `description` MEDIUMTEXT,
  `availability` ENUM('yes','no') DEFAULT 'yes',
  `facilitytype` VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS `facilites_images` (
  `imgid` INT AUTO_INCREMENT PRIMARY KEY,
  `imagepath` VARCHAR(255),
  `facility` INT,
  `imagename` MEDIUMTEXT,
  `imagetype` MEDIUMTEXT,
  CONSTRAINT `fac_fk` FOREIGN KEY (`facility`)
    REFERENCES `facilites` (`facilitesid`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- News (and Blogs - differentiated by newstype)
CREATE TABLE IF NOT EXISTS `news` (
  `newsid` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200),
  `description` MEDIUMTEXT,
  `newsdate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `newstype` VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS `newsimage` (
  `news` INT AUTO_INCREMENT PRIMARY KEY,
  `newsid` INT,
  `imagepath` VARCHAR(255),
  `imagename` MEDIUMTEXT,
  `imagetype` MEDIUMTEXT,
  CONSTRAINT `img_fk` FOREIGN KEY (`newsid`)
    REFERENCES `news` (`newsid`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Doctors
CREATE TABLE IF NOT EXISTS `doctor` (
  `doctorid` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  `email` VARCHAR(50),
  `phone` VARCHAR(12),
  `schedulefrom` VARCHAR(10),
  `scheduleto` VARCHAR(10),
  `joindate` DATE,
  `resigndate` DATE,
  `profilephotopath` VARCHAR(255),
  `imagename` MEDIUMTEXT,
  `imagetype` MEDIUMTEXT,
  `doctor` MEDIUMTEXT,
  `about` MEDIUMTEXT
);

CREATE TABLE IF NOT EXISTS `doctor_speacialization` (
  `doctorspeacializationid` INT AUTO_INCREMENT PRIMARY KEY,
  `doctor` INT,
  `speacialization` INT,
  CONSTRAINT `doc_fk` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `speacialization_fk` FOREIGN KEY (`speacialization`) REFERENCES `speacialization` (`speacializationid`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `education` (
  `educationid` INT AUTO_INCREMENT PRIMARY KEY,
  `degree` VARCHAR(20),
  `universityname` VARCHAR(40),
  `fromdate` DATE,
  `todate` DATE,
  `doctor` INT,
  CONSTRAINT `fk_doctorid` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `experience` (
  `experienceid` INT AUTO_INCREMENT PRIMARY KEY,
  `field` VARCHAR(40),
  `hospitalname` VARCHAR(40),
  `years` INT,
  `fromdate` DATE,
  `todate` DATE,
  `doctor` INT,
  CONSTRAINT `fk_docid` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Treatments
CREATE TABLE IF NOT EXISTS `treatment` (
  `treatmentid` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100),
  `description` MEDIUMTEXT,
  `cost` INT,
  `tratmentdate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients
CREATE TABLE IF NOT EXISTS `patient` (
  `patientid` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(20),
  `age` INT,
  `gender` ENUM('Male','Female'),
  `phoneno` BIGINT,
  `address` VARCHAR(30)
);

-- Appointments
CREATE TABLE IF NOT EXISTS `appointment` (
  `appointmentid` INT AUTO_INCREMENT PRIMARY KEY,
  `doctor` INT,
  `appointmentdate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Scheduled','Completed','Canceled') DEFAULT 'Scheduled',
  `user` INT,
  `mobileno` VARCHAR(10),
  CONSTRAINT `appoinment_fk` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`doctorid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointmentuser_fk` FOREIGN KEY (`user`) REFERENCES `user` (`userid`) ON DELETE CASCADE
);

-- FAQ
CREATE TABLE IF NOT EXISTS `faquestion` (
  `faquestionid` INT AUTO_INCREMENT PRIMARY KEY,
  `user` INT,
  `question` VARCHAR(60),
  `answer` VARCHAR(80),
  `creatat` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `answerat` TIMESTAMP NULL,
  CONSTRAINT `user_fk` FOREIGN KEY (`user`) REFERENCES `user` (`userid`) ON UPDATE CASCADE ON DELETE CASCADE
);
